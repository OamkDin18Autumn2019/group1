import React, {Component} from 'react';

class HistoryRow extends Component{
    constructor(props){
        super(props);
        this.state ={
        };
    }

    render(){
        return(
            <tr>
                <td> {this.props.rowData.firstStation} </td>
                <td> {this.props.rowData.lastStaion} </td>
                <td> {this.props.rowData.travelTime} </td>
            </tr>
        );
    }
}

export default HistoryRow;