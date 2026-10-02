/* Discover Toledo — shared script */
const $ = (s, r = document) => r.querySelector(s);
const fmt = n => n.toLocaleString('en-US');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- navigation ---------- */
function toggleSidebar() {
  const o = document.body.classList.toggle('nav-open');
  const b = $('.menu-btn'); if (b) b.setAttribute('aria-expanded', o);
}
document.addEventListener('click', e => { if (document.body.classList.contains('nav-open') && e.target.closest('.nav-link')) document.body.classList.remove('nav-open'); });
addEventListener('keydown', e => { if (e.key === 'Escape') document.body.classList.remove('nav-open'); });
const hdr = $('#siteHeader'), prog = $('#readProgress'), toTop = $('#toTop');
const onScroll = () => {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  hdr.classList.toggle('scrolled', y > 40);
  prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  if (toTop) toTop.classList.toggle('show', y > 700);
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
if (toTop) toTop.addEventListener('click', () => scrollTo({ top: 0 }));

/* ---------- home: count-up ---------- */
document.querySelectorAll('[data-count]').forEach(el => {
  const end = +el.dataset.count;
  const run = () => {
    const t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / 1400, 1);
      el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  };
  new IntersectionObserver((es, ob) => es.forEach(x => { if (x.isIntersecting) { run(); ob.disconnect(); } })).observe(el);
});

