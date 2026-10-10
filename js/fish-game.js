// Logical size. The canvas is scaled by devicePixelRatio for crisp drawing.
const W = 400;
const H = 200;
const SAND_Y = H - 20;

class Fish {
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = 36;
    this.h = 22;
    this.halfW = this.w/2;
    this.halfH = this.h/2;
    this.dir = -1; // -1: left, 1: right
  }

  move(x, y){
    if(this.x < x) this.dir = 1;
    else if(this.x > x) this.dir = -1;
    this.x = x;
    this.y = y;
  }

  draw(t){
    const ctx = this.ctx;
    const hw = this.halfW;
    const hh = this.halfH;
    const wag = Math.sin(t/3) * 3;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.dir, 1);

    // Tail
    ctx.beginPath();
    ctx.moveTo(-hw + 4, 0);
    ctx.lineTo(-hw - 9, -9 + wag);
    ctx.quadraticCurveTo(-hw - 5, wag, -hw - 9, 9 + wag);
    ctx.closePath();
    ctx.fillStyle = "#FF7A2F";
    ctx.fill();

    // Dorsal fin
    ctx.beginPath();
    ctx.moveTo(-6, -hh + 2);
    ctx.quadraticCurveTo(0, -hh - 7, 8, -hh + 2);
    ctx.fillStyle = "#FF7A2F";
    ctx.fill();

    // Body
    const body = new Path2D();
    body.ellipse(0, 0, hw, hh, 0, 0, 2 * Math.PI);
    const grad = ctx.createLinearGradient(0, -hh, 0, hh);
    grad.addColorStop(0, "#FFA552");
    grad.addColorStop(1, "#FF7A2F");
    ctx.fillStyle = grad;
    ctx.fill(body);

    // Stripes (clipped to body)
    ctx.save();
    ctx.shadowColor = "transparent";
    ctx.clip(body);
    ctx.fillStyle = "white";
    ctx.fillRect(5, -hh, 5, this.h);
    ctx.fillRect(-7, -hh, 5, this.h);
    ctx.fillStyle = "#3A2A20";
    ctx.fillRect(4, -hh, 1, this.h);
    ctx.fillRect(10, -hh, 1, this.h);
    ctx.fillRect(-8, -hh, 1, this.h);
    ctx.fillRect(-2, -hh, 1, this.h);
    ctx.restore();

    // Side fin
    ctx.beginPath();
    ctx.ellipse(-1, 4, 5, 2.5, 0.5 + wag/20, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF8F3F";
    ctx.fill();

    // Eye
    ctx.beginPath();
    ctx.arc(hw - 6, -3, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(hw - 5.5, -3, 1.6, 0, 2 * Math.PI);
    ctx.fillStyle = "#222";
    ctx.fill();

    ctx.restore();
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
    this.radius = 2.5;
  }

  moveDown(){
    if(this.y < this.maxY){
      this.y += 0.4;
    }
  }

  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#9C6B3C";
    this.ctx.fill();
  }
}

// Seeded random so the decoration looks the same on every load
let seed = 8;
function rand(){
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
}

function makeCoral(x, color){
  const segments = [];
  const tips = [];
  const grow = (x, y, angle, len, width, depth)=>{
    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;
    segments.push({x, y, ex, ey, width});
    if(depth == 0){
      tips.push({x: ex, y: ey, r: width * 0.9});
      return;
    }
    grow(ex, ey, angle - 0.3 - rand()*0.3, len * 0.75, width * 0.75, depth - 1);
    grow(ex, ey, angle + 0.3 + rand()*0.3, len * 0.75, width * 0.75, depth - 1);
  };
  grow(x, SAND_Y + 4, -Math.PI/2 + (rand()-0.5)*0.3, 16 + rand()*6, 5, 3);
  return {color, segments, tips};
}

const corals = [
  makeCoral(48, "#FF6F91"),
  makeCoral(95, "#FFB86B"),
  makeCoral(318, "#C77DFF"),
  makeCoral(360, "#FF6F91"),
];

const seaweeds = [
  {x: 22, height: 70, phase: 0},
  {x: 140, height: 50, phase: 1.5},
  {x: 262, height: 80, phase: 3},
  {x: 290, height: 55, phase: 4.2},
];

const rocks = [
  {x: 120, rx: 14, ry: 8, color: "#8A9BA8"},
  {x: 210, rx: 10, ry: 6, color: "#A3B1BC"},
  {x: 340, rx: 12, ry: 7, color: "#8A9BA8"},
];

