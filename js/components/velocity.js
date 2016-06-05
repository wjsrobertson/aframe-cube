AFRAME.registerComponent('velocity', {
    schema: {
        type: 'vec3',
        default: {x: 0, y: 0, z: 0}
    },

    tick: function () {
        var object3D = this.el.object3D;
        var data = this.data;
        var position = object3D.position;

        object3D.position.set(position.x + data.x, position.y + data.y, position.z + data.z);
    }
});