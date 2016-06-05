"use strict";

var CubeDemo = CubeDemo || {};

CubeDemo.GamepadControlComponent = function (gamepadStateReader) {

    function calculateVelocity(currentVelocity, rotation, gamepadState, speed) {
        if (!gamepadState.backward && !gamepadState.forward) {
            return currentVelocity;
        }

        var scaleBy = (gamepadState.forward) ? speed : -speed;
        let elevation = (rotation.x / 180) * Math.PI;
        let heading = (rotation.y / 180) * Math.PI;

        return {
            x: currentVelocity.x + (scaleBy * -Math.sin(heading) * Math.cos(elevation)),
            y: currentVelocity.y + (scaleBy * Math.sin(elevation)),
            z: currentVelocity.z + (scaleBy * -Math.cos(elevation) * Math.cos(heading))
        };
    }

    function calculateRotation(currentRotation, gamepadState, rotationSpeed) {
        var xRotation = currentRotation.x;
        var yRotation = currentRotation.y;
        var zRotation = currentRotation.z;

        if (gamepadState.left) {
            yRotation += rotationSpeed;
        } else if (gamepadState.right) {
            yRotation -= rotationSpeed;
        }

        if (gamepadState.up) {
            xRotation += rotationSpeed;
        } else if (gamepadState.down) {
            xRotation -= rotationSpeed;
        }

        return {
            x: xRotation,
            y: yRotation,
            z: zRotation
        };
    }

    return {
        schema: {
            speed: {type: 'number', default: 0},
            rotationSpeed: {type: 'number', default: 0}
        },

        tick: function () {
            var el = this.el;
            var gamepadState = gamepadStateReader.getState();
            var rotation = this.el.components['rotation'].data;
            var velocity = this.el.components['velocity'].data;
            var speed = this.data.speed;
            var rotationSpeed = this.data.rotationSpeed;

            var newRotation = calculateRotation(rotation, gamepadState, rotationSpeed);
            el.setAttribute('rotation', newRotation);

            var newVelocity = calculateVelocity(velocity, rotation, gamepadState, speed);
            el.setAttribute('velocity', newVelocity);

        }
    }
};