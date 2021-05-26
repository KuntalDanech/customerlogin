import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        // It is used to decode string to Json object
        console.log(tokenString);
        if(tokenString==null){
          return null;
        }else{
            return tokenString;
        }
      };
  const [token, setToken] = useState(getToken());
  const saveToken = userToken => {
    if(typeof(userToken)!='undefined' && userToken!=null){
      localStorage.setItem('token', userToken);
      setToken(userToken);
    }else{
      setToken(null);
    }
  };
  return {
    setToken: saveToken,
    token
  }
}