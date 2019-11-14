import React, { Component } from 'react'

// import components
import Dropdown from './Dropdown/Dropdown'
import Input from './Input/Input'

class TrainSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: "",
            select: "destination",
            data: this.props.data
        }
    }

    // select change handler
    handleSelectChange = (e) => {
        this.setState({ select: e.target.value })
    }

    // input change handler
    handleInputChange = (e) => {
        this.setState({ input: e.target.value })
    }

    render() {
        return (
            <div>
                <Dropdown 
                    data={this.state.data} 
                    value={this.state.select} 
                    onChange={this.handleSelectChange} 
                />
                <Input 
                    value={this.state.input} 
                    onChange={this.handleInputChange} 
                />
            </div>
        )
    }
}

export default TrainSearch