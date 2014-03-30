"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    "app/css/main.css": "app/less/main.less"
                }
            }
        },
        connect: {
            options: {
                livereload: 35729,
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            devserver: {
                options: {
                    base: ['app']
                }
            }
        },
        watch: {
            devserver: {
                options: {
                    livereload: true
                },
                files: ['app/**/*.html', 'app/**/*.js', 'app/less/*.less', '!app/components/**/*', '!app/config.js'],
                tasks: ['less:development', 'build']
            }
        },
        ngconstant: {
            development: [{
                dest: 'app/config.js',
                name: 'config',
                constants: {
                    version: grunt.file.readJSON('package.json').version,
                    config: grunt.file.readJSON('config/development.json')
                }
            }],

            production: [{
                dest: 'app/config.js',
                name: 'config',
                constants: {
                    config: {
                        version: grunt.file.readJSON('package.json').version,
                        config: grunt.file.readJSON('config/production.json')
                    }
                }
            }]
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                background: true
            },
            //continuous integration mode: run tests once in PhantomJS browser.
            continuous: {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },

        clean: {
            dist: {
                src: ['dist']
            },
            temp: {
                src: ['dist/temp']
            }

        },

        processhtml: {
            dist: {
                files: {
                    'dist/prod/index.html': ['app/index.html']
                }
            }
        },

        concat: {
            js: {
                src: [
                    //include libs
                    'app/components/angular/angular.js',
                    'app/components/jquery/jquery.min.js',
                    'app/components/bootstrap-css/js/bootstrap.js',
                    'app/components/underscore/underscore-min.js',
                    'app/components/momentjs/min/moment.min.js',
                    'app/app.js',

                    //own classes and files
                    'app/js/**/*.js',
                    '!app/js/**/*Spec.js',
                    'app/config.js'
                ],
                // the location of the resulting JS file
                dest: 'dist/temp/app.js'
            },
            css: {
                src: [
                    'app/components/bootstrap-css/css/bootstrap.css',
                    'app/css/main.css'
                ],
                dest: 'dist/temp/main.css'
            }
        },

        copy: {
            fonts: {
                cwd: 'app/components/bootstrap-css/fonts',
                src: [
                    'glyphicons-halflings-regular.eot',
                    'glyphicons-halflings-regular.svg',
                    'glyphicons-halflings-regular.ttf',
                    'glyphicons-halflings-regular.woff'
                ],
                dest: 'dist/prod/fonts',
                expand: true
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            build: {
                src: 'dist/temp/app.js',
                dest: 'dist/prod/js/app.min.js'
            }
        },

        cssmin: {
            css:{
                src: 'dist/temp/main.css',
                dest: 'dist/prod/css/main.min.css'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('server', ['ngconstant:development', 'connect:devserver', 'watch:devserver']);

    grunt.registerTask('build',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'clean:dist', 'ngconstant:development', 'copy:fonts', 'concat', 'processhtml', 'uglify', 'cssmin', 'clean:temp' ]
    );


    // For now this somewhat ugly grunt task is needed to run with coffeescript
    grunt.registerTask("spec-e2e", "run specs in ci mode", function(target) {
        var done;
        require('coffee-script');
        process.argv = ["doesnt", "matter", "" + (process.cwd()) + "/test/protractor.conf.js"];
        done = this.async();
        return require("" + (process.cwd()) + "/node_modules/protractor/lib/cli");
    });

}
