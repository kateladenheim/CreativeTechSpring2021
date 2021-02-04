const retrogradeButton = document.getElementById("mercuryRetrograde");

retrogradeButton.addEventListener("click", fetchRetro);

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
            fetchPoe();
        } else {
            fetchDickinson();
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
        displayPoe(dataPoe);
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
        displayDickinson(dataDickinson);
    }).catch((error) => {
        console.error(error);
    });
}

function displayPoe(dataPoe) {
    while(poemDisplay.firstChild) {
        poemDisplay.removeChild(poemDisplay.firstChild);
    }

    const poeArray = dataPoe[0].lines;
    const poePoem = document.createElement('ul');

    poeArray.forEach(function (writePoe) {
        const li = document.createElement('li');
        li.textContent = writePoe;
        poePoem.appendChild(li);
    });

    console.log(poePoem);

    const app = document.querySelector('#poemDisplay');
    app.appendChild(poePoem);

    playRetro();

}

function displayDickinson(dataDickinson) {
    while(poemDisplay.firstChild) {
        poemDisplay.removeChild(poemDisplay.firstChild);
    }

    const dickinsonArray = dataDickinson[0].lines;
    const dickinsonPoem = document.createElement('ul');

    dickinsonArray.forEach(function (writeEmily) {
        const li = document.createElement('li');
        li.textContent = writeEmily;
        dickinsonPoem.appendChild(li);
    });

    console.log(dickinsonPoem);

    const app = document.querySelector('#poemDisplay');
    app.appendChild(dickinsonPoem);

    playNoRetro();

}

function playRetro() {
    const retroSongs = 
    ['https://kateladenheim.github.io/MDP-CreativeTech/project1/songs/retrograde-winter.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/project1/songs/retro-jaws.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/project1/songs/retro-blue.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/project1/songs/retro-billie.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/project1/songs/retro-badday.mp3'];

    const getRandomFromRange = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    
    const randomRetroIndex = getRandomFromRange(0, retroSongs.length);
    
    console.log('Random song index is ', randomRetroIndex)
    
    const randomRetroSong = retroSongs[randomRetroIndex];
    new Audio(randomRetroSong).play();
}

function playNoRetro() {
    const noRetroSongs = 
    ['https://kateladenheim.github.io/MDP-CreativeTech/project1/songs/noretrograde-spring.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/project1/songs/noretro-lizzo.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/project1/songs/noretro-glory.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/project1/songs/noretro-blackeyedpeas.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/project1/songs/noretro-24k.mp3'];

    const getRandomFromNoRange = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    
    const randomNoRetroIndex = getRandomFromNoRange(0, noRetroSongs.length);
    
    console.log('Random song index is ', randomNoRetroIndex)
    
    const randomNoRetroSong = noRetroSongs[randomNoRetroIndex];
    new Audio(randomNoRetroSong).play();
}