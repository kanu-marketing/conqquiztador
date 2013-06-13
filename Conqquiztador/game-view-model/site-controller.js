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
            var nickname = "";

            var getQuestionPromise = function () {
                var deferredQuestion = Q.defer();
                
                $.getJSON("model/bd-multiple-choice-questions.js", function (data) {
                    var questionsNumber = data.length;

                    var index = Math.floor((Math.random() * 100 + 1) % questionsNumber);
                    self.currentQuestion = QuestionParser.parseMultipleChoiceQuestion(data[index]);

                    // TODO: check if question is has been already shown
                    $("#mc-question-container").html(self.currentQuestion.render());
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
                    console.log("IN event handling");
                    ev = $(ev.target);
                    answer = ev.attr("id");
                    ev.css("background-color", "rgba(133, 133, 133, 0.5");
                    deferred.resolve(answer);
                });

                return deferred.promise;
            };
            //this.renderer.renderWelcome();

            //$("#nickname-button").on("click", function () {
            //    nickname = document.getElementById("nickname").value;
            //    $("#welcome-screen").fadeOut(1000).promise()
            //    .then(function () {
            //        $("#wrapper").fadeIn(1000)
            //    })
            //    .then(function () {
            //        this.player = new QuizGame.Player(nickname);
            //        this.dummyPlayer = new QuizGame.DummyPlayer();

            //        $("#player").append(this.player.render("player_child"));
            //        $("#dummy_player").html(this.dummyPlayer.render("dummy_child"));
            //    });
            //});

            $("#new_game").on('click', function () {
                self.field.startNewGame();

                $(".flags").on('click', function () {
                    $("#" + this.id).hide();
                    $("#red_" + this.id).show();
                    getQuestionPromise()
                    .then(getPlayerAnswerPromise)
                    .then(function (answer) {
                        console.log(answer);
                        var dummyAnswer = self.dummyPlayer.getMultipleQuestionAnswer();
                        return dummyAnswer;
                    })
                    .then(function (dummyAnswer) {
                        //console.log(dummyAnswer);
                    });
                });

                $("#stop_game").click(function () {
                    gameStarter = new StartGame()
                    gameStarter.stopGame();
                });
            });
        }

    });

    return {
        SiteController: SiteController
    }
}(jQuery));
//(function () {
//$(document).ready(function () {

//    //window.addEventListener('load', function () {
//    'use strict';
//    var player;
//    var dummyPlayer;
//    var field;
//    var siteControler = new a.SiteController(field, player, dummyPlayer);

//    siteControler.startGame();


//console.log("asd");
//console.log(player.name);
//var startGamePromise = function () {
//};
//var chooseFieldPromise = function () {
//    var deferredChoise = Q.defer();
//    deferredChoise.resolve(GameField.choose());// choose should return game filed (ev.target)
//    return deferredChoise.promise;
//};
//var getQuestionPromise = function (questionType) {
//    var deferredQuestion = Q.defer();
//    deferredQuestion.resolve(Question.getQuestion(questionType));
//    return deferredQuestion.promise;
//};
//var getUserAnswerPromise = function () {
//    var deferredUserAnswer = Q.defer();
//    deferredUserAnswer.resolve(HumanPlayer.getAnswer());
//    return deferredUserAnswer.promise;
//};
//var getPCAnswerPromise = function () {
//    var deferredUserAnswer = Q.defer();
//    deferredUserAnswer.resolve(HumanPlayer.getAnswer());
//    return deferredUserAnswer.promise;
//};
//var displayQuestionPromise = function (question) {
//    var deferredDisplay = Q.defer();
//    if(!question){
//        deferredDisplay.reject("No available question");
//    }
//    deferredDisplay.resolve(Renderer.displayQuestion(question));
//    return deferredDisplay.promise;
//}
//startGamePromise()
//.than(chooseFieldPromise, function (error) {
//    console.log(error.message)
//})
//.than(getQuestionPromise(typeABC))
//.than(displayQuestionPromise)
//.than(getUserAnswerPromise)
//.than(getPCAnswerPromise)
//.than(getRightAnswer)
//.than(getRoundWinnder, function () {
//    getQuestionPromise(type123)
//    .than(getUserAnswerPromise)
//    .than(getPCAnswerPromise)
//    .than(getRightAnswer)
//    .than(getRoundWinnder)
//})
//.than(getRoundWinner);
//}(jQuery));