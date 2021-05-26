import React from 'react'
class ElogApps extends React.Component{

    constructor(props){
        super();

    }
    componentDidMount(){
        var token = localStorage.getItem("token");
        if(token!=null){
            // Simple POST request with a JSON body using fetch
            const requestOptions = {
                method: 'POST',
                headers: { 'Authorization': token },
            };
            fetch('http://localhost:8081/elog/redirect', requestOptions)
                .then(response => response.json())
                .then(data => this.setState({ postId: data.id }));
        }
    }
    render(){
        return <div>
            <h1>Welcome to ElogApps App</h1>
        </div>
    }

}
export default ElogApps