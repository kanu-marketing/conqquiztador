﻿/// <reference path="../scripts/jquery-1.10.0.js" />
/// <reference path="../scripts/prototype.js" />
/// <reference path="../scripts/q.js" />

var GameRenderer = (function ($) {
    var CONTAINER_CLASS = "container";
    var BODY = "body";
    var WELCOME_ID = "welcome-screen";
    var NICKNAME_ID = "nickname";
    var NICKNAME_BUTTON_ID = "nickname-button";
    var WRAPPER_ID = "wrapper";
    var FIELD_ID = "game-field";
    var QUESTION_BOX_ID = "question-box";
    var MESSAGE_BOX_ID = "message";
    var QEUSTION_LABEL_ID = "question-label"
    var CURRENT_QUESTION_ID = "current-question";
    var PLAYER_ID = "player"
    var DUMMY_PLAYER_ID = "dummy-player";
    var START_ID = "start-game-btn";
    var STOP_ID = "stop-game-btn";
    var HELP_ID = "help-btn";

    var Renderer = Class.create({
        renderWelcome: function () {
            var container = $("<div id='" + WELCOME_ID + "' class='" + CONTAINER_CLASS + "'></div>");
            container.append("<h1>Welcome To BananaQuiz Game!</h1>");

            var form = $("<form></form>");
            var inputs = "<label for=" + NICKNAME_ID + ">Please enter your nickname:</label>" +
                         "<br />" +
                         "<input type='text' id=" + NICKNAME_ID + " />" +
                         "<input type='button' id=" + NICKNAME_BUTTON_ID + " value='Play!' />";
            form.append(inputs);

            container.append(form);

            $(BODY).append(container);
        },
        renderSkeleton: function () {
            var wrapper = $("<div id=" + WRAPPER_ID + "></div>");
            wrapper.css("display", "none");

            var gameField = renderGameField();
            wrapper.append(gameField);

            var messageBox = renderMessageBox();
            wrapper.append(messageBox);

            var questionBox = renderQuestionBox();
            wrapper.append(questionBox);

            var playerBox = renderPlayerBox(PLAYER_ID);
            wrapper.append(playerBox);

            var dummyPlayerBox = renderPlayerBox(DUMMY_PLAYER_ID);
            wrapper.append(dummyPlayerBox);

            $(BODY).append(wrapper);
        }, renderFlags: function (flags) {
            if (!flags) {
                throw "Invalid input flags DOM object! It cannot be null!";
            }

            if (!(flags instanceof jQuery)) {
                throw "The input is not a valid jQuery DOM object!"
            }

            $("#" + FIELD_ID).append(flags);
        }
    });

    function renderGameField() {
        var container = $("<div id=" + FIELD_ID + "></div>")
        //container.addClass(CONTAINER_CLASS);

        var navigation = renderNavigation();
        container.append(navigation);

        return container;
    }

    function renderNavigation() {
        var container = $("<div></div>");
        container.append("<button id=" + START_ID + ">Start Game</button>");
        container.append("<button id=" + STOP_ID + ">Stop Game</button>");
        container.append("<button id=" + HELP_ID + ">Help</button>");

        return container;
    }

    function renderMessageBox() {
        var container = $("<div id=" + MESSAGE_BOX_ID + "></div>");
        container.addClass(CONTAINER_CLASS);

        return container;
    }

    function renderQuestionBox() {
        var container = $("<div id=" + QUESTION_BOX_ID + "></div>");
        container.addClass(CONTAINER_CLASS);

        var label = "<div id=" + QEUSTION_LABEL_ID + ">Question</div>";
        container.append(label);

        var currentQuestionContainer = "<div id=" + CURRENT_QUESTION_ID + "></div>";
        container.append(currentQuestionContainer);

        return container;
    }

    function renderPlayerBox(id) {
        var container = $("<div id=" + id + "></div>");
        container.addClass(CONTAINER_CLASS);

        return container;
    }

    return {
        Renderer: Renderer
    }
}(jQuery));

