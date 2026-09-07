import Note from "../model/Note.js";


export const createNote = async (request, response) => {
  try {
    const { title, content, category } = request.body;

    if (!title || !content) {
      return response.status(400).json({
        message: "Title and content are required"
      });
    }

    const note = await Note.create({
      user: request.user,
      title,
      content,
      category: category || "General"
    });

    response.status(201).json({
      message: "Note created successfully",
      note
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to create note",
      error: error.message
    });
  }
};


export const getNotes = async (request, response) => {
  try {
    const filter = { user: request.user };
    const notes = await Note.find(filter).sort({
      updatedAt: -1
    });

    response.status(200).json({
      message: "Notes fetched successfully",
      notes
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to fetch notes",
      error: error.message
    });
  }
};


export const getNoteById = async (request, response) => {
  try {
    const { id } = request.params;
    const filter = { _id: id, user: request.user };

    const note = await Note.findOne(filter);

    if (!note) {
      return response.status(404).json({
        message: "Note not found"
      });
    }

    response.status(200).json({
      message: "Note fetched successfully",
      note
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to fetch note",
      error: error.message
    });
  }
};


export const updateNote = async (request, response) => {
  try {
    const { id } = request.params;
    const { title, content, category } = request.body;

    if (!title || !content) {
      return response.status(400).json({
        message: "Title and content are required"
      });
    }

    const filter = { _id: id, user: request.user };
    const updateData = { title, content };
    if (category) updateData.category = category;

    const note = await Note.findOneAndUpdate(
      filter,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!note) {
      return response.status(404).json({
        message: "Note not found"
      });
    }

    response.status(200).json({
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to update note",
      error: error.message
    });
  }
};


export const deleteNote = async (request, response) => {
  try {
    const { id } = request.params;
    const filter = { _id: id, user: request.user };

    const note = await Note.findOneAndDelete(filter);

    if (!note) {
      return response.status(404).json({
        message: "Note not found"
      });
    }

    response.status(200).json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    response.status(500).json({
      message: "Failed to delete note",
      error: error.message
    });
  }
};
