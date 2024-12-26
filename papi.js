function calculateProbability() {

    var probability = (Number(numOut.value)/(upperLim-1)) ** Number(leftOut.value);

    papiOut.value = (probability*100).toFixed(2) + "%";

    papiOut2.value = ((upperLim-1) - (upperLim-1)/(Number(leftOut.value) + 1)).toFixed(2);

}