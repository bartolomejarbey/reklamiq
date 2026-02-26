/* ═══════════════════════════════════════════
   REKLAMIQ – Main JavaScript
   ═══════════════════════════════════════════ */

// ═══════ SUPABASE CONFIG ═══════
// V produkci: nahraď za reálné hodnoty z .env
const SUPABASE_URL = '';   // vyplní se po napojení
const SUPABASE_ANON_KEY = '';

// ═══════ DEMO CONTENT ═══════
// V produkci: tohle nahradí Claude API
const businessProfiles = {
    salon: {
        name: "Studio Krása",
        tags: ["Salon krásy", "Přátelský tón", "Ženy 25-45", "Praha", "Premium péče", "Přírodní kosmetika"],
        posts: [
            { type: "organic", text: "Věděli jste, že správná péče o vlasy začíná u pokožky hlavy? 🌿 Naše terapeutické ošetření kombinuje přírodní oleje s masáží, která probudí vaše vlasové kořínky k životu. Výsledek? Silnější, zdravější vlasy už po první návštěvě.", hashtags: "#pečeovlasy #prirodnikosmetika #studiokrasa #praha" },
            { type: "organic", text: "Pondělní transformace 💫 Naše klientka přišla s unavenými, suchými vlasy. Po 2 hodinách odcházela s barvou, která vypadá přirozeně a září. Takhle vypadá práce, kterou milujeme.", hashtags: "#vlasy #predpo #kadernictvi #praha" },
            { type: "organic", text: "Tajemství krásného účesu? Dobrý střih + správné produkty. Přijďte na bezplatnou konzultaci a zjistěte, co vaše vlasy skutečně potřebují.", hashtags: "#studiobeauty #vlasoveporadenstvi" },
            { type: "ad", text: "👋 Hledáte kadeřnictví, kde vám skutečně naslouchají? Studio Krása v Praze 3 – osobní přístup, přírodní produkty a výsledky, které mluví za vše. Objednejte se online ještě dnes.", hashtags: "#kadernictvipraha #objednatseonline" },
            { type: "organic", text: "Za každým krásným účesem stojí tým, který svou práci miluje. Představujeme vám Lucii – naši specialistku na barvení a balayage s 8 lety zkušeností ✨", hashtags: "#nastym #kadernice #balayage" },
            { type: "organic", text: "Nová kolekce jarních účesů je tady! Lehké vrstvy, teplé tóny a spousta objemu. Který styl je pro vás? Napište nám do zpráv 💬", hashtags: "#jarnistyly #novyuces #inspirace" },
            { type: "organic", text: "Pátky jsou u nás rezervované pro speciální ošetření. Tento týden: hloubková regenerace keratinem s 20% slevou pro nové klientky.", hashtags: "#keratinoveosetreni #sleva #studio" },
            { type: "ad", text: "🎁 AKCE: Přiveďte kamarádku a obě dostanete 15% slevu na jakoukoliv službu. Platí celý březen! Studio Krása, Praha 3.", hashtags: "#akce #sleva #kadernictvi" },
            { type: "organic", text: "Zákulisí naší práce 🎬 Takhle vypadá příprava barvy na míru. Každá klientka je pro nás originál – a tak přistupujeme i k míchání odstínů.", hashtags: "#zakulisi #barveninamieru #studio" },
            { type: "organic", text: "Děkujeme vám za nádherných 500 recenzí na Google! ⭐ Vaše důvěra nás žene kupředu. Jako poděkování – všichni, kdo se objednají tento týden, dostanou mini ošetření zdarma.", hashtags: "#dekujeme #recenze #500recenzi" },
            { type: "organic", text: "Tip na domácí péči: Naneste kokosový olej na konečky vlasů 20 minut před mytím. Jednoduchý trik, obrovský rozdíl v hydrataci.", hashtags: "#tipy #domacipece #vlasy" },
            { type: "organic", text: "Než ✕ Po. Tohle je síla profesionálního barvení. Naše klientka chtěla přirozený look s jemným kontrastem – a přesně to dostala.", hashtags: "#predpo #barveni #naturalbalayage" },
        ]
    },
    default: {
        name: "Vaše firma",
        tags: ["Lokální firma", "Profesionální tón", "Česká republika", "Kvalitní služby", "Spokojení zákazníci"],
        posts: [
            { type: "organic", text: "Za každou kvalitní službou stojí tým, který svou práci miluje. Představujeme vám náš příběh – od malých začátků k desítkám spokojených zákazníků měsíčně. 💪", hashtags: "#naspribeh #lokalnifirma #kvalita" },
            { type: "organic", text: "Věděli jste, že správným přístupem můžete ušetřit čas i peníze? Přijďte se poradit – rádi vám ukážeme, jak na to.", hashtags: "#tipyatriky #usetrete #poradenstvi" },
            { type: "organic", text: "Takhle vypadá naše práce v praxi. Každý projekt bereme osobně, protože víme, že na detailech záleží.", hashtags: "#naseprace #detaily #profesionalita" },
            { type: "ad", text: "Hledáte spolehlivého partnera? Máme za sebou stovky spokojených klientů. Napište nám a zjistěte, co můžeme udělat pro vás.", hashtags: "#spolehlivost #partnerstvi" },
            { type: "organic", text: "Zákulisí naší práce 🎬 Každý den přicházíme s novými nápady, jak vám poskytnout to nejlepší.", hashtags: "#zakulisi #inovace" },
            { type: "organic", text: "Děkujeme všem našim zákazníkům za důvěru! Vaše pozitivní recenze nás motivují každý den. ⭐", hashtags: "#dekujeme #recenze #motivace" },
            { type: "organic", text: "Novinka v naší nabídce! Sledujte nás, ať vám nic neunikne.", hashtags: "#novinka #novinky #sledujte" },
            { type: "ad", text: "🔥 Limitovaná akce: 20% sleva na první objednávku. Platí jen tento týden!", hashtags: "#akce #sleva #limitovana" },
            { type: "organic", text: "Spolupráce s našimi klienty je to, co nás baví nejvíc. Podívejte se na výsledky naší poslední zakázky.", hashtags: "#spoluprace #vysledky" },
            { type: "organic", text: "Pátek = čas na rekapitulaci týdne. Co vše jsme stihli? Sledujte naše stories!", hashtags: "#patek #rekapitulace #stories" },
            { type: "organic", text: "Za kvalitní výsledky stojí kvalitní přístup. Proto investujeme do vzdělávání a nejlepších nástrojů.", hashtags: "#kvalita #vzdelavani #investice" },
            { type: "organic", text: "Nový týden, nové výzvy! Těšíme se na spolupráci s vámi. Napište nám 💬", hashtags: "#novytyden #spoluprace #kontakt" },
        ]
    }
};

