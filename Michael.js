import React, { Component, PropTypes } from 'react'
import Suzanne from 'Suzanne'
import Larkin from 'Larkin'
import Fig from 'Fig'
import Suzanne from 'Suzanne'
import Larkin from 'Larkin'
import Fig from 'Fig'


class Michael extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div >
                <h1>Michael</h1>
                <Suzanne />
                <Larkin />
                <Fig />
                <Suzanne />
                <Larkin />
                <Fig />
            </div>
        )
    }
}

Michael.propTypes = {

};

export default Michael
