UserInputHandler = function (model) {

    var increment = 0.5;

    return {
        left: function () {
            model.camera.rotation.y += increment;
        },
        right: function () {
            model.camera.rotation.y -= increment;
        },
        up: function () {
            model.camera.rotation.x += increment;
        },
        down: function () {
            model.camera.rotation.x -= increment;
        },
        accelerate: function () {
            let elevation = (model.camera.rotation.x / 180) * Math.PI;
            let heading = (model.camera.rotation.y / 180) * Math.PI;

            var v = {
                x: -Math.sin(heading) * Math.cos(elevation),
                y: Math.sin(elevation),
                z: -Math.cos(elevation) * Math.cos(heading)
            };

            model.camera.velocity.x += v.x * 0.0001;
            model.camera.velocity.y += v.y * 0.0001;
            model.camera.velocity.z += v.z * 0.0001;
        },
        newGame: function () {
            model.camera.velocity.x = 0;
            model.camera.velocity.y = 0;
            model.camera.velocity.z = 0;

            model.camera.position = {
                x: 0.5,
                y: 0.5,
                z: 0.5
            };

            model.camera.rotation = {
                x: 0,
                y: 0,
                z: 0
            };
        }
    };

};