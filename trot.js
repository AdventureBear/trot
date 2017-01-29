#!/usr/bin/env node

/* Command Line Parser */
const program = require('commander')
const fs = require('fs')
const readline = require('readline')
const reactComponentEs5 = require('./templates/reactComponentES5')
const reactComponentEs6 = require('./templates/reactComponentES6')
const cssTemplate = require('./templates/cssTemplate')

let template =""
let result = ""
let cssResult = ""
let cssFilename = ""
let dir = './'
let outputName = ""


program
  .command('nest <parent> [otherFiles...]')
  .description('nests child components into parent')
  .option("-h, --children [children...]", "Child components to nest")
  .action(function(parent, otherFiles){
    console.log('Nest components  for %s parent and %s children', parent, otherFiles);
  });


//console.log(reactComponentEs5, typeof(reactComponentEs5))
/*  Create Options list from command lines */
program
  .version('0.0.1')
  .command('comp')
  .description('create components')
  .option('-c, --componentName [name]', 'Create Component Named [Layout]', 'layout')
  .option('-v, --JSVersion [version]', 'EMCAScript version [6]',  '6')
  .option('-f, --folder [folder]', 'Folder [./]',  './')
  .option('-s, --cssFile [cssFile]', 'Create CSS [No]', 'No')
  .action(function(componentName, options){
    console.log("Composing components...")
    //if component flag set (also should be default)
    if (componentName) {
      console.log('Creating React component: ')
      console.log('  - Component Name: %s ', this.componentName)
      console.log('  - EMCAScript Version: %s ', this.JSVersion)
      console.log('  - Folder: %s ', this.folder)
      console.log('  - CSS file created: %s ', this.cssFile)

      // Handle Version Flag "-v"
      //select EMCA version 6 as default or version 5 if flagged
      if (program.JSVersion==='6')
        template = reactComponentEs6
      else  template = reactComponentEs5

      //Create component file from template, replacing holder text with componentName
      //basic replacment regardless of CSS flag
      result = template.replace(/\[comp\]/g, this.componentName)

      //Handle CSS flag (-s)
      //Import CSS, create CSS from Template and add className to Div of component file
      if (this.cssFile==='y') {
        result = result.replace(/\[import-css-file\]/g, ("import \'.\/" + this.componentName + ".css\'" ))
        result = result.replace(/\[create-css-class\]/g, ("className=\'component-" + this.componentName.toLowerCase() + "\'" ))
        cssResult =cssTemplate.replace (/\[comp\]/g, this.componentName.toLowerCase())
      }  else {
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
      if (!fs.existsSync(dir)){
        console.log("Directory does not exist: " + dir)
        fs.mkdirSync(dir);
      }else {
        console.log("Directory exists: " + dir)
      }

      //create component file in proper directory
      outputName = dir + this.componentName + '.js'
      fs.writeFile(outputName, result, 'utf8', function (err) {
        if (err) return console.log(err)
        console.log("New file created: ", outputName)
      });

      //create CSS file in proper directory
      if (this.cssFile==='y') {
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

//TODO-DONE:  add a flag for directory
//TODO-DONE:  add error checking if directory does not exist
//TODO-DONE: make it a shell script (run npm install -g) to remake
//TODO-DONE:  Add css flag to auto create CSS files
//TODO:  Add command to create nesting & import needed components.