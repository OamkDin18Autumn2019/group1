import React, {Component} from 'react';
import Button from '../Button/Button';
import SearchData from './SearchData';

class SaveSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            //searchData: {}
        };
        this.saveSearch = this.saveSearch.bind(this);
        //this.getSearchData = this.getSearchData.bind(this);
    }
/*
    getSearchData(val1, val2, val3){
        console.log(val1);
        console.log(val2);
        console.log(val3);
    }
    */

    saveSearch(){
        console.log(this.props.userInfo);
    }

    render(){
        return(
            <div>
                <p></p>
                <Button className='displayButton' onClick={this.saveSearch} buttonText="*Save Search"/>
                <p>*Requires Login</p>
                <SearchData getSearchData={this.getSearchData}/>
            </div>
        );
    }
}

export default SaveSearch;