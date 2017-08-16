# Node-based web development build system
This is a Node/Grunt build system. Developers can modify contents in the `src` folder, run grunt processes to either build or watch their files, and see output in the build destination folder served via a static server. Ideal for prototyping UI development and packing it up for serving. 

## Dev dependencies
Each dependency listed links to relevant documentation.
- [Node/npm](https://docs.npmjs.com/getting-started/installing-node)
- [Grunt](http://gruntjs.com/getting-started)
- [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
- [Sass](http://sass-lang.com/install)

## Key components
### npm modules
- grunt-autoprefixer
- grunt-contrib-clean
- grunt-contrib-connect
- grunt-contrib-copy
- grunt-contrib-cssmin
- grunt-contrib-jshint
- grunt-contrib-sass
- grunt-contrib-watch

### SASS
- Basic structure for SASS files established
- Using Sass 3.4.23
- Mix-in for breakpoints already added

### HTML5
Basic page structure provided:
- head, referencing stylesheet and JS
- nav, containing skip-links
- header, containing navigation
- main content, containing hero and primary content
- footer

### JS (in progress)
- Empty app and utility files provided.
- Custom Modernizr library provided.

## Installation instructions
- Clone git repo.
- Install dev dependencies.
- At root of project, where `package.json` resides, type: `npm install` to install project node modules.

## Dev/Build instructions
Run default grunt task: `grunt` to launch **build**, **connect** and **watch** processes. For more for details on each specific npm task, please examine `Gruntfile.js`. Brief descriptions provided below:

**build**
- Clean the build destination folder (if already present) at project root.
- Compile SASS files into a singular CSS file.
- Copy images, HTML files and JS vendor files to the build destination.
- Autoprefix CSS properties and minify CSS file located in the build destination folder.
- Concatenate application JS files into a singular JS file and add to build destination.

**connect**
- Run a local static http server, serving the build destination files.

**watch**
- Watch SASS files for changes, then compile to CSS.
- Watch JS files for changes, evaluate via JSHint and output any necessary error messages.
