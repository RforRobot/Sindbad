// HTML elements

const gameType = document.getElementById('gameType').value;

const playerIn = document.getElementById('playerIn');

const canvas = document.getElementById('rasterCanvas');

var ctx = canvas.getContext('2d');

// const upperOut = document.getElementById('upperOut');
// upperOut.value = canvas.height;

document.getElementById('upperOut').value = canvas.height;

var pickBtn = [];

pickBtn.push(document.getElementById('pick1Btn'));
pickBtn.push(document.getElementById('pick2Btn'));
pickBtn.push(document.getElementById('pick3Btn'));
pickBtn.push(document.getElementById('pick4Btn'));
pickBtn.push(document.getElementById('pick5Btn'));

var pickOut = [];

pickOut.push(document.getElementById('pick1Out'));
pickOut.push(document.getElementById('pick2Out'));
pickOut.push(document.getElementById('pick3Out'));
pickOut.push(document.getElementById('pick4Out'));
pickOut.push(document.getElementById('pick5Out'));

var pickLbl = [];

pickLbl.push(document.getElementById('pick1Lbl'));
pickLbl.push(document.getElementById('pick2Lbl'));
pickLbl.push(document.getElementById('pick3Lbl'));
pickLbl.push(document.getElementById('pick4Lbl'));
pickLbl.push(document.getElementById('pick5Lbl'));


const nextBtn = document.getElementById('nextBtn');

const waitBtn = document.getElementById('waitBtn');

const newGameBtn = document.getElementById('newGameBtn');

const maxOut = document.getElementById('maxOut');

const numOut = document.getElementById('numOut');

const leftOut = document.getElementById('leftOut');

leftOut.value = 100

const maxRevealLbl = document.getElementById('maxRevealLbl');

const upLimOut = document.getElementById('upLimOut');

// graphic vars

const columnWidth = 6;

var playerColors = [];

playerColors.push('red');
playerColors.push('green');
playerColors.push('blue');
playerColors.push('pink');
playerColors.push('yellow');

// vars for Sindbad problem

var upperLim;

switch(gameType){
    case 'known':
    upperLim = canvas.height;
    break;
    case 'unknown':
    upperLim = 200 + Math.floor(Math.random() * (canvas.height - 200));
    break;
    default:
  console.log(`Invalid gametype ${gameType} given.`);
}

var nums = [];

var max = 0;

var picks = [];

var pickNo = [];

var playersDone = 0;

// get current raster data
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var data = imageData.data;

function changeNumberOfPlayers() {
    
    console.log("change");
    
    for(var i = 0; i < playerIn.value; i++) {
        pickBtn[i].style.visibility="visible";
        pickLbl[i].style.visibility="visible";
        // console.log(i + " visible");
    }
    for(var i = playerIn.value; i <4; i++) {
        pickBtn[i].style.visibility="hidden";
        pickLbl[i].style.visibility="hidden";
        // console.log(i + " hidden");
    }
    
}

function get1Num() {

    console.log("Next number button pressed");

    nextNum();

    drawHistogram();
}


function waitForLarge() {

    console.log("Wait until largest button pressed");

    nextNum();

    while ((nums[nums.length - 1] < max) && nums.length < 100) {
        nextNum();
    } 

    drawHistogram();g
}

function nextNum() {

    // disable functionality if game is already over;
    if (nums.length >= 100) return;

    var num;
    var notInNums = true;

    while (notInNums) {
        var num = Math.floor(Math.random() * upperLim);
        if (nums.indexOf(num) === -1) {
            notInNums = false;
        }
    }

    nums.push(num);

    if (num > max) {
        max = num;
        maxOut.value = max;
    }

    numOut.value = num;
    leftOut.value --;

    console.log(nums.length + ". " + num);
}

