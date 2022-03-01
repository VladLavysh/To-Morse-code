import { symbolsAndMorse, engAndMorse, rusAndMorse } from "./utils/morseData.js";

const $form = document.getElementById("form") as HTMLFormElement;
const $input = document.getElementById("input") as HTMLInputElement;
const $text = document.getElementById("text") as HTMLDivElement;
const $result = document.getElementById("result") as HTMLDivElement;
const $play = document.getElementById("play") as HTMLButtonElement;
const $checkbox = document.getElementById("checkbox") as HTMLInputElement;

let finalMorseArr: object[] = [...engAndMorse, ...symbolsAndMorse];
let isEnglish: Boolean = true;
let morseText: string = "";

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
function translateText(
  morseText: string,
  inputValue: string,
  resultInput: HTMLDivElement,
  playElem: HTMLButtonElement
): void {
  const valueArr = inputValue.split("");
  let correctLang = true;

  try {
    morseText = valueArr.map(findMorse).join(" ");

    resultInput.innerHTML = morseText || "You need to enter text";
  } catch (e) {
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
  } else {
    playElem.classList.remove("play-btn-active");
    playElem.disabled = true;
    playElem.removeEventListener("click", setSound);
  }
}

function findMorse(el: string): string {
  let morseStr: string = "";
  const morseSymb: any = finalMorseArr.find((elem: any) => el === elem.symbol)!;

  morseStr += morseSymb.morse;

  return morseStr;
}

function setSound(): void {
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
    } else if (morseArr[i] === "-") {
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