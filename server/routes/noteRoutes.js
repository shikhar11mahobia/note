import express from 'express';
import multer from 'multer';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/noteController.js';

const router = express.Router();

// Set up file upload with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// CRUD Endpoints
router.get('/', getNotes); // Get all notes
router.get('/:id', getNoteById); // Get a specific note
router.post('/', upload.single('image'), createNote); // Create a new note with an optional image
router.put('/:id', upload.single('image'), updateNote); // Update a note (image is optional)
router.delete('/:id', deleteNote); // Delete a note

export default router;

