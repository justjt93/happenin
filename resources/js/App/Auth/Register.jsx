import React from 'react';
import Menu from "../Components/Menu.jsx";
import RegForm from "./RegForm.jsx";

const Register = () => {
    
      return (
          <>
            <div className="auth-container">
              <Menu />
              <RegForm />
            </div>   
          </>
        )
}

export default Register