const LETTERLIST = [
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
    ["y", "ي"],
    ["a, o", "\u064E"],
    ["i", "\u0650"],
    ["u", "\u064F"],
    ["an*", "ً"],
    ["in*", "ٍ"],
    ["un*", "ٌ"],
    ["aa", "\u064Eاْ"],
    ["ii", "\u0650يْ"],
    ["uu", "\u064Fوْ"],
    ["Shaddaad", "ّ"],
    ["Sukoon", "ْ"]
]
let info = document.getElementById("info")
info
for (const [transliteration, arabicLetter] of LETTERLIST) {
    info.innerHTML += `
        <li class="cell">
            <div class="letter">${arabicLetter}ِ</div>
            <div class="transliteration">${transliteration}</div>
        </li>
    `;
}

