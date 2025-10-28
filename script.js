document.addEventListener('DOMContentLoaded', () => {
    const hero       = document.getElementById('hero');
    const panels     = document.getElementById('panels');
    const loginCard  = document.getElementById('loginCard');
    const overlay    = document.getElementById('overlay');
    const loginBtn   = document.getElementById('loginBtn');
    const closeBtn   = document.getElementById('closePanel');
    const form       = document.getElementById('loginForm');

    // OPEN
    loginBtn.addEventListener('click', () => {
        hero.style.display = 'none';
        panels.classList.add('open');
        loginCard.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    // CLOSE
    const close = () => {
        loginCard.classList.remove('open');
        overlay.classList.remove('open');
        setTimeout(() => {
            hero.style.display = 'block';
            panels.classList.remove('open');
            document.body.style.overflow = '';
        }, 300);
    };
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);

    // FORM (simulate login)
    form.addEventListener('submit', e => {
        e.preventDefault();
        const token = document.getElementById('token').value.trim();
        if (token) {
            alert(`Logged in with token: ${token.substring(0,10)}...`);
            // TODO: send to backend / start bot
        }
    });
});
