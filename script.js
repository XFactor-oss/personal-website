document.querySelectorAll('.project').forEach(p=>p.addEventListener('click',()=>{
  document.getElementById('modalTitle').textContent=p.querySelector('h3').textContent;
  document.getElementById('modalDetail').textContent=p.dataset.detail;
  document.getElementById('projectModal').classList.remove('hidden');
}));
document.querySelector('.close-btn').addEventListener('click',()=>{
  document.getElementById('projectModal').classList.add('hidden');
});
document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    const id=link.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  });
});
