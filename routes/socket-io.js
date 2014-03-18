module.exports = function (io, sessionData) {

    var presidents = require('../models/presidents');
    var team1Presidents = require('../models/team1Presidents');
    var team2Presidents = require('../models/team2Presidents');
    var autocomplete = require('../models/autocomplete');

    // Setup a route for the ready event, and add session data.
    io.sockets.on('connection', function (socket) {

        console.log("connection !!!");
        socket.on('ready', function (name) {
            console.log("ready !!!, name:", name);
            socket.set('name', name, function() {
                socket.emit('game-type', "game-type");
            });
        });

        socket.on('game-type', function(gameType) {
            console.log('game-type:', gameType);
            socket.set('game-type', gameType, function () {
                if (gameType === "team1-play") {
                    io.join("team1-play");
                    io.room(req.data).broadcast('announce', {
                      message: 'New client in the ' + gameType + ' room.'
                    });
                }
                if (gameType === "team2-play") {
                    io.join("team2-play");
                    io.room(req.data).broadcast('announce', {
                        message: 'New client in the ' + gameType + ' room.'
                    });
                }
                if (gameType === "all-play") {
                   console.log('join-game:all-play io.emit:', presidents.getPresidentialData());
                   socket.emit('update-presidents', presidents.getPresidentialData());
                   checkGameFinished(presidents); 
                }

                socket.get('name', function (err, name) {
                    socket.emit('session', { name:name, gameType:gameType });
                });
            });
        });

        // Send back the session data.
        socket.on('join-game', function () {
                console.log('join-game!!!');

            socket.get('game-type', function (err, gameType){
                console.log('game-type:', gameType);
                switch (gameType) {
                    case 'all-play':
                        console.log('join-game:all-play io.emit:', presidents.getPresidentialData());
                        socket.emit('update-presidents', presidents.getPresidentialData());
                        checkGameFinished(presidents);
                        break;
                    case 'team1-play':
                        console.log('join-game:team1-play io.emit:', team1Presidents.getPresidentialData());
                        socket.emit('update-presidents', team1Presidents.getPresidentialData());
                        checkGameFinished(team1Presidents);
                        break;
                    case 'team2-play':
                        console.log('join-game:team2-play io.emit:', team2Presidents.getPresidentialData());
                        socket.emit('update-presidents', team2Presidents.getPresidentialData());
                        checkGameFinished(team2Presidents);
                        break;

                    default:
                        console.log("!!!! UNKNOWN GAMETYPE !!!!", gameType);
                        break;
                }
            });
        });

        socket.on('update-president', function (data) {
            console.log('update-president:', data);
            socket.get('game-type', function (err, gameType){
                console.log('game-type:', gameType);
                switch (gameType) {
                    case 'all-play':
                        console.log('update-president:all-play io.emit:', presidents.getPresidentialData());
                        var updatedPresident = presidents.updatePresident(data);
                        if (updatedPresident) {
                            console.log('president was updated all-play', updatedPresident);
                            socket.broadcast.emit('update-president', [updatedPresident]);
                        } else {
                            console.log('president was not updated !!!');

                            // If another person already found the president then notify recipient
                            var president = presidents.getPresident(data);
                            if (president) {
                                socket.emit('president-allready-found', president);
                            }
                        }
                        checkGameFinished(presidents);

                        break;
                    case 'team1-play':
                        var updatedPresident = team1Presidents.updatePresident(req.data);
                        if (updatedPresident) {
                            console.log('president was updated team1-play', updatedPresident)
                            req.io.room('team1-play').broadcast('update-president', [updatedPresident]);
                        } else {
                            console.log('president was not updated !!!')

                            // If another person already found the president then notify recipient
                            var president = team1Presidents.getPresident(req.data);
                            if (president) {
                                req.io.emit('president-allready-found', president);
                            }
                        }

                        checkGameFinished(team1Presidents);

                        break;
                    case 'team2-play':
                        var updatedPresident = team2Presidents.updatePresident(req.data);
                        if (updatedPresident) {
                            console.log('president was updated team2-play', updatedPresident)
                            req.io.room('team2-play').broadcast('update-president', [updatedPresident]);
                        } else {
                            console.log('president was not updated !!!')

                            // If another person already found the president then notify recipient
                            var president = team2Presidents.getPresident(req.data);
                            if (president) {
                                req.io.emit('president-allready-found', president);
                            }
                        }

                        checkGameFinished(team2Presidents);
                        break;

                    default:
                        console.log("!!!! UNKNOWN GAMETYPE !!!!")
                        break;
                }
            });

        });


        socket.on('reset-all-play-game', function () {
            console.log ('reset-all-play-game from ' + req.session.name);
        presidents.reset();
        req.io.broadcast('reset-all-play-game');

        switch (req.session.gameType) {
            case 'all-play':
                presidents.reset();
                req.io.broadcast('reset-all-play-game');
                break;
            case 'team1-play':
                team1Presidents.reset();
                req.io.room('team1-play').broadcast('reset-all-play-game');
                break;
            case 'team2-play':
                team2Presidents.reset();
                req.io.room('team2-play').broadcast('reset-all-play-game');
                break;

            default:
                console.log("!!!! UNKNOWN GAMETYPE !!!!")
                break;
        }

    });

        socket.on('auto-complete-guess', function (guess) {
        console.log('auto-complete-guess', guess);
        var presidentPrefix = guess.toLowerCase();
        var guesses = autocomplete.trie.retrieve(presidentPrefix);
        console.log('auto-complete-answer', guesses);
        io.emit('auto-complete-answer', guesses );
    });


    });

    function checkGameFinished(inPresidents) {
        if (inPresidents.gameFinished()) {
            console.log('GameFinished !!!');
            console.log("!!! gameTime:" + inPresidents.getElapsedGameTime());
            app.io.broadcast('game-finished', inPresidents.getElapsedGameTime());
        }
    }


    
    

    

};
