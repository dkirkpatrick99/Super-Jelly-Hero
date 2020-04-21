class Game {
    constructor(mapSize, tileSize, unitLength, friction, gravity, acceleration, jellyHero) {
        this.canvas = document.getElementById("super-jelly-hero");
        this.context = this.canvas.getContext("2d");
        this.mapSize = mapSize;
        this.tileSize = tileSize;
        this.unitLength = unitLength;
        this.friction = friction;
        this.gravity = gravity;
        this.acceleration = acceleration;
        this.jellyHero = jellyHero;
        this.gameOver = false;
        this.jellyDead = false;
        this.coinCounter = 0;
        this.portalTouch = false;
        this.portal;
        this.interval;
        this.coin;

console.log("GAME FILE a;sdfjas;lkdfj;askf")
        this.tilesImg = new Image();
        this.tilesImg.src = "../assets/image/foresttiles01.png";
        this.tiles2Img = new Image();
        this.tiles2Img.src = "../assets/image/eobstacles2.png";
        this.tiles3Img = new Image();
        this.tiles3Img.src = "../assets/image/flevelmenu.png";
        this.keysImg = new Image();
        this.keysImg.src = "../assets/image/keytilesreal.png";
        this.coinsImg = new Image();
        this.coinsImg.src = "../assets/image/cointiles.png";
    }

    drawLevel(level) {
        this.jellyHero.onGround = false;
    
        // platforms
        for (var i = 0; i < level.length; i++) {
          for (var j = 0; j < level[0].length; j++) {
            if(level[i][j] === 1) {
              let platformX = j * 60.2;
              let platformY = i * 58.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 3.1;
    
              this.collisionResolution(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
    
              this.context.drawImage(this.tilesImg, 0, 173, 50, 50, platformX, platformY, platformWidth, platformHeight);
            } else if(level[i][j] === 2) {
              let platformX = j * 60.2;
              let platformY = i * 58.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 3.1;
    
              this.collisionResolution(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
    
              this.context.drawImage(this.tilesImg, 491, 190, 50, 50, platformX, platformY, platformWidth, platformHeight);
            } else if(level[i][j] === 3) {
              let platformX = j * 60.2;
              let platformY = i * 58.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 3.1;
    
              this.collisionResolution(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
    
              this.context.drawImage(this.tilesImg, 400, 190, 50, 50, platformX, platformY, platformWidth, platformHeight);
            } else if(level[i][j] === 4) {
              let platformX = j * 60.2;
              let platformY = i * 58.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 3.1;
    
              this.collisionResolution(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
    
              this.context.drawImage(this.tilesImg, 400, 71, 50, 50, platformX, platformY, platformWidth, platformHeight);
            } else if(level[i][j] === 5) {
              let platformX = j * 60.2;
              let platformY = i * 58.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 1.5;    
              this.collisionResolution(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
    
              this.context.drawImage(this.tilesImg, 0, 0, 50, 50, platformX, platformY, platformWidth, platformHeight);
            } else if(level[i][j] === 6) {
              let platformX = j * 60.2;
              let platformY = i * 58.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 1.5;    
              this.collisionResolution(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
    
              this.context.drawImage(this.tilesImg, 0, 50, 50, 50, platformX, platformY, platformWidth, platformHeight);
            } else if(level[i][j] === 7) {
              let platformX = j * 60.2;
              let platformY = i * 58.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 1.5;    
              this.collisionResolution(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
    
              this.context.drawImage(this.tilesImg, 180, 0, 50, 50, platformX, platformY, platformWidth, platformHeight);
            } else if(level[i][j] === 8) {
              let platformX = j * 60.2;
              let platformY = i * 58.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 1.5;    
              this.collisionResolution(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
    
              this.context.drawImage(this.tilesImg, 240, 173, 60, 60, platformX, platformY, platformWidth, platformHeight);
            } else if(level[i][j] === 9) {
              let platformX = j * 60.2;
              let platformY = i * 58.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 3.1; 
              this.collisionResolution(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
              this.context.drawImage(this.tilesImg, 0, 50, 50, 50, platformX, platformY, platformWidth, platformHeight);

            } else if(level[i][j] === 'h') {
              let platformX = j * 60.2;
              let platformY = i * 59.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 2;
    
              const dir = this.collisionCheck(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
              
              if(dir) this.jellyDead = true;

              this.context.drawImage(this.tiles2Img, 500, 460, 60, 60, platformX, platformY, platformWidth, platformHeight);

            } else if(level[i][j] === 'p') {
              let platformX = j * 57.9;
              let platformY = i * 54.5;
              let platformWidth = this.tileSize * 5;
              let platformHeight = this.tileSize * 5;
    
              const dir = this.collisionCheck(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
              if(dir) this.portalTouch = true
              
              this.context.drawImage(this.tiles3Img, 395, this.portal, 95, 95, platformX, platformY, platformWidth, platformHeight);
            
            } else if(level[i][j] === 'b') {
              let platformX = j * 60.2;
              let platformY = i * 58.5;
              let platformWidth = this.tileSize * 3.1;
              let platformHeight = this.tileSize * 3.1;
              
              const dir = this.collisionCheck(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
                if(dir) {
                  level[i][j] = 0;
                }
              this.context.drawImage(this.tilesImg, 65, 240, 50, 50, platformX, platformY, platformWidth, platformHeight);
            } else if(level[i][j] === 'k') {
              let platformX = j * 60.2 + 15;
              let platformY = i * 58.5 + 10;
              let platformWidth =  35;
              let platformHeight = 35;
              
              const dir = this.collisionCheck(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
                if(dir) {
                  level[i][j] = 0;
                  level[9][17] = 'p'
                }

              this.context.drawImage(this.keysImg, 1150, 200, 300, 350, platformX, platformY, platformWidth, platformHeight);
            } else if(level[i][j] === 'c') {
              let platformX = j * 60.2 + 18;
              let platformY = i * 59 + 10;
              let platformWidth =  18;
              let platformHeight = 18;
              
              const dir = this.collisionCheck(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
                if(dir) {
                  level[i][j] = 0;
                }
              this.context.drawImage(this.coinsImg, this.coin, 70, 85, 100, platformX, platformY, platformWidth, platformHeight);
            } 
          }
        }
      }
    
      drawBorders() {
        let borders = [];
    
        borders.push({
          x: 0,
          y: 0,
          width: 0,
          height: this.mapSize.th * this.tileSize
        });
        borders.push({
          x: 0,
          y: this.mapSize.th * this.tileSize,
          width: this.mapSize.tw * this.tileSize,
          height: 0
        });
        borders.push({
          x: this.mapSize.tw * this.tileSize,
          y: 0,
          width: 0,
          height: this.mapSize.th * this.tileSize
        });
    
        for (let j = 0; j < borders.length; j++) {
          let platformX = borders[j].x;
          let platformY = borders[j].y;
          let platformWidth = borders[j].width;
          let platformHeight = borders[j].height;
    
          this.collisionResolution(this.jellyHero, {x: platformX, y: platformY, width: platformWidth, height: platformHeight });
    
          this.context.fillRect(platformX, platformY, platformWidth, platformHeight);
        }
      }
   
      animateCoin() {
        let xInt = [530, 80, 160, 270, 365, 450, 530]
        let i = 0
          let int = setInterval(() => {
            i += 1
            this.coin = xInt[i%7];
          },100);
      }

      animatePortal() {
        let yInt = [630, 530, 430]
        let i = 0
          let int = setInterval(() => {
            i += 1
            this.portal = yInt[i%3];
          },200);
    
      }

      // stopMovement() {
        
      //   if (this.shift >= 630) {
      //     clearInterval(this.interval);
      //   }
      // }
    
      collisionCheck(objA, objB) {
          
        const vX = (objA.x + (objA.width / 2)) - (objB.x + (objB.width / 2));
        const vY = (objA.y + (objA.height / 2)) - (objB.y + (objB.height / 2));
        const hWidths = (objA.width / 2) + (objB.width / 2);
        const hHeights = (objA.height / 2) + (objB.height / 2);
        const oX = hWidths - Math.abs(vX);
        const oY = hHeights - Math.abs(vY);
        let colDir = null;
    
        if((Math.abs(vX) < hWidths) && (Math.abs(vY) < hHeights)) {
          if (oX >= oY) {
            if(vY > 0) {
              colDir = 't';
              objA.y += oY;
            }
            else {
              colDir = 'b';
              objA.y -= oY;
            }
        }
          else {
            if (vX > 0) {
              colDir = "l";
              objA.x += oX;
            }
            else {
              colDir = "r";
              objA.x -= oX;
            }
          }
        }
        return colDir;
      }
    
      collisionResolution(objA, objB) {
        let dir = this.collisionCheck(objA, objB);
    
        if (dir === "l" || dir === "r") {
          this.jellyHero.velocityX = 0;
          this.jellyHero.jumping = false;
        }
        else if (dir === "b") {
          this.jellyHero.onGround = true;
          this.jellyHero.jumping = false;
        }
        else if (dir === "t") {
          this.jellyHero.velocityY *= -1;
        }
      }

      drawLevelMessages(currentLevel) {
        switch(currentLevel) {
          case 0:
            return 'Press "A" to move left, "D" to move right and "W" to jump! Get the key!';
          case 1:
            return 'Hold "W" and the direction against a wall. Climb dat wall!!';
          case 2:
            return 'Woah, lava! Watch out!!';
          case 3:
            return 'Some will crumble beneath the pressure, but not you Jelly Hero!'
          case 4:
            return 'It\'s recess. The world\'s your jungle Jelly Hero!';
          case 5:
            return '';
          case 6:
          case 7:
            return 'Show me your ninja skills boi!';
          case 8:
            return 'Last level. Just go for it boi!';
        
          default:
            return '';
        }
      }

}

export default Game;

