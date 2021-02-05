//get url
    function GetQueryString(name)
    {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);//search
     if(r!=null)return  unescape(r[2]); return null;
    }

     var n = GetQueryString('n');
    //img
     document.getElementById("emoji").src="e"+n+".jpg";

    // <date>
     var today= new Date();
     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
     document.getElementById("p1").innerHTML = date;

    //  <design of the page>
    //  document.body.style.backgroundColor = "#f1dec2";
    //  p1.style.fontSize = "25pt";
    //  p1.style.fontFamily = "Comic Sans MS";
    //  p1.style.color = "#4c729c";

    // <emoji rain>
      function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
      }
      
      const ElementPosition = function ElementPosition(
        element,
        x,
        y,
        dWidth,
        dHeight,
        yVelocity
      ) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.yVelocity = yVelocity;
      };
      
      ElementPosition.prototype.updateY = function updateY() {
        this.y = this.y + this.yVelocity;
      };
      
      const EmojiCatRain = function EmojiCatRain() {
        this.canvas = document.getElementById("canvasOne");
        let w = window.innerWidth;
        let h = 2500;
        this.canvas.height = h;
        this.canvas.width = w;
      
        let catElemBuf = [];
      
        let catEmojis = ["😷", "😟", "🤔", "🥰","😃","😪"];
      
        let ctx = this.canvas.getContext("2d");
      
        ctx.fillStyle = "#f1dec2";
        ctx.fillRect(0, 0, w - 1, h - 1);
      
        window.requestAnimationFrame(function draw() {
          let numNewEmojis = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
          let newEmojisIndex = getRandomIntInclusive(0, 10);
      
          for (let i = 0; i < numNewEmojis[newEmojisIndex]; i++) {
            let x = getRandomIntInclusive(0, w - 1);
            let y = -42;
            let size = getRandomIntInclusive(16, 42);
            let dWidth = size;
            let dHeight = size;
            let yVelocity = getRandomIntInclusive(3, 10);
            let catElem = catEmojis[getRandomIntInclusive(0, catEmojis.length - 1)];
            let elementPosition = new ElementPosition(
              catElem,
              x,
              y,
              dWidth,
              dHeight,
              yVelocity
            );
            catElemBuf.push(elementPosition);
          }
      
          catElemBuf.forEach(element => {
            element.updateY();
          });
      
          catElemBuf = catElemBuf.filter(elem => {
            if (elem.y > h + 42) {
              return false;
            }
            return true;
          });
      
          // ctx.fillStyle = rgba(255,255,255,0);
          ctx.fillRect(0, 0, w - 1, h - 1);
      
          catElemBuf.forEach(elem => {
            ctx.font = elem.dWidth + "px serif";
            ctx.fillText(elem.element, elem.x, elem.y);
          });
      
          window.requestAnimationFrame(draw);
        });
      }; // EmojiCatRain
      
      // Allow inclusion in browers and node
      if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = {
          RandomColorAnimation
        };
      } else {
        window.EmojiCatRain = EmojiCatRain;
      
        window.onload = function onload() {
          window.ecr = new EmojiCatRain();
        };
      } //else

setTimeout(function() {
        $('#canvasOne').fadeOut('slow');
    }, 7000);


// const button = document.getElementById("userclick");
const weatherSection = document.getElementById("weatherContainer");
const newsSection = document.getElementById("newsContainer");

const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Pasadena&APPID=af28a81c6270e46710d7deb15b8c992a&units=imperial";
const newsURL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=Ud1GqPVZXUAFxAbZLzK9NhtWwU47a5wd";

// button.addEventListener("click", fetchWeather);

window.setTimeout(fetchWeather, 2000);

function fetchWeather(){
  fetch(weatherURL).
    then((result) => {
      console.log("Result from Weather API: ");
      console.log(result);
      return result.json();
    }).
    then((data) => {
      console.log("JSON data from OpenWeatherMap: ");
      console.log(data);

      displayWeather(data);
      return data;
    }).
    then((data) => {
      window.setTimeout(fetchNews, 2000);
    }).catch((error) => {
      console.error(error);
    });
}

