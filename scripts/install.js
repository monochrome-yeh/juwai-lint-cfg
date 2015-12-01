/* globals require */
(function() {
    'use strict';

    var Promise = require( 'bluebird' );
    var console = require( 'console' );
    var fs      = require( 'fs' );
    var process = require( 'process' );

    var modulePath = process.cwd();
    var files     = [
        '.csslintrc',
        '.editorconfig',
        '.jscsrc',
        '.jshintrc'
    ];

    // Open the standard input and ask a question.
    process.stdin.resume();
    process.stdout.write(
        'What is the name of the folder where the repository lives?\n'
    );

    // When some answer is provided, try to copy the files.
    process.stdin.once( 'data', function( dest ) {
        var destPath, destIndex;

        // Make sure to have a clean user input.
        // Check if the string exists in the current path.
        dest = '/' + dest.toString().trim() + '/';
        destIndex = modulePath.indexOf( dest );

        if ( destIndex !== -1 ) {
            destPath = modulePath.slice( 0, destIndex + dest.length );
            process.stdout.write(
                'I found ' + destPath + '. I will copy the files now…\n'
            );

            // Exit current process only once all files are copied.
            copyFiles( destPath ).then(function() {
                console.log( 'All the files were copied successfully.' );
                process.exit();
            });
        } else {
            process.stdout.write(
                'The folder “' + dest + '” doesn’t seem to exist in this ' +
                'module’s path (' + modulePath + '), try again?\n'
            );

            process.exit();
        }
    });

    /**
     * Copy files to a specific folder.
     * This function uses promises to deal with latency between read and write operations.
     * Not doing so will lead to the creation of empty files.
     *
     * @see  http://bluebirdjs.com/docs/api-reference.html
     * @param  {string} dest - Folder to copy the files to.
     */
    function copyFiles( dest ) {
        return Promise.all(
            files.map(function( file, index ) {
                var readFileAsync  = Promise.promisify( fs.readFile );
                var writeFileAsync = Promise.promisify( fs.writeFile );
                var fileRead       = readFileAsync( file );

                return fileRead.then( function( fileContent ) {
                    console.log( 'Copying ' + file + ' to ' + dest + file + '…' );

                    return writeFileAsync( dest + file, fileContent );
                });
            })
        );
    }
})();
