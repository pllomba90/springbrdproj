const wholeGame = document.getElementById("game");
let card1 = null;
let card2 = null;
let flips = 0;
let noClicking = false;
const colors = [
    "purple",
    "orange",
    "yellow",
    "black",
    "red",
    "purple",
    "orange",
    "yellow",
    "black",
    "red"
];

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
let shuffledColors = shuffle(colors);

function createDivsWithColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", clickedCard);
        wholeGame.append(newDiv);
    }
}
function clickedCard(e) {
    if (noClicking) return;
    if (e.target.classList.contains("flipped")) return;

    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!card1 || !card2) {
        currentCard.classList.add("flipped");
        card1 = card2 || currentCard;
        card2 = currentCard === card1 ? null : currentCard;
    }
    if (card1 && card2) {
        noClicking = true;
        let gif1 = card1.className;
        let gif2 = card2.className;

        if (gif1 == gif2) {
            flips += 2;
            card1.removeEventListener("click", clickedCard);
            card2.removeEventListener("click", clickedCard);
            card1 = null;
            card2 = null;
            noClicking = false;
        } else {
            setTimeout(function () {
                card1.style.backgroundColor = "";
                card2.style.backgroundColor = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1 = null;
                card2 = null;
                noClicking = false;
            }, 1000);
        }
    }
    if (flips === colors.length) alert("Game Over!");
}
      createDivsWithColors(shuffledColors);