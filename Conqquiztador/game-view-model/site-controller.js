/// <reference path="../scripts/jquery-1.10.0.js" />
/// <reference path="../scripts/q.js" />
/// <reference path="question.js" />
/// <reference path="quiz-game.js" />

/// Game flow
/// 1. init player - choose nickname
/// 2. start game
/// . choose field to attack - 10 seconds countdown if not selected automatically is choosed
/// . get question - type ABC
/// . get player and computer answers
/// . if answers are same we have second battle with question of type 123
/// . select round winner and add points
/// . repeat 2. until all fields are taken

var a = (function ($) {
    var SiteController = Class.create({
        initialize: function () {
            this.field = new QuizGame.GameField();
            this.player = new QuizGame.Player;
            this.dummyPlayer = new QuizGame.DummyPlayer;
            this.renderer = new GameRenderer.Renderer();
            this.currentQuestion;
        },
        startGame: function () {
            var self = this;

            var getQuestionPromise = function () {
                var deferredQuestion = Q.defer();

                $.getJSON("model/bd-multiple-choice-questions.js", function (data) {
                    var questionsNumber = data.length;

                    var index = Math.floor((Math.random() * 100 + 1) % questionsNumber);
                    self.currentQuestion = QuestionParser.parseMultipleChoiceQuestion(data[index]);

                    // TODO: check if question is has been already shown
                    $("#current-question").html(self.currentQuestion.render());
                });
                setTimeout(function () {
                    deferredQuestion.resolve();
                }, 100);
                return deferredQuestion.promise;
            };

            var getPlayerAnswerPromise = function () {
                var deferred = Q.defer();
                var answer = "";

                $("#question_box td").on("click", function (ev) {
                    ev = $(ev.target);
                    answer = ev.attr("id");
                    ev.css("background-color", "rgba(133, 133, 133, 0.5)");
                    deferred.resolve(answer);
                });

                setTimeout(function () {
                    if (answer == "") {
                        var randomId = Math.floor((Math.random() * 10) % 4) + 1;
                        $("td#" + randomId).css("background-color", "rgba(133, 133, 133, 0.5)");
                        deferred.resolve(randomId);
                    }
                }, 1000); // Time to answer

                return deferred.promise;
            };
            var getAnswersPromise = function (answer) {
                var deferred = Q.defer();

                var dummyAnswer = self.dummyPlayer.getMultipleQuestionAnswer();
                var rightAnswer = self.currentQuestion.answer();
                setTimeout(function () {
                    $("td#" + dummyAnswer).css("background-color", "rgba(233, 33, 133, 0.5)");
                }, 1000);
                setTimeout(function () {
                    $("td#" + rightAnswer).css("background-color", "rgba(0, 255, 0, 0.5)");
                }, 1000);

                var answers = {
                    "player": answer,
                    "dummy": dummyAnswer,
                    "correct": rightAnswer
                };

                deferred.resolve(answers);

                return deferred.promise;
            }

            var getWinnerPromise = function (answers) {
                var deferred = Q.defer();

                //console.log(answers.player);
                //console.log(answers.dummy);
                //console.log(answers.correct);

                if (answers.player != answers.dummy) {
                    if (answers.player == answers.correct) {
                        deferred.resolve("player");
                    }
                    else {
                        if (answers.dummy == answers.correct) {
                            deferred.resolve("dummy");
                        }
                        else {
                            deferred.reject("rematch");
                        }
                    }
                }
                else {
                    deferred.reject("rematch");
                }
                return deferred.promise;
            };

            self.renderer.renderWelcome();
            self.renderer.renderSkeleton();

            $("#nickname-button").on("click", function () {
                nickname = document.getElementById("nickname").value;
                $("#welcome-screen").fadeOut(1000).promise()
                .then(function () {
                    $("#wrapper").fadeIn(1000)
                })
                .then(function () {
                    this.player = new QuizGame.Player(nickname);
                    this.dummyPlayer = new QuizGame.DummyPlayer();

                    $("#player").append(this.player.render());
                    $("#dummy-player").html(this.dummyPlayer.render());
                });
            });

            function showMessage(message) {
                //$("#flags-container").append("<p id='message'>" + message + "</p>");
                var message_box = $("#message");
                message_box.empty();
                message_box.append(message);
            };

            $("#stop-game-btn").click(function () {
                self.field.clearFlags();
                $("#current-question").hide();
                $("#start-game-btn").removeAttr("disabled");
            });

            $("#start-game-btn").on('click', function () {
                $("#start-game-btn").attr("disabled", "disabled");
                var flags = self.field.initializeFlags();
                self.renderer.renderFlags(flags);

                //$("#flags-container").append("<p id='message'></p>");
                var message = "Please, choise one of the blue flags";
                showMessage(message);

                $(".flag").on('click', function () {

                    var correcrAnswer = true; //TODO: This will recieve information if the the answer is correct or incorrect
                    var message = "Answer the question before continue.";
                    showMessage(message);

                    if (correcrAnswer) {
                        $(this).attr({
                            "src": "images/green_flag.png",
                            "alt": "Green flag"
                        });
                        message = "Answer is correct. Now choise again blue flag.";
                        showMessage(message);
                    } else {
                        $(this).attr("src", "images/red_flag.png");
                    }

                    getQuestionPromise()
                    .then(getPlayerAnswerPromise)
                    .then(getAnswersPromise)
                    .then(getWinnerPromise)
                    .then(function (winner) {
                        console.log(winner);
                    },
                          function (rematch) {
                              console.log(rematch);
                          }
                    );
                });
            });
        }
    });

    return {
        SiteController: SiteController
    }
}(jQuery));