const bubbles = Array.from({length: 10}, ()=>({
  x: 30 + rand()*(W - 60),
  y: rand()*H,
  r: 1 + rand()*2.5,
  speed: 0.2 + rand()*0.4,
}));

function drawBackground(ctx, t){
  // Water
  const water = ctx.createLinearGradient(0, 0, 0, H);
  water.addColorStop(0, "#7FDCD5");
  water.addColorStop(1, "#2FA9A2");
  ctx.fillStyle = water;
  ctx.fillRect(0, 0, W, H);

  // Light rays
  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  [60, 170, 290].forEach((x, i)=>{
    const shift = Math.sin(t/120 + i) * 10;
    ctx.beginPath();
    ctx.moveTo(x + shift, 0);
    ctx.lineTo(x + 30 + shift, 0);
    ctx.lineTo(x + 70, SAND_Y);
    ctx.lineTo(x + 20, SAND_Y);
    ctx.closePath();
    ctx.fill();
  });

  // Seaweed
  ctx.lineCap = "round";
  ctx.strokeStyle = "#2E9E6A";
  ctx.lineWidth = 4;
  seaweeds.forEach(s=>{
    ctx.beginPath();
    ctx.moveTo(s.x, SAND_Y + 4);
    const steps = 8;
    for(let i = 1; i <= steps; i++){
      const k = i / steps;
      const sway = Math.sin(t/25 + s.phase + k*3) * 6 * k;
      ctx.lineTo(s.x + sway, SAND_Y + 4 - s.height * k);
    }
    ctx.stroke();
  });

  // Corals
  corals.forEach(c=>{
    ctx.strokeStyle = c.color;
    ctx.fillStyle = c.color;
    c.segments.forEach(s=>{
      ctx.lineWidth = s.width;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.ex, s.ey);
      ctx.stroke();
    });
    c.tips.forEach(tip=>{
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, tip.r, 0, 2 * Math.PI);
      ctx.fill();
    });
  });

  // Sand
  ctx.beginPath();
  ctx.moveTo(0, SAND_Y);
  for(let x = 0; x <= W; x += 20){
    ctx.lineTo(x, SAND_Y + Math.sin(x/30) * 2);
  }
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fillStyle = "#F2D9A6";
  ctx.fill();

  // Rocks
  rocks.forEach(r=>{
    ctx.beginPath();
    ctx.ellipse(r.x, SAND_Y + 2, r.rx, r.ry, 0, Math.PI, 2 * Math.PI);
    ctx.fillStyle = r.color;
    ctx.fill();
  });

  // Bubbles
  ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
  ctx.lineWidth = 1;
  bubbles.forEach(b=>{
    b.y -= b.speed;
    if(b.y < -5){
      b.y = SAND_Y;
    }
    ctx.beginPath();
    ctx.arc(b.x + Math.sin(t/20 + b.r) * 2, b.y, b.r, 0, 2 * Math.PI);
    ctx.stroke();
  });
}

function startFishGame(canvas){
  const dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const fish = new Fish(ctx, W/2, H/2);
  const feed = new Feed(ctx, Math.floor(Math.random()*W), 0, SAND_Y - 2);
  const targetFeeds = [feed];
  canvas.addEventListener(
    'click',
    (event)=>{
      // CSS로 크기가 바뀌어도 맞도록 화면 좌표를 캔버스 좌표로 환산
      const rect = canvas.getBoundingClientRect();
      targetFeeds.push(
        new Feed(
          ctx,
          (event.clientX - rect.left) * W / rect.width,
          (event.clientY - rect.top) * H / rect.height,
          SAND_Y - 2)
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
  let t = 0;
  setInterval(()=>{
    t++;

    // Set the target to feed that is not empty
    if(targetFeeds.length != 0){
      targetX = targetFeeds[0].x;
      targetY = targetFeeds[0].y;
    }

    // Check target point is reached
    if(fish.checkCollision(targetX, targetY)){
      targetFeeds.shift();
      // Refresh random target
      targetX = fish.halfW + Math.floor(Math.random()*(W - fish.w));
      targetY = 35 + Math.floor(Math.random()*(SAND_Y - 50));
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
    shadowOff(ctx);
    drawBackground(ctx, t);
    drawInfo(ctx);
    shadowOn(ctx);
    targetFeeds.forEach(f=>{f.moveDown(); f.draw();});
    fish.draw(t);
  }, 27);

  function drawInfo(ctx){
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("클릭하여 먹이를 줘보세요", W/2, 22);
  }

  function shadowOn(ctx){
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 6;
  }

  function shadowOff(ctx){
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
  }
}
