module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'app/', src: ['**'], dest: 'bak/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    var DEFAULT_PORT = "8080";
    var DEFAULT_APP_NAME = "app";
    var DEFAULT_BASE_URL = "http://localhost" + ":" + DEFAULT_PORT;

    // A very basic default task.
    grunt.registerTask('default', 'Configure app', function() {
        var port = grunt.option('port') || DEFAULT_PORT;
        var appName = grunt.option('app-name') || DEFAULT_APP_NAME;
        var baseUrl = grunt.option('base-url') || DEFAULT_BASE_URL;

        grunt.log.write('Set port to  > ' + port + "...").ok();
        grunt.log.write('Set app name > ' + appName + "...").ok();
        grunt.log.write('Set base url > ' + baseUrl + "...").ok();

        var configFile = grunt.file.read('app/scripts/config.js');

        var baseUrlRegex = /baseUrl: '(.*)',/;
        var baseUrlMatches = baseUrlRegex.exec(configFile);
        configFile = configFile.replace(baseUrlMatches[1], baseUrl);

        var portRegex = /port: '(.*)',/;
        var portMatches = portRegex.exec(configFile);
        configFile = configFile.replace(portMatches[1], port);

        //did this differently because the default appName 'app', when used as a search replacement, ends up matching the 'app' in appConfig
        //possibly a word boundary regex would be a better fix
        var appNameRegex = /appName: '(.*)'/;
        configFile = configFile.replace(appNameRegex, "appName: '" + appName + "'");

        grunt.log.write("Applying changes to config file...").ok();
        grunt.file.write("app/scripts/config.js", configFile);
        grunt.log.write("Config file updated...").ok();

        if (appName !== DEFAULT_APP_NAME) {
            grunt.log.write("Copying " + DEFAULT_APP_NAME + " to " + appName + "...").ok();
            var c = grunt.config.get('copy');
            c.main.files[0].dest = appName + "/"
            grunt.config.set('copy', c);
            grunt.task.run('copy');
            grunt.log.write("Copying complete...").ok();
        }

    });

    // A very basic default task.
    grunt.registerTask('help', 'Display usage.', function() {
        grunt.log.write('======================================================================\n\n');
        grunt.log.write('Welcome to this project\'s config setup!!\n\n');
        grunt.log.write('Here you may pass some command line arguments that will affect how the \n');
        grunt.log.write('project is configured. Current options are:\n\n');
        grunt.log.write('--port=8080\n\n');
        grunt.log.write('    Replace 8080 with your preferred port.  This port is what node.js \n');
        grunt.log.write('    will use while it is running.  Default is 8080.\n\n');
        grunt.log.write('--app-name=columbo\n\n');
        grunt.log.write('    App name is the name of the directory that contains the project\'s \n');
        grunt.log.write('    code (js, css, etc).  App name will display in the URL after       \n');
        grunt.log.write('    http://domain:port/ and identifies your project to users.\n');
        grunt.log.write('    So using the \'columbo\' example your URL would be the following: \n');
        grunt.log.write('    http://domain:port/columbo.  Default is \'app\'.\n\n');
        grunt.log.write('--base-url=https://domain-name:port\n\n');
        grunt.log.write('    Some of the services in the project need to refer to the app\'s \n');
        grunt.log.write('    URL for ajax requests.  Example: https://www.somewhere.net \n');
        grunt.log.write('    The default base url will be http://localhost:8080 \n');
        grunt.log.write('\n======================================================================\n');
    });

};