# Lint configuration files

These are files used across our projects to lint our files.

## Install

1. Make sure [node.js](https://nodejs.org/en/download/) is installed in your environment.
1. `cd` to the root of your project’s repository.
1. Run `$ npm install juwai/juwai-lint-cfg --save-dev` to install the module from
    git and save it to the configuration of the project.
1. Files should be now copied to the root of your repository, ready to lint your code!

## Usage

These files are used by Travis-CI when opening a Pull Request, and you can also use them in your editor.

### Sublime-Text

You can install the following plugins to have live linting in Sublime–Text:

- SublimeLinter: https://packagecontrol.io/packages/SublimeLinter
- CSS coding standards and pitfalls:
    - .stylelintrc: https://packagecontrol.io/packages/SublimeLinter-contrib-stylelint
    - .csslintrc: https://packagecontrol.io/packages/SublimeLinter-csslint (**deprecated**)
- General code standards (indentation, etc.):
    - .editorconfig: https://packagecontrol.io/packages/EditorConfig
    - Highlights TODO, FIXME, etc.: https://packagecontrol.io/packages/SublimeLinter-annotations
- JavaScript:
    - .jscsrc (coding standards): https://packagecontrol.io/packages/SublimeLinter-jscs
    - .jshintrc (common errors): https://packagecontrol.io/packages/SublimeLinter-jshint
