import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Calendar, Clock, Tag, AlertTriangle } from "lucide-react";

export const NoteCard = ({ note, onDelete }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await onDelete(note._id);
    setIsDeleting(false);
    setShowConfirmDelete(false);
  };

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col justify-between h-full relative group">
      <div>
        {/* Header: Title & Category */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-slate-100 line-clamp-1 group-hover:text-purple-300 transition-colors">
            {note.title || "Untitled Note"}
          </h3>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30 shrink-0">
            <Tag className="w-3 h-3" />
            {note.category || "General"}
          </span>
        </div>

        {/* Note Body Content */}
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-4 whitespace-pre-wrap mb-4">
          {note.content}
        </p>
      </div>

      {/* Footer: Metadata & Actions */}
      <div className="pt-3 border-t border-slate-700/40 flex items-center justify-between mt-auto text-xs text-slate-400">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Created: {formatDate(note.createdAt)}</span>
          </div>
          {note.updatedAt && (
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <Clock className="w-3 h-3 text-slate-600" />
              <span>Updated: {formatDate(note.updatedAt)} {formatTime(note.updatedAt)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/notes/${note._id}/edit`}
            className="p-2 rounded-xl text-slate-300 hover:text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer"
            title="Edit Note"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
            title="Delete Note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-sm w-full border border-slate-700 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-400 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="text-base font-bold text-slate-100">Delete Note?</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Are you sure you want to delete <span className="font-semibold text-slate-100">"{note.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
