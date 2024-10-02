// vars for Sindbad problem
// var gameType = gameTypeSelect.value; 
var gameType;
var upperLim;

changeGameType();
preGameButtons()

var gameInProgress = false;

var nums = []; // stores drawn numbers

var max; // stores largest of nums

var picks = []; // stores player picks, not really necessary as same info is in HTML labels

var pickNo = []; // stores index of player picks, necessary for graphics (color columns)

var playersDone = 0; // statemachine that simplifies checking whether all players picked a number

// Gets unique (not yet drawn) number between 0 and upperLim, uniform distribution
function nextNum() {

    // disable functionality if game is already over;
    // if (nums.length >= 100) return;

    var num;
    var notInNums = true;

    while (notInNums) {
        num = Math.floor(Math.random() * upperLim);
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
    leftOut.value--;

    console.log(nums.length + ". " + num);
}

// This function is triggered when all players have picked a number. It runs until no other numbers are left.
function runToEnd() {

    console.log("Running to end");

    while (nums.length < 100) {
        nextNum();
    }

    drawHistogram();    

    gameOver();
}

function gameOver() {
    console.log("Game over");

    if (gameType == 'unknown') {
        maxRevealLbl.style.visibility = "visible";
        upLimOut.value = upperLim;
    }

    gameInProgress = false;

    preGameButtons();
}

// set buttons to out-of-game state (rules can be changed, no moves)
function preGameButtons() {
    playerIn.disabled = false;
    gameTypeSelect.disabled = false;
    nextBtn.disabled = true;
    waitBtn.disabled = true;
}

// set buttons to in-game state (no rule changes, but players can move)
function midGameButtons() {
    playerIn.disabled = true;
    gameTypeSelect.disabled = true;
    nextBtn.disabled = false;
    waitBtn.disabled = false;
}



