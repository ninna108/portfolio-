// Simple JS: mobile menu, progress bars and contact form handling
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=> {
      nav.classList.toggle('visible');
      if(nav.classList.contains('visible')) nav.style.display = 'flex';
      else nav.style.display = '';
    });
  }

  // Animate progress bars
  document.querySelectorAll('.progress').forEach(function(el){
    const v = parseInt(el.dataset.value || 0,10);
    // set width via pseudo-element by modifying style property -- using inline style on ::after isn't possible, so use CSS variable
    el.style.setProperty('--w', v + '%');
    // create a child bar for compatibility
    const bar = document.createElement('div');
    bar.style.height = '100%';
    bar.style.width = '0%';
    bar.style.background = 'linear-gradient(90deg,var(--accent), #c084fc)';
    bar.style.borderRadius = '999px';
    bar.style.transition = 'width 900ms ease';
    el.insertBefore(bar, el.firstChild);
    setTimeout(()=>{ bar.style.width = v + '%'; }, 200);
  });

  // Contact form: simple validation + mailto fallback
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(!name || !email || !message){ status.textContent = 'Por favor, preencha todos os campos.'; return; }
      status.textContent = 'Preparando mensagem...';
      // open mail client as fallback
      const subject = encodeURIComponent('Contato pelo portfólio — ' + name);
      const body = encodeURIComponent(message + '\n\n' + 'Email: ' + email);
      window.location.href = 'mailto:seu.email@exemplo.com?subject='+subject+'&body='+body;
      status.textContent = 'Abrindo cliente de e-mail...';
    });
  }
});
