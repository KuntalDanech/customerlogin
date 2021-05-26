import React from 'react';
import {useState} from 'react'
import PropTypes from 'prop-types';

export default function Login({ setToken }) {
    
    const [response, setRespoonse] = useState();

    function onSubmit(){
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        if(username!='' && password!=''){
            var obj = {
                userName : username,
                password : password  
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };
            /*fetch('http://localhost:8080/token', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ response: data});                
            });*/
            fetch('http://localhost:8080/token', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                    alert("sucess :: "+data.token);
                    setToken(data.token);
                    setRespoonse(data.token);
                //this.setState({ postId: data.id })
            })
            .catch(error => {
               // this.setState({ errorMessage: error.toString() });
                alert('There was an error!', error);
            });
        }else{
            alert("Empty");
        }
    }
        return (
           <div>
            <center>
              <h2>Fuji Films Customer Login page</h2>
              <table border="1">
                  <tr>
                      <td>
                          UserName : 
                      </td>
                      <td>
                          <input type="text" id="username" />
                      </td>
                  </tr>
                  <tr>
                      <td>
                          Password : 
                      </td>
                      <td>
                          <input type="password" id="password" />
                      </td>
                  </tr>
                  <tr>
                      <td colSpan="2">
                          <button style={{width : '100%'}} onClick={onSubmit}>Login</button>
                      </td>
                  </tr>
              </table>
              <p>{JSON.stringify(response)}</p>
              </center>
           </div>
        );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}