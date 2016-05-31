let model = GameModel;
let userInputHandler = UserInputHandler(model);
let gamepadHandler = GamepadHandler(userInputHandler);

function init() {
	updateView();
}

function updateModel() {
    gamepadHandler.tick();
    updatePosition();
}

function updatePosition() {
    model.camera.position.x += model.camera.velocity.x;
    model.camera.position.y += model.camera.velocity.y;
    model.camera.position.z += model.camera.velocity.z;
}

function updateAframe() {
    let camera = document.querySelector('#camera');
    if (camera) {
        camera.setAttribute('position', model.camera.position);
        camera.setAttribute('rotation', model.camera.rotation);
    }
}

function updateView() {
	updateModel();
	updateAframe();

	requestAnimationFrame(updateView);
}


updateView();