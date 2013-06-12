/// <reference path="../scripts/jquery-1.10.0.js" />
/// <reference path="../scripts/q.js" />
/// <reference path="question.js" />

/// Game flow
/// 1. start game (init player - choose nickname)
/// 2. choose field to attack - 10 seconds countdown if not selected automatically is choosed
/// 3. get question - type ABC
/// 4. get player and computer answers
/// 5. if answers are same we have second battle with question of type 123
/// 6. select round winner and add points
/// 7. repeat 2. until all fields are taken


$(document).ready(function () {

    var startGamePromise = function () {

    };

    var chooseFieldPromise = function () {
        var deferredChoise = Q.defer();
        deferredChoise.resolve(GameField.choose());// choose should return game filed (ev.target)
        return deferredChoise.promise;
    };

    var getQuestionPromise = function (questionType) {
        var deferredQuestion = Q.defer();
        deferredQuestion.resolve(Question.getQuestion(questionType));
        return deferredQuestion.promise;
    };

    var getUserAnswerPromise = function () {
        var deferredUserAnswer = Q.defer();
        deferredUserAnswer.resolve(HumanPlayer.getAnswer());
        return deferredUserAnswer.promise;
    };

    var getPCAnswerPromise = function () {
        var deferredUserAnswer = Q.defer();
        deferredUserAnswer.resolve(HumanPlayer.getAnswer());
        return deferredUserAnswer.promise;
    };

    var displayQuestionPromise = function (question) {
        var deferredDisplay = Q.defer();
        if(!question){
            deferredDisplay.reject("No available question");
        }
        deferredDisplay.resolve(Renderer.displayQuestion(question));
        return deferredDisplay.promise;
    }

    startGamePromise()
    .than(chooseFieldPromise, function (error) {
        console.log(error.message)
    })
    .than(getQuestionPromise(typeABC))
    .than(displayQuestionPromise)
    .than(getUserAnswerPromise)
    .than(getPCAnswerPromise)
    .than(getRightAnswer)
    .than(getRoundWinnder, function () {
        getQuestionPromise(type123)
        .than(getUserAnswerPromise)
        .than(getPCAnswerPromise)
        .than(getRightAnswer)
        .than(getRoundWinnder)
    })
    .than(getRoundWinner);
});