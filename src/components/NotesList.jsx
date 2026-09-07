import React, { useState } from "react";
import NoteCard from "./NoteCard";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router-dom";
import { PlusCircle, Search, Filter, StickyNote, Sparkles } from "lucide-react";

const CATEGORY_TABS = ["All", "General", "Work", "Personal", "Ideas", "Tasks", "Study"];

export const NotesList = ({ notes = [], loading = false, error = null, onDelete, searchQuery = "", setSearchQuery }) => {
  const [selectedTab, setSelectedTab] = useState("All");

  if (loading) {
    return <Loading message="Loading notes list..." />;
  }

  // Filter notes by search keyword and category tab
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      !searchQuery ||
      note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedTab === "All" || (note.category || "General") === selectedTab;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toolbar: Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl glass-panel">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedTab === tab
                  ? "bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input for Mobile/Desktop */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search notes by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full text-xs py-2 px-3 pl-9 rounded-xl glass-input placeholder-slate-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Error Message Display */}
      {error && (
        <ErrorMessage
          message={error.response?.data?.message || error.message || "Failed to load notes."}
          statusCode={error.response?.status || 500}
        />
      )}

      {/* Notes Grid or Empty State */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center justify-center max-w-md mx-auto my-12 border border-slate-700/40">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 shadow-lg">
            <StickyNote className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 mb-1">No notes found</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-xs">
            {searchQuery || selectedTab !== "All"
              ? "No notes match your filter or search query. Try clearing your search."
              : "You haven't created any notes yet. Click below to write your first note with AI assistance!"}
          </p>
          <Link
            to="/notes/new"
            className="px-5 py-2.5 rounded-xl gradient-btn text-white text-xs font-semibold shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Your First Note</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotesList;
