import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import "./EditMessagePage.css";
// import { getUser } from '../../utilities/users-service';


export default function EditUserPage({ convo, handleDeleteMessage }){
  // const [user, setUser] = useState(getUser());

  // console.log(user)
  // console.log(users)

  // const location = useLocation()

  const [invalidForm, setValidForm] = useState(true);
  const [formData, setFormData] = useState([])
  
  const formRef = useRef();

  useEffect(() => {
      formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true)
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault()
    handleDeleteMessage(formData);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <h1>Edit Message</h1>
      <form ref={formRef} autoComplete="off" onSubmit={handleSubmit} className="EditMessagePage">
        <div className="form-group">
          <label>Message Name (required)</label>
          <input
            className="form-control"
            name="name"
            value={ formData._id}
            onChange={ handleChange}
            required
          />
        </div>
  
        <button
          type="submit"
          className="btn btn-lg"
          disabled={invalidForm}
        >
          SAVEConvo
        </button>
        &nbsp;&nbsp;
        <Link to='/'>RETURN TO MESSAGES</Link>
      </form>
    </>
  );
}