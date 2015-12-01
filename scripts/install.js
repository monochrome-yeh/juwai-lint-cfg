(function() {
    'use strict';

    var console    = require( 'console' );
    var fs         = require( 'fs' );
    var module     = require( 'module' );
    var process    = require( 'process' );

    var modulePath = process.cwd();
    var files      = [
        '.csslintrc',
        '.editorconfig',
        '.jscsrc',
        '.jshintrc'
    ];

    // Open the standard input and ask a question.
    process.stdin.resume();
    process.stdout.write( 'What is the name of the folder where the repository lives?\n' );

    // When some answer is provided, try to copy the files.
    process.stdin.once( 'data', function( dest ) {
        var destPath, destIndex;

        // Make sure to have a clean user input.
        // Check if the string exists in the current path.
        dest = dest.toString().trim();
        destIndex = modulePath.indexOf( dest );

        if ( destIndex !== -1 ) {
            destPath = modulePath.slice( 0, destIndex + dest.length + 1 );
            copyFiles( destPath );
        } else {
            process.stdout.write(
                'The folder “' + dest + '” doesn’t seem to exist in this ' +
                'module’s path (' + modulePath + '), try again?\n'
            );
        }

        process.exit();
    });

    /**
     * Copy files to a specific folder.
     *
     * @param  {string} dest - Folder to copy the files to.
     */
    function copyFiles( dest ) {
        files.forEach(function( file, index ) {
            console.log( 'Copying ' + file + ' to ' + dest + file + '…' );

            // http://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js
            fs.createReadStream( file ).pipe( fs.createWriteStream( dest + file ) );
        });
    }
})();
