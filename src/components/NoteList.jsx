import React from "react";

function NoteList({ notes, onDelete, onEdit }) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div className="btn-group">
            <button className="edit" onClick={() => onEdit(note)}>
              ✏️ Edit
            </button>
            <button className="delete" onClick={() => onDelete(note.id)}>
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
