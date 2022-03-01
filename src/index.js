const symbolsAndMorse = [
  { symbol: " ", morse: "" },
  { symbol: "1", morse: ".----" },
  { symbol: "2", morse: "..---" },
  { symbol: "3", morse: "...--" },
  { symbol: "4", morse: "....-" },
  { symbol: "5", morse: "....." },
  { symbol: "6", morse: "-...." },
  { symbol: "7", morse: "--..." },
  { symbol: "8", morse: "---.." },
  { symbol: "9", morse: "----." },
  { symbol: "0", morse: "-----" },
  { symbol: ".", morse: ".-.-.-" },
  { symbol: ",", morse: "--..--" },
  { symbol: ":", morse: "---..." },
  { symbol: "?", morse: "..--.." },
  { symbol: "-", morse: "-....-" },
  { symbol: "/", morse: "-..-." },
  { symbol: "(", morse: "-.--.-" },
  { symbol: ")", morse: "-.--.-" },
  { symbol: '"', morse: ".-..-." },
  { symbol: "@", morse: ".--.-." },
  { symbol: "=", morse: "-...-" },
];
const engAndMorse = [
  { symbol: "A", morse: ".-" },
  { symbol: "B", morse: "-..." },
  { symbol: "C", morse: "-.-." },
  { symbol: "D", morse: "-.." },
  { symbol: "E", morse: "." },
  { symbol: "F", morse: "..-." },
  { symbol: "G", morse: "--." },
  { symbol: "H", morse: "...." },
  { symbol: "I", morse: ".." },
  { symbol: "J", morse: ".---" },
  { symbol: "K", morse: "-.-" },
  { symbol: "L", morse: ".-.." },
  { symbol: "M", morse: "--" },
  { symbol: "N", morse: "-." },
  { symbol: "O", morse: "---" },
  { symbol: "P", morse: ".--." },
  { symbol: "Q", morse: "--.-" },
  { symbol: "R", morse: ".-." },
  { symbol: "S", morse: "..." },
  { symbol: "T", morse: "-" },
  { symbol: "U", morse: "..-" },
  { symbol: "V", morse: "...-" },
  { symbol: "W", morse: ".--" },
  { symbol: "X", morse: "-..-" },
  { symbol: "Y", morse: "-.--" },
  { symbol: "Z", morse: "--.." },
];
const rusAndMorse = [
  { symbol: "А", morse: ".-" },
  { symbol: "Б", morse: "-..." },
  { symbol: "В", morse: "·−−" },
  { symbol: "Г", morse: "--." },
  { symbol: "Д", morse: "-.." },
  { symbol: "Е", morse: "." },
  { symbol: "Ж", morse: "...-" },
  { symbol: "З", morse: "--.." },
  { symbol: "И", morse: ".." },
  { symbol: "Й", morse: ".---" },
  { symbol: "К", morse: "-.-" },
  { symbol: "Л", morse: ".-.." },
  { symbol: "М", morse: "--" },
  { symbol: "Н", morse: "-." },
  { symbol: "О", morse: "---" },
  { symbol: "П", morse: ".--." },
  { symbol: "Р", morse: ".-." },
  { symbol: "С", morse: "..." },
  { symbol: "Т", morse: "-" },
  { symbol: "У", morse: "..-" },
  { symbol: "Ф", morse: "..-." },
  { symbol: "Х", morse: "...." },
  { symbol: "Ц", morse: "-.-." },
  { symbol: "Ч", morse: "---." },
  { symbol: "Ш", morse: "----" },
  { symbol: "Щ", morse: "--.-" },
  { symbol: "Ъ", morse: "--.--" },
  { symbol: "Ы", morse: "-.--" },
  { symbol: "Ь", morse: "-..-" },
  { symbol: "Э", morse: "..-.." },
  { symbol: "Ю", morse: "..--" },
  { symbol: "Я", morse: ".-.-" },
];

const $form = document.getElementById("form");
const $input = document.getElementById("input");
const $text = document.getElementById("text");
const $result = document.getElementById("result");
const $play = document.getElementById("play");
const $checkbox = document.getElementById("checkbox");

let finalMorseArr = [...engAndMorse, ...symbolsAndMorse];
let isEnglish = true;
// убрать из глобала
let morseText = "";

// Слушатели
$form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = $input.value.toUpperCase();

  translateText(inputValue);

  $text.innerHTML = input.value || "Your text will be here";
  $input.value = "";
});

$checkbox.addEventListener("click", () => {
  isEnglish = !isEnglish;

  isEnglish
    ? (finalMorseArr = [...engAndMorse, ...symbolsAndMorse])
    : (finalMorseArr = [...rusAndMorse, ...symbolsAndMorse]);
});

// Рабочие функции
function translateText(inputValue) {
  const valueArr = inputValue.split("");
  let correctLang = true;

  try {
    morseText = valueArr.map(findMorse).join(" ");

    $result.innerHTML = morseText || "You need to enter text";
  } catch (e) {
    correctLang = false;

    $result.innerHTML = "Wrong language";

    setTimeout(() => {
      $result.innerHTML = "The result will be here";
    }, 2000);
  }

  if (morseText && correctLang) {
    $play.classList.add("play-btn-active");
    $play.disabled = false;
    $play.addEventListener("click", setSound);
  } else {
    $play.classList.remove("play-btn-active");
    $play.disabled = true;
    $play.removeEventListener("click", setSound);
  }
}

function findMorse(el) {
  let morseStr = "";
  const morseSymb = finalMorseArr.find((elem) => {
    return el === elem.symbol;
  });

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
