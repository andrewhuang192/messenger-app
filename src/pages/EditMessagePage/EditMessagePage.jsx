import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';

export default function EditMessagePage({ handleUpdateMessage, message, message_id }){
console.log(message_id)
  const location = useLocation()

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
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <h1>Edit Puppy</h1>
      <form ref={formRef} autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Edit Message Here (required)</label>
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
          SAVE MESSAGE
        </button>
        &nbsp;&nbsp;
        <Link to='/'>CANCEL</Link>
      </form>
    </>
  );
}
