function rollDice(faces) {
    var numberOfDice = document.getElementById("numberOfDice").value;
    numberOfDice = parseInt(numberOfDice);
    if (isNaN(numberOfDice)) {
        alert("Please enter a valid number");
        return;
    }
    var total = 0;
    var rolls = [];
    for (var i = 0; i < numberOfDice; i++) {
        var dieResult = Math.floor(Math.random() * faces) + 1;
        rolls.push(dieResult);
        total += dieResult;
    }
    var resultMessage = "You rolled: " + rolls.join(", ") + "<br>Total: " + total;
    document.getElementById("result").innerHTML = resultMessage;
}
