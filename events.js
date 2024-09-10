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


// functions

function changeNumberOfPlayers() {
    
    console.log("change");
    
    for(var i = 0; i < playerIn.value; i++) {
        pickBtn[i].style.visibility="visible";
        pickLbl[i].style.visibility="visible";
        // console.log(i + " visible");
    }
    for(var i = playerIn.value; i < 5; i++) {
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

    drawHistogram();
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
    if( playerIn.value <= playersDone) {
        runToEnd();
    } else {
        drawHistogram();       
    }
    
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