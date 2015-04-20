# gulp-eslint-teamcity-formatter

> A small [gulp-eslint](https://github.com/adametry/gulp-eslint) formatter plugin.
ESLint violations are output nicely in the
[TeamCity](https://www.jetbrains.com/teamcity/) build error format.

## Installation

[Use npm](https://docs.npmjs.com/cli/install).

```sh
npm install gulp-eslint-teamcity-formatter --save-dev
```

## Usage

```javascript
var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    teamcityReporter = require('gulp-eslint-teamcity-formatter');

gulp.task('lint', function () {
    return gulp.src(['js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format(teamcityReporter))
        .pipe(eslint.failAfterError());
});
```
See the [gulp-eslint](https://github.com/adametry/gulp-eslint#usage) docs for
more info on setting up gulp-eslint.

## Screenshot

![Example TeamCity Output](http://github.com/andreogle/gulp-eslint-teamcity-formatter/raw/example.jpg?raw=true "Example Output")

## Issues

I will try keep this project up to date, but please log any issues
[here](https://github.com/andreogle/gulp-eslint-teamcity-formatter/issues)
