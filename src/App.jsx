import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddOrUpdateNote = (note) => {
    if (editNote) {
      setNotes(notes.map((n) => (n.id === editNote.id ? note : n)));
      setEditNote(null);
    } else {
      setNotes([{ ...note, id: Date.now() }, ...notes]);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (note) => {
    setEditNote(note);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📝 Personal Notes</h1>
      <NoteForm onSubmit={handleAddOrUpdateNote} editNote={editNote} />
      <input
        type="text"
        placeholder="🔍 Search notes..."
        className="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <NoteList
        notes={filteredNotes}
        onDelete={handleDeleteNote}
        onEdit={handleEditNote}
      />
    </div>
  );
}

export default App;
