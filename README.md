## Synopsis

This is a command line helper to create React components.

## Installation

    npm install -g trot

## Help

    trot --h

## Code Examples

### Create Components using 'comp'

**Command Line**

    trot comp -c ComponentName

**Output**
Creates a file in the working directory:

    ComponentName.js

    import React from 'react'

    var ComponentName = React.createClass({
      render: function(){
       return (
          <div >
            <h1>ComponentName</h1>
          </div>
        )
      }
    })

    export default ComponentName

**Additional Flags**

    trot comp -c ComponentName -v 5      /* Outputs ES5 Syntax */
    trot comp -c ComponentName -v 6      /* Outputs ES6 Syntax */
    trot comp -c ComponentName -f src    /* Specifies output folder */
    trot comp -c ComponentName -s y      /* Creates matching CSS file */

The ```-v``` flag allows you to specify either ES5 or ES6 syntax.
ES6 is the default if no version flag is used

The ```-f``` flag allows you to specify the output folder to match your project architecture

The ```-c``` flag will create a matched CSS file with the same name as the component.  The CSS file will be imported into the component file, and the ```<div>``` will be given a class-name of "component-ComponentName".

For example:

    trot -c Test -f src -s Y

Will create a ```Test.js``` component file in the ```./src``` directory, and a Test.css file in the same directory. The main ```<div>``` in the render function will have a ```className='component-test'```

This methodology is modeled after Andrew Farmer's CSS approach for React components.


### Nest Components using 'nest'

**Command Line**
cd into the directory where your components were created (eg /src)

    trot nest Parent Child1 Child2

**Output**

1.  Imports Child1, Child2 into parent Component
1.  Searches for the render() function of Parent and inserts the Child components.

This lets you quickly see a rough sketch of your nested application.

example:

    Parent.js


    import React from 'react'
    import Child1 from 'Tile'

    var Parent = React.createClass({
      render: function(){
       return (
          <div >
            <h1>Parent</h1>
            <Child1 />
          </div>
        )
      }
    })

    export default Parent

** Notes on Nest command **
1. If you are not in the directory containing the component files, you will get an error


## Motivation

I created this while learning react because I became frustrated typing the same boilerplate for every component, often introducing typos as well.

I searched for a similar command line generator for React but could not find one, so I started coding.

Trot saves on repeated keystrokes, simplify project development and reduce the time required for creating a working app.
By using this command line interface I was able to think about coding rather than think about syntax and versions (ES5 vs ES6). '

I am still relatively new to JavaScript, Node and React development.  I'm still learning ES6. if you have suggestions for improvements, features or note any errors or corrections, please submit an issue or fork the repo and submit a pull request.




## Contributors

Contributions to this project are welcome and will be recognized here,
feel free to create an issue with suggestions for templates or command line flags to include,
additional functionality to speed React development.

Open an issue or fork the rep here [Trot on Github](https://github.com/AdventureBear/trot "Trot on Github")


## ToDo List

* Get a few initial users for feedback
* Submit glaring immediate issues to github or create pull request
* Add features & improvements
* Keep this list updated

## Change Log
See Wiki on the Github Page:
[Wiki-Change Log](https://github.com/AdventureBear/trot/wiki/Change-Log "Change Log")

## License

ISC