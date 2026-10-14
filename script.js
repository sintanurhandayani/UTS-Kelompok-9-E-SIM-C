// Theme toggle (light / dark) with localStorage
(function(){
  const body = document.body;
  const toggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  function applyTheme(theme){
    if(theme === 'dark') body.classList.add('dark');
    else body.classList.remove('dark');
    if(toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);

  toggle && toggle.addEventListener('click', () => {
    const cur = body.classList.contains('dark') ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
        // Close mobile nav if open
        const navList = document.querySelector('.nav-list');
        if(navList && navList.style.display==='block') navList.style.display='none';
      }
    });
  });

  // Simple mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  navToggle && navToggle.addEventListener('click', ()=>{
    const navList = document.querySelector('.nav-list');
    if(!navList) return;
    if(navList.style.display === 'flex') navList.style.display='none';
    else navList.style.display='flex';
  });

  // Reveal on scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const ro = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        // optional: unobserve to improve perf
        ro.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  reveals.forEach(r=>ro.observe(r));
})();