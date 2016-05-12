#!/usr/bin/env node

'use strict';

const program = require('commander');
const fs = require('fs');
const Uglicssy = require('uglicssy');

const uglicssy = new Uglicssy();

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

        files.forEach((file) => convert(srcFile + file));
      });
    } else if (stat.isFile() && srcFile.indexOf('.uglicssy') === -1) {
      fs.readFile(srcFile, (err, data) => {
        if (err) {
          console.error(`An error occurred while reading the input file: ${err}`);
        } else {
          const fileParts = srcFile.split('.');
          let fileType;
          let output;
          let dstFile;

          if (fileParts.length < 2) {
            console.error(`Could not determine file type of ${srcFile}`);
          } else {
            fileType = fileParts.splice(-1)[0];
            output = uglicssy.convert(data.toString(), fileType);
            dstFile = `${fileParts.join('.')}.uglicssy.${fileType}`;

            fs.writeFile(dstFile, output, (err) => {
              if (err) {
                throw err;
              }

              console.log(`Uglicssy: ${srcFile} -> ${dstFile}`);
            });
          }
        }
      });
    }
  });
}

program
  .usage('[options] <input_file...>')
  .parse(process.argv);

if (program.args.length === 0) {
  program.help();
} else {
  convert(program.args[0]);
}