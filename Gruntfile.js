module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        nuget: grunt.file.readJSON('./nuget.json'),
        pkg: grunt.file.readJSON('./package.json'),
        typescript: {
            build: {
                src: ['src/**/*.ts'],
                dest: 'dist/ex.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: ['test/**/*.ts'],
                options: {
                    target: 'es5',
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
        shell: {
            package: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'powershell ./package.ps1 <%= pkg.version %>'
            },
            publish: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'nuget push "./nuget/exjs.<%= pkg.version %>.nupkg" <%= nuget.apiKey %>'
            }
        }
    });

    grunt.registerTask('default', ['typescript:build', 'uglify:dist']);
    grunt.registerTask('test', ['typescript:build', 'uglify:dist', 'typescript:test', 'qunit']);
    grunt.registerTask('package', ['shell:package']);
    grunt.registerTask('publish', ['shell:package', 'shell:publish']);
};