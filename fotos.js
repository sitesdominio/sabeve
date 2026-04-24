 // ── DATA ──
    const photos = [
        { src: 'foto1.png', tag: 'Fisioterapia',        caption: 'Exercícios para o bem-estar físico',    cat: 'fisioterapia' },
        { src: 'foto2.png', tag: 'Arte Terapia',        caption: 'Criatividade e expressão artística',    cat: 'atividades'   },
        { src: 'foto3.png', tag: 'Estímulo Cognitivo',  caption: 'Jogos que mantêm a mente ativa',       cat: 'atividades'   },
        { src: 'foto4.png', tag: 'Convívio',            caption: 'Tranquilidade e momentos de prazer',   cat: 'convivio'     },
        { src: 'foto5.png', tag: 'Atividades',          caption: 'Contato com a natureza e o verde',     cat: 'atividades'   },
        { src: 'foto6.png', tag: 'Oficina de Culinária',caption: 'Cozinhando juntos com alegria',        cat: 'atividades'   },
        { src: 'foto7.png', tag: 'Convívio',            caption: 'Laços e histórias compartilhadas',     cat: 'convivio'     },
    ];

    let current = 0;
    let visibleIndices = photos.map((_, i) => i); // all by default

    // ── LIGHTBOX ──
    const lightbox  = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lbImg');
    const lbTag     = document.getElementById('lbTag');
    const lbCaption = document.getElementById('lbCaption');
    const lbCounter = document.getElementById('lbCounter');
    const lbThumbs  = document.getElementById('lbThumbs');

    function buildThumbs() {
        lbThumbs.innerHTML = '';
        visibleIndices.forEach((pi, vi) => {
            const t = document.createElement('img');
            t.src = photos[pi].src;
            t.className = 'lb-thumb';
            t.onclick = () => openAt(vi);
            lbThumbs.appendChild(t);
        });
    }

    function openAt(visiblePos) {
        current = visiblePos;
        const pi = visibleIndices[current];
        lbImg.src         = photos[pi].src;
        lbTag.textContent = photos[pi].tag;
        lbCaption.textContent = photos[pi].caption;
        lbCounter.textContent = `${current + 1} / ${visibleIndices.length}`;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        // thumbs
        lbThumbs.querySelectorAll('.lb-thumb').forEach((t, i) => t.classList.toggle('active', i === current));
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    function navigate(dir) {
        current = (current + dir + visibleIndices.length) % visibleIndices.length;
        openAt(current);
    }

    document.getElementById('lbClose').onclick = closeLightbox;
    document.getElementById('lbPrev').onclick  = () => navigate(-1);
    document.getElementById('lbNext').onclick  = () => navigate(1);

    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'ArrowLeft')  navigate(-1);
    });

    // ── GALLERY ITEMS click ──
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const globalIndex = parseInt(item.dataset.index);
            const visPos = visibleIndices.indexOf(globalIndex);
            if (visPos !== -1) {
                buildThumbs();
                openAt(visPos);
            }
        });
    });

    // ── FILTER ──
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            visibleIndices = [];
            document.querySelectorAll('.gallery-item').forEach((item, i) => {
                const match = filter === 'all' || item.dataset.category === filter;
                item.style.display = match ? 'block' : 'none';
                if (match) visibleIndices.push(parseInt(item.dataset.index));
            });
        });
    });
