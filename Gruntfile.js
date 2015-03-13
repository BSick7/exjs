var version = require('./build/version'),
    setup = require('./build/setup');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    var dirs = {
        test: {
            root: 'test',
            build: 'test/.build',
            lib: 'test/lib'
        }
    };

    grunt.initConfig({
        dirs: dirs,
        pkg: grunt.file.readJSON('./package.json'),
        clean: {
            bower: ['./lib'],
            test: [dirs.test.lib]
        },
        setup: {
            base: {
                cwd: '.'
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            test: {
                files: [
                    {src: './dist', dest: dirs.test.lib + '/exjs/dist'},
                    {src: './src', dest: dirs.test.lib + '/exjs/src'},
                    {src: './lib/qunit', dest: dirs.test.lib + '/qunit'}
                ]
            }
        },
        typescript: {
            build: {
                src: ['src/polyfill/**/*.ts', 'src/**/*.ts'],
                dest: 'dist/ex.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: [
                    'typings/**/*.d.ts',
                    'dist/ex.d.ts',
                    '<%= dirs.test.root %>/**/*.ts',
                    '!<%= dirs.test.root %>/lib/**/*.ts'
                ],
                dest: dirs.test.build,
                options: {
                    target: 'es5',
                    basePath: dirs.test.root,
                    sourceMap: true
                }
            }
        },
        qunit: {
            all: ['test/**/*.html']
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/ex.min.js.map',
                    sourceMapIn: 'dist/ex.js.map'
                },
                files: {
                    'dist/ex.min.js': ['dist/ex.js']
                }
            }
        },
        watch: {
            files: '**/*.ts',
            tasks: ['typescript:build']
        },
        version: {
            bump: {},
            apply: {
                src: './build/_VersionTemplate._ts',
                dest: './src/_Version.ts'
            }
        }
    });

    grunt.registerTask('default', ['typescript:build']);
    grunt.registerTask('test', ['typescript:build', 'typescript:test', 'qunit']);
    setup(grunt);
    version(grunt);
    grunt.registerTask('lib:reset', ['clean', 'setup', 'symlink:test']);
    grunt.registerTask('dist:nobump', ['version:apply', 'typescript:build', 'uglify:dist']);
    grunt.registerTask('dist:upbuild', ['version:bump', 'version:apply', 'typescript:build', 'uglify:dist']);
    grunt.registerTask('dist:upminor', ['version:bump:minor', 'version:apply', 'typescript:build', 'uglify:dist']);
    grunt.registerTask('dist:upmajor', ['version:bump:major', 'version:apply', 'typescript:build', 'uglify:dist']);
};