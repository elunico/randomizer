// Gravity Constant
let GRAVITY;
// Constant for a multiplier to try and ensure disc doesn't get stuck in obstacle

const ESC_VELOCITY_MULT = 1.3;
// has the ball been dropped?
let isDiscDropping = false;
//The user's input names
// let names;
// the PlinkoBoard object that contains the pegs and discs
let Board;
//This will become true when everything is ready
let loadAllDataFinished = false;
let foundWinner = false;
//The winner name index
let winner = null;
//Start button
let removeNameBtn;
// Hide the names before the ball has been dropped toggle
let hideNames = true;
function setup() {
    GRAVITY = createVector(0, .5); // init gravity
    // Make the canvas full screen size
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    ellipseMode(CENTER);
    // Make a silly github thing
    let github = createA('https://github.com/shiffman/randomizer', '');
    let gitimg = createImg('https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png');
    gitimg.id('gitimg');
    github.child('gitimg');
    gitimg.attribute('style', 'position: absolute; top: 0; right: 0; border: 0;');
    // button for removing winner and restarting
    removeNameBtn = createButton("Remove & Restart");
    removeNameBtn.class('button');
    removeNameBtn.position(20, windowHeight - 40);
    removeNameBtn.mousePressed(removeName);
    removeNameBtn.hide();


    Board = new PlinkoBoard(createVector(50, 25), windowWidth - 100, windowHeight - 100);
    textSize(15);
    textStyle(BOLD);

    // no callback 
    initialize();
}

function draw() {
    background(20);
    Board.show();
    Board.update();
    if (isDiscDropping && loadAllDataFinished && foundWinner) {
        //Show the winner text
        textSize(35);
        fill(255);
        text("And the winner is...", width / 2 - 160, height / 2 - height / 4);
        textSize(55);
        fill(0);
        text(Board.names[winner], width / 2 - Board.names[winner].length * 16, height / 2 - height / 8);
    }
}

function initialize() {
    console.log(names);
    Board.setNames(names);
    //Everything is ready to go!
    loadAllDataFinished = true;
}

function mousePressed() {
    // if disc isn't moving already and mouse is outside board (hitting remove button)
    if (!isDiscDropping && (mouseY < Board.size_height + Board.position.y)) {
        startSimulation();
    }
}

function removeName() {
    if (isDiscDropping) {
        removeNameBtn.hide();
        Board = new PlinkoBoard(createVector(50, 25), windowWidth - 100, windowHeight - 100);
        loadAllDataFinished = false;
        isDiscDropping = false;
        foundWinner = false;
        names.splice(winner, 1);
        winner = null;
        initialize();
    }
}

function startSimulation() {
    //If the sketch is already "running" then reset all the variables
    if (isDiscDropping) {
        Board = new PlinkoBoard(createVector(50, 25), windowWidth - 100, windowHeight - 100);
        loadAllDataFinished = false;
        foundWinner = false;
        winner = null;
    }
    isDiscDropping = true;
}
