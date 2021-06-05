import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import "./EditUserPage.css";
// import { getUser } from '../../utilities/users-service';


export default function EditUserPage({ user, users, handleUpdatedUser }){
  // const location = useLocation()

  const [invalidForm, setValidForm] = useState(true);
  const [formData, setFormData] = useState(user)
  
  const formRef = useRef();

  useEffect(() => {
      formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true)
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    handleUpdatedUser(formData);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <h1>Edit User</h1>
      <form ref={formRef} autoComplete="off" onSubmit={handleSubmit} className="EditUserPage">
        <div className="form-group">
          <label>User Name (required)</label>
          <input
            className="form-control"
            name="name"
            value={ formData.name}
            onChange={ handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>User Email (required)</label>
          <input
            className="form-control"
            name="email"
            value={ formData.email}
            onChange={ handleChange }
            required
          />
        </div>
        <div className="form-group">
          <label>User Bio (required)</label>
          <input
            className="form-control"
            name="bio"
            value={ formData.bio}
            onChange={ handleChange }
          />
        </div>
        <div className="form-group">
          <label>Created Date</label>
           <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
        </div>
        <button
          type="submit"
          className="btn btn-lg"
          disabled={invalidForm}
        >
          SAVE PROFILE
        </button>
        &nbsp;&nbsp;
        <Link to='/'>RETURN TO MESSAGES</Link>
      </form>
    </>
  );
}