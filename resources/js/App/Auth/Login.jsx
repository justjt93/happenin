import React from 'react';
import Menu from "../Components/Menu.jsx";
import Footer from "../Components/Footer.jsx";
import LoginForm from "./LoginForm.jsx";

const Login = () =>  {
      return (
          <>
            <Menu />
            <div className="auth-container">
              <LoginForm />
            </div>
            <Footer />
          </>
        )
}

export default Login