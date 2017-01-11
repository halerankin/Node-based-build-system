module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      source:       'src',
      assets:       '<%= project.source %>/assets',
      images:       '<%= project.assets %>/images',
      markup:       '<%= project.source %>/html',
      styles:       '<%= project.assets %>/styles',
      scripts:      '<%= project.assets %>/scripts',
      vendor:       '<%= project.scripts %>/vendor',

      build:        'build',
      buildAssets:  '<%= project.build %>/assets',
      buildImages:  '<%= project.buildAssets %>/images',
      buildStyles:  '<%= project.buildAssets %>/css',
      buildScripts: '<%= project.buildAssets %>/js',
      buildVendor:  '<%= project.buildScripts %>/vendor',
    },
    autoprefixer: {
      build: {
        expand: true,
        cwd: '<%= project.build %>',
        src: [ '**/*.css' ],
        dest: '<%= project.build %>'
      }
    },
    clean: {
      build: {
        src: [ '<%= project.build %>' ]
      }
    },    
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [ '<%= project.scripts %>/*.js' ],
        dest: '<%= project.buildScripts %>/main.js'
      }
    },   
    connect: {
      server: {
        options: {
          port: 3333,
          base: '<%= project.build %>',
          hostname: 'localhost'
        }
      }
    },
    copy: {
      scripts: {
        files: [
          { expand: true, cwd: '<%= project.vendor %>', src: '*.js', dest: '<%= project.buildVendor %>' },
        ]
      },
      html: {
        files: [
          { expand: true, cwd: '<%= project.source %>', src: '*.html', dest: '<%= project.build %>' },
          { expand: true, flatten: true, cwd: '<%= project.markup %>', src: '*.html', dest: '<%= project.build %>' }
        ]
      },
      images: {
        files: [
          { expand: true, cwd: '<%= project.images %>', src: '*.*', dest: '<%= project.buildImages %>' }
        ]
      }
    }, 
    cssmin: {
      build: {
        files: {
          '<%= project.buildStyles %>/main.css': [ '<%= project.build %>/**/*.css' ]  
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', '<%= project.scripts %>/*.js'],
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
        options: {
          sourcemap: 'none'
        },
        files: {
            '<%= project.buildStyles %>/main.css': 'src/assets/styles/main.scss' 
          }
      }
    },
    watch: {
      sass: {
        files: '<%= project.styles %>/*.scss',
        tasks: [ 'sass:dev', 'stylesheets' ]
      },
      scripts: {
        files: [ '<%= project.scripts %>/*.js', 'Gruntfile.js' ],
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
    '<%= project.scripts %> Compiles all assets, copies files to build folder',
    [ 'clean:build', 'sass:dev', 'copy', 'stylesheets', 'concat' ]
  );
  grunt.registerTask(
    'default',
    'Watches the project for changes, builds them and runs a server',
    [ 'build', 'connect', 'watch' ]
  );
};