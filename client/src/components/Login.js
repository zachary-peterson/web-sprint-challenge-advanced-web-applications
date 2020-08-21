import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

 const loginForm = {
  username: '',
  password: ''
}

const Login = () => {
  const [signin, setSignin] = useState(loginForm);
  const { push } = useHistory();
  
 

  const handleChanges = e => {
    setSignin({...signin, [e.target.name] : e.target.value});
  }
  
  const handleLogin = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", signin)
      .then((res) => {
        console.dir(res)
        localStorage.setItem("token", res.data.payload);
        push("/protected");
      })
      .catch((err) => console.dir(err));
  };

  console.log(signin);

  return (
    <div>
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <p>Build a login page here</p>
      </div>

      <div>
        <form>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            name='username'
            value={signin.username}
            placeholder='Please Enter Your Username'
            onChange={handleChanges}
          />

          <label htmlFor='password'>Password:</label>
          <input
            type='text'
            name='password'
            value={signin.password}
            placeholder='Please Enter Your Password'
            onChange={handleChanges}
          />

          <button onClick={handleLogin}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
