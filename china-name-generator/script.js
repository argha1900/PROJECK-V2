(() => {
  const $ = (s) => document.querySelector(s);

  const inputName = $('#input-name');
  const selectStyle = $('#select-style');
  const btnGenerate = $('#btn-generate');
  const btnRandom = $('#btn-random');
  const btnCopyCn = $('#btn-copy-cn');
  const btnCopyPinyin = $('#btn-copy-pinyin');
  const btnCopyAlias = $('#btn-copy-alias');

  const resultCn = $('#result-cn');
  const resultPinyin = $('#result-pinyin');
  const resultAlias = $('#result-alias');
  const resultMeaning = $('#result-meaning');
  const resultDetail = $('#result-detail');
  const toast = $('#toast');

  // Data sederhana untuk generator (tidak menyatakan klaim budaya apapun)
  const surnames = [
    { han: '李', pinyin: 'Li', meaning: 'plum' },
    { han: '王', pinyin: 'Wang', meaning: 'raja' },
    { han: '张', pinyin: 'Zhang', meaning: 'busur' },
    { han: '刘', pinyin: 'Liu', meaning: 'membunuh' },
    { han: '陈', pinyin: 'Chen', meaning: 'memperlihatkan' },
    { han: '杨', pinyin: 'Yang', meaning: 'poplar' },
    { han: '黄', pinyin: 'Huang', meaning: 'kuning' },
    { han: '赵', pinyin: 'Zhao', meaning: 'nama dinasti' },
    { han: '周', pinyin: 'Zhou', meaning: 'lingkar, minggu' },
    { han: '吴', pinyin: 'Wu', meaning: 'nama wilayah' },
    { han: '孙', pinyin: 'Sun', meaning: 'cucu' },
    { han: '朱', pinyin: 'Zhu', meaning: 'merah cinnabar' },
    { han: '高', pinyin: 'Gao', meaning: 'tinggi' },
    { han: '胡', pinyin: 'Hu', meaning: 'barbar (kun.)' },
    { han: '马', pinyin: 'Ma', meaning: 'kuda' },
  ];

  const givenSyllables = {
    neutral: [
      { han: '明', py: 'Ming', mean: 'terang' },
      { han: '宇', py: 'Yu', mean: 'alam semesta' },
      { han: '轩', py: 'Xuan', mean: 'kudaputih/kereta' },
      { han: '晨', py: 'Chen', mean: 'fajar' },
      { han: '一', py: 'Yi', mean: 'satu' },
      { han: '安', py: 'An', mean: 'damai' },
      { han: '宁', py: 'Ning', mean: 'tentram' },
      { han: '泽', py: 'Ze', mean: 'rahmat' },
      { han: '若', py: 'Ruo', mean: 'seperti' },
      { han: '希', py: 'Xi', mean: 'harapan' },
      { han: '辰', py: 'Chen', mean: 'bintang/waktu' },
      { han: '然', py: 'Ran', mean: 'sebagaimana' },
    ],
    masculine: [
      { han: '强', py: 'Qiang', mean: 'kuat' },
      { han: '伟', py: 'Wei', mean: 'agung' },
      { han: '龙', py: 'Long', mean: 'naga' },
      { han: '军', py: 'Jun', mean: 'militer' },
      { han: '峰', py: 'Feng', mean: 'puncak' },
      { han: '志', py: 'Zhi', mean: 'tekad' },
      { han: '毅', py: 'Yi', mean: 'teguh' },
      { han: '浩', py: 'Hao', mean: 'luas' },
    ],
    feminine: [
      { han: '月', py: 'Yue', mean: 'bulan' },
      { han: '雪', py: 'Xue', mean: 'salju' },
      { han: '芳', py: 'Fang', mean: 'wangi' },
      { han: '静', py: 'Jing', mean: 'tenang' },
      { han: '玲', py: 'Ling', mean: 'gemerincing' },
      { han: '美', py: 'Mei', mean: 'cantik' },
      { han: '霞', py: 'Xia', mean: 'mega' },
      { han: '莹', py: 'Ying', mean: 'berkilau' },
    ],
  };

  function pick(array) { return array[Math.floor(Math.random() * array.length)]; }
  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  // RNG deterministik berbasis string
  function hashString(s) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function rngFromString(s) { return mulberry32(hashString(String(s))); }
  function pickR(array, rng) { return array[Math.floor(rng() * array.length)]; }

  function toAliasWestern(pinyinFull, rng) {
    const parts = pinyinFull.split(' ').slice(-2);
    if (parts.length === 0) return '—';
    const first = parts[0] || '';
    const second = parts[1] || '';
    const aliasCore = blendAlias(first, second, rng);
    const western = ['Leo', 'Neo', 'Rio', 'Lio'];
    const withPrefix = (rng && rng() < 0.45) ? `${pickR(western, rng)} ${aliasCore}` : aliasCore;
    return withPrefix;
  }

  function blendAlias(a, b, rng) {
    if (!a && !b) return '—';
    if (!b) return stylize(simplifySyllable(a, rng));
    if (!a) return stylize(simplifySyllable(b, rng));
    const aSimple = simplifySyllable(a, rng);
    const bSimple = simplifySyllable(b, rng);
    const joiner = (rng && rng() < 0.5) ? ' ' : '';
    return stylize(aSimple + joiner + bSimple);
  }

  function simplifySyllable(s, rng) {
    const map = [
      [/zh/gi, 'j'], [/ch/gi, 'c'], [/sh/gi, 'sh'], [/x/gi, 'x'], [/q/gi, 'q'], [/ang/gi, 'ang'], [/eng/gi, 'eng'], [/ing/gi, 'ing'],
      [/ong/gi, 'ong'], [/ian/gi, 'ian'], [/uan/gi, 'uan'], [/iang/gi, 'iang'], [/uang/gi, 'uang'], [/uo/gi, 'uo']
    ];
    let r = s;
    for (const [re, rep] of map) r = r.replace(re, rep);
    // Opsi gaya: "Jing" -> "Jhing" secara deterministik kadang-kadang
    if (rng && /^jing$/i.test(r) && rng() < 0.6) {
      r = r.replace(/^([Jj])(ing)$/i, (_, j, rest) => j + 'h' + rest);
    }
    return r;
  }

  function stylize(s) {
    // Kapitalisasi tiap kata
    return s.replace(/\b(\w)(\w*)/g, (_, a, b) => a.toUpperCase() + b.toLowerCase());
  }

  function buildMeaning(surname, g1, g2) {
    const parts = [surname.meaning, g1.mean, g2.mean].filter(Boolean);
    return 'Arti: ' + parts.join(' · ');
  }

  function generateFromInput(baseName, style) {
    const seed = (baseName || '').trim() || 'seed';
    const rng = rngFromString(seed + '|' + style);
    const surname = pickR(surnames, rng);
    const pool = givenSyllables[style] || givenSyllables.neutral;

    const given1 = pickR(pool, rng);
    let given2 = pickR(pool, rng);
    if (given2.han === given1.han) {
      // coba ulang beberapa kali agar berbeda
      for (let i = 0; i < 3 && given2.han === given1.han; i++) given2 = pickR(pool, rng);
    }

    const han = surname.han + given1.han + given2.han;
    const pinyin = surname.pinyin + ' ' + given1.py + ' ' + given2.py;
    const alias = toAliasWestern(pinyin, rng);

    const meaning = buildMeaning(surname, given1, given2);

    return {
      han,
      pinyin,
      alias,
      meaning,
      detail: `${surname.han}(${surname.pinyin}) · ${given1.han}(${given1.py}) · ${given2.han}(${given2.py})`
    };
  }

  // Clipboard util
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Tersalin');
    } catch (e) {
      console.warn('Clipboard write failed', e);
      showToast('Gagal menyalin');
    }
  }

  // Toast
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1400);
  }

  // Persist style preference
  function loadPrefs() {
    const style = localStorage.getItem('cn_style');
    if (style) selectStyle.value = style;
  }
  function savePrefs() {
    localStorage.setItem('cn_style', selectStyle.value);
  }

  // Bind
  function bind() {
    btnGenerate.addEventListener('click', () => doGenerate());
    btnRandom.addEventListener('click', () => doGenerate(true));
    inputName.addEventListener('keydown', (e) => { if (e.key === 'Enter') doGenerate(); });
    selectStyle.addEventListener('change', () => { savePrefs(); doGenerate(); });

    btnCopyCn.addEventListener('click', () => copyText(resultCn.textContent.trim()));
    btnCopyPinyin.addEventListener('click', () => copyText(resultPinyin.textContent.trim()));
    btnCopyAlias.addEventListener('click', () => copyText(resultAlias.textContent.trim()));
  }

  function doGenerate(randomize = false) {
    const name = randomize ? randomSeed() : inputName.value;
    const style = selectStyle.value;
    const out = generateFromInput(name, style);
    render(out);
  }

  function randomSeed() {
    const seeds = ['Argha', 'Bima', 'Citra', 'Dewi', 'Fajar', 'Gilang', 'Indra', 'Johan', 'Kirana', 'Laras'];
    return pick(seeds);
  }

  function render(out) {
    resultCn.textContent = out.han;
    resultPinyin.textContent = out.pinyin;
    resultAlias.textContent = out.alias;
    resultMeaning.textContent = out.meaning;
    resultDetail.textContent = out.detail;
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadPrefs();
    bind();
    doGenerate(true);
  }, { once: true });
})();