# FlappyPhant

A simple copy of the popular game FlappyBird implemented with JavaScript in combination with the HTML5 Canvas element.

## How the Code works

We have three classes:

* Game - meta object for the game
* Bird - class for the elephant
* Pipe - class for the pipes

### General 

Every class has at least the following two methods

* update - updates the values of the object 
* draw - draws the current state of the object on the canvas

### Game

Holds an object of the class bird and an array of tubes

### Bird

The bird is **not** moving on the x-axis in this game. It's staying in the middle. For each frame it's y-axis position is modified by it's gravity. The gravity gains velocity by the velocity value. Therefore it falls faster the longer it falls.

If the spacebar is pressed the birds gravity is set to -10 which let's it jumps. The gravity starts to turn over again with the velocity which is set to 0.5. This means one jump let's the bird jump 105 pixels before it falls down again

### Pipe

TODO

## Legal

MIT, see License

