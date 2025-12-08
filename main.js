document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Script cargado');

  // Función para dividir en caracteres
  function splitChars(selector) {
    const el = document.querySelector(selector);
    if (!el) {
      console.error('No se encontró:', selector);
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

    console.log(`✅ Split ${selector}:`, chars.length, 'caracteres');
    return chars;
  }

  // Función para dividir en palabras
  function splitWords(selector) {
    const el = document.querySelector(selector);
    if (!el) {
      console.error('No se encontró:', selector);
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

    console.log(`✅ Split ${selector}:`, wordEls.length, 'palabras');
    return wordEls;
  }

  // Dividir textos
  const chars404 = splitChars('.aw-404');
  const wordsH1 = splitWords('.aw-copy h1');
  const wordsP = splitWords('.aw-copy p');

  if (chars404.length === 0) {
    console.error('❌ No se pudo dividir el 404!');
    return;
  }

  console.log('✅ Iniciando animaciones GSAP');

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    onStart: () => console.log('▶️ Timeline iniciado'),
    onComplete: () => console.log('✅ Timeline completado'),
  });

  // Hacer visible los contenedores
  gsap.set(['.aw-404', '.aw-copy h1', '.aw-copy p', '.aw-btn'], {
    autoAlpha: 1,
  });

  // Estado inicial de caracteres 404
  gsap.set(chars404, {
    opacity: 0,
    y: -50,
  });

  console.log('✅ Estado inicial configurado');

  tl.addLabel('start');

  // Animación de nubes
  tl.to(
    '.aw-clouds',
    {
      x: -150,
      duration: 2.5,
      ease: 'none',
    },
    'start'
  );

  // Header
  tl.from(
    '.aw-header',
    {
      clipPath: 'inset(0% 0% 100% 0%)',
      scale: 1.1,
      duration: 1.15,
      ease: 'power3.out',
    },
    'start'
  );

  // 404 caracteres
  tl.to(
    chars404,
    {
      y: 0,
      opacity: 1,
      duration: 0.77,
      stagger: 0.23,
      onStart: () => console.log('▶️ Animando 404'),
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

  // Párrafo
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

  // Botón
  tl.from(
    '.aw-btn--primary',
    {
      x: -34,
      filter: 'blur(20px)',
      opacity: 0,
      duration: 0.92,
      ease: 'power4.out',
    },
    'start+=1.59'
  );
});
