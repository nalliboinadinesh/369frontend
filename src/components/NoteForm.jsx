import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AIAction from "./AIAction";
import ErrorMessage from "./ErrorMessage";
import { Save, X, Tag, FileText, Sparkles } from "lucide-react";

const CATEGORIES = ["General", "Work", "Personal", "Ideas", "Tasks", "Study"];

export const NoteForm = ({ initialData = {}, onSubmit, isEditing = false, error = null }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [category, setCategory] = useState(initialData.category || "General");
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData.title) setTitle(initialData.title);
    if (initialData.content) setContent(initialData.content);
    if (initialData.category) setCategory(initialData.category);
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    if (!title.trim()) {
      setValidationError("Title is required.");
      return;
    }

    if (!content.trim()) {
      setValidationError("Content is required.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ title, content, category });
    } catch (err) {
      console.error("Form submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAIContentGenerated = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-2xl max-w-3xl mx-auto my-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-700/50 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold gradient-text">
            {isEditing ? "Edit Note" : "Create New Note"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isEditing
              ? "Update your existing note title, details, or use AI assistant"
              : "Capture ideas, thoughts, or project notes with AI power"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/notes")}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Validation / Server Error Display */}
      {validationError && (
        <ErrorMessage message={validationError} onDismiss={() => setValidationError("")} statusCode={400} />
      )}
      {error && (
        <ErrorMessage
          message={error.response?.data?.message || error.message || "An error occurred while saving."}
          statusCode={error.response?.status || 500}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Note Title <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submitting}
              className="w-full text-base py-3 px-4 rounded-xl glass-input text-slate-100 placeholder-slate-500 font-medium"
            />
          </div>
        </div>

        {/* Category Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Category Tag
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  category === cat
                    ? "bg-purple-600/30 text-purple-200 border-purple-500/50 shadow-sm"
                    : "bg-slate-900/40 text-slate-400 border-slate-700/60 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Textarea */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Content Body <span className="text-red-400">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {content.length} characters
            </span>
          </div>
          <textarea
            rows={8}
            placeholder="Write your note content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={submitting}
            className="w-full text-sm py-3 px-4 rounded-xl glass-input text-slate-100 placeholder-slate-500 leading-relaxed resize-y font-normal"
          />
        </div>

        {/* Integrated AI Action Component */}
        <AIAction content={content} onContentGenerated={handleAIContentGenerated} />

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-700/50">
          <button
            type="button"
            onClick={() => navigate("/notes")}
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl gradient-btn text-white text-xs font-semibold shadow-lg hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? "Saving..." : isEditing ? "Update Note" : "Save Note"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
