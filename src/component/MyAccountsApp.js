import React from 'react'
import { Redirect } from 'react-router';
class MyAccountsApp extends React.Component{

    constructor(props){
        super();
    }
    componentDidMount(){
        var token = localStorage.getItem("token");
        if(token!=null){
            console.log("Got :: "+token);
            // Simple POST request with a JSON body using fetch
            const requestOptions = {
                method: 'POST',
                headers: { 'Authorization': token },
            };
            fetch('http://localhost:8081/myaccountapp/redirect', requestOptions)
            .then(async response => {
                if (response.ok) {
                    alert(response);
                    //<Redirect to="https://myaccount-fbau.fujifilm.com/myaccount/"/>
                    window.location.href="https://myaccount-fbau.fujifilm.com/myaccount/";
                }
            }).catch(error => {
                // this.setState({ errorMessage: error.toString() });
                 alert('There was an error!', error);
             });
        }
    }
    render(){
        return <div>
            <h1>Welcome to MyAccounts App</h1>
        </div>
    }

}
export default MyAccountsApp