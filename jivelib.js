'use strict';

var q = require('q');
var request = require('request');
var qs = require('querystring');

var config = require('./config');


var auth = {
    'user': config.username,
    'pass': config.password
};

function getActivity(afterDate) {

    var defer = q.defer();

    var params = {
        fields: 'content'
    };
    if (afterDate) {
        params.after = afterDate;
    }

    var url = config.jiveUrl + '/api/core/v3/activities?' + qs.stringify(params);

    request.get({url: url, auth: auth}, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var escaped = body.replace(/^throw [^;]*;/, '');
            defer.resolve(JSON.parse(escaped));
            return;
        }
        defer.reject(response.statusCode + ' ' + error);
    });

    return defer.promise;
};

function typeOfContent(content) {

    if (/.*<\/a> liked <a.*/.test(content)) {
        return 'LIKE';
    }

    if (/.*<\/a> joined <a.*/.test(content)) {
        return 'JOIN';
    }

    if (/.*<\/a> created <a.*/.test(content)) {
        return 'CREATE';
    }

    if (/.*<\/a> replied to <a.*/.test(content)) {
        return 'REPLY';
    }

    if (/.*<\/a> modified <a.*/.test(content)) {
        return 'MODIFY';
    }

    if (/.*<\/a> commented on <a.*/.test(content)) {
        return 'COMMENT';
    }

    if (/.*<\/a> created $/.test(content)) {
        return 'ACCOUNT';
    }

    return 'UNKNOWN';
};

var lastActivityDate = null;

exports.getLastActivity = function () {

    return getActivity(lastActivityDate).then(function (result) {

        if (result.list.length) {

            var activity = result.list[0];

            lastActivityDate = activity.updated || activity.published;

            return typeOfContent(activity.content);

        } else {
            return 'NOTHING';
        }
    }, function (error) {
        console.log('error ' + error);
        return error;
    });
};


