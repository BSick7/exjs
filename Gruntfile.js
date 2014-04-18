module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            build: {
                src: ['src/**/*.ts'],
                dest: 'dist/arrayex.js',
                options: {
                    target: 'es5',
                    declaration: true
                }
            },
            test: {
                src: ['test/**/*.ts'],
                dest: 'dist/arrayex.js',
                options: {
                    target: 'es5',
                    declaration: true
                }
            }
        },
        qunit: {
            all: ['test/**/*.html']
        },
        watch: {
            files: '**/*.ts',
            tasks: ['typescript:build']
        }
    });

    grunt.registerTask('default', ['typescript:build']);
    grunt.registerTask('test', ['typescript:build', 'typescript:test', 'qunit']);
};