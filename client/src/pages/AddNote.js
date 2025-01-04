import { useNavigate } from 'react-router-dom';
import { createNote } from '../api';
import NoteForm from '../components/NoteForm';

const AddNote = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    createNote(formData).then(() => {
      alert('Note added!');
      navigate('/');
    });
  };

  return (
    <div>
      <h1>Add Note</h1>
      <NoteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddNote;
