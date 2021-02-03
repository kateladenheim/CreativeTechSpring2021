const retrogradeButton = document.getElementById("mercuryRetrograde");

retrogradeButton.addEventListener("click", fetchRetro);
retrogradeButton.addEventListener("click", fetchPoe);
retrogradeButton.addEventListener("click", fetchDickinson);

const retrogradeURL = "https://mercuryretrogradeapi.com";
const poeURL = "https://poetrydb.org/author,random/Edgar%20Allan%20Poe;1";
const dickinsonURL = "https://poetrydb.org/author,random/Emily%20Dickinson;1";

function fetchRetro() {
    fetch(retrogradeURL).
    then((result) => {
        console.log("Result from Retrograde API:")
        console.log(result);
        return result.json();
    }).
    then((dataRetro) => {
        console.log("JSON data from the DB:")
        console.log(dataRetro);
        if (dataRetro.is_retrograde == true) {
            displayPoe;
        } else {
            displayDickinson;
        }
    }).catch((error) => {
        console.error(error);
    });
}

function fetchPoe() {
    fetch(poeURL).
    then((result) => {
        console.log("Result from Poe API:")
        console.log(result);
        return result.json();
    }).
    then((dataPoe) => {
        console.log("JSON data from Poe DB:")
        console.log(dataPoe);
    }).catch((error) => {
        console.error(error);
    });
}

function fetchDickinson() {
    fetch(dickinsonURL).
    then((result) => {
        console.log("Result from Dickinson API:")
        console.log(result);
        return result.json();
    }).
    then((dataDickinson) => {
        console.log("JSON data from Dickinson DB:")
        console.log(dataDickinson);
    }).catch((error) => {
        console.error(error);
    });
}

function displayPoe(dataPoe) {
    while(poemDisplay.firstChild) {
        poemDisplay.removeChild(poemDisplay.firstChild);
    }

    const poeLines = dataPoe.Object[0].lines;

    const poePoem = document.createElement('p');
    poePoem.src = poeLines;

    poemDisplay.appendChild(poePoem);

}

function displayDickinson(dataDickinson) {
    while(poemDisplay.firstChild) {
        poemDisplay.removeChild(poemDisplay.firstChild);
    }

    const dickinsonLines = dataDickinson.Object[0].lines;

    const dickinsonPoem = document.createElement('p');
    dickinsonPoem.src = dickinsonLines;

    poemDisplay.appendChild(dickinsonPoem);

}

// function displayDickinson(dataDickinson) {
//     while(poemDisplay.firstChild) {
//         poemDisplay.removeChild(poemDisplay.firstChild);
//     }

//     const dickinsonLines = dataDickinson.

// }

// function displayCocktail(data) {
//     while(cocktailSection.firstChild) {
//         cocktailSection.removeChild(cocktailSection.firstChild);
//     }

//     const drName = data.drinks[0].strDrink;
//     const drImage = data.drinks[0].strDrinkThumb;
//     const drInstr = data.drinks[0].strInstructions;

//     const drTitle = document.createElement('h2');
//     drTitle.innerText = drName;

//     const drImg = document.createElement("img");
//     drImg.src = drImage;
//     drImg.alt = drName;

//     const drPar = document.createElement('p');
//     drPar.innerText = drInstr;

//     cocktailSection.appendChild(drTitle);
//     cocktailSection.appendChild(drImg);
//     cocktailSection.appendChild(drPar);
// }