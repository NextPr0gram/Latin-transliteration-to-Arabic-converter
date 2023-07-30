
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
  

inputElement.addEventListener('input', () => {

    let transliterationInput = inputElement.value;
    let transliterationInputArray = transliterationInput.split('');
    let output = [];
    let previousLetter = "";
    previousLetterHasVowelIsTrue = false;

    //loop through the inputArray
    for (let i = 0; i < transliterationInputArray.length; i++) {
        let letter = transliterationInputArray[i];
        let nextLetter = transliterationInputArray[i+1]
        
        if (TANWEEN.has(letter+nextLetter) && transliterationInputArray[i+2] == "*"){
            output.push(TANWEEN.get(letter+nextLetter))
            i++
        }

        //check if for 1 or 2 letter transliteration
        if (LETTERS.has(letter+nextLetter)) {
            if (letter+nextLetter == previousLetter && previousLetterHasVowelIsTrue == false) {
                console.log(letter+nextLetter)
                output.push(SHADDAAD);
                previousLetter = previousLetter+previousLetter
                previousLetterHasVowelIsTrue = false;
            } else if (letter+nextLetter != previousLetter && LETTERS.has(previousLetter) && !VOWELS.has(nextLetter)) {
                output.push(LETTERS.get(letter+nextLetter) + SUKUUN);
                previousLetter = letter+nextLetter;
                previousLetterHasVowelIsTrue = false;
            } else {
                output.push(LETTERS.get(letter+nextLetter));
                previousLetter = letter+nextLetter;
                previousLetterHasVowelIsTrue = false;
            }
            i++;
        } else if (LETTERS.has(letter)) {
            if (letter == previousLetter && previousLetterHasVowelIsTrue == false) {
                output.push(SHADDAAD);
                previousLetter = previousLetter+previousLetter
            } else if (letter != previousLetter && letter != nextLetter && LETTERS.has(previousLetter)&& !VOWELS.has(nextLetter)) {
                output.push(LETTERS.get(letter) + SUKUUN);
                previousLetter = letter;
                previousLetterHasVowelIsTrue = false;
            } else {
                output.push(LETTERS.get(letter));
                previousLetter = letter;
                previousLetterHasVowelIsTrue = false;
            }
            
        } else if (STRETCHED_VOWELS.has(letter+nextLetter)) {
            output.push(STRETCHED_VOWELS.get(letter+nextLetter));
            previousLetter = letter;
            previousLetterHasVowelIsTrue = false;
            i++
        } else if (VOWELS.has(letter)) {
            output.push(VOWELS.get(letter));
            previousLetterHasVowelIsTrue = true;
        }

        //check for space
        if (letter == " ") {
            output.push(" ")
            previousLetter = letter;
        }
        //console.log("previous letter is: ", previousLetter);
        console.log(output);





        outputElement.value = output.join('').toString();


      } 
    

    console.log('User is typing:', inputElement.value);
});
