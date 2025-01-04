import { useNavigate } from 'react-router-dom';

const Note = ({ note, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      {note.image && (
        <img
          src={`http://localhost:5000/${note.image}`}
          alt="Note"
          style={{ maxWidth: '100%' }}
        />
      )}
      <button onClick={() => navigate(`/edit/${note._id}`)}>Edit</button>
      <button onClick={() => onDelete(note._id)}>Delete</button>
    </div>
  );
};

export default Note;
