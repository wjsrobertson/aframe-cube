"use strict";

var CubeDemo = CubeDemo || {};

CubeDemo.GamepadStateReader = function () {

    var axisThreshold = 0.3;

    var buttons = {
        left: [14],
        right: [15],
        up: [12],
        down: [13],
        accelerate: [0, 2, 6, 7],
        newGame: [9]
    };

    var axes = {
        horizontal: [0],
        vertical: [1]
    };

    function getGamepad() {
        if (navigator.getGamepads && navigator.getGamepads().length && navigator.getGamepads()[0]) {
            return navigator.getGamepads()[0];
        } else {
            return null;
        }
    }

    function isButtonPressed(buttonIds) {
        var gamepad = getGamepad();
        return buttonIds.some(function (buttonId) {
            return gamepad && gamepad.buttons[buttonId] && gamepad.buttons[buttonId].pressed;
        });
    }

    function isAxisNegative(axisIds) {
        var gamepad = getGamepad();
        return axisIds.some(function (axisId) {
            return gamepad && gamepad.axes[axisId] < -axisThreshold;
        });
    }


    function isAxisPositive(axisIds) {
        var gamepad = getGamepad();
        return axisIds.some(function (axisId) {
            return gamepad && gamepad.axes[axisId] > axisThreshold;
        });
    }

    function emptyState() {
        return {
            left: false,
            right: false,
            up: false,
            down: false,
            accelerate: false,
            newGame: false
        };
    }

    function getCurrentGamepadState() {
        var state = emptyState();

        if (isButtonPressed(buttons.left) || isAxisNegative(axes.horizontal)) {
            state.left = true;
        } else if (isButtonPressed(buttons.right) || isAxisPositive(axes.horizontal)) {
            state.right = true;
        }

        if (isButtonPressed(buttons.up) || isAxisNegative(axes.vertical)) {
            state.up = true;
        } else if (isButtonPressed(buttons.down) || isAxisPositive(axes.vertical)) {
            state.down = true;
        }

        if (isButtonPressed(buttons.accelerate)) {
            state.accelerate = true;
        }

        if (isButtonPressed(buttons.newGame)) {
            state.newGame = true;
        }

        return state;
    }

    return {
        getState: function () {
            return getGamepad() ? getCurrentGamepadState() : emptyState();
        }
    }
};