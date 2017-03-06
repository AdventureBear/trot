import React, { Component, PropTypes } from 'react'
import Oranges from 'Oranges'


class Apples extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div >
                <h1>Apples</h1>
                <Oranges />
            </div>
        )
    }
}

Apples.propTypes = {

};

export default Apples
