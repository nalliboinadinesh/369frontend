import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NotesList from "../components/NotesList";
import { getNotes, deleteNote } from "../api/noteApi";
import { Link } from "react-router-dom";
import { PlusCircle, Sparkles, RefreshCw } from "lucide-react";

export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNotesList = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes();
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotesList();
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to delete note:", err);
      setError(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2.5">
              <span>My Notes</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                {notes.length} Total
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Create, organize, and enhance your notes with AI assistance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchNotesList}
              disabled={loading}
              className="p-2.5 rounded-xl glass-panel text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all cursor-pointer"
              title="Refresh Notes"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-purple-400" : ""}`} />
            </button>
            <Link
              to="/notes/new"
              className="px-4 py-2.5 rounded-xl gradient-btn text-white text-xs font-semibold shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Note</span>
            </Link>
          </div>
        </div>

        {/* Notes List Component */}
        <NotesList
          notes={notes}
          loading={loading}
          error={error}
          onDelete={handleDeleteNote}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </main>
    </div>
  );
};

export default Notes;
