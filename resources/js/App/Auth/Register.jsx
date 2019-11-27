import React from 'react';
import Menu from "../Components/Menu.jsx";
import Footer from "../Components/Footer.jsx";
import RegForm from "./RegForm.jsx";

const Register = () => {
    
      return (
          <>
            <Menu />
            <div className="auth-container">              
              <RegForm />
            </div> 
            <Footer />  
          </>
        )
}

export default Register