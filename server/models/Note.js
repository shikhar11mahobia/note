import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
