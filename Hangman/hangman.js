// Version: 1.0
// Description: Hangman game script

// Game keyboard
var tastatur = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Game memory
var word;
var hintWord;
var wordLeft = [];
var fail = 0;

// Web-page onload
document.addEventListener("DOMContentLoaded", async function() {
    gId("home").style.display = "block";
    gId("result").style.display = "none";
    gId("pGame").style.display = "none";
    gId("moveKeyboard").addEventListener('touchmove', function(e) {
        let wH = window.innerHeight;
        let tY = e.touches[0].clientY;
        let eL = gId("tastatur");
        let resY = wH - tY - eL.offsetHeight;
        resY = Math.max(0, Math.min(resY, wH / 2));
        eL.style.bottom = resY + "px";
    }, false);
});

// Get word from API
async function getWordFromAPI() {
    try {
        let response = await fetch("https://random-word-api.vercel.app/api?words=1");
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        let data = await response.json();
        if (data.length === 0) {
            throw new Error("No data found");
        }
        console.log('Fetched word: ', data[0]);
        return data[0];
    } catch (error) {
        console.error('Error fetching word: ', error);
        return "ERROR";
    }
}

// Get hint from API
async function getHintFromAPI(word) {
    try {
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        console.log('Fetched hint data:', data); // Log the entire response
        if (!data[0] || !data[0].meanings || !data[0].meanings[0] || !data[0].meanings[0].definitions || !data[0].meanings[0].definitions[0]) throw new Error('Hint not available');
        console.log('Fetched hint:', data[0].meanings[0].definitions[0].definition); // Log the fetched hint
        return data[0].meanings[0].definitions[0].definition;
    } catch (error) {
        console.error('Error fetching hint:', error);
        return 'No hint available'; // Return a default hint or handle the error appropriately
    }
}

// Start game
async function startGame() {
    gId("home").style.display = "none";
    gId("pGame").style.display = "block";
    gId("result").style.display = "none";

    word = await getWordFromAPI();
    hintWord = await getHintFromAPI(word);

    createTastur();
    newGame();
}

// New game
async function newGame() {
    clearTastatur();
    clearPlayer();
    word = await getWordFromAPI();
    console.log('New word: ', word);
    hintWord = await getHintFromAPI(word);
    console.log('New hint: ', hintWord);
    createWord();
}

// Clear keyboard
function clearTastatur() {
    const elements = document.getElementsByClassName("b")
    for(let element of elements) {
        element.setAttribute("data", "");
    }
}

// Clear player
function clearPlayer() {
    fail = 0;
    wordLeft = [];
    for (let i = 0; i <=6; i++) {
        gId(`g${i}`).setAttribute("data", "false");
        if (i === 5 || i === 6) {
            gId(`g${i}`).setAttribute("l", "false");
            gId(`g${i}`).setAttribute("r", "false");
        }
    }
    gId("hintButton").setAttribute("data", "false");
    gId("hint").style.display = "none";
}

// Get new word
function createWord() {
    let d = gId("letter");
    d.innerHTML = "";
    for(let a = 0; a < word.length; a++) {
        var x = word[a].toUpperCase();
        var b = document.createElement("span");
        b.className = "l" + (x == " " ? " ls" : "");
        b.innerHTML = "&nbsp;";
        b.id = "l" + a;
        d.appendChild(b);
        
        if(x != " ") {
            if(!wordLeft.includes(x)) {
                wordLeft.push(x)
            }
        }
    }
}

// Create keyboard
function createTastur() {
    let tas = gId("keyboard")
    tas.innerHTML = ""
    for(let a = 0; a < tastatur.length; a++) {
        let b = document.createElement("span");
        b.className = "b";
        b.innerText = tastatur[a];
        b.setAttribute("data", "");
        b.onclick = function() {
            bTas(this);
        }
        tas.appendChild(b);
    }
}

// Game check, If show next error / game end
function bTas(a) {
    if(a.getAttribute("data") === "") {
        let x = isExist(a.innerText);
        a.setAttribute("data", x);
        if(x) {
            if(wordLeft.length === 0) {
                gameEnd(true);
            }
        } else {
            showNextFail();
        }
    }
}

// If letter "X" exist
function isExist(e) {
    e = e.toUpperCase();
    let index = wordLeft.indexOf(e);
    if(index !== -1) {
        wordLeft.splice(index, 1);
        console.log('Word left: ', wordLeft);
        typeWord(e);
        return true;
    }
    return false;
}

// Show next fail drawing
function showNextFail() {
    fail++;
    switch(fail) {
        case 1:
            gId("g0").setAttribute("data", "true");
            break;
        case 2:
            gId("g1").setAttribute("data", "true");
            break;
        case 3:
            gId("g2").setAttribute("data", "true");
            break;
        case 4:
            gId("g3").setAttribute("data", "true");
            gId("hintButton").setAttribute("data", "true");
            break;
        case 5:
            gId("g4").setAttribute("data", "true");
            break;
        case 6:
            gId("g5").setAttribute("data", "true");
            break;
        case 7:
            gId("g5").setAttribute("l", "true");
            break;
        case 8:
            gId("g5").setAttribute("r", "true");
            break;
        case 9:
            gId("g6").setAttribute("data", "true");
            gId("g6").setAttribute("l", "true");
            break;
        case 10:
            gId("g6").setAttribute("r", "true");
            gameEnd(false);
            break;
    }
}

// Update the display when a correct letter is guessed
function typeWord(e) {
    for(let a = 0; a < word.length; a++) {
        if(word[a].toUpperCase() === e) {
            gId("l" + a).innerText = e;
        }
    }
}

// Game result
function gameEnd(win) {
    let d = gId("result");
    d.setAttribute("data", win);
    if(win) {
        gId("rT").innerText = "You Win!";
        gId("rM").innerHTML = "Congratulations, you guessed the word!<br/><br/>Good Job!";
    } else {
        gId("rT").innerText = "You Lose!";
        gId("rM").innerHTML = "The word was <br/><br/>\"" + word.toUpperCase() + "\"<br/><br/>Better luck next time.";
    }
    d.className = "";
    gId("home").style.display = "none";
    gId("pGame").style.display = "none";
    gId("result").style.display = "block";
}

// Show hint
function hint() {
    gId("hintText").innerText = hintWord;
    gId("hint").style.display = "block";
}

// Exit hint
function hintExit() {
    gId("hint").style.display = "none";
}

// Get HTML ID element by name
function gId(a) {
    return document.getElementById(a);
}