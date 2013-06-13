﻿/// <reference path="../scripts/jquery-1.10.0.js" />
/// <reference path="../scripts/prototype.js" />
/// 
var QuizGame = (function ($) {

    var DUMMY_PLAYER_NAMES = ["Shrek", "Fionna", "Donald", "Bugs", "Spongebob"];
    var CHOICES_ROWS_COUNT = 2;
    var MULTIPLE_CHOICE_CLASS = "multiple-question";
    var SHORT_ANSWER_CLASS = "short-question";
    var SHORT_ANSWER_ID = "sq-answer";
    var SHORT_ANSWER_SUBMIT_ID = "sq-submit";

    var StartGame = Class.create({
        initialize: function () {

        },
        startNewGame: function () {
            $("#mouse_pointer").empty();
            for (var i = 0; i < 10; i++) {
                var fieldItem = $("<img>").attr({
                    id: "flag" + i,
                    class: 'flags',
                    src: 'images/blue_flag.png',
                    alt: 'Blue Flag'
                });
                $("#mouse_pointer").append(fieldItem);
            }

            for (var i = 0; i < 10; i++) {
                var redItem = $("<img>").attr({
                    id: "red_flag" + i,
                    class: 'flags',
                    src: 'images/red_flag.png',
                    alt: 'Red Flag',
                });
                redItem.hide();
                $("#mouse_pointer").append(redItem);
            }
        },
        stopGame: function () {
            $("#mouse_pointer").empty();
            //$("#question_box").empty();
        }
    });

    var Player = Class.create({
        initialize: function (name) {
            this._name = name;
            this._points = 0;
            this._flags = [];
        },
        addFlag: function (flag) {
            this._flags.push(flag);
        },
        getName: function () {
            return this._name;
        },
        getPoints: function () {
            return this._points;
        },
        render: function () {
            var container = $("<div></div>");
            var playerId = $("<div class='player_id'></div>");
            playerId.append("<div class='name'>" + this._name + "</div>")
            playerId.append("<div class='points'>" + this._points + "</div>")
            container.append(playerId);

            if (this._flags.length !== 0) {
                var flagsContainer = $("<p class='player_flags'></p>");

                for (var i = 0, len = this._flags.length; i < len; i += 1) {
                    flagsContainer.append("<span>" + this._flags[i] + "; </span>");
                    // TODO: change after flags implementation
                }

                container.append(flagsContainer);
            }

            return container;
        }
    });

    var DummyPlayer = Class.create(Player, {
        initialize: function ($super) {
            var nameIndex = Math.floor((Math.random() * 10 + 1) % DUMMY_PLAYER_NAMES.length);
            $super(DUMMY_PLAYER_NAMES[nameIndex]);
        },
        getMultipleQuestionAnswer: function () {
            var answer = Math.floor((Math.random() * 10 + 1) % 4);
            return answer + 1;
        },
        getShortQuestionAnswer: function (question) {
            var downLimit = question._downLimit;
            var upLimit = question._upLimit;
            var answer = Math.floor(Math.random() * (upLimit - downLimit + 1)) + downLimit;

            return answer;
        }
    });

    var Question = Class.create({
        initialize: function (task, answer) {
            this.task = task;
            this._answer = answer;
        },
        checkAnswer: function (inputAnswer) {
            if (inputAnswer === this._answer) {
                return true;
            }

            return false;
        }
    });

    var MultipleChoiceQuestion = Class.create(Question, {
        initialize: function ($super, task, answer, choices) {
            $super(task, answer);
            this._choices = choices;
        },
        render: function () {
            var container = $("<table class=" + MULTIPLE_CHOICE_CLASS + "'></table>");

            var task = "<tr><th colspan ='2'>" + this.task + "</td></tr>";
            container.append(task);


            for (var i = 1, counter = 1; i <= CHOICES_ROWS_COUNT; i += 1, counter += 2) {
                var row = $("<tr></tr>");

                var firstCell = $("<td></td>");
                firstCell.attr("id", counter);
                firstCell.append(counter + ". " + this._choices[counter - 1]);

                var secondCell = $("<td></td>");
                secondCell.attr("id", counter + 1);
                secondCell.append(counter + 1 + ". " + this._choices[counter]);

                row.append(firstCell, secondCell);

                container.append(row);
            }

            return container;
        }
    });

    var ShortAnswerQuestion = Class.create(Question, {
        initialize: function ($super, task, answer, downLimit, upLimit) {
            $super(task, answer);
            this._upLimit = upLimit;
            this._downLimit = downLimit;
        },
        render: function () {
            var container = $("<div class='" + SHORT_ANSWER_CLASS + "'></div>");
            var task = "<p>" + this.task + "</p>";

            var form = $("<form></form>");
            var input = "<input type='text' id='" + SHORT_ANSWER_ID + "' /><br />";
            var submit = "<input type='button' id='" + SHORT_ANSWER_SUBMIT_ID + "' value='Submit Answer' />";
            form.append(input, submit);

            container.append(task, form);

            return container;
        }
    });

    return {
        MultipleChoiceQuestion: MultipleChoiceQuestion,
        ShortAnswerQuestion: ShortAnswerQuestion,
        Player: Player,
        DummyPlayer: DummyPlayer
    }
}(jQuery));