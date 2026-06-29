"use client";

import { Button, TextArea } from "@heroui/react";
import { useState } from "react";

export default function CommentForm({ onSubmit, loading }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onSubmit(text);

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextArea
        label="Leave a Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button type="submit" color="secondary" isLoading={loading}>
        Post Comment
      </Button>
    </form>
  );
}
