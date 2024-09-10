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

var nums = []; // stores drawn numbers

var max = 0; // stores largest of nums

var picks = []; // stores player picks, not really necessary as same info is in HTML labels

var pickNo = []; // stores index of player picks, necessary for graphics (color columns)

var playersDone = 0; // statemachine that simplifies checking whether all players picked a number

// Gets unique (not yet drawn) number between 0 and upperLim, uniform distribution
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

// This function is triggered when all players have picked a number. It runs until no other numbers are left.
function runToEnd() {
    
    console.log("Running to end");
    
    while (nums.length < 100) {
        nextNum();
    }
    
    drawHistogram();
}


// function for manual drawing
function drawIt() {
    ctx.putImageData(imageData,0,0);
}
