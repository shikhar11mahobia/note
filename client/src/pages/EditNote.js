import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateNote, fetchNotes } from '../api';
import NoteForm from '../components/NoteForm';

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetchNotes().then((res) => {
      const foundNote = res.data.find((note) => note._id === id);
      setNote(foundNote);
    });
  }, [id]);

  const handleSubmit = (formData) => {
    updateNote(id, formData).then(() => {
      alert('Note updated!');
      navigate('/');
    });
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Note</h1>
      <NoteForm onSubmit={handleSubmit} initialData={note} />
    </div>
  );
};

export default EditNote;
