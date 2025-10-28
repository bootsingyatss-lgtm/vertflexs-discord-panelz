document.addEventListener('DOMContentLoaded', () => {
    const hero           = document.getElementById('hero');
    const panels         = document.getElementById('panels');
    const loginCard      = document.getElementById('loginCard');
    const profileContainer = document.getElementById('profileContainer');
    const overlay        = document.getElementById('overlay');
    const loginBtn       = document.getElementById('loginBtn');
    const closeBtn       = document.getElementById('closePanel');
    const backBtn        = document.getElementById('backBtn');
    const form           = document.getElementById('loginForm');

    // OPEN LOGIN
    loginBtn.addEventListener('click', () => {
        hero.style.display = 'none';
        panels.classList.add('open');
        loginCard.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    // CLOSE LOGIN
    const closeLogin = () => {
        loginCard.classList.remove('open');
        overlay.classList.remove('open');
        setTimeout(() => {
            hero.style.display = 'block';
            panels.classList.remove('open');
            document.body.style.overflow = '';
        }, 300);
    };
    closeBtn.addEventListener('click', closeLogin);
    overlay.addEventListener('click', closeLogin);

    // SUBMIT USER ID
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('userId').value.trim();

        if (!/^\d{17,19}$/.test(userId)) {
            alert('Invalid ID: Must be 17–19 digits.');
            return;
        }

        try {
            const res = await fetch(`https://discord.com/api/v10/users/${userId}`);
            if (!res.ok) throw new Error('Not found');

            const user = await res.json();

            // Populate profile
            document.getElementById('username').textContent = `${user.username}#${user.discriminator}`;
            document.getElementById('createdAt').textContent = 
                `Member since ${new Date((user.id / 4194304) + 1420070400000).toLocaleDateString()}`;

            const avatarUrl = user.avatar
                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
                : `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`;
            document.getElementById('avatar').src = avatarUrl;

            if (user.banner) {
                document.getElementById('banner').style.backgroundImage = 
                    `ur[](https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=480)`;
            } else {
                document.getElementById('banner').style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }

            // SHOW PROFILE
            closeLogin();
            profileContainer.classList.add('open');
            overlay.classList.add('open');

        } catch (err) {
            alert('User not found. Check the ID.');
        }
    });

    // BACK TO LOGIN
    backBtn.addEventListener('click', () => {
        profileContainer.classList.remove('open');
        overlay.classList.remove('open');
        setTimeout(() => {
            hero.style.display = 'block';
            panels.classList.remove('open');
            form.reset();
        }, 300);
    });
});