/* ---------- places ---------- */
const PLACES = [
 {
  "name": "Lucob Cave",
  "cat": "Nature",
  "tag": "CAVE & FALLS",
  "icon": "◒",
  "img": "images/Lucob_Cave.jpg",
  "short": "A cave in Matab-ang with rock formations, mini falls and a statue of the Virgin Mary under a skylight.",
  "body": [
   "Lucob Cave sits at the edge of Barangay Matab-ang. Visitors find rock formations, flowing water, small falls and monkeys in the branches overhead.",
   "Light pours through an opening in the cave roof onto a blue-and-white statue of the Virgin Mary.",
   "Most visitors reach it by habal-habal from Matab-ang and then follow the river. Go in the dry season and hire a local guide."
  ]
 },
 {
  "name": "Manuto River",
  "cat": "Nature",
  "tag": "RIVER GORGE",
  "icon": "≈",
  "img": "images/Manuto_River.jpg",
  "short": "Clear green pools and small rapids between boulders and forested hills.",
  "body": [
   "The Manuto River runs through a rocky gorge, with rapids tumbling between large boulders and steep, forested slopes.",
   "Check the weather before you go. Rivers in Toledo can rise fast after heavy rain."
  ]
 },
 {
  "name": "Ilihan Bridge Falls",
  "cat": "Nature",
  "tag": "RIVER WEIR",
  "icon": "≋",
  "img": "images/Ilihan_Bridge.jpg",
  "short": "A wide sheet of water pouring over a long weir at Ilihan Bridge.",
  "body": [
   "At Ilihan Bridge, the river spills over a long concrete weir in a broad curtain of white water, a popular spot for photos and a splash.",
   "Stay in the shallows and watch for slippery rocks."
  ]
 },
 {
  "name": "Tagaytay Hills",
  "cat": "Nature",
  "tag": "MOUNTAIN DESTINATION",
  "icon": "▲",
  "img": "images/Mount_Tagaytay.jpg",
  "short": "Rolling grassy hills for hiking and camping, with golden sunsets.",
  "body": [
   "A favorite of local hikers and campers. The rolling hills open onto wide views of the surrounding ranges and lakes.",
   "Sunsets here turn the whole sky gold, and on clear evenings the sun sets toward Mount Kanlaon on Negros Island."
  ]
 },
 {
  "name": "Malubog Lake",
  "cat": "Nature",
  "tag": "LAKES & OUTDOORS",
  "icon": "◍",
  "img": "images/Malubog_Lake.jpg",
  "short": "A hill-ringed lake that also supplies water to Metro Cebu.",
  "body": [
   "Malubog Lake offers sweeping views and boat trekking.",
   "It is also a working water source: Toledo supplies Metro Cebu through the Cebu City Water District. Pipes climb the mountain and descend to Cebu proper, since the lake sits higher than Cebu City.",
   "It lies in Barangay Gen. Climaco (Malubog)."
  ]
 },
 {
  "name": "Lake Bensis",
  "cat": "Nature",
  "tag": "MOUNTAIN BASIN",
  "icon": "◌",
  "img": "images/Lake_Bensis.jpg",
  "short": "A secluded mountain campsite in a basin reshaped by mining.",
  "body": [
   "Decades of mining shifted the local landscape into deep basins that filled with water.",
   "Lake Bensis is now a secluded mountain campsite."
  ]
 },
 {
  "name": "Cantabaco & Poog Crags",
  "cat": "Nature",
  "tag": "ROCK CLIMBING",
  "icon": "⛰",
  "img": "images/Cantabaco_Crags.jpg",
  "short": "Limestone cliffs that local climbers have turned into sport-climbing crags.",
  "body": [
   "The barangays of Cantabaco and Poog have limestone cliffs developed by local climbers into popular sport-climbing crags."
  ]
 },
 {
  "name": "Archdiocesan Shrine of St. John of Sahagun",
  "cat": "Faith & heritage",
  "tag": "PARISH SHRINE",
  "icon": "✝",
  "img": "images/Archdiocesan_Shrine_St_John_of_Sahagun.webp",
  "short": "The parish of Toledo’s patron saint, with a wide stairway and a bell tower.",
  "body": [
   "The Archdiocesan Shrine and Parish honors John of Sahagun, Toledo’s patron saint.",
   "His feast is celebrated every June 12, the same day as the Hinulawan Festival, so faith and civic celebration share the calendar."
  ]
 },
 {
  "name": "Capilla de Santa Ana Museum",
  "cat": "Faith & heritage",
  "tag": "MUSEUM & CHAPEL",
  "icon": "⛪",
  "img": "images/Capilla_Santa_Ana_Museum_and_Community_Center.webp",
  "short": "A European-style chapel with stained glass, a checkered floor and a gilded altarpiece.",
  "body": [
   "A European-style private chapel and museum holding a rare collection of centuries-old religious relics and classical paintings.",
   "Inside you’ll see stained-glass windows, a black-and-white checkered aisle, statues of saints and a gilded altarpiece around a large crucifix."
  ]
 },
 {
  "name": "Santa Ana Maze Garden",
  "cat": "Faith & heritage",
  "tag": "HEDGE LABYRINTH",
  "icon": "◎",
  "img": "images/Santa_Ana_Maze_Garden.webp",
  "short": "A circular hedge labyrinth next to the Santa Ana chapel.",
  "body": [
   "Beside the chapel, a carefully trimmed hedge labyrinth invites visitors to wander slowly toward a statue at its center.",
   "From above, its circular pattern is easy to see."
  ]
 },
 {
  "name": "Pedro Calungsod Shrine, Cantabaco",
  "cat": "Faith & heritage",
  "tag": "HILLTOP PARISH",
  "icon": "✦",
  "img": "images/Pedro_Calungsod_Shrine.jpg",
  "short": "The first shrine and church named after the second Filipino saint.",
  "body": [
   "After Visayan teen martyr Pedro Calungsod was canonized on October 21, 2012, the hilltop parish of Cantabaco became the first shrine and church named after him."
  ]
 },
 {
  "name": "Toledo City Hall",
  "cat": "City landmarks",
  "tag": "SEAT OF GOVERNMENT",
  "icon": "⌂",
  "img": "images/Toledo_City_Hall.jpg",
  "short": "The home of the city government, reached by a broad flight of steps.",
  "body": [
   "Toledo City Hall houses the city government led by the mayor, the vice mayor and the Sangguniang Panlungsod.",
   "A wide stairway rises to a covered entrance flanked by palm trees."
  ]
 },
 {
  "name": "Toledo City Plaza",
  "cat": "City landmarks",
  "tag": "PUBLIC PLAZA",
  "icon": "◉",
  "img": "images/Toledo_City_Plaza.jpg",
  "short": "A round plaza with a red ring path, walkways like spokes and shady trees.",
  "body": [
   "Seen from above, the plaza looks like a wheel: a red circular path around a central lawn, with walkways branching out between garden beds and old shade trees.",
   "It is a gathering place in the middle of the city."
  ]
 },
 {
  "name": "Toledo City Sports Center (Megadome)",
  "cat": "City landmarks",
  "tag": "SPORTS & EVENTS",
  "icon": "◈",
  "img": "images/Toledo_City_Sports_Center_Megadome.jpg",
  "short": "A large indoor venue with terraced gardens and twin stairways.",
  "body": [
   "The Toledo City Sports Center is one of the landmarks pictured in the city’s Wikipedia article.",
   "Its tall, ribbed facade sits behind terraced planters and two broad stairways."
  ]
 },
 {
  "name": "Toledo City Boulevard & Harbour",
  "cat": "City landmarks",
  "tag": "TAÑON STRAIT VIEWS",
  "icon": "⚓",
  "img": "images/Toledo_Boulevard.jpg",
  "short": "Look across the Tañon Strait to Negros Oriental.",
  "body": [
   "Toledo is the only city in Cebu on the western seaboard, facing Negros Oriental.",
   "The boulevard and harbour give the best view of the strait."
  ]
 },
 {
  "name": "World War II Tank Barriers",
  "cat": "War history",
  "tag": "WWII RELICS",
  "icon": "▣",
  "img": "images/World_War_2_Tank_Barriers_of_Toledo.jpg",
  "short": "Pointed concrete blocks left from the war years.",
  "body": [
   "A field of pyramid-topped concrete blocks, built as tank barriers, still stands as a reminder of World War II.",
   "Japanese forces occupied Toledo in 1942. In 1945, Commonwealth Army divisions and Cebuano guerrillas liberated the town."
  ]
 },
 {
  "name": "Toledo City Solar Farm",
  "cat": "Industry & energy",
  "tag": "CLEAN ENERGY",
  "icon": "☀",
  "img": "images/Toledo_Solar_Farm.jpg",
  "short": "A 60 MW solar plant on 73 hectares in Barangay Talavera.",
  "body": [
   "First Toledo Solar Energy Corporation, a subsidiary of Citicore Power, runs a 60 MW solar plant on a 73-hectare property in Barangay Talavera."
  ]
 },
 {
  "name": "Toledo Copper Mine",
  "cat": "Industry & energy",
  "tag": "THE COPPER CITY",
  "icon": "◆",
  "img": "images/Toledo_Copper_Mine.jpg",
  "short": "The 1,674-hectare mine that earned Toledo its “Copper City” name.",
  "body": [
   "Carmen Copper Corporation, a subsidiary of Atlas Consolidated Mining and Development Corporation, operates the mine in Barangay Don Andres Soriano (Lutopan).",
   "Copper concentrate is shipped mainly to smelters in China, India and Japan.",
   "The mine is an industrial site, so check with the company before visiting."
  ]
 }
];
const NOPHOTO = ['Lake Bensis', 'Cantabaco & Poog Crags', 'Pedro Calungsod Shrine, Cantabaco', 'Toledo City Boulevard & Harbour', 'Toledo City Solar Farm', 'Toledo Copper Mine'];
PLACES.sort((a, b) => NOPHOTO.includes(a.name) - NOPHOTO.includes(b.name));
const grid = $('#placesGrid');
if (grid) {
  const cats = ['All', ...new Set(PLACES.map(p => p.cat))];
  const bar = document.createElement('div');
  bar.className = 'place-filter';
  bar.innerHTML = cats.map((c, i) => `<button type="button" class="chip${i ? '' : ' active'}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
  grid.before(bar);
  const draw = cat => {
    grid.innerHTML = PLACES.map((p, i) => ({ p, i })).filter(x => cat === 'All' || x.p.cat === cat).map(({ p, i }) => `
      <button type="button" class="place-card" data-i="${i}">
        <div class="place-image"><span class="ph" aria-hidden="true">${p.icon}</span>
          ${p.img ? `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy" onerror="this.closest('.place-card').classList.add('no-photo');this.remove()">` : ''}
          <span>${esc(p.tag)}</span></div>
        <div class="place-info"><span class="place-category">${esc(p.cat)}</span><h3>${esc(p.name)}</h3><p>${esc(p.short)}</p>
        <span class="place-view-btn">Read more →</span></div></button>`).join('');
  };
  draw('All');
  bar.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    bar.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === b));
    draw(b.dataset.cat);
  });
  const modal = $('#placeModal'); let lastFocus;
  const close = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
  grid.addEventListener('click', e => {
    const c = e.target.closest('.place-card'); if (!c) return;
    const p = PLACES[+c.dataset.i]; lastFocus = c;
    const im = $('#placeModalImage');
    im.style.display = p.img ? '' : 'none'; im.src = p.img || ''; im.alt = p.name;
    im.onerror = () => { im.style.display = 'none'; };
    $('#placeModalCategory').textContent = p.cat; $('#placeModalTitle').textContent = p.name;
    $('#placeModalBody').innerHTML = p.body.map(t => `<p>${esc(t)}</p>`).join('');
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    $('#placeModalClose').focus();
  });
  $('#placeModalClose').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
}

/* ---------- government ---------- */
const OFFICIALS = [
  ['Mayor', 'Marjorie “Joie” Piczon Perales (1Cebu)', 1], ['Vice Mayor', 'Jay B. Sigue (1Cebu)', 1],
  ['Representative, 3rd District', 'Pablo John F. Garcia', 1], ['City Councilor', 'Amuerfino A. Perales'],
  ['City Councilor', 'Ricardo D. Pepito'], ['City Councilor', 'James Y. Gaite'], ['City Councilor', 'Mark Eric G. Espinosa'],
  ['City Councilor', 'Pinky P. Espinosa'], ['City Councilor', 'Ophelio L. Dolino'], ['City Councilor', 'Anecito C. Alferez']
];
const og = $('#officialsGrid');
if (og) og.innerHTML = OFFICIALS.map(o => `<div class="official${o[2] ? ' top' : ''}"><small>${esc(o[0])}</small><h3>${esc(o[1])}</h3></div>`).join('');

/* ---------- facts page ---------- */
const POP = [[1903, 12929], [1918, 25244], [1939, 34413], [1948, 39225], [1960, 63881], [1970, 67727], [1975, 76521], [1980, 91668], [1990, 119970], [1995, 121469], [2000, 141174], [2007, 152960], [2010, 157078], [2015, 170335], [2020, 207314], [2024, 206692]];
const POPG = [null, 4.56, 1.49, 1.46, 4.15, 0.59, 2.48, 3.68, 2.73, 0.23, 3.28, 1.11, 0.97, 1.56, 4.22, -0.07];
const BRGY = [['Awihao', 4207, 3823], ['Bagakay', 2485, 1690], ['Bato', 8173, 7585], ['Biga', 3327, 2076], ['Bulongan', 2647, 2359], ['Bunga', 3868, 3409], ['Cabitoonan', 4154, 3782], ['Calongcalong', 1535, 1327], ['Cambang-ug', 3668, 3537], ['Camp 8', 2529, 1776], ['Canlumampao', 4170, 3523], ['Cantabaco', 7304, 6638], ['Capitan Claudio', 4311, 3877], ['Carmen', 3858, 3505], ['Daanglungsod', 2933, 2802], ['Don Andres Soriano (Lutopan)', 12764, 15333], ['Dumlog', 5288, 4155], ['Gen. Climaco (Malubog)', 6337, 5521], ['Ibo', 3699, 3602], ['Ilihan', 3206, 3344], ['Juan Climaco, Sr. (Magdugo)', 6279, 5568], ['Landahan', 2183, 1810], ['Loay', 1501, 1452], ['Luray II', 4640, 4391], ['Matab-ang', 9868, 9124], ['Media Once', 7128, 6477], ['Pangamihan', 2333, 1653], ['Poblacion', 13383, 13492], ['Poog', 5989, 5665], ['Putingbato', 1413, 1448], ['Sagay', 1145, 1605], ['Sam-ang', 1719, 1649], ['Sangi', 4201, 3835], ['Santo Niño (Mainggit)', 5316, 4320], ['Subayon', 1432, 1153], ['Talavera', 6041, 4972], ['Tubod', 4128, 3329], ['Tungkay', 1173, 1471]];
const CLIM = [['Jan', 28, 23, 70, 13.4], ['Feb', 29, 23, 49, 10.6], ['Mar', 30, 23, 62, 13.1], ['Apr', 31, 24, 78, 14.5], ['May', 31, 25, 138, 24.2], ['Jun', 30, 25, 201, 27.9], ['Jul', 30, 25, 192, 28.4], ['Aug', 30, 25, 185, 27.7], ['Sep', 30, 25, 192, 27.1], ['Oct', 29, 25, 205, 27.4], ['Nov', 29, 24, 156, 22.5], ['Dec', 28, 23, 111, 15.9]];
const POV = [[2000, 38.46], [2003, 16.24], [2006, 34.3], [2009, 31.54], [2012, 18.89], [2015, 21.94], [2018, 17.2], [2021, 32.38]];

function bars(id, readId, data, max, label, text) {
  const box = $(id); if (!box) return;
  box.innerHTML = data.map((d, i) => `<button type="button" class="bar" data-i="${i}" aria-label="${esc(text(d, i))}"><i>${label(d)}</i></button>`).join('');
  const rd = $(readId);
  const sel = i => { box.querySelectorAll('.bar').forEach((b, j) => b.classList.toggle('on', i === j)); rd.textContent = text(data[i], i); };
  box.addEventListener('click', e => { const b = e.target.closest('.bar'); if (b) sel(+b.dataset.i); });
  box.addEventListener('mouseover', e => { const b = e.target.closest('.bar'); if (b) sel(+b.dataset.i); });
  const go = () => box.querySelectorAll('.bar').forEach((b, i) => setTimeout(() => b.style.height = (data[i][1 + (data[i].length > 3 ? 2 : 0)] / max * 100) + '%', i * 40));
  new IntersectionObserver((es, ob) => es.forEach(x => { if (x.isIntersecting) { go(); ob.disconnect(); } })).observe(box);
}
if ($('#profileGrid')) {
  const prof = [['Official name', 'City of Toledo'], ['Cebuano', 'Dakbayan sa Toledo'], ['Filipino', 'Lungsod ng Toledo'], ['Nickname', 'The Copper City with the Heart of Gold'], ['Anthem', 'Toledo City In My Heart'], ['Region / Province', 'Central Visayas / Cebu (3rd district)'], ['Founded', '1861'], ['Cityhood', 'June 19, 1960 (RA 2688)'], ['Area', '216.28 km² (83.51 sq mi)'], ['Population (2024)', '206,692 · 955.67 per km²'], ['Households', '48,813'], ['Registered voters (2025)', '129,196'], ['Elevation', '109 m; highest 981 m; lowest 0 m'], ['Income class', '1st class city'], ['Languages', 'Cebuano, Tagalog'], ['Festival', 'Hinulawan Festival, every June 12'], ['Patron saint', 'John of Sahagun'], ['Named after', 'Toledo, Spain'], ['ZIP / area code', '6038 / +63 (0)32'], ['Time zone', 'UTC+8'], ['Electricity', 'Cebu 3 Electric Cooperative (CEBECO 3)'], ['Distance from Cebu City', '67 km (Talisay 37 km, Naga 35 km)'], ['Neighbors', 'Balamban (north), Pinamungajan (south), Cebu City, Naga & Minglanilla (east), Tañon Strait (west)'], ['Website', 'toledocity.gov.ph']];
  $('#profileGrid').innerHTML = prof.map(p => `<dl class="profile-item"><dt>${esc(p[0])}</dt><dd>${esc(p[1])}</dd></dl>`).join('');
  bars('#popBars', '#popReadout', POP, 210000, d => d[0], (d, i) => `${d[0]}: ${fmt(d[1])} people` + (POPG[i] !== null ? ` (${POPG[i] > 0 ? '+' : ''}${POPG[i]}% a year)` : ''));
  bars('#climateBars', '#climateReadout', CLIM.map(c => [c[0], c[3], c]), 210, d => d[0], d => `${d[0]}: high ${d[2][1]}°C, low ${d[2][2]}°C, ${d[2][3]} mm of rain over ${d[2][4]} days`);
  bars('#povBars', '#povReadout', POV, 40, d => d[0], d => `${d[0]}: ${d[1]}% of residents below the poverty line`);

  const body = $('#brgyBody'), search = $('#brgySearch'); let sort = 'name';
  const g = b => (Math.pow(b[1] / b[2], 1 / 14) - 1) * 100;
  const renderB = () => {
    const q = search.value.trim().toLowerCase();
    const rows = BRGY.filter(b => b[0].toLowerCase().includes(q));
    rows.sort((a, b) => sort === 'pop' ? b[1] - a[1] : sort === 'growth' ? g(b) - g(a) : a[0].localeCompare(b[0]));
    body.innerHTML = rows.map(b => { const x = g(b); return `<tr><td>${esc(b[0])}</td><td class="num">${fmt(b[1])}</td><td class="num">${fmt(b[2])}</td><td class="num ${x >= 0 ? 'up' : 'down'}">${x >= 0 ? '▲' : '▼'} ${Math.abs(x).toFixed(2)}%</td></tr>`; }).join('') || '<tr><td colspan="4">No barangay matches that name. Check the spelling or clear the search.</td></tr>';
    $('#brgyCount').textContent = `${rows.length} of 38 barangays shown. Growth is the average yearly change from 2010 to 2024.`;
  };
  search.addEventListener('input', renderB);
  document.querySelectorAll('[data-sort]').forEach(b => b.addEventListener('click', () => { sort = b.dataset.sort; document.querySelectorAll('[data-sort]').forEach(x => x.classList.toggle('active', x === b)); renderB(); }));
  renderB();

  const card = (n, k, t, p) => `<div class="feature-card"><div class="feature-number">${n}</div><div class="feature-content"><span>${k}</span><h3>${t}</h3><p>${p}</p></div></div>`;
  $('#industryGrid').innerHTML = [
    ['◆', 'COPPER CITY', 'Toledo Copper Mine', 'Carmen Copper Corporation runs a 1,674-hectare mine in Lutopan. Concentrate goes to China, India and Japan.'],
    ['⚡', 'POWER CITY', 'Coal and diesel plants', 'Toledo Power Co. has 60 MW and 82 MW coal units and a 40 MW diesel plant. Cebu Energy Development Corp. adds 246 MW, and Therma Visayas adds 300 MW in Bato.'],
    ['☀', 'RENEWABLES', '60 MW solar farm', 'First Toledo Solar Energy Corporation uses 73 hectares in Talavera. NGCP has substations in Calong-calong and Magdugo.'],
    ['▣', 'BUSINESS', 'Industry and shopping', 'Atlas Fertilizer Corporation and San-Vic Agro-Builders operate here, alongside Gaisano Grand, Gaisano Metro and Prince Warehouse Club.']
  ].map((c, i) => card(c[0], c[1], c[2], c[3])).join('');
  $('#geoGrid').innerHTML = [
    ['⌖', 'DISTANCE', '67 km to Cebu City', 'Toledo is 37 km from Talisay and 35 km from Naga.'],
    ['≈', 'WATER', 'Source for Metro Cebu', 'Malubog Lake sits higher than Cebu City, so a vacuum-type system carries water over the mountain.'],
    ['⛰', 'CLIMBING', 'Limestone crags', 'Cantabaco and Poog have limestone cliffs developed for sport climbing.'],
    ['◇', 'BARANGAYS', '10 urban, 28 rural', 'Each barangay is divided into puroks, and some also have sitios.']
  ].map(c => card(c[0], c[1], c[2], c[3])).join('');
  $('#notableList').innerHTML = [
    ['Máximo Macapobre', 'A 19th-century Philippine leader and activist, and one of the founders of New Hinulawan.'],
    ['Juan Clímaco', 'The second governor of Cebu and the first one elected to the post. He was also a Cebu revolutionary during the Philippine-American War.'],
    ['Gisele Shaw', 'Professional wrestler.'],
    ['Jay-R Siaboc', 'Actor, singer and Season 1 finalist of Pinoy Dream Academy.']
  ].map((n, i) => `<div class="leader-row"><span class="leader-year">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(n[0])}</h3><p>${esc(n[1])}</p></div></div>`).join('');
}

/* ---------- quiz ---------- */
const QUIZ = [
  ['History', 'What is Toledo’s nickname?', ['The Copper City with the Heart of Gold', 'The Gateway of the South', 'The Queen City of the Visayas', 'The Salt Capital of Cebu'], 0, 'The nickname pairs the copper mine with the warmth of its people.'],
  ['History', 'Old Hinulawan is known today as which barangay?', ['Daanglungsod', 'Poblacion', 'Tubod', 'Talavera'], 0, 'Survivors who returned after the 1863 disaster resettled the old site.'],
  ['History', 'In 1863, a series of what destroyed Pueblo Hinulawan?', ['Earthquakes', 'Typhoons', 'Fires', 'A pirate raid'], 0, 'The third tremor destroyed the pueblo, and seawater flooded the settlement waist-deep.'],
  ['History', 'Why did residents of New Hinulawan build a stone baluarte along the shore?', ['To defend against pirates', 'To store copper', 'To stop floods', 'To guide ships'], 0, 'Pirates were raiding towns along the Tañon Strait. The baluarte’s remains were buried when the first municipio was built.'],
  ['History', 'Who approved renaming New Hinulawan to Toledo in 1869?', ['Governor-general Carlos María de la Torre', 'Fr. Mariano Brazal', 'Esteban Perez', 'Manuel A. Zosa'], 0, 'It happened at a banquet in Manila on July 12, 1869. Esteban Perez and Fr. Brazal proposed the name.'],
  ['History', 'Which Spanish river did the Hinulawan River remind Esteban Perez of?', ['The Tagus (Río Tajo)', 'The Ebro', 'The Guadalquivir', 'The Douro'], 0, 'Toledo, Spain sits on the Tagus, and the governor-general had been born in Toledo.'],
  ['History', 'Which law made Toledo a chartered city?', ['Republic Act No. 2688', 'Republic Act No. 1000', 'Republic Act No. 7160', 'Republic Act No. 2000'], 0, 'The charter is dated June 18, 1960, and Toledo celebrates cityhood on June 19.'],
  ['History', 'Which congressman authored the Toledo City charter?', ['Manuel A. Zosa', 'Juan Clímaco', 'Pablo John F. Garcia', 'Sergio Osmeña'], 0, 'Zosa represented the old Sixth District of Cebu.'],
  ['History', 'Who helped liberate Toledo from Japanese forces in 1945?', ['Commonwealth Army divisions and Cebuano guerrillas', 'American paratroopers only', 'The Spanish navy', 'Chinese volunteers'], 0, 'The 8th, 82nd, 83rd, 85th and 86th Infantry Divisions fought alongside Cebuano guerrillas.'],
  ['Culture', 'On what date is the Hinulawan Festival and the feast of John of Sahagun?', ['June 12', 'January 1', 'September 8', 'December 25'], 0, 'Toledo’s patron saint is John of Sahagun.'],
  ['Culture', 'Which Filipino saint is Cantabaco’s hilltop parish shrine named after?', ['Pedro Calungsod', 'Lorenzo Ruiz', 'Pedro Bukaneg', 'Jose Rizal'], 0, 'It was the first shrine named for him after his canonization on October 21, 2012. He was the second Filipino saint.'],
  ['Geography', 'Which body of water lies on Toledo’s western coast?', ['Tañon Strait', 'Camotes Sea', 'Bohol Sea', 'Visayan Sea'], 0, 'Across it lies Negros Oriental. Toledo is the only Cebu city on this western seaboard.'],
  ['Geography', 'How far is Toledo from Cebu City?', ['67 km', '15 km', '120 km', '35 km'], 0, 'Talisay is 37 km away and Naga is 35 km.'],
  ['Geography', 'How many barangays does Toledo have?', ['38', '21', '54', '12'], 0, 'Ten are urban and twenty-eight are rural.'],
  ['Geography', 'Which barangay is the most populous (2024)?', ['Poblacion', 'Lutopan', 'Matab-ang', 'Bato'], 0, 'Poblacion has 13,383 people, just ahead of Don Andres Soriano (Lutopan) with 12,764.'],
  ['Economy', 'Which company’s subsidiary operates the Toledo copper mine?', ['Atlas Consolidated Mining (Carmen Copper)', 'Aboitiz Equity', 'San Miguel Corporation', 'Ayala Land'], 0, 'The mine covers 1,674 hectares in Barangay Lutopan.'],
  ['Economy', 'Where is Toledo’s 60 MW solar plant?', ['Talavera', 'Bato', 'Carmen', 'Sangi'], 0, 'It uses a 73-hectare property owned by First Toledo Solar Energy Corporation.'],
  ['Economy', 'Which Toledo barangay hosts the 300 MW Therma Visayas coal plant?', ['Bato', 'Cantabaco', 'Poog', 'Ibo'], 0, 'Toledo is also called the “Power City.”'],
  ['Facts', 'What was Toledo’s population in the 2024 census?', ['206,692', '157,078', '141,174', '250,000'], 0, 'It was 12,929 in 1903, so the city has grown about sixteen-fold.'],
  ['Facts', 'Which two barangays are known for limestone sport-climbing crags?', ['Cantabaco and Poog', 'Bato and Carmen', 'Sangi and Ibo', 'Tubod and Loay'], 0, 'Local climbers developed the cliffs into popular crags.'],
  ['Facts', 'Why does Malubog Lake matter to Metro Cebu?', ['It is a source of water', 'It is a port', 'It is a mine pit for copper', 'It is a flood gate'], 0, 'The lake sits higher than Cebu City, so a vacuum-type system moves the water over the mountain.'],
  ['Leaders', 'Who is the current mayor of Toledo City?', ['Marjorie “Joie” Piczon Perales', 'Jay B. Sigue', 'Pablo John F. Garcia', 'Juan Clímaco'], 0, 'Her motto is “It is not I, but we.” Jay Sigue is the vice mayor.'],
  ['Leaders', 'Juan Clímaco, born in Toledo, became what?', ['The first elected governor of Cebu', 'A saint', 'A Spanish governor-general', 'A copper tycoon'], 0, 'He was the second governor of Cebu and a revolutionary during the Philippine-American War.']
];
const quizBox = $('#quizContainer');
if (quizBox) {
  const TOTAL = 10; let qs, cur, score, streak, best, locked;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[a[i], a[j]] = [a[j], a[i]]; } return a; };
  const ranks = [[10, 'Toledo Local', 'You know this city like a Toledano.'], [8, 'Copper Scholar', 'Strong work. Only a few details slipped past you.'], [5, 'Curious Visitor', 'A solid start. Read the History and Facts pages, then try again.'], [0, 'New Explorer', 'Everyone starts here. Explore the site and retake the quiz.']];
  function start() {
    qs = shuffle(QUIZ).slice(0, TOTAL); cur = 0; score = 0; streak = 0; best = 0;
    $('#quizResult').style.display = 'none'; quizBox.style.display = ''; $('#totalQ').textContent = TOTAL; show();
  }
  function show() {
    locked = false; const [cat, q, opts, ok] = qs[cur];
    const order = shuffle(opts.map((t, i) => ({ t, ok: i === ok })));
    $('#questionNumber').textContent = `Question ${cur + 1} of ${TOTAL}`;
    $('#questionCategory').textContent = cat.toUpperCase(); $('#question').textContent = q;
    $('#score').textContent = score; $('#streak').textContent = streak > 1 ? `🔥 ${streak} in a row` : '';
    $('#progressBar').style.width = (cur / TOTAL * 100) + '%';
    $('#answers').innerHTML = order.map((o, i) => `<button type="button" class="answer-btn" data-ok="${o.ok}"><b>${'ABCD'[i]}</b>${esc(o.t)}</button>`).join('');
    const nb = $('#nextBtn'); nb.disabled = true; nb.textContent = cur === TOTAL - 1 ? 'See my result' : 'Next question →';
    const old = $('.fun-fact'); if (old) old.remove();
  }
  $('#answers').addEventListener('click', e => {
    const b = e.target.closest('.answer-btn'); if (!b || locked) return; locked = true;
    const right = b.dataset.ok === 'true';
    document.querySelectorAll('.answer-btn').forEach(x => { x.disabled = true; if (x.dataset.ok === 'true') x.classList.add('correct'); });
    if (right) { score++; streak++; best = Math.max(best, streak); } else { b.classList.add('wrong'); streak = 0; }
    $('#score').textContent = score; $('#streak').textContent = streak > 1 ? `🔥 ${streak} in a row` : '';
    const f = document.createElement('div'); f.className = 'fun-fact';
    f.innerHTML = `<strong>${right ? 'Correct!' : 'Not quite.'}</strong>${esc(qs[cur][4])}`;
    $('#answers').after(f); $('#nextBtn').disabled = false; $('#nextBtn').focus();
  });
  window.nextQuestion = () => {
    if (++cur < TOTAL) return show();
    $('#progressBar').style.width = '100%'; quizBox.style.display = 'none';
    const r = $('#quizResult'); r.style.display = '';
    $('#finalScore').textContent = score;
    const rk = ranks.find(x => score >= x[0]);
    $('#resultRank').textContent = rk[1];
    $('#resultMessage').textContent = `${rk[2]} Your longest streak was ${best}.`;
  };
  window.restartQuiz = start;
  start();
}
