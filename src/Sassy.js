import React, { Component, PropTypes } from 'react'
import './Sassy.css'

class Sassy extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className='component-sassy'>
                <h1>Sassy</h1>
            </div>
        )
    }
}

Sassy.propTypes = {

};

export default Sassy