import React, { Component } from 'react';
import HistoryRow from './HistoryRow';


class History extends Component {

    constructor(){
        super();
        this.state= {
            username: '',
            dataRows: []
        };
    }

    componentDidMount(){
        let getData = {
            username: this.props.userInfo.username
        };      
        fetch('http://localhost:4000/api/get_user_data', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(getData),
            })
            .then(response => response.json())
            .then(data => {
               this.setState({username: data[0].username});
               this.setState({dataRows: data});
               console.log(this.state.username);
               console.log(this.state.dataRows);
        });
    }

    render() {
        
        let historyRows = this.state.dataRows.map(row => <HistoryRow rowData={row} />);

        return(
            <div>
                <h2 style={{textAlign: "center"}}>Data you saved in your your previous searches</h2>
                <p></p>
                <h2>User name: {this.state.username}</h2>
                <p></p>
                <table className='table-style'>
                    <thead>
                        <th>First Station</th>
                        <th>Last Station</th>
                        <th>Travel Time</th>
                    </thead>
                    <tbody> {historyRows} </tbody>
                </table>
            </div>
          )
      }        
}
export default History