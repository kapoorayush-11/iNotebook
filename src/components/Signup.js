import React, {useState} from "react";
import { useNavigate } from "react-router-dom"

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email:"", password:"", cpassword:""})
  const navigate = useNavigate();
  
  
const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, email: email, password: password})
    });
        const json = await response.json();
        console.log(json);
        if(json.success) {
          //save the auth token and then redirect
          localStorage.setItem('token', json.authtoken);
          navigate("/");
          props.showAlert("Account created Successfully","success");
        }else{
          props.showAlert("Invalid details","danger");
        }
    }
  
  const onChange = (e) => {
  setCredentials({...credentials, [e.target.name]: e.target.value })
          }

  return (
    <div className="mt-3 ">
    <h2 className="my-4">Sign Up to start using Inotebook</h2>
    <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" placeholder="" onChange={onChange}aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange}  minLength={5} required/>
  </div>

  <div className="mb-3">
  <label htmlFor="cpassword" className="form-label">Confirm password</label>
  <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
</div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    
    </div>
  )
}

export default Signup