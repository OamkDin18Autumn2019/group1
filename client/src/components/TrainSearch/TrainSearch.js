import React, { Component } from 'react'

import Dropdown from './Dropdown/Dropdown'
import Input from './Input/Input'

class TrainSearch extends Component {
    constructor() {
        super()
        this.state = {
            input: "",
            select: "destination",
        }
    }

    render() {
        return (
            <div>
                <Dropdown value={this.state.select} />
                <Input value={this.state.input} />
            </div>
        )
    }
}

export default TrainSearch