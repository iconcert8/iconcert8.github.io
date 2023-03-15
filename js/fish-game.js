class Fish {
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 20;
    this.halfW = this.w/2;
    this.halfH = this.h/2;
    this.images = [new Image(), new Image()];
    this.images[0].src = "./img/left-fish.png";
    this.images[1].src = "./img/right-fish.png";
    this.image = this.images[0];
  }

  move(x, y){
    if(this.x < x) this.image = this.images[1];
    else if(this.x > x) this.image = this.images[0];
    this.x = x;
    this.y = y;
  }

  draw(){
    this.ctx.shadowOffsetX = 5;
    this.ctx.shadowOffsetY = 5;
    this.ctx.shadowColor = 'black';
    this.ctx.shadowBlur = 5;
    this.ctx.drawImage(this.image, this.x-this.halfW, this.y-this.halfH, this.w, this.h);
  }

  checkCollision(targetX, targetY){
    if((this.x - this.halfW - 2 <= targetX && (this.x + this.halfW + 2) >= targetX)
      && (this.y - this.halfH - 2 <= targetY && (this.y + this.halfH + 2) >= targetY)){
      return true;
    }
    return false;
  }
};

class Feed{
  constructor(ctx, x, y, maxY){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.maxY = maxY;
    this.radius = 3;
  }

  moveDown(){
    if(Math.abs(this.maxY - this.y) >= 1){
      this.y += 0.4;
    }
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.stroke();
  }
}

function startFishGame(canvas){
  const ctx = canvas.getContext("2d");
  const fish = new Fish(ctx, canvas.width/2, canvas.height/2);
  const feed = new Feed(ctx, 50, 0, canvas.height-5);
  const targetFeeds = [feed];
  canvas.addEventListener(
    'click', 
    (event)=>{
      targetFeeds.push(
        new Feed(
          ctx, 
          event.pageX-canvas.offsetLeft, 
          event.pageY-canvas.offsetTop, 
          canvas.height-5)
        );
      targetFeeds.sort(
        (a, b)=>{
          adist = Math.sqrt(Math.pow(fish.x - a.x, 2) + Math.pow(fish.y - a.y, 2));
          bdist = Math.sqrt(Math.pow(fish.x - b.x, 2) + Math.pow(fish.y - b.y, 2));
          return adist - bdist;
        }
      );
    }, 
    false);

  let targetX = 0;
  let targetY = 0;
  setInterval(()=>{
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the target to feed that is not empty
    if(targetFeeds.length != 0){
      targetX = targetFeeds[0].x;
      targetY = targetFeeds[0].y;
    }

    // Check target point is reached
    if(fish.checkCollision(targetX, targetY)){
      targetFeeds.shift();
      // Refresh random target
      targetX = Math.floor(Math.random()*(canvas.width - fish.w));
      targetY = Math.floor(Math.random()*(canvas.height - fish.h));
    }else{
      // Move to target
      let offsetX = targetX - fish.x;
      let offsetY = targetY - fish.y;
      let vector = Math.sqrt(offsetX*offsetX + offsetY*offsetY);
      let nextX = fish.x + offsetX/vector;
      let nextY = fish.y + offsetY/vector;
      fish.move(nextX, nextY);
    }
    // Draw all object
    fish.draw();
    targetFeeds.forEach(f=>{f.moveDown(); f.draw();});
    drawInfo(ctx);
  }, 27);

  function drawInfo(ctx){
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.font = "8px Arial"; 
    ctx.fillStyle = "white";
    ctx.fillText("클릭하여 먹이를 줘보세요", 150, 16);
  }
}


