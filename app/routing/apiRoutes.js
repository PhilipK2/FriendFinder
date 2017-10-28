var path = require('path');
var friends = require('../data/friends.js');


module.exports = function(app) {

    // Total list of friend entries
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    // Add new friend entry
    app.post('/api/friends', function(req, res) {
        // Capture the user input object
        var userData = req.body;
        console.log('userInput = ' + JSON.stringify(userData));

        var userResponses = userData.scores;
        console.log('userResponses = ' + userResponses);

        // Compute best friend match
        var matchName = '';
        var matchImage = '';
        var totalDifference = 100;

        // Examine all existing friends in the list
        for (var i = 0; i < friends.length; i++) {
            // Compute differenes for each question
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }
            console.log('diff = ' + diff);
            // If lowest difference, record the friend match
            if (diff < totalDifference) {
                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        friends.push(userData);

        // Send appropriate response
        res.json({ status: 'OK', matchName: matchName, matchImage: matchImage });
    });
};