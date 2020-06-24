window.onload = function() {
  const game = document.getElementById('game');
  const ctx = game.getContext('2d');
  const audioCoin = new Audio('sounds/coin.wav');
  const audio1up = new Audio('sounds/1up.wav');

  var
  playerPosX = Math.floor(Math.random()* 25),
  playerPosY = Math.floor(Math.random()* 25),
  speedX = 0,
  speedY = 0, 
  velocity = 1,

  chunk = 20,
  grid = 25,
  countAlternateSong = 0,
  points = 0,

  fruits = [],
  fruitFrequency = 5000;

  setInterval(gameScript, 60); 
  setInterval(fruitSpawn, fruitFrequency);










  function fruitSpawn() {
    fruits.unshift({
      id: Math.floor(Math.random() * 10000000),
      x: Math.floor(Math.random() * grid),
      y: Math.floor(Math.random() * grid)
    })

    console.log(`Fruta(${fruits[0].id}) adicionada na posição X:${fruits[0].x} Y:${fruits[0].y}`);
  
    ctx.fillStyle = '#72d06c';
    ctx.fillRect(fruits[0].x*chunk, fruits[0].y*chunk, chunk, chunk);
  }


  function fruitRemove(fruitId) {
    fruits.forEach(element => {
      if(fruitId == element.id) {
        fruits.splice(element, 1);
        console.log(`Fruta(${element.id}) removida na posição X:${element.x} Y:${element.y}`);
        ctx.clearRect(element.x*chunk, element.y*chunk, chunk, chunk)
      }
    })
  }


  function drawPlayer() {
    ctx.clearRect(playerPosX*chunk, playerPosY*chunk, chunk, chunk);
    playerPosX += speedX;
    playerPosY += speedY;
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(playerPosX*chunk, playerPosY*chunk, chunk, chunk);
  }


  function gameScript() {
    document.addEventListener('keydown', keyPush);
    document.addEventListener('keyup', keyUp);
    drawPlayer();
    //teleport between walls
    if(playerPosX < 0) {
      playerPosX = grid - 1;
    }
    if(playerPosX > grid - 1) {
      playerPosX = 0;
    }
    if(playerPosY < 0) {
      playerPosY = grid -1;
    }
    if(playerPosY > grid -1) {
      playerPosY = 0;
    }


    //verifica a colisão do player com a fruta
    fruits.forEach(element => {
      if(element.x === playerPosX && element.y === playerPosY) {
        fruitRemove(element.id);

        points++;
        document.getElementById('pointsID').innerHTML = points;

        if(points % 10 == 0) {
          audio1up.play();
        } else {
          audioCoin.play();
        }
      }
    })





    //controls of game
    function keyUp() {
      speedY = 0;
      speedX = 0;
    }

    function keyPush(event) {
      switch (event.keyCode) {
        case 37:
          speedX = -velocity;
          speedY = 0;
          break;
        //left

        case 38:
          speedX = 0;
          speedY = - velocity;
          break;
        //up

        case 39:
          speedX = velocity;
          speedY = 0;
          break;
        //right

        case 40:
          speedX = 0;
          speedY = velocity;
          break;
        //down
      }
    }
  }
}