console.log('✅ main.js loaded');

// --- helpers to split text ---

function splitChars(selector) {
  const el = document.querySelector(selector);
  if (!el) {
    console.error('Element not found:', selector);
    return [];
  }

  const text = el.textContent;
  el.innerHTML = '';
  const chars = [];

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    span.style.display = 'inline-block';
    el.appendChild(span);
    chars.push(span);
  }

  console.log(`✅ Split ${selector}:`, chars.length, 'chars');
  return chars;
}

function splitWords(selector) {
  const el = document.querySelector(selector);
  if (!el) {
    console.error('Element not found:', selector);
    return [];
  }

  const text = el.textContent;
  const words = text.split(' ');
  el.innerHTML = '';
  const wordEls = [];

  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    el.appendChild(span);
    wordEls.push(span);

    if (i < words.length - 1) {
      el.appendChild(document.createTextNode(' '));
    }
  });

  console.log(`✅ Split ${selector}:`, wordEls.length, 'words');
  return wordEls;
}

// --- run once DOM is parsed (thanks to defer) ---

const chars404 = splitChars('.aw-404');
const wordsH1 = splitWords('.aw-copy h1');
const wordsP = splitWords('.aw-copy p');

if (chars404.length === 0) {
  console.error('❌ 404 split failed');
} else {
  console.log('✅ Starting GSAP timeline');

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    onStart: () => console.log('▶️ Timeline started'),
    onComplete: () => console.log('✅ Timeline complete'),
  });

  // show containers
  gsap.set(['.aw-404', '.aw-copy h1', '.aw-copy p', '.aw-btn'], {
    autoAlpha: 1,
  });

  // initial state for 404 chars
  gsap.set(chars404, {
    opacity: 0,
    y: -180,
  });

  tl.addLabel('start');

  // Clouds - gentle horizontal drift

  const mm = gsap.matchMedia();

  // Desktop / tablet
  mm.add('(min-width: 768px)', () => {
    gsap.fromTo(
      '.aw-clouds',
      { x: 100 }, // igual que antes
      {
        x: -200,
        duration: 25,
        ease: 'none',
      }
    );
  });

  // Mobile
  mm.add('(max-width: 767px)', () => {
    gsap.fromTo(
      '.aw-clouds',
      { x: -400 }, // 🔴 prueba este valor para arrancar más “a la derecha”
      {
        x: -700, // sigue moviéndose un poco hacia la izquierda
        duration: 25,
        ease: 'none',
      }
    );
  });

  // header
  tl.from(
    '.aw-header',
    {
      clipPath: 'inset(0% 0% 100% 0%)',
      scale: 1.1,
      duration: 1.85,
      ease: 'power3.out',
    },
    'start'
  );

  // 404
  tl.to(
    chars404,
    {
      y: 0,
      opacity: 1,
      duration: 0.77,
      stagger: 0.23,
    },
    'start+=0.15'
  );

  // H1
  tl.from(
    wordsH1,
    {
      x: -50,
      opacity: 0,
      duration: 0.575,
      stagger: 0.172,
    },
    'start+=0.44'
  );

  // paragraph
  tl.from(
    wordsP,
    {
      x: -50,
      opacity: 0,
      duration: 0.575,
      stagger: 0.172,
    },
    'start+=0.89'
  );

  // CTA button
  tl.fromTo(
    '.aw-btn--primary',
    {
      x: -34,
      filter: 'blur(20px)',
      opacity: 0,
    },
    {
      x: 0,
      filter: 'blur(0px)',
      opacity: 1,
      duration: 0.92,
      ease: 'power4.out',
    },
    'start+=1.59'
  );
}
