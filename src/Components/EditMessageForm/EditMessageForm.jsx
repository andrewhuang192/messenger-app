import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';

export default function EditMessageForm({ message, message_id, handleUpdateMessage }) {

//   const location = useLocation()

  const [invalidForm, setValidForm] = useState(true);
  const [formData, setFormData] = useState({})
  
  const formRef = useRef();

  useEffect(() => {
      formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true)
  }, [formData]);

  const handleSubmit = (e) => {
      console.log(formData)
    e.preventDefault()
    handleUpdateMessage(formData);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: {message_id},
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <form ref={formRef} autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Edit Message (required)</label>
          <input
            className="form-control"
            name="message"
            value={ formData.message}
            onChange={ handleChange}
            required
          />
        </div>
        
        
        <button
          type="submit"
          className="btn btn-xs"
          disabled={invalidForm}
        >
          SAVE Message
        </button>
        &nbsp;&nbsp;
        <Link to='/'>CANCEL</Link>
      </form>
    </>
  );
}
