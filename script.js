
const inputElement = document.getElementById('transliteration');
const outputElement = document.getElementById('arabic');

const LETTERS = new Map([
    ["A", "أَ"],
    ["I", "إِ"],
    ["U", "أُ"],
    ["b", "ب"],
    ["t", "ت"],
    ["th", "ث"],
    ["j", "ج"],
    ["h", "ح"],
    ["kh", "خ"],
    ["d", "د"],
    ["dh", "ذ"],
    ["r", "ر"],
    ["z", "ز"],
    ["s", "س"],
    ["sh", "ش"],
    ["S", "ص"],
    ["D", "ض"],
    ["T", "ط"],
    ["Z", "ظ"],
    ["'", "ع"],
    ["gh", "غ"],
    ["f", "ف"],
    ["q", "ق"],
    ["k", "ك"],
    ["l", "ل"],
    ["m", "م"],
    ["n", "ن"],
    ["w", "و"],
    ["H", "ه"],
    ["y", "ي"]
]);

const VOWELS = new Map([
    ["a", "\u064E"],
    ["o", "\u064E"],
    ["i", "\u0650"],
    ["u", "\u064F"]
])

const TANWEEN = new Map([
    ["an", "ً"],
    ["in", "ٍ"],
    ["un", "ٌ"]
])

const STRETCHED_VOWELS = new Map([
    ["aa", "\u064Eاْ"],
    ["ii", "\u0650يْ"],
    ["uu", "\u064Fوْ"]
])
const SHADDAAD = "ّ";
const SUKUUN = "ْ";
  
//This code is executed when the use types in the transliteration textbox.
inputElement.addEventListener('input', () => {

    //Transliteration textbox.
    let transliterationInput = inputElement.value;
    let transliterationInputArray = transliterationInput.split('');

    //Arabic textbox.
    let output = [];
    let previousLetter = "";
    previousLetterHasVowelIsTrue = false;

    //Loop through the inputArray.
    for (let i = 0; i < transliterationInputArray.length; i++) {
        let letter = transliterationInputArray[i];
        let nextLetter = transliterationInputArray[i+1]
        
        //If the current and next letter is (an*, in* or un*) then a fathatain, kasratain or dammatain will be placed.
        if (TANWEEN.has(letter+nextLetter) && transliterationInputArray[i+2] == "*"){
            output.push(TANWEEN.get(letter+nextLetter))
            i++
        }

        //If it is a 2 letter transliteration (e.g. th or gh)
        if (LETTERS.has(letter+nextLetter)) {

            //If the current 2 letter are equal to the previous 2 letters then the second pair is be replaced with a shaddaad.
            if (letter+nextLetter == previousLetter && previousLetterHasVowelIsTrue == false) {
                console.log(letter+nextLetter)
                output.push(SHADDAAD);
                previousLetter = previousLetter+previousLetter
                previousLetterHasVowelIsTrue = false;
            } 
            
            //If the current pair of letters is not equal to the previous par and if there is no vowels before the
            //current pair then a sukoon is be placed on top of the current letter.
            else if (letter+nextLetter != previousLetter && LETTERS.has(previousLetter) && !VOWELS.has(nextLetter)) {
                output.push(LETTERS.get(letter+nextLetter) + SUKUUN);
                previousLetter = letter+nextLetter;
                previousLetterHasVowelIsTrue = false;
            } 
            
            //Else the current pair to arabic is translated.
            else {
                output.push(LETTERS.get(letter+nextLetter));
                previousLetter = letter+nextLetter;
                previousLetterHasVowelIsTrue = false;
            }
            i++; //For 2 letter transliterations iteration is skipped once.
        } 
        
        //If it is a one letter transliteration.
        //Code same as the one for 2 letters.
        else if (LETTERS.has(letter)) {

            //Replaces current letter with shaddaad.
            if (letter == previousLetter && previousLetterHasVowelIsTrue == false) {
                output.push(SHADDAAD);
                previousLetter = previousLetter+previousLetter
            }
            
            //Adds sukoon.
            else if (letter != previousLetter && letter != nextLetter && LETTERS.has(previousLetter)&& !VOWELS.has(nextLetter)) {
                output.push(LETTERS.get(letter) + SUKUUN);
                previousLetter = letter;
                previousLetterHasVowelIsTrue = false;
            } 
            
            //Letter is translated to arabic.
            else {
                output.push(LETTERS.get(letter));
                previousLetter = letter;
                previousLetterHasVowelIsTrue = false;
            }
            
        }
        
        //If the current letter is equal to the previous one and they both are vowels then they are translated as madd()
        else if (STRETCHED_VOWELS.has(letter+nextLetter)) {
            output.push(STRETCHED_VOWELS.get(letter+nextLetter));
            previousLetter = letter;
            previousLetterHasVowelIsTrue = false;
            i++
        }
        
        //Translated vowels (fathah, kasrah, dammah)
        else if (VOWELS.has(letter)) {
            output.push(VOWELS.get(letter));
            previousLetterHasVowelIsTrue = true;
        }

        //Adds space
        if (letter == " ") {
            output.push(" ")
            previousLetter = letter;
        }
        
        //Converts the array of arabic letters into a string then it is outputted into the arabic textbox.
        outputElement.value = output.join('').toString();
      } 
    

    //console.log('User is typing:', inputElement.value);
});
