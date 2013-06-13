﻿/// <reference path="../scripts/jquery-1.10.0.js" />
/// <reference path="../scripts/prototype.js" />
(function ($) {
    var DUMMY_PLAYER_NAMES = ["Shrek", "Fionna", "Donald", "Bugs", "Spongebob"];

    this.Player = Class.create({
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


    this.DummyPlayer = Class.create(Player, {
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


    return {
        Player: Player,
        DummyPlayer: DummyPlayer
    }
}(jQuery));