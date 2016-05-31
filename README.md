A-Frame Cube
============

A small JavaScript app for figuring out the basics of A-Frame.

This demo consists of a cube composed of a numbered sphere at each vertex and a labelled cube in the centre of each face.

The cube faces are labelled:
* F front
* B back
* U up
* D down
* L left
* r right

The vertices are numbered as follows:

	    4-------7
       /|      /|
      5-+-----6 |
      | |     | |   y
      | 0-----+-3   |
      |/      |/    |
      1-------2     0--x
	               /
				  z

The camera is placed in the centre of the cube, looking into the screen direction vector (0,0,-1) - which corresponds to rotation (0, 0, 0) in aframe.

The user can move the camera using a Gamepad.

### Screenshot

!(https://github.com/wjsrobertson/aframe-cube/blob/master/img/screenshot.png)

### License

Apache License Version 2.0
