/**
 * @fileoverview Teamcity report formatter plugin for gulp-eslint
 * @author Andre Ogle
 */

'use strict';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Escape special characters with the respective TeamCity escaping.
 * @param {string} str An error message to display in TeamCity.
 * @returns {string} An error message formatted for display in TeamCity
 */
function escapeTeamCityString(str) {
    if (!str) {
        return '';
    }

    return str.replace(/\|/g, '||')
      .replace(/\'/g, '|\'')
      .replace(/\n/g, '|n')
      .replace(/\r/g, '|r')
      .replace(/\u0085/g, '|x')
      .replace(/\u2028/g, '|l')
      .replace(/\u2029/g, '|p')
      .replace(/\[/g, '|[')
      .replace(/\]/g, '|]');
}

var reportName = 'ESLint Violations';

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function(results) {

    var output = '',
        summaryColor = 'yellow';

    output += '##teamcity[testSuiteStarted name=\'' + reportName + '\']\n';

    results.forEach(function (result) {
        var messages = result.messages;

        if (messages.length === 0) {
            return;
        }

        output += '##teamcity[testStarted name=\'' + reportName + ':' +
                   escapeTeamCityString(result.filePath) + '\']\n';

        var messageList = [];

        messages.forEach(function(message) {
          if (message.severity === 2) {
            messageList.push('line ' + message.line + ', col ' + message.column + ', ' + message.message);
          }
        });

        if (messageList.length) {
            output += '##teamcity[testFailed name=\'' + reportName +
              ': ' + escapeTeamCityString(result.filePath) + '\' message=\'' + escapeTeamCityString(messageList.join('\n')) + '\']\n';
        }

        output += '##teamcity[testFinished name=\'' + reportName + ': ' + escapeTeamCityString(result.filePath) + '\']\n';
    });

    output += '##teamcity[testSuiteFinished name=\'' + reportName + '\']\n';

    return output;
};


