// Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*
         =====================================================================================================================================
         start of watch
         =====================================================================================================================================
         *
         */

        watch: {
            content: {
                files: ['_site/**/*.*'],
                tasks: ['newer:htmlmin'],
                options: {
                    livereload: false,
                    spawn: false
                }
            },
            images: {
                files: ['images-src/**/*.*'],
                tasks: ['newer:imagemin']
            }, // watch images added to src
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false,
                }
            },

            scripts: {
                files: ['js/libs/*.js', 'js/custom/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    livereload: true,
                    spawn: true,
                }
            },
        },

        /*
         =====================================================================================================================================
         end of watch
         =====================================================================================================================================
         *
         */

        sass: {
            dist: {
                options: {
                    require: 'compass'
                },

                files: {
                    'css/main.css': ['sass/*.scss', 'sass/partials/*.scss'],
                    '_site/css/main.css': ['sass/*.scss', 'sass/partials/*.scss']
                }
            }
        }, // sass

        imagemin: {
            dynamic: {
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'images-src/', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
                    dest: 'images/' // Destination path prefix
                }]
            }
        }, // imagemin

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 version, IE 9'
                    }), // add vendor prefixes. for more: https://github.com/ai/browserslist
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'css/main.css'
            }
        },

        concat: {
            dist: {
                src: ['js/libs/*.js', 'js/custom/*.js'],
                dest: 'js/build/production.js'
            }
        }, // concat

        uglify: {
            dist: {
                src: 'js/build/production.js',
                dest: 'js/production.min.js'
            }
        }, // uglify

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '_site/',
                src: ['**/*.html'],
                dest: '_site/'
            }
        }, // htmlmin

        browserSync: {
            dev: {
                bsFiles: {
                    src: ['_site/**/*.*']
                },
                options: {
                    proxy: "localhost:4000",
                    watchTask: true
                }
            }
        } //browserSync
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['browserSync', 'watch']);
};