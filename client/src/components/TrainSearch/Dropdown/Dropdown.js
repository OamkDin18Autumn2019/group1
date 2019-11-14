import React, { Component } from 'react'

class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
    }
    // option map function for dropdown
    optionMap = () => {
        return this.state.data.map((number, index) => {
            return <option key={index} value={number.trainNumber}>{number.trainNumber}</option>
        })
    }

    render() {
        return (
            <select value={this.props.select} onChange={this.props.onChange}>
                {this.optionMap()}
            </select>
        )
    }
}

export default Dropdown