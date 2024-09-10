// get current raster data
var ctx = canvas.getContext('2d');

var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

var data = imageData.data;

// graphic vars
const columnWidth = 6;

var playerColors = [];

playerColors.push('red');
playerColors.push('green');
playerColors.push('blue');
playerColors.push('pink');
playerColors.push('yellow');

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