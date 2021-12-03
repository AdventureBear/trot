#!/usr/bin/env node

/* Command Line Parser */
const program = require('commander')
const fs = require('fs')
const readline = require('readline')
const reactComponentEs5 = require('./templates/reactComponentES5')
const reactComponentEs6 = require('./templates/reactComponentES6')
const reactComponentES6Stateless = require('./templates/reactComponentES6Stateless')
const cssTemplate = require('./templates/cssTemplate')

let template = ""
let result = ""
let cssResult = ""
let cssFilename = ""
let dir = './'
let outputName = ""
//let path =""


let nest = (parent, children, options) => {

  console.log('Nest components for parent: %s and children: %s', parent, children);
  if (options.folder) {
    dir = dir + options.folder + "/"
    console.log("Folder: ", options.folder)
  }
  let path = dir + parent + ".js"

  //Find Component file in folder
  fs.stat(path, function (err, stats) {
    if (err) {
      console.log("no such file or directory at ", path)
      console.log("Please check path and component name")
      return
    }

    //confirm it is a file
    if (stats.isFile()) {

      //fs.readFile(path,'utf8', (err, data) => {
      //  if (err) throw err;
      //  console.log(data.toString());
      //})

      //create a readstream interface to read line by line
      let inputFile = fs.createReadStream(path)
      const rl = readline.createInterface({
        input: inputFile
      });

      let newComponent = ''

      //read line by line to do the magic
      //set flags for include/require each child
      //set flags for rendering each child
      addedImportOrRequire = false
      renderedChild = false

      //set Regex's to search for insertion points
      reImport = /import/gi
      reRequire = /require/gi
      reDiv = /(<h1>)/gi

      rl.on('line', (input) => {
        //check if include has been set for child component
        //if it has skip these input lines
        //prevents multiple insertions of include files
        if (!addedImportOrRequire) {
          //assumes first line is always require or import React
          newComponent += input + '\n'
          addedImportOrRequire = true

          if (input.match(reImport)) {
            children.map((child) => {
              newComponent += "import " + child + " from \'" + child + "\'\n"
            })

          } else if (input.match(reRequire)) {
            children.map((child) => {
              newComponent += "var " + child + " = require(\'" + child + "\') " + "\n"
            })
          }



        } else

          //search for component's render -> div and render Children
          if (input.match(reDiv)) {
            newComponent += input + '\n'
            children.map((child) => {
              newComponent += '                <' + child + ' />\n'
            })
          } else {
            console.log(input)
            newComponent += input + '\n'
            //console.log(`Received: ${input}`)
          }
      })

      rl.on('close', function () {
        fs.writeFile(path, newComponent, 'utf8', function (err) {
          if (err) return console.log(err)
          console.log("New file created: ", outputName)
        });
        console.log("New Component:\n", newComponent)
      })

    }
  })


}
program
  .command('nest <parent> <children...>')
  .description('nests one or more child components into parent component')
  .option("-f, --folder [folder]", "containing folder for all files")
  .action(nest);
//console.log(reactComponentEs5, typeof(reactComponentEs5))
/*  Create Options list from command lines */
program
  //  .version('0.0.1')
  .command('comp')
  .description('create components')
  .option('-c, --componentName [name]', 'Create Component Named [Layout]', 'layout')
  .option('-v, --JSVersion [version]', 'EMCAScript version [6]', '6')
  .option('-f, --folder [folder]', 'Folder [./]', './')
  .option('-s, --cssFile [cssFile]', 'Create CSS [No]', 'No')
  .option('--stateless', 'Stateless component')
  .action(function (componentName, options) {
    console.log("Composing components...")
    //if component flag set (also should be default)
    if (componentName) {
      console.log('Creating React component: ')
      console.log('  - Component Name: %s ', this.componentName)
      console.log('  - ECMAScript Version: %s ', this.JSVersion)
      console.log('  - Folder: %s ', this.folder)
      console.log('  - CSS file created: %s ', this.cssFile)
      if (this.JSVersion === '6') console.log('  - Stateless component: %s ', this.stateless ? "Yes" : "No")

      // Handle Version Flag "-v"
      //select EMCA version 6 as default or version 5 if flagged
      if (this.JSVersion === '6') {
        // Handle Stateless Flag "--stateless"
        //select ES6 Class as default or functional component if flagged
        if (this.stateless) {
          template = reactComponentES6Stateless
        } else {
          template = reactComponentEs6
        }

      } else {
        template = reactComponentEs5
      }


      //Create component file from template, replacing holder text with componentName
      //basic replacment regardless of CSS flag
      result = template.replace(/\[comp\]/g, this.componentName)

      //Handle CSS flag (-s)
      //Import CSS, create CSS from Template and add className to Div of component file
      if (this.cssFile === 'y' || this.cssFile === 'Y') {
        result = result.replace(/\[import-css-file\]/g, ("import \'.\/" + this.componentName + ".css\'"))
        result = result.replace(/\[create-css-class\]/g, ("className=\'component-" + this.componentName.toLowerCase() + "\'"))
        cssResult = cssTemplate.replace(/\[comp\]/g, this.componentName.toLowerCase())
      } else {
        //remove CSS references from template
        //result = template.replace(/\[comp\]/g, this.componentName)
        result = result.replace(/\[import-css-file\]/g, '')
        result = result.replace(/\[create-css-class\]/g, '')
      }


      //build strings for directory and file outputs
      if (this.folder) {
        dir += this.folder + '/'
        cssFilename = dir + this.componentName + ".css"
      }


      //Check for -f directory and create if doesn't exist
      if (!fs.existsSync(dir)) {
        console.log("Directory does not exist: " + dir)
        fs.mkdirSync(dir);
      } else {
        console.log("Directory exists: " + dir)
      }

      //create component file in proper directory
      outputName = dir + this.componentName + '.js'
      fs.writeFile(outputName, result, 'utf8', function (err) {
        if (err) return console.log(err)
        console.log("New file created: ", outputName)
      });

      //create CSS file in proper directory
      if (this.cssFile === 'y' || this.cssFile === 'Y') {
        fs.writeFile(cssFilename, cssResult, 'utf8', function (err) {
          if (err) return console.log(err)
          console.log("New CSS file created: ", cssFilename)
        });
      }
    }
  })




/* Command for nesting child components
   let's see how it works.
 */

program.parse(process.argv);

//Helpful posts
//https://edgethreesixty.co.uk/blog/read-files-line-line-node-js-using-new-es6-syntax/
//http://stackoverflow.com/questions/29410404/readline-output-to-file-node-js
//http://stackoverflow.com/questions/41562038/accessing-data-parsed-by-readline-fs-in-node-js-outside-of-the-callback-functi
