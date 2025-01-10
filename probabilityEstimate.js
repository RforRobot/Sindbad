function calculateProbability() {

    // var probability = (Number(numOut.value)/(upperLim-1)) ** Number(leftOut.value);

    var probability = 1;

    const curNumber = Number(numOut.value);
    const numbersDrawn = 100 - Number(leftOut.value);

    for (var i = numbersDrawn; i < 100; i++) {
        probability *= (curNumber - i) / (upperLim - 1 - i);
    }

    const winProb = (probability * 100).toFixed(2) + "%";

    console.log("Approximate probability of all future numbers being lower:" + winProb);

    const expectedValue = (
        (upperLim - 1) - ((upperLim - 1) - numbersDrawn) /
        (Number(leftOut.value) + 1)
    ).toFixed(2);

    console.log("Approximate expected value of remaining numbers:" + expectedValue);

}