function displayWeather(data){
  while(weatherSection.firstChild){
    weatherSection.removeChild(weatherSection.firstChild);
  }

  const temperature = data.main.temp;

  const tempDisplay = document.createElement("p");
  tempDisplay.innerText = "It's " + temperature + "°";

  weatherSection.appendChild(tempDisplay);
}

function fetchNews(){
  fetch(newsURL).
    then((result) => {
      console.log("Result from NYTimes API: ");
      console.log(result);
      return result.json();
    }).
    then((data) => {
      console.log("JSON data from NYTimes: ");
      console.log(data);

      displayNews(data);

    }).catch((error) => {
      console.error(error);
    });
}

function displayNews(data){
  while(newsSection.firstChild){
    newsSection.removeChild(newsSection.firstChild);
  }

  let iftttURL = "https://maker.ifttt.com/trigger/trigger_ifttt/with/key/cADMniz7EZSShbcVJ6RD12";
  const newsLink = data.results[0].url;

  const newsDisplay = document.createElement("a");
  newsDisplay.href = newsLink;
  newsDisplay.innerText = "Here's what's happening in the world";
  newsDisplay.target = "_blank";

  newsSection.appendChild(newsDisplay);

  $.ajax({url: iftttURL + "?value1=" + newsLink, success: function(result){alert(result)}});

  window.setTimeout(fetchRetro, 2000);
}

// const retrogradeButton = document.getElementById("mercuryRetrograde");
// retrogradeButton.addEventListener("click", fetchRetro);

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
    const isRetro = document.createElement('p');
    isRetro.innerText = "Uh oh... mercury is in retrograde. Here's a poem and a song to get you through.";

    poeArray.forEach(function (writePoe) {
        const li = document.createElement('li');
        li.textContent = writePoe;
        poePoem.appendChild(li);
    });

    console.log(poePoem);

    const app = document.querySelector('#poemDisplay');
    app.appendChild(isRetro);
    app.appendChild(poePoem);

    playRetro();

}

function displayDickinson(dataDickinson) {
    while(poemDisplay.firstChild) {
        poemDisplay.removeChild(poemDisplay.firstChild);
    }

    const dickinsonArray = dataDickinson[0].lines;
    const dickinsonPoem = document.createElement('ul');
    const isNotRetro = document.createElement('p');
    isNotRetro.innerText = "Phew! Mercury is not in retrograde. Here's a poem and a song to celebrate!";

    dickinsonArray.forEach(function (writeEmily) {
        const li = document.createElement('li');
        li.textContent = writeEmily;
        dickinsonPoem.appendChild(li);
    });

    console.log(dickinsonPoem);

    const app = document.querySelector('#poemDisplay');
    app.appendChild(isNotRetro);
    app.appendChild(dickinsonPoem);

    playNoRetro();

}

function playRetro() {
    const retroSongs = 
    ['https://kateladenheim.github.io/MDP-CreativeTech/rube-goldberg/songs/retrograde-winter.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/rube-goldberg/songs/retro-jaws.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/rube-goldberg/songs/retro-blue.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/rube-goldberg/songs/retro-billie.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/rube-goldberg/songs/retro-badday.mp3'];

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
    ['https://kateladenheim.github.io/MDP-CreativeTech/rube-goldberg/songs/noretrograde-spring.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/rube-goldberg/songs/noretro-lizzo.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/rube-goldberg/songs/noretro-glory.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/rube-goldberg/songs/noretro-blackeyedpeas.mp3',
    'https://kateladenheim.github.io/MDP-CreativeTech/rube-goldberg/songs/noretro-24k.mp3'];

    const getRandomFromNoRange = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };
    
    const randomNoRetroIndex = getRandomFromNoRange(0, noRetroSongs.length);
    
    console.log('Random song index is ', randomNoRetroIndex)
    
    const randomNoRetroSong = noRetroSongs[randomNoRetroIndex];
    new Audio(randomNoRetroSong).play();
}
      