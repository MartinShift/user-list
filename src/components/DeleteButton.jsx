import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const DeleteButton = ({ user, setUsers }) => {
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">
      Delete
    </button>
  );
};
PropTypes.DeleteButton = {
  user: PropTypes.object.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default DeleteButton;