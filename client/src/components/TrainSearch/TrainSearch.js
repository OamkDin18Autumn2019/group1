import React, { Component } from 'react'

// import components
import Dropdown from './Dropdown/Dropdown'
import Button from './Button/Button'
import TrainDetails from './TrainDetails/TrainDetails'

class TrainSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            select: undefined,
            data: this.props.data,
            buttonVal: undefined,
        }
    }

    // select change handler
    handleSelectChange = (e) => {
        this.setState({ select: e.target.value })
    }

    // input change handler
    handleOnCLick = () => {
        this.setState({ buttonVal: this.state.select });
    }

    render() {
        return (
            <div>
                <h2 className='titleSelection'>Select a Train</h2>
                <Dropdown 
                    data={this.state.data} 
                    value={this.state.select} 
                    onChange={this.handleSelectChange} 
                />
                <Button 
                    onClick={this.handleOnCLick} 
                />
                <h2>Train Details</h2>
                <TrainDetails 
                    trainNum={this.state.buttonVal} 
                />
            </div>
        )
    }
}

export default TrainSearch