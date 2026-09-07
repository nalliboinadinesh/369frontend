import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NoteForm from "../components/NoteForm";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getNoteById, createNote, updateNote } from "../api/noteApi";

export const EditNote = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [initialData, setInitialData] = useState({ title: "", content: "", category: "General" });
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const fetchNote = async () => {
        setLoading(true);
        setError(null);
        try {
          const note = await getNoteById(id);
          if (note) {
            setInitialData({
              title: note.title || "",
              content: note.content || "",
              category: note.category || "General",
            });
          }
        } catch (err) {
          console.error("Error fetching note by id:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchNote();
    }
  }, [id, isEditing]);

  const handleSubmit = async (formData) => {
    setError(null);
    try {
      if (isEditing) {
        await updateNote(id, formData);
      } else {
        await createNote(formData);
      }
      navigate("/notes");
    } catch (err) {
      console.error("Failed to save note:", err);
      setError(err);
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loading message="Loading note details..." />
        ) : (
          <NoteForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isEditing={isEditing}
            error={error}
          />
        )}
      </main>
    </div>
  );
};

export default EditNote;
