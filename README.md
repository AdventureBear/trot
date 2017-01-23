## Synopsis

This is a command line helper to create React components.

## Installation

    npm install -g trot

## Help

    trot --h

## Code Examples

**Command Line**

    trot -c ComponentName

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

    trot -c ComponentName -v 5      /* Outputs ES5 Syntax */
    trot -c ComponentName -v 6      /* Outputs ES6 Syntax */
    trot -c ComponentName -f src    /* Specifies output folder */
    trot -c ComponentName -s        /* Creates matching CSS file */

The ```-v``` flag allows you to specify either ES5 or ES6 syntax.
ES6 is the default if no version flag is used

The ```-f``` flag allows you to specify the output folder to match your project architecture

The ```-c``` flag will create a matched CSS file with the same name as the component.  The CSS file will be imported into the component file, and the ```<div>``` will be given a class-name of "component-ComponentName".

For example:

    trot -c Test -f src -s

Will create a ```Test.js``` component file in the ```./src``` directory, and a Test.css file in the same directory. The main ```<div>``` in the render function will have a ```className='component-test'```

This methodology is modeled after Andrew Farmer's CSS approach for React components.

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
v1.0.0
* Properly created a shell script that can run from command line

v0.0.4 & v0.0.5
* Added folder flag ```-f```.  Default will write into current folder, otherwise will create new directory if it does not exist
* Updated entry file name from app.js to trot.js
* Cleaned up .gitignore file

v0.0.3
* Added ES6 Component as default ```-v``` flag. Use options 5 or 6 to specify

v0.0.1
* First version

## License

ISC