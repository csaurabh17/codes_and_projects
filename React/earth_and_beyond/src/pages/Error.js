import React from 'react';
import {
    Link
  } from "react-router-dom";
const Error = () => {
    return(
        <div className='error-div'>
            <h1>Invalid URL Pattern</h1>
            <Link to='/'>Back to Home Page</Link>
        </div>
        
    );
}

export default Error;