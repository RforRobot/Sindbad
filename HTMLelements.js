// Current gametypes: known or unknown (upper limit)
const gameType = document.getElementById('gameType').value; 

// Input field for number of players
const playerIn = document.getElementById('playerIn');

// Main display canvas
const canvas = document.getElementById('rasterCanvas');


// Player buttons for picking a number
var pickBtn = [];
pickBtn.push(document.getElementById('pick1Btn'));
pickBtn.push(document.getElementById('pick2Btn'));
pickBtn.push(document.getElementById('pick3Btn'));
pickBtn.push(document.getElementById('pick4Btn'));
pickBtn.push(document.getElementById('pick5Btn'));

// Output fields for picked numbers
var pickOut = [];
pickOut.push(document.getElementById('pick1Out'));
pickOut.push(document.getElementById('pick2Out'));
pickOut.push(document.getElementById('pick3Out'));
pickOut.push(document.getElementById('pick4Out'));
pickOut.push(document.getElementById('pick5Out'));

// Labels for output fields
var pickLbl = [];
pickLbl.push(document.getElementById('pick1Lbl'));
pickLbl.push(document.getElementById('pick2Lbl'));
pickLbl.push(document.getElementById('pick3Lbl'));
pickLbl.push(document.getElementById('pick4Lbl'));
pickLbl.push(document.getElementById('pick5Lbl'));

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
document.getElementById('upperOut').value = canvas.height;

leftOut.value = 100