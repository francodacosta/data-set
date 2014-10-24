module.exports = (grunt) ->
  grunt.initConfig
    meta:
        banner: '
/*!\n
 * DataSet | Powerfull dataset for your app\n
 * http://francodacosta.com/data-set/\n
 *\n
 * Copyright 2013-2014, Nuno Costa <nuno@francodacosta.com>\n
 * Released under the MIT license\n
 * https://github.com/francodacosta/data-set/blob/master/LICENSE\n
 *\n
 */'

    bump:
        options:
            files: ['package.json'],
            updateConfigs: [],
            commit: true,
            commitMessage: 'Release v%VERSION%',
            commitFiles: ['package.json'],
            createTag: true,
            tagName: 'v%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: false,
            pushTo: 'upstream',
            gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
            globalReplace: false

    uglify:
        options:
            mangle:
                except: ['jQuery', '$']

        dist:
            files:
                'dist/data-set-complete.min.js' : ['dist/data-set-complete.js']
                'dist/data-set.min.js' : ['dist/data-set.js']
                'dist/filters.min.js'  : ['dist/filters.js']
                'dist/loaders.min.js'  : ['dist/loaders.js']

    # cssmin:
    #     combine:
    #         files:
    #             'dist/CaptionerJs.min.css': ['dist/CaptionerJs.css']

    usebanner:
        dist:
            options:
                position: 'top',
                banner: '<%= meta.banner %>'
            files:
                src: [ 'dist/*.js', 'dist/*.css' ]


    coffee:
        dist:
            options:
                join: true
                bare: true
            files:
                'dist/data-set-complete.js': [ 'src/**/*.coffee']
                'dist/data-set.js': [ 'src/*.coffee' ]
                'dist/filters.js': [ 'src/Filters/*.coffee' ]
                'dist/loaders.js': [ 'src/Loaders/*.coffee' ]
        tests:
            options:
                join: true
                bare: true
            files:
                './tests/runner/data-set-complete.js': [ 'src/**/*.coffee' ]
                './tests/runner/specs.js': [ 'tests/specs/**/*.coffee' ]



    watch:
      files: 'js/*.coffee'
      tasks: [ 'tests' ]




    jasmine_node:
        options:
            forceExit: true,
            match: '.',
            matchall: false,
            extensions: 'js',
            specNameMatcher: 'Spec',
            jUnit:
                report: true,
                savePath : "./src/test/reports/jasmine/",
                useDotNotation: true,
                consolidate: true
        all: ['./src/test/']


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-jasmine-node'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-banner'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask 'default', ['coffee:dist']
  grunt.registerTask 'dist', ['default', 'uglify','usebanner']
  grunt.registerTask 'tests', ['coffee:tests']
