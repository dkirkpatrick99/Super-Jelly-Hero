import Game from "./game";
import Levels from "./levels";
import JellyHero from "./player_control"
import { merge } from 'lodash';


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
    let startTime = Date.now();
  
    let numCoinsInLevel = levels[currentLevel].reduce((numCoins, row) => {
      return numCoins += row.filter(el => el === 'c').length;
    }, 0);
  
    const timer = () => {
      return (Date.now() - startTime) / 1000;
    };

    const restartLevel = () => {
      jellyHeroGame.gameOver = false;
      levels[currentLevel] = deepDupArray(initialLevelState);
  
      jellyHeroGame.coinCounter = 0;
      [jellyHero.x, jellyHero.y, jellyHero.velocityX, jellyHero.velocityY] = [25, canvas.height - 45, 0, 0];
    };
  
    const animations = () => {
      jellyHeroGame.animatePortal()
      jellyHeroGame.animateCoin()
    }
    
    const update = () => {
      if (jellyHeroGame.gameOver) restartLevel();
      if(jellyHeroGame.portalTouch) {
        currentLevel += 1;
        if(currentLevel >= 6) {
          currentLevel = 0
        }
        jellyHeroGame.portalTouch = false
        initialLevelState = deepDupArray(levels[currentLevel]);
        jellyHeroGame.coinCounter = 0;
        [jellyHero.x, jellyHero.y, jellyHero.velocityX, jellyHero.velocityY] = [25, canvas.height - 45, 0, 0];
      } 
      context.clearRect(0, 0, canvas.width, canvas.height);
      jellyHero.update(canvas, context, keys, friction, gravity);
      
        jellyHeroGame.drawLevel(levels[currentLevel]);
        jellyHeroGame.drawBorders();
  
        context.font = '24px VT323';
        context.fillStyle = 'gray';
        context.fillText(`${timer()}`, 200, 30);
  
        context.fillStyle = 'yellow';
        context.fillText(welcomeLevelText, canvas.width / 3, 30);
        context.save();
  
        context.restore();
  
        requestAnimationFrame(update);
      };
    animations()
    update();
  });
