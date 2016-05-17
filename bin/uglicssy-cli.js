#!/usr/bin/env node

'use strict';

const colors = require('colors/safe');
const program = require('commander');
const fs = require('fs');
const Uglicssy = require('uglicssy');

let uglicssy;

function convert(srcFile) {
  fs.stat(srcFile, (err, stat) => {
    if (err) {
      throw err;
    }

    if (stat.isDirectory()) {
      fs.readdir(srcFile, (err, files) => {
        if (err) {
          throw err;
        }
        
        const slash = srcFile.substr(-1) === '/' ? '' : '/';

        files.forEach((file) => convert(srcFile + slash + file));
      });
    } else if (stat.isFile() && srcFile.indexOf('.uglicssy') === -1) {
      fs.readFile(srcFile, (err, data) => {
        if (err) {
          console.error(`${colors.red('Uglicssy')} -> An error occurred while reading the input file: ${err}`);
        } else {
          const fileParts = srcFile.split('.');
          let fileType;
          let output;
          let dstFile;

          if (fileParts.length < 2) {
            console.error(`${colors.red('Uglicssy')} -> Could not determine file type of ${srcFile}`);
          } else {
            fileType = fileParts.splice(-1)[0];
            output = uglicssy.convert(data.toString(), fileType, false);
            dstFile = `${fileParts.join('.')}.uglicssy.${fileType}`;

            fs.writeFile(dstFile, output, (err) => {
              if (err) {
                throw err;
              }

              console.log(`${colors.green('Uglicssy')} -> converted file ${colors.blue(srcFile)} to ${colors.blue(dstFile)}`);
            });
          }
        }
      });
    }
  });
}

program
  .usage('[options] <input_file...>')
  .option('-v, --verbose', 'verbose mode')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
} else {
  uglicssy = new Uglicssy({
    verbose: program.verbose
  });

  convert(program.args[0]);
  uglicssy.save();
}