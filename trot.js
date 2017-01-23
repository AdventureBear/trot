#!/usr/bin/env node

/* Command Line Parser */
const program = require('commander')
const fs = require('fs')
const readline = require('readline')
const reactComponentEs5 = require('./templates/reactComponentES5')
const reactComponentEs6 = require('./templates/reactComponentES6')
const cssTemplate = require('./templates/cssTemplate')

let  template =""

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

  //build strings for directory and file outputs
  var dir = './' + program.folder + '/'
  var outputName = dir + program.componentName + '.js'

  //Create component file from template, replacing holder text with componentName
  //Handle CSS flag (-s)
  if (program.cssFile==='y') {
    //add CSS Import line replacing holder text with "component-componentName"
    result = result.replace(/\[import-css-file\]/g, ("import \'.\/" + program.componentName + ".css\'" ))
    //add className to main render div
    result = result.replace(/\[create-css-class\]/g, ("className=\'component-" + program.componentName.toLowerCase() + "\'" ))

    //create CSS file from template
    var cssResult =cssTemplate.replace (/\[comp\]/g, program.componentName.toLowerCase())
    var cssFilename = dir + program.componentName + ".css"
  }  else {
    //remove CSS references from template
    var result = template.replace(/\[comp\]/g, program.componentName)
    var result = result.replace(/\[import-css-file\]/g, '')
    var result = result.replace(/\[create-css-class\]/g, '')
  }

  //Check for -f directory and create if doesn't exist
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

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