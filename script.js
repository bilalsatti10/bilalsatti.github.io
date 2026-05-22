
function openCV() {
    document.getElementById('cvModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeCV() {
    document.getElementById('cvModal').classList.remove('open');
    document.body.style.overflow = '';
}
function printCV() {
    const frame = document.getElementById('cvFrame');
    frame.contentWindow.print();
}
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeCV(); });

// ── 3D HERO CARD TILT ──
const card = document.getElementById('tiltCard');
if (window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / 28;
        const dy = (e.clientY - cy) / 28;
        card.style.transform = `perspective(1000px) rotateY(${dx}deg) rotateX(${-dy}deg) translateZ(10px)`;
    });
    document.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(8deg) rotateY(-12deg)';
        card.style.transition = 'transform 0.6s ease';
    });
    document.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.05s ease-out';
    });
}

// ── SCROLL REVEAL ──
const revEls = document.querySelectorAll('.reveal, .reveal-left');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
    });
}, { threshold: 0.08 });
revEls.forEach(el => io.observe(el));

// ── SKILL BAR ANIMATE ON FLIP ──
document.querySelectorAll('.skill-card').forEach(card => {
    const fill = card.querySelector('.skill-bar-fill');
    const w = fill?.style.getPropertyValue('--w') || '0.85';
    card.addEventListener('mouseenter', () => {
        if (fill) fill.style.transform = `scaleX(${w})`;
    });
    card.addEventListener('mouseleave', () => {
        if (fill) fill.style.transform = 'scaleX(0)';
    });
});

// ── STAGGER TIMELINE ITEMS ──
document.querySelectorAll('.tl-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.6s ease';
});
const tlObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'none';
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.tl-item').forEach(el => tlObs.observe(el));

// ── PROJ CARDS STAGGER ──
document.querySelectorAll('.proj-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`;
});
const projObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'none'; }
    });
}, { threshold: 0.05 });
document.querySelectorAll('.proj-card').forEach(el => projObs.observe(el));
