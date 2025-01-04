import { useEffect, useState } from 'react';
import { fetchNotes, deleteNote } from '../api';
import Note from '../components/Note';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes().then((res) => setNotes(res.data));
  }, []);

  const handleDelete = (id) => {
    deleteNote(id).then(() => setNotes(notes.filter((note) => note._id !== id)));
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => navigate('/add')}>Add Note</button>
      {notes.map((note) => (
        <Note key={note._id} note={note} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Home;
