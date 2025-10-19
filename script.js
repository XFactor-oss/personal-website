
/* PARTICLES CANVAS */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){canvas.width = innerWidth; canvas.height = innerHeight;}
window.addEventListener('resize', resize);
resize();

function rand(min,max){return Math.random()*(max-min)+min;}

class Particle{
  constructor(){
    this.x = rand(0,canvas.width);
    this.y = rand(0,canvas.height);
    this.vx = rand(-0.3,0.3);
    this.vy = rand(-0.3,0.3);
    this.size = rand(0.6,2.6);
    this.h = rand(180,260); // hue blue-purple
    this.alpha = rand(0.1,0.9);
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.x<0) this.x = canvas.width;
    if(this.x>canvas.width) this.x = 0;
    if(this.y<0) this.y = canvas.height;
    if(this.y>canvas.height) this.y = 0;
  }
  draw(){
    ctx.beginPath();
    const g = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size*8);
    g.addColorStop(0, `hsla(${this.h},90%,60%,${this.alpha})`);
    g.addColorStop(1, `hsla(${this.h+30},90%,40%,0)`);
    ctx.fillStyle = g;
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(count=160){
  particles = [];
  for(let i=0;i<count;i++) particles.push(new Particle());
}
initParticles();

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // subtle background gradient
  const bg = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
  bg.addColorStop(0, 'rgba(2,6,20,0.75)');
  bg.addColorStop(1, 'rgba(6,2,36,0.75)');
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{p.update();p.draw();});
  // optionally connect nearby particles
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a=particles[i], b=particles[j];
      const dx=a.x-b.x, dy=a.y-b.y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<90){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(120,80,255,${(1 - d/90)*0.06})`;
        ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}
animate();

/* TYPING EFFECT */
const typingEl = document.getElementById('typing');
const words = ['Design','Simulation','AI','Robotics','Optimization'];
let widx=0, chr=0, deleting=false;
function typeLoop(){
  const word = words[widx%words.length];
  if(!deleting){
    typingEl.textContent = word.slice(0,chr+1);
    chr++;
    if(chr===word.length){ deleting=true; setTimeout(typeLoop,800); return; }
  } else {
    typingEl.textContent = word.slice(0,chr-1);
    chr--;
    if(chr===0){ deleting=false; widx++; }
  }
  setTimeout(typeLoop, deleting?60:120);
}
typeLoop();

/* PROJECT MODAL */
document.querySelectorAll('.project').forEach(p=>p.addEventListener('click',()=>{
  const t = p.querySelector('h3').innerText;
  const d = p.getAttribute('data-detail');
  document.getElementById('modalTitle').innerText = t;
  document.getElementById('modalBody').innerText = d;
  document.getElementById('modal').classList.remove('hidden');
}));
document.querySelector('.close').addEventListener('click',()=>document.getElementById('modal').classList.add('hidden'));

/* COUNTERS */
const counters = document.querySelectorAll('.stat-number');
const speed = 120;
const cObs = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-target'));
      let current = parseFloat(el.innerText) || 0;
      const step = target / speed;
      function run(){ current += step; if(current < target){ el.innerText = (Math.round(current*100)/100).toString(); requestAnimationFrame(run);} else { el.innerText = target; } }
      run();
      cObs.unobserve(el);
    }
  });
},{threshold:0.3});
counters.forEach(c=>cObs.observe(c));

/* TOAST */
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.remove('hidden');
  setTimeout(()=>t.classList.add('hidden'),2000);
}
