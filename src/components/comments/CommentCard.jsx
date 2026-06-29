"use client";

import { Button } from "@heroui/react";

export default function CommentCard({ comment, isOwner, onDelete }) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="flex justify-between">
        <div>
          <h4 className="font-bold">{comment.userName}</h4>

          <p className="text-xs text-default-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>

        {isOwner && (
          <Button
            size="sm"
            color="danger"
            variant="flat"
            onPress={() => onDelete(comment._id)}
          >
            Delete
          </Button>
        )}
      </div>

      <p className="mt-4 whitespace-pre-wrap">{comment.comment}</p>
    </div>
  );
}
