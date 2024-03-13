import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function EditUserForm ({ setUsers, users }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find(user => user.id == id);
  const [form, setForm] = useState({
    login: user.login,
    url: user.html_url,
    photo: null,
  })
  const [errors, setErrors] = useState({
    login: '',
    url: '',
    photo: '',
  })
  const handleLoginChange = (e) => {
    const newLogin = e.target.value;
    setForm((prevState) => ({ ...prevState, login: newLogin }));
  
    if (!/^[a-zA-Z0-9]{4,}$/.test(newLogin)) {
      setErrors((prevErrors) => ({ ...prevErrors, login: 'Login must be at least 4 characters and contain only numbers and letters.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, login: '' }));
    }
  };
  
  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setForm((prevState) => ({ ...prevState, url: newUrl }));
  
    if (!newUrl.includes("https://")){
      setErrors((prevErrors) => ({ ...prevErrors, url: 'Please enter a valid url.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, url: '' }));
    }
  };
  
  const handleFileChange = (e) => {
    const newPhoto = e.target.files[0];
    setForm((prevState) => ({ ...prevState, photo: newPhoto }));
  
    if (!newPhoto) {
      setErrors((prevErrors) => ({ ...prevErrors, photo: 'Please upload a photo.' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, photo: '' }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    const file = e.target.elements.photo.files[0]
    console.log(file)
    formData.append('file', file)
    const options = {
      method: 'POST',
      body: formData
    }
    if(form.photo != null){
    const response = await fetch('http://localhost:3000/upload.php', options)
    if (response.ok) {
      console.log('File uploaded successfully')
    } else {
      console.error('File upload failed')
      console.log(response)
    }
  }
  const updatedUsers = users.map(user => user.id === Number(id) ? 
  {id:id,
    login:form.login,
    html_url:form.url,
    avatar_url: form.photo!=null ? `/images/${file.name}` : user.avatar_url
  } : user);
  setUsers(updatedUsers);
    navigate('/main');
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-64 mx-auto">
        <input type="text" onChange={handleLoginChange} name="login" value={form.login} placeholder="Login" required className="p-2 border rounded" />
        {errors.login && <p className="text-red-500 text-xs">{errors.login}</p>}
        <input type="url" onChange={handleUrlChange} name="url" value={form.url} placeholder="url" required className="p-2 border rounded" />
        {errors.url && <p className="text-red-500 text-xs">{errors.url}</p>}
        <input type="file" name="photo" onChange={handleFileChange} className="p-2 border rounded" />
        {errors.photo && <p className="text-red-500 text-xs">{errors.photo}</p>}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
      </form>
    </div>
  )
}
EditUserForm.propTypes = {
  setUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
}
export default EditUserForm
