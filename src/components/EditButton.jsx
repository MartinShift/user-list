import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const EditButton = ({ user }) => {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/edit/${user.id}`);
    };
  
    return (
      <button onClick={handleEdit}>Edit</button>
    );
  };
  
  EditButton.propTypes = {
    user: PropTypes.object.isRequired,
    setUsers: PropTypes.func.isRequired,
  };

export default EditButton;