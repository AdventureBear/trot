#!/usr/bin/env node

/* Command Line Parser */
const program = require('commander')
const fs = require('fs')
const readline = require('readline')
const reactComponentEs5 = require('./templates/reactComponentES5')
const reactComponentEs6 = require('./templates/reactComponentES6')

let  template =""

//console.log(reactComponentEs5, typeof(reactComponentEs5))
/*  Create Options list from command lines */
program
  .version('0.0.1')
  .option('-c, --componentName [name]', 'Create Component Named [Layout]', 'layout')
  .option('-v, --JSVersion [version]', 'EMCAScript version [6]',  '6')
  .option('-f, --folder [folder]', 'Folder [./]',  './')
  .parse(process.argv);

//if component flag set (also should be default)
if (program.componentName) {
  console.log('Creating React component: ')
  console.log('  - Component Name: %s ', program.componentName)
  console.log('  - EMCAScript Version: %s ', program.JSVersion)
  console.log('  - Folder: %s ', program.folder)


//open template file
//  templateDir = './templates/'
//  if (program.JSVersion==='6')
//   templateFileName = templateDir + 'reactComponentES6.txt'
//  else templateFileName = templateDir + reactComponentEs5
  //choose template


  if (program.JSVersion==='6')
    template = reactComponentEs6
  else  template = reactComponentEs5
  // console.log(template)

  var result = template.replace(/\[comp\]/g, program.componentName);

  var dir = './' + program.folder + '/'
  var outputName = dir + program.componentName + '.js'

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.writeFile(outputName, result, 'utf8', function (err) {
    if (err) return console.log(err)
      console.log("New file created: ", outputName)
  });




  //
  //fs.readFile(templateFileName, 'utf8', function (err,data) {
  //  if (err) {
  //    return console.log(err);
  //  }
  //  var result = data.replace(/\[comp\]/g, program.componentName);
  //
  //  var dir = './' + program.folder + '/'
  //  var outputName = dir + program.componentName + '.js'
  //
  //  if (!fs.existsSync(dir)){
  //    fs.mkdirSync(dir);
  //  }
  //
  //  fs.writeFile(outputName, result, 'utf8', function (err) {
  //    if (err) return console.log(err)
  //    console.log("New file created: ", outputName)
  //  });
  //});


}




//TODO-DONE:  add a flag for directory
//TODO-DONE:  add error checking if directory does not exist
//TODO: make it a shell script