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

//console.log(reactComponentEs5, typeof(reactComponentEs5))
/*  Create Options list from command lines */
program
  .version('0.0.1')
  .option('-c, --componentName [name]', 'Create Component Named [Layout]', 'layout')
  .option('-v, --JSVersion [version]', 'EMCAScript version [6]',  '6')
  .option('-f, --folder [folder]', 'Folder [./]',  './')
  .option('-s, --cssFile [cssFile]', 'Create CSS [No]', 'No')
  .parse(process.argv);

//if component flag set (also should be default)
if (program.componentName) {
  console.log('Creating React component: ')
  console.log('  - Component Name: %s ', program.componentName)
  console.log('  - EMCAScript Version: %s ', program.JSVersion)
  console.log('  - Folder: %s ', program.folder)
  console.log('  - CSS file created: %s ', program.cssFile)

  // Handle Version Flag "-v"
  //select EMCA version 6 as default or version 5 if flagged
  if (program.JSVersion==='6')
    template = reactComponentEs6
  else  template = reactComponentEs5

  //Create component file from template, replacing holder text with componentName
  //basic replacment regardless of CSS flag
  result = template.replace(/\[comp\]/g, program.componentName)

  //Handle CSS flag (-s)
  //Import CSS, create CSS from Template and add className to Div of component file
  if (program.cssFile==='y') {
    result = result.replace(/\[import-css-file\]/g, ("import \'.\/" + program.componentName + ".css\'" ))
    result = result.replace(/\[create-css-class\]/g, ("className=\'component-" + program.componentName.toLowerCase() + "\'" ))
    cssResult =cssTemplate.replace (/\[comp\]/g, program.componentName.toLowerCase())
  }  else {
    //remove CSS references from template
    //result = template.replace(/\[comp\]/g, program.componentName)
    result = result.replace(/\[import-css-file\]/g, '')
    result = result.replace(/\[create-css-class\]/g, '')
  }

  //Check for -f directory and create if doesn't exist
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }


  //build strings for directory and file outputs
  if (program.folder) {
    dir += program.folder + '/'
    cssFilename = dir + program.componentName + ".css"
  }

  outputName = dir + program.componentName + '.js'


  //create component file in proper directory
  fs.writeFile(outputName, result, 'utf8', function (err) {
    if (err) return console.log(err)
      console.log("New file created: ", outputName)
  });

  //create CSS file in proper directory
  if (program.cssFile==='y') {
    fs.writeFile(cssFilename, cssResult, 'utf8', function (err) {
      if (err) return console.log(err)
      console.log("New CSS file created: ", cssFilename)
    });
  }
}




//TODO-DONE:  add a flag for directory
//TODO-DONE:  add error checking if directory does not exist
//TODO-DONE: make it a shell script (run npm install -g) to remake
//TODO:  Add css flag to auto create CSS files