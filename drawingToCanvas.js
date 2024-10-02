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

    var colIndex = 1;

    for (num of nums) {
        drawColumn(num, (columnWidth + 2) * colIndex - 2, 'black')
        colIndex++;
    }

    drawHorizontalLine(nums[nums.length - 1], 'gray');

    for (var i = 0; i < playerIn.value; i++) {
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
            drawPixel(xi, yi, color);
        }
    }
}


function drawPixel(x, y, colorString) {

    var color = new Color(colorString);

    var pixelIndex = 4 * (canvas.width * y + x);

    data[pixelIndex + 0] = color.r; // R value
    data[pixelIndex + 1] = color.g; // G value
    data[pixelIndex + 2] = color.b; // B value
    data[pixelIndex + 3] = 255; // A value <- Alpha, transparency 
}

function drawHorizontalLine(height, color) {

    for (var xi = 0; xi < canvas.width; xi++) {
        drawPixel(xi, canvas.height - height, color); // grey pixels
    }
}

function clearCanvas() {
    for (var i = 0; i < data.length; i += 4) {
        data[i + 0] = 193; // R value
        data[i + 1] = 182; // G value
        data[i + 2] = 90; // B value
        data[i + 3] = 255; // A value <- Alpha, transparency 
    }
}