const postIcons = ['📸', '✨', '💼', '🎯', '🌟', '📱', '💡', '🔥', '🎨', '📊', '🏆', '💫'];

// ═══════ GENERATOR ═══════
function startGeneration() {
    const url = document.getElementById('urlInput').value.trim();
    if (!url) {
        document.getElementById('urlInput').style.borderColor = '#E11D48';
        setTimeout(() => document.getElementById('urlInput').style.borderColor = '', 1500);
        return;
    }

    // Detect business type
    const urlLower = url.toLowerCase();
    let profile = { ...businessProfiles.default };
    if (urlLower.match(/salon|kras|beauty|kader|hair|neht|kosmet/)) {
        profile = { ...businessProfiles.salon };
    }

    // Extract name from URL
    try {
        const hostname = new URL(url.startsWith('http') ? url : 'https://' + url).hostname;
        const name = hostname.replace('www.', '').split('.')[0];
        profile.name = name.charAt(0).toUpperCase() + name.slice(1);
    } catch(e) {}

    // Loading animation
    const bar = document.getElementById('loadingBar');
    const barInner = document.getElementById('loadingBarInner');
    const status = document.getElementById('loadingStatus');
    const results = document.getElementById('results');

    results.classList.remove('visible');
    bar.classList.add('active');
    status.classList.add('active');

    const steps = [
        { pct: 15, text: "Analyzuji web..." },
        { pct: 35, text: "Vytvářím Brand DNA profil..." },
        { pct: 55, text: "Generuji texty příspěvků..." },
        { pct: 75, text: "Připravuji grafické šablony (Placid)..." },
        { pct: 90, text: "Finalizuji obsah..." },
        { pct: 100, text: "Hotovo! ✓" },
    ];

    let i = 0;
    function nextStep() {
        if (i < steps.length) {
            barInner.style.width = steps[i].pct + '%';
            status.textContent = steps[i].text;
            i++;
            setTimeout(nextStep, 800 + Math.random() * 600);
        } else {
            setTimeout(() => {
                bar.classList.remove('active');
                status.classList.remove('active');
                renderResults(profile);
            }, 400);
        }
    }
    nextStep();
}

function renderResults(profile) {
    const results = document.getElementById('results');

    // Brand DNA
    document.getElementById('brandName').textContent = profile.name;
    document.getElementById('brandTags').innerHTML =
        profile.tags.map(t => `<span class="brand-tag">${t}</span>`).join('');

    // Posts grid
    const grid = document.getElementById('postsGrid');
    grid.innerHTML = '';

    profile.posts.forEach((post, idx) => {
        const isLocked = idx > 0;
        const isAd = post.type === 'ad';
        const icon = postIcons[idx % postIcons.length];

        const card = document.createElement('div');
        card.className = `post-card${isLocked ? ' locked' : ''}`;

        card.innerHTML = `
            ${isLocked ? `
                <div class="lock-overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Odemknout s předplatným</span>
                </div>
            ` : ''}
            <div class="post-image-placeholder">
                <span class="icon">${icon}</span>
                <span class="type-label">${isAd ? '📢 Reklama' : '📱 Organický post'}</span>
                <span style="font-size:0.75rem; color:var(--gray-400); margin-top:4px;">
                    ${isLocked ? 'Náhled uzamčen' : 'Šablona + vaše fotka'}
                </span>
            </div>
            <div class="post-body">
                <span class="post-type-badge ${isAd ? 'badge-ad' : 'badge-organic'}">
                    ${isAd ? 'Reklamní' : 'Organický'}
                </span>
                <div class="post-text">${post.text}</div>
                <div class="post-hashtags">${post.hashtags}</div>
            </div>
            ${!isLocked ? `
            <div class="post-footer">
                <div class="post-toggle">
                    <button class="active" onclick="toggleVariant(this, 'text')">S textem</button>
                    <button onclick="toggleVariant(this, 'notext')">Bez textu</button>
                </div>
                <div class="post-actions">
                    <button onclick="downloadPost(this)">⬇ Stáhnout</button>
                </div>
            </div>
            ` : ''}
        `;
        grid.appendChild(card);
    });

    results.classList.add('visible');
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleVariant(btn, type) {
    const parent = btn.parentElement;
    parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // V produkci: přepne mezi Placid šablonou s textem a bez textu
    console.log('Toggle variant:', type);
}

function downloadPost(btn) {
    // V produkci: stáhne obrázek z Placid API
    alert('V beta verzi: stahování bude dostupné po napojení Placid.app šablon.');
}

// ═══════ ENTER KEY ═══════
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('urlInput');
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') startGeneration();
        });
    }
});
