// Current gametypes: known or unknown (upper limit)
const gameTypeSelect = document.getElementById('gameType'); 
const gameRulesDiv = document.getElementById('gameRules'); 

// Input field for number of players
const playerIn = document.getElementById('playerIn');

// Main display canvas
const canvas = document.getElementById('rasterCanvas');


// Player buttons for picking a number
var pickBtn = [];
// Output fields for picked numbers
var pickOut = [];
// Labels for output fields
var pickLbl = [];

// populate the lists
for(var i = 1; i<6; i++) {
    pickBtn.push(document.getElementById('pick' + i + 'Btn'));    
    pickOut.push(document.getElementById('pick' + i + 'Out'));
    pickLbl.push(document.getElementById('pick' + i + 'Lbl'));
}

// Get next number button
const nextBtn = document.getElementById('nextBtn');

// Get numbers until we get the next 'largest' button
const waitBtn = document.getElementById('waitBtn');

// New game button
const newGameBtn = document.getElementById('newGameBtn');

// Output field that displays the largest number out of the 100
const maxOut = document.getElementById('maxOut');

// Output field that displays the current number
const numOut = document.getElementById('numOut');

// Output field that displays how many numbers remain in the current game
const leftOut = document.getElementById('leftOut');

// Only for the unkown gametype
// Label for the upper limit output field
const maxRevealLbl = document.getElementById('maxRevealLbl');

// Output field for displaying the upper limit of the distribution
const upLimOut = document.getElementById('upLimOut');


// Putting some values to the HTML
leftOut.value = 100