function drawHistogram() {
    clearCanvas();

    var i = 1;

    for (num of nums) {
        drawColumn(num, (columnWidth + 2)*i - 2,'black')
        i++;
    } 

    if( playerIn.value > playersDone && nums.length < 100) {
        // still playing case
        drawHorizontalLine(num,'gray');
    } else {
        // game over case
        drawHorizontalLine(max,'gray');

        newGameBtn.style.visibility = "visible";
        
        if (gameType == 'unknown') {
          maxRevealLbl.style.visibility = "visible";
          upLimOut.value = upperLim;
        }
    }

    for (var i=0; i<playerIn.value; i++) {
        drawColumn(picks[i], (columnWidth + 2) * pickNo[i] - 2, playerColors[i])
        drawHorizontalLine(picks[i], playerColors[i]);
    }

    ctx.putImageData(imageData, 0, 0);
}

// height of column and x coordinate at which column is drawn
function drawColumn(height, x, color) {

    for (var xi = x - 1; xi < x + 3; xi++) {
        for (var yi = canvas.height; yi > canvas.height - height; yi--) {
            // console.log("xi: " + xi + " yi: " + yi);
            drawPixel(xi, yi, color); // black pixels
        }
    }
}

function drawPixel(x, y, color) {

    var r;
    var g;
    var b;

    switch (color) {
        case 'black':
            r = 0;
            g = 0;
            b = 0;
        break;
        case 'red':
            r = 200;
            g = 0;
            b = 0;
        break;
        case 'green':
            r = 0;
            g = 128;
            b = 0;
        break;
        case 'blue':
            r = 0;
            g = 0;
            b = 200;
        break;
        case 'pink':
            r = 248;
            g = 221;
            b = 189
        break;
        case 'yellow':
            r = 200;
            g = 200;
            b = 0;
        break;
        case 'gray':
            r = 150;
            g = 150;
            b = 150;
        break;
        default:
          console.log(`Invalid color ${color} given.`);
      }


    var pixelIndex = 4 * (canvas.width * y + x);

    data[pixelIndex + 0] = r; // R value
    data[pixelIndex + 1] = g; // G value
    data[pixelIndex + 2] = b; // B value
    data[pixelIndex + 3] = 255; // A value <- Alpha, transparency 
}

function drawHorizontalLine(height,color) {

    for (var xi = 0; xi < canvas.width; xi++) {
        drawPixel(xi, canvas.height - height, color); // grey pixels
    }
}

function clearCanvas() {
    for (var i = 0; i < data.length; i++) {
        data[i] = 255;
    }
}

function numberPicked(event) {

    var btnIndex = pickBtn.indexOf(event.target);
    
    console.log("Player " + btnIndex + " pick button pressed"); 

    // No new or 'empty' picks allowed
    if(picks[btnIndex] > 0 || nums.length == 0 ) return;

    pickNo[btnIndex] = nums.length;

    picks[btnIndex] = numOut.value;

    pickOut[btnIndex].value = picks[btnIndex];

    playersDone++;

    console.log("Players done: " + playersDone + ", still playing: " + (playerIn.value - playersDone));
    if( playerIn.value <= playersDone) runToEnd();
    
}

function runToEnd() {

    console.log("Running to end");

    while (nums.length < 100) {
        nextNum();
    }

    drawHistogram();
}

function newGame() {
    clearCanvas();

    ctx.putImageData(imageData,0,0);

    nums = [];

    max = 0;

    picks = [];

    pickNo = [];

    playersDone = 0;

    newGameBtn.style.visibility = "hidden";

    leftOut.value = 100;

    maxOut.value = '';

    numOut.value = '';

    for(var i = 0; i < 5; i++) {
        pickOut[i].value = '';
    }

    if (gameType == 'unknown') {
        maxRevealLbl.style.visibility = "hidden";

        upLimOut.value = '';

        upperLim = 200 + Math.floor(Math.random() * (canvas.height - 200));
    }

}


// function for manual drawing
function drawIt() {
    ctx.putImageData(imageData,0,0);
}


// Listeners

playerIn.addEventListener("input", changeNumberOfPlayers);

nextBtn.addEventListener("click", get1Num);

waitBtn.addEventListener("click", waitForLarge);

newGameBtn.addEventListener("click", newGame);

for(var i = 0; i < pickBtn.length; i++) {
    pickBtn[i].addEventListener("click", function (e) {
        numberPicked(e)
    });
}