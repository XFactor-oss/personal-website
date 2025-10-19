// Fade-in animation for project images on scroll
const faders=document.querySelectorAll('.fade-up');
const appearOptions={threshold:0.2};
const appearOnScroll=new IntersectionObserver(function(entries,observer){
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
},appearOptions);
faders.forEach(fader=>{appearOnScroll.observe(fader)});

// Modal interaction for projects
document.querySelectorAll('.pop-card').forEach(p=>p.addEventListener('click',()=>{
  document.getElementById('modalTitle').textContent=p.querySelector('h3').textContent;
  document.getElementById('modalDetail').textContent=p.dataset.detail;
  document.getElementById('modal').classList.remove('hidden');
}));
document.querySelector('.close-btn').addEventListener('click',()=>document.getElementById('modal').classList.add('hidden'));

// Parallax scrolling effect
window.addEventListener('scroll',()=>{
  const bg=document.querySelector('.parallax-bg');
  const offset=window.pageYOffset;
  bg.style.backgroundPositionY=offset*0.4+'px';
});

// Animated stats counters
const counters=document.querySelectorAll('.stat-number');
const speed=150;
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const counter=entry.target;
      const target=+counter.getAttribute('data-target');
      const update=()=>{
        const current=+counter.innerText;
        const inc=target/speed;
        if(current<target){
          counter.innerText=(current+inc).toFixed(2).replace(/\.00$/,'');
          requestAnimationFrame(update);
        }else{
          counter.innerText=target;
        }
      };
      update();
      counterObserver.unobserve(counter);
    }
  });
},{threshold:0.3});
counters.forEach(c=>counterObserver.observe(c));