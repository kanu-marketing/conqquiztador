﻿var QuestionParser = (function () {

    function parseShortAnswerQuestion(json) {

        var saQuestion = new QuizGame.ShortAnswerQuestion(json.task, json.answer, json.downLimit, json.upLimit);
        return saQuestion;
    }

    function parseMultipleChoiceQuestion(json) {

        var answers = [json.a, json.b, json.c, json.d];
        var mcQuestion = new QuizGame.MultipleChoiceQuestion(json.task, json.answer, answers);
        return mcQuestion;
    }

    return {
        parseShortAnswerQuestion: parseShortAnswerQuestion,
        parseMultipleChoiceQuestion: parseMultipleChoiceQuestion
    }
}());