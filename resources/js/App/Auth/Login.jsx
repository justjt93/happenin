import React from 'react';
import Menu from "../Components/Menu.jsx";
import LoginForm from "./LoginForm.jsx";

const Login = () =>  {
      return (
          <>
            <div className="auth-container">
              <Menu />
              <LoginForm />
            </div>
          </>
        )
}

export default Login