## Synopsis

This is a command line helper to create React components.

## Code Example

### Command Line
```> node app.js -c ComponentName```

### Output

Creates a file in the working directory:
```ComponentName.js```

```
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
```

## Motivation

I created this while learning react because I became frustrated typing the same boilerplate for every component, often introducing typos as well.  This helped me to save on repeated keystrokes, simplify project development and reduce the time required for creating a working app.
By using this command line interface I was able to think about coding rather than think about syntax and versions (ES5 vs ES6). '

## Installation

Provide code examples and explanations of how to get the project.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)