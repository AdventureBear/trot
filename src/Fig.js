import React, { Component, PropTypes } from 'react'
import './Fig.css'

class Fig extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className='component-fig'>
                <h1>Fig</h1>
            </div>
        )
    }
}

Fig.propTypes = {

};

export default Fig