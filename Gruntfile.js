module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      src:    'src',
      assets: '<%= project.src %>/assets/',
      images: '<%= project.assets %>/images',
      markup: '<%= project.assets %>/**/*.html',
      styles: '<%= project.assets %>/styles',
      // sass: [ '<%= project.assets %>/styles/*.scss' ],
      // js:   [ '<%= project.assets %>/scripts/**/*.js' ]
      js:   [ '<%= project.assets %>/scripts/**/*.js' ],
      build:  'build'

    },
    autoprefixer: {
      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.css' ],
        dest: 'build'
      }
    },
    clean: {
      build: {
        src: [ 'build' ]
      },
      stylesheets: {
        src: [ 'build/assets/css/*.css', '!build/assets/css/main.css' ]
      },
      scripts: {
        src: [ 'build/assets/scripts/*.js', '!build/assets/scripts/main.js' ]
      }
    },    
    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     src: [ 'src/**/*.js' ],
    //     dest: 'build/<%= pkg.name %>.js'
    //   }
    // },   
    connect: {
      server: {
        options: {
          port: 3333,
          base: 'build',
          hostname: 'localhost'
        }
      }
    },
    copy: {
      styles: {
        files: [
          { expand: true, flatten: true, cwd: 'src/assets/styles', src: '*.css', dest: 'build/assets/css' },
        ]
      },
      scripts: {
        files: [
          { expand: true, cwd: 'src/assets/scripts', src: '*.js', dest: 'build/assets/js' },
        ]
      },
      html: {
        files: [
          { expand: true, flatten: true, cwd: 'src/html', src: '*.html', dest: 'build' },
          { expand: true, cwd: 'src/', src: 'index.html', dest: 'build' }
        ]
      }
    }, 
    cssmin: {
      build: {
        files: {
          'build/assets/css/main.css': [ 'build/**/*.css' ]  
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        undef: true,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },    
    sass: {
      dev: {
        files: [
          {
            expand: true,
            cwd: '<%= project.styles %>',
            src: '<%= project.styles %>/_main.scss',
            dest: 'css',
            ext: '.css'
            // 'src/assets/styles/main.css': 'src/assets/styles/_main.scss',
            // '<%= project.styles %>/main.css': '<%= project.styles %>/_main.scss'
          }
        ]        
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= project.styles %>',
            src: '<%= project.styles %>/_main.scss',
            dest: 'css',
            ext: '.css'
            // 'src/assets/styles/main.css': 'src/assets/styles/_main.scss',
            // '<%= project.styles %>/main.css': '<%= project.styles %>/_main.scss'
          }
        ]   
        // files: {
          // 'src/assets/styles/main.css': 'src/assets/styles/_main.scss',
          // 'main.css': '_main.scss'
        // }
      }
    },
    watch: {
      css: {
        files: '<%= project.styles %>/*.scss',
        tasks: [ 'sass:dev' ]
      },
      scripts: {
        files: [ '<%= project.js %>' ],
        tasks: [ 'jshint' ]
      }      
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask(
    'stylesheets', 
    'Prefixes and minifies CSS',
    // ['autoprefixer', 'cssmin', 'clean:stylesheets']
    ['autoprefixer']
  );
  grunt.registerTask(
    'scripts',
    'Compiles JS files',
    [ 'clean:scripts' ]
  );

  grunt.registerTask(
    'build',
    'Compiles all assets, copies files to build folder',
    // [ 'clean:build', 'sass', 'copy', 'stylesheets', 'scripts']
    [ 'clean:build', 'sass:dev', 'copy', 'stylesheets' ]
  );
  grunt.registerTask(
    'default',
    'Watches the project for changes, builds them and runs a server',
    // [ 'build', 'connect', 'watch' ]
    [ 'build', 'watch' ]
  );
};