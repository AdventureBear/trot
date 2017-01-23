/* ES6 Syntax */

var ES6 = 
`import React, { Component, PropTypes } from 'react'
[import-css-file]

class [comp] extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div [create-css-class]>
                <h1>[comp]</h1>
            </div>
        )
    }
}

[comp].propTypes = {

};

export default [comp]`

module.exports = ES6