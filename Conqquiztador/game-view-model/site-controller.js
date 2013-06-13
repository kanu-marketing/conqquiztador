/// <reference path="../scripts/jquery-1.10.0.js" />
/// <reference path="../scripts/q.js" />
/// <reference path="question.js" />

/// Game flow
/// 1. init player - choose nickname
/// 2. start game
/// . choose field to attack - 10 seconds countdown if not selected automatically is choosed
/// . get question - type ABC
/// . get player and computer answers
/// . if answers are same we have second battle with question of type 123
/// . select round winner and add points
/// . repeat 2. until all fields are taken

    
//(function () {
$(document).ready(function() {
    
    //window.addEventListener('load', function () {
    'use strict';

    console.log("site controller");
    var gameRenderer = new Renderer();
    var gameStarter = new StartGame();
    gameRenderer.renderWelcome();

    $("#new_game").on('click', function () {
        gameStarter = gameStarter.startNewGame();

        $(".flags").on('click', function () {
            $("#" + this.id).hide();
            $("#red_" + this.id).show();

            $.getJSON("model/bd-multiple-choice-questions.js", function (data) {
                var questionsNumber = data.length;

                var index = Math.floor((Math.random() * 100 + 1) % questionsNumber);
                var question = QuestionParser.parseMultipleChoiceQuestion(data[index]);

                // TODO: check if question is has been already shown
                $("#mc-question-container").html(question.render());
            });
        });

        $("#stop_game").click(function () {
            gameStarter = new StartGame()
            gameStarter.stopGame();
        });
    });

    var player;
    /// 1. init player - choose nickname
    var nickname = "";
    $("#nickname-button").on("click", function () {
        nickname = document.getElementById("nickname").value;
        $("#welcome-screen").fadeOut(1000).promise()
        .then(function () {
            $("#wrapper").fadeIn(1000)
        })
        .then(function () {
            player = new Player(nickname);
            var dummyPlayer = new DummyPlayer();

            $("#player").append(player.render("player_child"));
            $("#dummy_player").html(dummyPlayer.render("dummy_child"));
        });
    });

    console.log("asd");
    console.log(player.name);
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
}(jQuery));