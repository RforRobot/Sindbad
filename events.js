// Listeners

playerIn.addEventListener("input", changeNumberOfPlayers);

gameTypeSelect.addEventListener("input", changeGameType);

nextBtn.addEventListener("click", get1Num);

waitBtn.addEventListener("click", waitForLarge);

newGameBtn.addEventListener("click", newGame);

document.addEventListener("keydown",keyEventHandler);

for (var i = 0; i < pickBtn.length; i++) {
    pickBtn[i].addEventListener("click", pickClick);
}

// functions

function changeNumberOfPlayers() {

    console.log("change");

    for (var i = 0; i < playerIn.value; i++) {
        pickBtn[i].style.visibility = "visible";
        pickLbl[i].style.visibility = "visible";
        // console.log(i + " visible");
    }
    for (var i = playerIn.value; i < 5; i++) {
        pickBtn[i].style.visibility = "hidden";
        pickLbl[i].style.visibility = "hidden";
        // console.log(i + " hidden");
    }

}

function changeGameType() {
    gameType = gameTypeSelect.value;
    switch (gameType) {
        case 'known':
            upperLim = canvas.height;
            break;
        case 'unknown':
            upperLim = 200 + Math.floor(Math.random() * (canvas.height - 200));
            break;
        default:
            console.log(`Invalid gametype ${gameType} given.`);
    }

    updateGameRules();
}

function updateGameRules() {
    switch (gameType) {
        case 'known':
            gameRulesDiv.innerHTML = "Each number is uniformly drawn from " +
                "the range [0, <output id='upperOut'></output>&rpar;."
            break;
        case 'unknown':
            gameRulesDiv.innerHTML = "Each number is uniformly drawn from " +
                "the range [0, <var>max</var>&rpar;, <br>" +
                "and <var>max</var> is uniformly drawn from " +
                "the range [200,<output id='upperOut'></output>&rpar; at<br>" +
                "the beginning of the game."
            break;
    }
    document.getElementById('upperOut').value = canvas.height;
}

function get1Num() {
    if(!gameInProgress) return;

    console.log("Next number button pressed");

    nextNum();

    drawHistogram();
}


function waitForLarge() {
    if(!gameInProgress) return;
    
    console.log("Wait until largest button pressed");

    nextNum();

    while ((nums[nums.length - 1] < max) && nums.length < 100) {
        nextNum();
    }

    if (nums.length >= 100) {
        gameOver();
    }

    drawHistogram();
}


function pickClick(event) {
    if(!gameInProgress) return;

    var btnIndex = pickBtn.indexOf(event.target);
    
    console.log("Player " + (btnIndex + 1) + " pick button pressed");

    numberPicked(btnIndex);
}

function numberPicked(btnIndex) {
    // No new or 'empty' picks allowed
    if (picks[btnIndex] > 0 || nums.length == 0) return;

    pickNo[btnIndex] = nums.length;

    picks[btnIndex] = numOut.value;

    pickOut[btnIndex].value = picks[btnIndex];

    playersDone++;

    console.log("Players done: " + playersDone + ", still playing: " + (playerIn.value - playersDone));
    if (playerIn.value <= playersDone) {
        runToEnd();
    } else {
        drawHistogram();
    }

}

function newGame() {
    if(gameInProgress) {
        var sure = window.confirm("Game in progress; do you want to start a new one?");
        if(!sure) return;
    }

    gameInProgress = true;

    clearCanvas();

    midGameButtons();

    ctx.putImageData(imageData, 0, 0);

    nums = [];

    max = 0;

    picks = [];

    pickNo = [];

    playersDone = 0;

    leftOut.value = 100;

    maxOut.value = '';

    numOut.value = '';

    for (var i = 0; i < 5; i++) {
        pickOut[i].value = '';
    }

    maxRevealLbl.style.visibility = "hidden";

    upLimOut.value = '';

    if (gameType == 'unknown') {
        upperLim = 200 + Math.floor(Math.random() * (canvas.height - 200));
    }

    get1Num();
}


function keyEventHandler(event) {
    console.log("Event.code is: " + event.code);
    if(gameInProgress) {
        const callback = {
            "KeyN" : get1Num,
            "KeyW" : waitForLarge
        }[event.code]
        callback?.();
    } else {
        const callback = {
            "KeyN" : newGame,
        }[event.code]
        callback?.();
    }
}