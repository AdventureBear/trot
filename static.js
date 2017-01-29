//add child components to parent component file via command
//syntax shoud be:
//>trot -p App -c Header Menu Results Footer
//Will search for and open parent component App.js
//add import lines for the -c arguments (variadic)
//find the render method of the parent and add each of the child components.

var childComps =
  render: function(){
    return (
      <div [create-css-class]>
      <h1>[comp]</h1>
      </div>
    )
  },
  propTypes: {

  }
})

module.exports = childComps