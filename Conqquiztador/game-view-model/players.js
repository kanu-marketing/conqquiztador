/// <reference path="../scripts/jquery-1.10.0.js" />
/// <reference path="../scripts/prototype.js" />

(function ($) {
    var DUMMY_PLAYER_NAMES = ["Shrek", "Fionna", "Donald", "Bugs", "Spongebob"];
    this.Player = Class.create({
        initialize: function (name) {
            this.name = name;
            this.points = 0;
            this.flags = [];
        },
        addFlag: function (flag) {
            this.flags.push(flag);
        },
        render: function () {
            var container = $("<div></div>");
            var playerId = $("<div class='player_id'></div>");
            playerId.append("<div class='name'>" + this.name + "</div>")
            playerId.append("<div class='points'>" + this.points + "</div>")
            container.append(playerId);

            if (this.flags.length !== 0) {
                var flagsContainer = $("<p class='player_flags'></p>");
               
                for (var i = 0, len = this.flags.length; i < len; i += 1) {
                    flagsContainer.append("<span>" + this.flags[i] + "; </span>");
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
        getShortQuestionAnswer: function (downLimit, upLimit) {
            var answer = 0;
            return answer;
        }
    });


    return {
        Player: Player,
        DummyPlayer: DummyPlayer
    }
}(jQuery));