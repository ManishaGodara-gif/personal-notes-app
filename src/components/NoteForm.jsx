import React, { useState, useEffect } from "react";

function NoteForm({ onSubmit, editNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onSubmit({ title, content, id: editNote?.id || Date.now() });
    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        className="input"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        className="textarea"
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn" type="submit">
        {editNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}

export default NoteForm;
