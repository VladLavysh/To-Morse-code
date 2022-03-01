import { symbolsAndMorse, engAndMorse, rusAndMorse } from "./utils/morseData.js";
const $form = document.getElementById("form");
const $input = document.getElementById("input");
const $text = document.getElementById("text");
const $result = document.getElementById("result");
const $play = document.getElementById("play");
const $checkbox = document.getElementById("checkbox");
let finalMorseArr = [...engAndMorse, ...symbolsAndMorse];
let isEnglish = true;
let morseText = "";
// Listeners
$form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = $input.value.toUpperCase();
    translateText(morseText, inputValue, $result, $play);
    $text.innerHTML = $input.value || "Your text will be here";
    $input.value = "";
});
$checkbox.addEventListener("click", () => {
    isEnglish = !isEnglish;
    isEnglish
        ? (finalMorseArr = [...engAndMorse, ...symbolsAndMorse])
        : (finalMorseArr = [...rusAndMorse, ...symbolsAndMorse]);
});
// Functions
function translateText(morseText, inputValue, resultInput, playElem) {
    const valueArr = inputValue.split("");
    let correctLang = true;
    try {
        morseText = valueArr.map(findMorse).join(" ");
        resultInput.innerHTML = morseText || "You need to enter text";
    }
    catch (e) {
        correctLang = false;
        resultInput.innerHTML = "Wrong language";
        setTimeout(() => {
            resultInput.innerHTML = "The result will be here";
        }, 2000);
    }
    if (morseText && correctLang) {
        playElem.classList.add("play-btn-active");
        playElem.disabled = false;
        playElem.addEventListener("click", setSound);
    }
    else {
        playElem.classList.remove("play-btn-active");
        playElem.disabled = true;
        playElem.removeEventListener("click", setSound);
    }
}
function findMorse(el) {
    let morseStr = "";
    const morseSymb = finalMorseArr.find((elem) => el === elem.symbol);
    morseStr += morseSymb.morse;
    return morseStr;
}
function setSound() {
    const morseArr = morseText.split("");
    let i = 0;
    playSound();
    function playSound() {
        const audio = new Audio();
        let time = 0;
        if (morseArr[i] === ".") {
            audio.src = "sound/dot.mp3";
            audio.autoplay = true;
            console.log("dot");
            time = 200;
        }
        else if (morseArr[i] === "-") {
            audio.src = "sound/dash.mp3";
            audio.autoplay = true;
            console.log("dash");
            time = 300;
        }
        if (i++ < morseArr.length) {
            setTimeout(playSound, time);
        }
    }
}
