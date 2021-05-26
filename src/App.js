import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import useToken from './component/UseToken';
import MyAccountsApp from './component/MyAccountsApp';
import ElogApps from './component/ElogApps';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {

  const { token, setToken } = useToken();

  if(token==null) {
    return(   
      <div>   
      <Router>
    <Switch> 
    <Route exact path='*' render={(props) => <Login setToken={setToken} {...props} /> } />
    </Switch>
    </Router>
    </div>
    );
  }

  function logOut(){
    localStorage.removeItem("token");
    setToken(null);
  }

  function myAccountAppRedirect(){
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
  function eLogAppRedirect(){
    var token = localStorage.getItem("token");
    if(token!=null){
        console.log("Got :: "+token);
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': token },
        };
        fetch('http://localhost:8082/elog/redirect', requestOptions)
        .then(async response => {
            if (response.ok) {
                alert(response);
                //<Redirect to="https://myaccount-fbau.fujifilm.com/myaccount/"/>
                window.location.href="https://elog-fbau.fujifilm.com/elog/login.do";
            }
        }).catch(error => {
            // this.setState({ errorMessage: error.toString() });
             alert('There was an error!', error);
         });
    }
  }

  return (
    <div>
      <center>
      <Router>
        <Switch>
          <Route exact path='/'>
            <be/>
            <h1>Welcome to Fuji Films Apps Single Sing On</h1>
        <table border="2">
          <tr>
          <th colSpan="2">Welcome to the FujiFilms Microservices</th>
          </tr>
          <tr>
            <td>
              1. <Link onClick={myAccountAppRedirect} to="/">Click Here</Link> to Go to MyAccount App
            </td>
          </tr>
          <tr>
          <td>
              2. <Link onClick={eLogAppRedirect} to="/">Click Here</Link> to Go to Elog App
            </td>
          </tr>
          <tr>
          <td>
              <button style={{width : '100%'}} onClick={logOut}>Logout</button>
            </td>
          </tr>
        </table>
      </Route>
      </Switch>
      </Router>
      </center>
    </div>
  );
}

export default App;
