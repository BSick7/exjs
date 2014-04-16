module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['src/**/*.ts', 'test/**/*.ts'],
                dest: 'arrayex.js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    declaration: true
                }
            }
        },
        qunit: {
            all: ['test/**/*.js']
        },
        watch: {
            files: '**/*.ts',
            tasks: ['typescript']
        }
    });

    grunt.registerTask('default', ['typescript']);
};