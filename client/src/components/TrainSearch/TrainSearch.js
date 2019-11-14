import React, { Component } from 'react'

// import components
import Dropdown from './Dropdown/Dropdown'
import Button from './Button/Button'

class TrainSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            select: "destination",
            data: this.props.data
        }
    }

    // select change handler
    handleSelectChange = (e) => {
        this.setState({ select: e.target.value })
    }

    // input change handler
    handleOnCLick = () => {
        console.log('honk!')
    }

    render() {
        return (
            <div>
                <Dropdown 
                    data={this.state.data} 
                    value={this.state.select} 
                    onChange={this.handleSelectChange} 
                />
                <Button 
                    onClick={this.handleOnCLick} 
                />
            </div>
        )
    }
}

export default TrainSearch