module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      src:    'src',
      assets: '<%= project.src %>/assets/',
      images: '<%= project.assets %>/images',
      markup: '<%= project.assets %>/**/*.html',
      styles: '<%= project.assets %>/styles',
      scripts: '<%= project.assets %>/scripts/**/*.js',
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
      }
    },    
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [ 'src/assets/scripts/*.js' ],
        dest: 'build/assets/js/main.js'
      }
    },   
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
      scripts: {
        files: [
          { expand: true, cwd: 'src/assets/scripts/vendor', src: '*.js', dest: 'build/assets/js/vendor' },
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
      files: ['Gruntfile.js', 'src/assets/scripts/*.js'],
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
        files: {
            'build/assets/css/main.css': 'src/assets/styles/main.scss'
          }
      }
    },
    watch: {
      sass: {
        files: 'src/assets/styles/*.scss',
        tasks: [ 'sass:dev', 'stylesheets' ]
      },
      scripts: {
        files: [ 'src/assets/scripts/*.js', 'Gruntfile.js' ],
        tasks: [ 'jshint' ]
      }      
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask(
    'stylesheets', 
    'Prefixes and minifies CSS',
    ['autoprefixer', 'cssmin']
  );
  grunt.registerTask( 
    'build',
    'Compiles all assets, copies files to build folder',
    [ 'clean:build', 'sass:dev', 'copy', 'stylesheets', 'concat' ]
  );
  grunt.registerTask(
    'default',
    'Watches the project for changes, builds them and runs a server',
    [ 'build', 'connect', 'watch' ]
    // [ 'build', 'watch' ]
  );
};