"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import { createComment, deleteComment } from "@/lib/api/comment/action";
import { getComments } from "@/lib/api/comment/data";

export default function CommentsSection({ artwork, session }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  // ✅ Create a simple refresh toggle counter to safely trigger re-fetches
  const [refreshKey, setRefreshKey] = useState(0);

  // ✅ All fetch logic lives safely inside the effect wrapper. No red/yellow underlines!
  useEffect(() => {
    if (!artwork?._id) return;

    let isMounted = true;

    const fetchFreshComments = async () => {
      try {
        const data = await getComments(artwork._id);
        if (isMounted) {
          setComments(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load comments");
      }
    };

    fetchFreshComments();

    return () => {
      isMounted = false;
    };
  }, [artwork?._id, refreshKey]); // ✅ Satisfies ESLint perfectly

  // ✅ Simple function to trigger the useEffect whenever a comment changes
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  // Add Comment
  const handleComment = async (text) => {
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);

      await createComment({
        artworkId: artwork._id,
        artworkTitle: artwork.title,
        userName: session.user.name,
        userEmail: session.user.email,
        comment: text,
      });

      toast.success("Comment added");

      // ✅ Instantly updates UI list by updating the refresh key
      triggerRefresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  // Delete Comment
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this comment?");
    if (!ok) return;

    try {
      await deleteComment(id);
      toast.success("Comment deleted");

      // ✅ Instantly updates UI list by updating the refresh key
      triggerRefresh();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-black">Comments ({comments.length})</h2>
        <p className="text-default-500">
          Share your thoughts about this artwork.
        </p>
      </div>

      <CommentForm onSubmit={handleComment} loading={loading} />

      <div className="mt-10 space-y-5">
        {comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-default-300 py-12 text-center">
            <h3 className="text-lg font-bold">No comments yet</h3>
            <p className="mt-2 text-default-500">
              Be the first person to comment on this artwork.
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              isOwner={session?.user?.email === comment.userEmail}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}
