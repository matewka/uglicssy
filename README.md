# uglicssy
##### NPM package for minifying CSS *class names*.
  This package minifies CSS, JS and HTML code but **most of all** it also minifies CSS class names.

---
#### Installation
```bash
npm i uglicssy --save-dev
```

#### Usage
+ **CLI** 

  ```bash
  $ uglicssy [options] <input_file...>
  ```

  Convert a single file. The converted code will be saved as a new file with the _uglicssy_ suffix.
  ```bash
  $ uglicssy styles.css
  ```
  
  Convert a directory. All files will be converted recursively.
  ```bash
  $ uglicssy src
  ```
  
  ##### options
  You can use the following bash style options:

  option | shortcut | description
  ------ | -------- | -----------
  --verbose | -v | verbose mode
  
+ **Script**

  You can load the `Uglicssy` class as a module:
  
  ```javascript
  const Uglicssy = require('uglicssy');
  ```
  
  It is an `ES6` class with the following methods:
  
  + `public static bundle() : Uglicssy`
  
    This is a static method which returns a new instance of `Uglicssy` class. Keep reference to that instance in order to process multiple files in the runtime.
  
  + `public convert(inputString : String, fileType : String[, save : Boolean]) : String`
  
    This is the main method for converting the code.
    + **inputString** is a string with CSS, HTML or JS code
    + **fileType** must be one of the following strings:
      + css
      + html
      + js
    + **save** (default: `true`) boolean value indicating whether the modified classes array should be immediately saved (see the `save` method below).
    
  + `public save() : undefined`
    
    This method saves the current classes array _synchronously_ to the output file specified in the _.uglicssyrc_. If the file is not specified, the method performs _noop_.
    It is useful if you want to convert multiple files in a runtime without modifying the classes file in each iteration.
  
  ---
  ##### A full example

  In order to use Uglicssy inside your script, first you need to get its new instance (bundle) which will store all class names (and their minified versions) encountered during converting.
  
  ```javascript
  const Uglicssy = require('uglicssy');
  const cssString = '.foo .bar { display: block; } ...';
  
  const bundle = Uglicssy.bundle();
  const convertedString = bundle.convert(cssString, 'css');
  ```
  
#### What about JS?

By default, uglicssy converts CSS and HTML code but it does very little when it comes to JavaScript. It **doesn't try to guess** which string literals might be class names. If you want *uglicssy* to treat a certain string literal as a CSS class name (or CSS selector) you have to preced it with a comment:
  
```javascript
const stringLiteral = 'This is a literal. It will not be treated as a CSS class';

//uglicssy
const className = 'foo'; //uglicssy will treat `foo` as a CSS class name

//uglicssy
const cssSelector = '.foo .bar > p'; //uglicssy will treat `foo` and `bar` as a CSS class names
```
  
#### Configuration (.uglicssyrc)

```javascript
{
  "outputFile": "uglicssy.json",
  "presets": ["uglicssy-preset-angular", "uglicssy-preset-jquery"]
}
```

You can add a configuration file `.uglicssyrc` to your project's root folder. It must be a `JSON` file and it accepts the following options:
+ **outputFile**

  File path where you want the class names and other metadata to be saved. It is useful when you want to convert multiple files but are unable to do it in a single runtime.
+ **presets**
  
  Thanks to presets, you can add new rules to *uglicssy*. For example, a `uglicssy-preset-angular` preset can parse `ng-class` attributes and convert classes contained there.
  
  To use a preset, first you need to install it. Names of presets in the config file are the names of their NPM packages, e.g. to install `uglicssy-preset-angular` you need to
  
  ```bash
  npm i uglicssy-preset-angular --save-dev
  ```
+ **verbose**
  
  When this option is set to `true` every class conversion will be described in the console.