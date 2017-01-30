import Child from './src/Child'
import Second from './src/Second'
import Child from './src/Child'
import Second from './src/Second'
import Child,Second from './src/Child,Second'
import Child from './src/Child'
import React, { Component, PropTypes } from 'react'


class App extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div >
                <h1>App</h1>
                <Child />
                <Second />
                <Child,Second />
                <Child,Second />
		<Child />
            </div>
        )
    }
}

App.propTypes = {

};

export default App
