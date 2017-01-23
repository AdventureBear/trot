import React, { Component, PropTypes } from 'react'
import './Test.css'

class Test extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className='component-test'>
                <h1>Test</h1>
            </div>
        )
    }
}

Test.propTypes = {

};

export default Test