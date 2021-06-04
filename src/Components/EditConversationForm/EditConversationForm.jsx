import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';

export default function EditConversationForm({ conversation, conversation_id, handleUpdateConversation }) {

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
    handleUpdateConversation(formData);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: {conversation_id},
      [e.target.name]: e.target.value
    })
  }
  console.log(conversation_id)
  console.log(conversation)
  return (
    <>
      <form ref={formRef} autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Edit Conversation (required)</label>
          <input
            className="form-control"
            name="name"
            value={ formData.name}
            onChange={ handleChange}
            required
          />
        </div>
        
        
        <button
          type="submit"
          className="btn btn-xs"
          disabled={invalidForm}
        >
          SAVE Conversation
        </button>
        &nbsp;&nbsp;
        <Link to='/'>CANCEL</Link>
      </form>
    </>
  );
}
