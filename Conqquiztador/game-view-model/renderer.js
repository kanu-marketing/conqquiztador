﻿/// <reference path="../scripts/jquery-1.10.0.js" />
/// <reference path="../scripts/prototype.js" />
/// <reference path="../scripts/q.js" />

(function ($) {
    this.Renderer = Class.create({
        initialize: function () {

        },
        renderWelcome: function () {
            var container = $("<div id='welcome-screen' class='container'></div>");
            container.append("<h1>Welcome To BananaQuiz Game!</h1>");

            var form = $("<form></form>");
            var inputs = "<label for='nickname'>Please enter your nickname:</label>" +
                         "<br />" +
                         "<input type='text' id='nickname' />" +
                         "<input type='button' id='nickname-button' value='Play!' />";
            form.append(inputs);

            container.append(form);

            $("body").append(container);
        }
    });

    return {
        Renderer: Renderer
    }
}(jQuery));