import Game from "./game";
import Levels from "./levels";
import JellyHero from "./player_control"
import { merge } from 'lodash';
import 'firebase/database';
import * as firebase from 'firebase/app';




var config = {
  apiKey: "AIzaSyCEppeHF1lnm_ZLt00I8Ry_ihtar3O5utQ",
  authDomain: "squareboi-62f18.firebaseapp.com",
  databaseURL: "https://squareboi-62f18.firebaseio.com",
  projectId: "squareboi-62f18",
  storageBucket: "squareboi-62f18.appspot.com",
  messagingSenderId: "995784189808"
};

firebase.initializeApp(config);
var firebaseDB = firebase.database();

const deepDupArray = (arr) => {
    let output = [];
    for (var i = 0; i < arr.length; i++) {
      if(Array.isArray(arr[i])) {
        output.push(deepDupArray(arr[i]));
      }
      else {
        output.push(arr[i]);
      }
    }
  
    return output;
  };

  (function() {
    var requestAnimationFrame = (
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame
    );
    window.requestAnimationFrame = requestAnimationFrame;
})();
  
  // World Properties
  var mapSize = {tw: 56, th: 31.5};
  var tileSize = 19.4;
  var halfTileSizeH = 7.6;
  var halfTileSizeW = 15.0; 
  var unitLength = tileSize;
  var friction = 0.8;
  var gravity = 0.3;
  var acceleration = 1.2;
  var prevWelcomeMsgInterval;
  var prevLevelMsgInterval;
  
  
  document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("keydown", (e) => {
      keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", (e) => {
      keys[e.keyCode] = false;
    });

    document.getElementById('game-over-yes').addEventListener("click", (e) => {
      const modal = document.getElementById('game-over-modal');
      modal.style.display = 'none';
      restartGame();
      requestAnimationFrame(update);
    });
    document.getElementById('game-over-no').addEventListener("click", (e) => {
      const modal = document.getElementById('game-over-modal');
      modal.style.display = 'none';
    });
  
  
    const canvas = document.getElementById("super-jelly-hero");
    const context = canvas.getContext("2d");
    canvas.width = mapSize.tw * tileSize;
    canvas.height = mapSize.th * tileSize;
  
    let keys = [];
    let highScores;
    const jellyHero = new JellyHero(25, 40);
    const jellyHeroGame = new Game(mapSize, tileSize, unitLength, friction, gravity, acceleration, jellyHero);
    let levels = merge({}, Levels);
    let currentLevel = 0;
    let welcomeLevelText = `Welcome to level ${currentLevel}`;
    let initialLevelState = deepDupArray(levels[currentLevel]);
    // let startTime = Date.now();
    let startTime = 0

    const timer = () => {

      // let time = Date.now()
      // let zero = startTime
        // if(currentLevel > 0) {
        //   time = time()
        // }
        // return (Date.now() - startTime) / 1000;

        // let i = 1
        //   let int = setInterval(() => {
        //     i += 1;
        //   },100);

          startTime += 0.0167
          return parseFloat(startTime.toFixed(3));
    };


    prevLevelMsgInterval = window.setInterval( () => {
      levelMessage = '';
    }, 10000);

    const restartLevel = () => {
      jellyHeroGame.jellyDead = false;
      levels[currentLevel] = deepDupArray(initialLevelState);
  
      jellyHeroGame.coinCounter = 0;
      [jellyHero.x, jellyHero.y, jellyHero.velocityX, jellyHero.velocityY] = [25, canvas.height - 70, 0, 0];
    };

    const jellyWalk = () => {

      let xInt = 50
        setInterval(() => {
          xInt += 1
        },100);
      [jellyHero.x, jellyHero.y, jellyHero.velocityX, jellyHero.velocityY] = [xInt, canvas.height - 70, 0, 0];
    }

    const restartGame = () => {
      location.reload();
    };
  
    const animations = () => {
      jellyHeroGame.animatePortal()
      jellyHeroGame.animateCoin()
    }

    let levelMessage = jellyHeroGame.drawLevelMessages(currentLevel);

    const removeLowestScore = () => {
      firebaseDB.ref('/scores/').once('value').then( snap => {
        highScores = snap.val();
        const scores = Object.keys(highScores)
          .map(el => parseInt(el))
          .sort((a,b) => a - b);
        const lowestScore = scores[scores.length - 1].toString();
        const scoreRefs = firebaseDB.ref('scores/' + lowestScore);
  
        scoreRefs.remove().then( retrieveHighScores() );
      });
    };
    // removeLowestScore()
  
    const writeScore = (username, score) => {
      const scoreRefs = firebaseDB.ref('scores/' + `${score * 1000}`);
      scoreRefs.set(username);
    };

    // writeScore('Klare!!!', 422.827)
  
    const displayHighScores = (highScores) => {
      const scoresTable = document.getElementById('scores-table');
  
      if(scoresTable.childElementCount > 0) {
        while(scoresTable.hasChildNodes()) { scoresTable.removeChild(scoresTable.lastChild); }
      }
  
      const scores = Object.keys(highScores)
        .map(el => parseInt(el))
        .sort((a,b) => a - b);
      let row, usernameCell, scoreCell;
  
      for (var i = 0; i < scores.length; i++) {
        row = scoresTable.insertRow(i);
        usernameCell = row.insertCell(0);
        scoreCell = row.insertCell(1);
  
        usernameCell.innerHTML = highScores[scores[i]];
        scoreCell.innerHTML = scores[i] / 1000;
      }
    };
  
    const retrieveHighScores = () => {
      firebaseDB.ref('/scores/')
      .once('value').then( snap => {
        highScores = snap.val();
        displayHighScores(highScores);
      });
    };
  
    retrieveHighScores();

   const drawIntroMessage = () => {
      let msg = ('Press "A" to move left, "D" to move right and "W" to jump!');
      let msg2 = 'Hello young jelly hero, your brave, young daughter has gotten lost while exploring in the woods!'
      let msg3 = 'Your mission is simple, collect the all the coins and obtain the key to'
      let msg4 = 'unlock the portal and find your lost daughter'
      let msg5 = 'Race to get there in the shortest time!'
      context.fillText(msg2, 85, 70);
      context.fillText(msg3, 200, 100);
      context.fillText(msg4, 330, 130);
      context.fillText(msg5, 360, 160);
      context.fillText(msg, 270, 220);


    }


    const update = () => {
      if(keys[82]) { restartGame(); }

      
      if(jellyHeroGame.jellyDead){restartLevel()}
      if(jellyHeroGame.portalTouch) {
        currentLevel += 1;
        if(currentLevel === 7) jellyHero.jellyWalk()

        if(currentLevel > Object.keys(levels).length - 1) {
          jellyHeroGame.gameOver = true;
        }
        else {
          jellyHeroGame.portalTouch = false
          initialLevelState = deepDupArray(levels[currentLevel]);
          jellyHeroGame.coinCounter = 0;
          [jellyHero.x, jellyHero.y, jellyHero.velocityX, jellyHero.velocityY] = [25, canvas.height - 45, 0, 0];

          welcomeLevelText = `Welcome to level ${currentLevel}`;
          levelMessage = jellyHeroGame.drawLevelMessages(currentLevel);
          context.font = '40px';

          window.clearInterval(prevLevelMsgInterval);
          prevLevelMsgInterval = window.setInterval( () => {
            levelMessage = '';
          }, 10000);
        }

      } 

      // if(jellyHeroGame.gameOver) {

      
        
        if(currentLevel > Object.keys(levels).length - 1) {
          const finalTime = timer();
          const modal = document.getElementById('game-over-modal');
    
          const stopPlaying = (e) => {
            const keyN = 78;
            if(e.keyCode === keyN) {
              e.currentTarget.removeEventListener(e.type, stopPlaying);
              const modal = document.getElementById('game-over-modal');
              modal.style.display = 'none';
            }
          };
    
          const playAgain = (e) => {
            const keyR = 89;
            if(e.keyCode === keyR) {
              e.currentTarget.removeEventListener(e.type, playAgain);
              const modal = document.getElementById('game-over-modal');
              modal.style.display = 'none';
              restartGame();
              // update();
            }
          };
    
          document.body.addEventListener("keydown", playAgain);
          document.body.addEventListener("keydown", stopPlaying);

          welcomeLevelText = '';
          context.clearRect(0, 0, canvas.width, canvas.height);   

          context.font = '60px VT323';
          context.fillStyle = 'yellow';
          context.fillText('Congratulations!!! You win!', 200, 100);
          // context.font = '50px';

  
          document.body.removeEventListener("keydown", playAgain);
          document.body.removeEventListener("keydown", stopPlaying);
  
          const scoreTableTds = document.getElementsByTagName('td');
          const lowestScore = Number(scoreTableTds[scoreTableTds.length - 1].innerHTML);
          const numHighScores = document.getElementById('scores-table').lastChild.childElementCount;
  
          if(finalTime < lowestScore) {
            let username = '';
            const input = document.createElement('input');
            const submitBtn = document.createElement('button');
  
            input.setAttribute('type', 'text');
            input.addEventListener('change', (e) => {
              username = e.currentTarget.value;
            });
  
            submitBtn.innerHTML = 'Submit Your Score';
            submitBtn.addEventListener('click', (e) => {
              writeScore(username, finalTime);
              if(numHighScores >= 10) {
                removeLowestScore();
              }
              else {
                retrieveHighScores();
              }
  
              modal.removeChild(submitBtn);
              modal.removeChild(input);
  
              const thanks = document.createElement('p');
              thanks.innerHTML = "Thanks for playing!";
              modal.appendChild(thanks);
            });
  
            modal.appendChild(input);
            modal.appendChild(submitBtn);
          }
  
          currentLevel = 0;
          levels = merge({}, Levels);
          initialLevelState = deepDupArray(levels[currentLevel]);
          startTime = 0;
        // }
        // else {
          context.fillStyle = 'yellow';
          // context.fillText('Game Over!', canvas.width / 2 - 80, 40);
        // }
  
        modal.style.display = 'block';
      } else {

      context.clearRect(0, 0, canvas.width, canvas.height);
      jellyHero.update(canvas, context, keys, friction, gravity);
      
        jellyHeroGame.drawLevel(levels[currentLevel]);
        jellyHeroGame.drawBorders();
  
        context.font = '24px VT323';
        context.fillStyle = 'gray';
        
        if (currentLevel > 0) {
          context.fillText(`${timer()}`, 1000, 30);
        }
  
        context.fillStyle = 'yellow';
        context.fillText(welcomeLevelText, 450, 30);
        context.save();
        if (currentLevel < 1) {
          drawIntroMessage()
        }

        context.font = '30px VT323';
        context.fillText(levelMessage, 250, 70);


  
        context.restore();
  
        requestAnimationFrame(update);
      }
    };
    if(currentLevel === 7) jellyHero.jellyWalk()

    animations()
    update();

  });
