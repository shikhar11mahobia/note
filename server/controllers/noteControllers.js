import Note from '../models/Note.js';
import fs from 'fs';
import path from 'path';

// Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const note = new Note({
      title,
      description,
      image,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.title = title || note.title;
    note.description = description || note.description;
    if (image) note.image = image;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.image) {
      const imagePath = path.join(path.resolve(), 'uploads', note.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    await note.remove();
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
