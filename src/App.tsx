import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import './archive.css';
import { Link, Router as WouterRouter, useLocation } from 'wouter';
import {
  Album, Archive, ArrowDownRight, ArrowLeft, ArrowRight, AudioLines, Bookmark,
  BookOpen, Check, ChevronDown, Disc3, Headphones, Pause, Play, Plus,
  Search, Share2, SlidersHorizontal, Volume2, X,
} from 'lucide-react';

type Specimen = {
  id: string; title: string; creator: string; type: string; year: string; location: string;
  grade: string; ref: string; image: string; provenance: string; detail: string; decade: string;
};
type DepositEntry = { title: string; creator: string; medium: string; ref: string };

const specimens: Specimen[] = [
  {
    id: 'et0192', title: 'The Homeless Wanderer', creator: 'Emahoy Tsegué-Maryam Guèbrou',
    type: '12" Vinyl', year: '1970', location: 'Addis Ababa', grade: 'VG+', ref: '1970-ETH-VNL',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl5avP__fZtIspP8S2MmUnSu6TDhUwTkJGJKwyhHHYXWgkowszDlCkmVLRvWte2yigJRaM_bP9qApOVnKGFkrTLNZnhr81pu6X_fQA8gi7PuQObWUN7X437BBzSd6BcaLlxKbWVU5zX-CTQL0svz_kJwFHEcd0qVhBshlcIuGaD7c9xpyFvY-Ay-u8F2igsDf2ivVuYd9l8rxD5g1biXpghNKXRLTkc7S-Q_0PTWzUuXsgXR34DQTg',
    provenance: 'Pristine private pressing via Ethiopian Church diaspora archive. Recorded on an upright Bösendorfer in Jerusalem. Deep microscopic runout matrix etching: ET-70-A-1. No sleeve splits; minimal ambient surface flutter on side B intro.',
    detail: 'Recorded on an upright Bösendorfer in Jerusalem. Deep microscopic runout matrix etching ET-70-A-1.',
    decade: '1970s',
  },
  {
    id: 'prv6902', title: 'Provoke: Vol. 2 (1969)', creator: 'Takuma Nakahira, Daido Moriyama, Takanori Okada',
    type: 'Monograph', year: '1969', location: 'Tokyo', grade: 'NM', ref: '1969-JPN-PUB',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcoPBIDvQG1L9dDV_9VdGDqEBDH6NHOv8013sW1Sr4Wdpvieoj0fCWT-anEbsxuxqYFziwoIy5onfzcQHiULRY7fZZhVL4Kty0whFArdQTG-2_5J5ZP6d0E7IQkLHMF1lqIitafo5JVji8kxOh10OAiyNH0dLAo7OZYARaVoP3nzxYYpOHy_nSTY8odJ40rU1n8a5Lx53WX6sHXJUsrYdNJvIhRfQZzbC8hQXCqJbLqlINqu5Y9YIi',
    provenance: "Seminal 'Are, Bure, Boke' manifesto. Original silver-gelatin gravure reproduction on newsprint-stock folio. Unoxidized staple cores; rare unbroken spine creases. 1,000 total copies pressed.",
    detail: 'Original silver-gelatin gravure reproduction on newsprint-stock folio. Unoxidized staple cores; rare unbroken spine creases.',
    decade: '1960s',
  },
  {
    id: 'rough86', title: 'World of Echo (Test Pressing)', creator: 'Arthur Russell',
    type: '7" Acetate', year: '1986', location: 'London', grade: 'M', ref: '1986-UK-TST',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAd_ZCPZwyqBQoQqI0ZwopFbLX7Q6cOBc25MW1TQgzNuJF2SHAVRI1MJDW1clPIbw8wNlpBdEKPYz15v3BJ7v2RkGrKOVJRa5OIpJASIfCnesg48-jMaKv11zT_r1OBBbLk4mpytSRiMjMeJeKBbPwmPJaoMqk8mNQC462FVjoU6GkixBrmAg6239u23HwZZGJgBkyjAp6_kS0rr-betoDnJmlP1epyuuvRY32FcglA0csN8lj898p',
    provenance: "One of only 15 stamped lacquer reference discs cut prior to initial distribution. Features alternate reverberation decay on 'Wax the Van' and amplified cello feedback cues not present in release version.",
    detail: 'One of only 15 stamped lacquer reference discs cut prior to initial distribution.',
    decade: '1980s',
  },
  {
    id: 'midi1001', title: 'Ongaku Zukan (音楽図鑑)', creator: 'Ryuichi Sakamoto',
    type: '12" Vinyl', year: '1984', location: 'Tokyo', grade: 'NM', ref: '1984-JPN-VNL',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrSQObG-UNmkiK1ZdYPbPfL8I5TG8ReddB0Mf4TNaIy6rds6aUR4RDLiiKuTlqUc-Ue7JsoQoLr_fjVDpX9i5u6H9xFlrjNIi5jfZotf3xfOA6vWslpvt-w-jxa3A97bwYvUqsFup9uMzozAcQ3Xez81VY_2rDhI7F8aSfFDnRkE807GiDnPGOC4KnUtm5d_TAMRgytfpKVlhCdaWR4rIKttbOttasqybPloXV-i24WlFcZ1c_d4mm',
    provenance: "First Japanese promo issue on Midi Inc. Complete with 7” flexi-disc bonus ('Replica') and botanical monograph insert by Tsuguya Inoue. Clean obi strip intact, zero spine discoloration.",
    detail: 'Complete with 7” flexi-disc bonus and botanical monograph insert by Tsuguya Inoue.',
    decade: '1980s',
  },
  {
    id: 'hy86', title: "Sound Garden Installation '86", creator: 'Hiroshi Yoshimura',
    type: 'Cassette Reel', year: '1986', location: 'Misawa Museum', grade: 'EX+', ref: '1986-JPN-TAP',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC0E5rH5KOlHjTAjI9p0xTiIvZoDFKxuEPk7g7LaPicCcq_1rC67Na5J_O6cKvYQbFmulMRAAzJvl77kppw6ATZ5A7vqMJCyyUezbSJeX6t2tyRIoeIglyZfekJcQYU16gBlXHF0bxv3LMx_AAK57NQryFWqPvWKxN1TrHlrhUH4F4NPP0dzhTphubZReZYmyEklrtPeVOpGzcgHdHe7_eBYhjP4mZxVJBKOhMUnHQAeDj9ze14AAn',
    provenance: 'Type II chrome field cassette from the Misawa Museum installation. Duration: 46:12. Preserved with original handwritten J-card.',
    detail: 'Type II chrome field cassette · 46:12 · Misawa Museum.',
    decade: '1980s',
  },
];

const navItems = [
  { title: 'Dispatch', href: '/', icon: BookOpen },
  { title: 'The Vault', href: '/vault', icon: Archive },
  { title: 'Soundroom', href: '/soundroom', icon: Disc3 },
  { title: 'Collection', href: '/collection', icon: Album },
];

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function ArchiveApp() {
  const [location, setLocation] = useLocation();
  const [saved, setSaved] = useState<string[]>(() => readStorage<string[]>('aa-saved', []));
  const [toast, setToast] = useState('');
  const [inspect, setInspect] = useState<Specimen | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [depositOpen, setDepositOpen] = useState(false);
  const [deposits, setDeposits] = useState<DepositEntry[]>(() => readStorage('aa-deposits', []));

  useEffect(() => localStorage.setItem('aa-saved', JSON.stringify(saved)), [saved]);
  useEffect(() => localStorage.setItem('aa-deposits', JSON.stringify(deposits)), [deposits]);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setInspect(null);
        setDepositOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const activeTitle = navItems.find(item => item.href === location)?.title ?? 'Dispatch';
  const toggleSave = (id: string) => {
    const next = saved.includes(id) ? saved.filter(value => value !== id) : [...saved, id];
    setSaved(next);
    setToast(next.includes(id) ? 'CATALOGUED TO BOX #B-42' : 'REMOVED FROM PERSONAL BOX');
  };

  return (
    <div className="shell paper-grain">
      <header className="site-header">
        <Link href="/" className="brand-lockup" aria-label="Analog Archivist — Dispatch">
          <div className="brand-mark" aria-hidden="true"><Disc3 size={21} strokeWidth={1.3} /></div>
          <div>
            <div className="brand-name">Analog Archivist <span className="collective">[Collective]</span></div>
            <div className="brand-issue">Issue Nº 42 <span>·</span> <span className="current-place">{activeTitle}</span></div>
          </div>
        </Link>
        <div className="header-right">
          <span className="header-status"><i /> Tokyo · London depository online</span>
          <button className="icon-button" aria-label="Search archive" data-testid="button-global-search" onClick={() => setSearchOpen(value => !value)}>
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
          <Link href="/collection" className="profile-stamp" aria-label="Open curator collection">CV</Link>
        </div>
      </header>

      {searchOpen && <form className="global-search" onSubmit={event => { event.preventDefault(); setSearchOpen(false); setLocation('/vault'); }}>
        <Search size={17} />
        <input autoFocus value={globalSearch} onChange={event => setGlobalSearch(event.target.value)} placeholder="Search the accession ledger…" aria-label="Search the accession ledger" />
        <button className="button button-dark" type="submit">Search Vault <ArrowRight size={14} /></button>
      </form>}

      <aside className="desktop-side">
        <p className="eyebrow">Archive index</p>
        <div className="side-nav">
          {navItems.map(({ title, href, icon: Icon }, index) => <Link key={href} href={href} className={`side-link ${location === href ? 'active' : ''}`} data-testid={`link-nav-${title.toLowerCase().replaceAll(' ', '-')}`}>
            <span className="side-number">0{index + 1}</span><Icon size={16} strokeWidth={1.6} /><span>{title}</span><ArrowDownRight size={13} className="side-arrow" />
          </Link>)}
        </div>
        <div className="side-note">
          <span className="eyebrow">Current issue</span>
          <p>Tokyo &amp; London<br />Recordings</p>
          <span className="mono tiny">VOL. 28 / SPRING 2025</span>
        </div>
        <div className="side-foot mono tiny">KYOTO · BERLIN · TYO<br />EST. IN THE GROOVE</div>
      </aside>

      <main className="main-area">
        {location === '/' && <Dispatch setLocation={setLocation} setInspect={setInspect} setToast={setToast} />}
        {location === '/vault' && <Vault globalSearch={globalSearch} setInspect={setInspect} saved={saved} toggleSave={toggleSave} />}
        {location === '/soundroom' && <Soundroom setToast={setToast} />}
        {location === '/collection' && <Collection saved={saved} deposits={deposits} setToast={setToast} openDeposit={() => setDepositOpen(true)} />}
        {!navItems.some(item => item.href === location) && <NotFound goHome={() => setLocation('/')} />}
      </main>

      <nav className="mobile-nav" aria-label="Primary navigation">
        {navItems.map(({ title, href, icon: Icon }) => <Link key={href} href={href} className={`mobile-link ${location === href ? 'active' : ''}`} aria-current={location === href ? 'page' : undefined} data-testid={`mobile-link-${title.toLowerCase().replaceAll(' ', '-')}`}>
          <Icon size={19} strokeWidth={1.6} /><span>{title}</span>
        </Link>)}
      </nav>

      {inspect && <InspectionModal specimen={inspect} onClose={() => setInspect(null)} onConfirm={() => { setInspect(null); setToast('SLIP QUEUED // VISIT DESK 2'); }} />}
      {depositOpen && <DepositModal onClose={() => setDepositOpen(false)} onConfirm={entry => { setDeposits(items => [entry, ...items]); setDepositOpen(false); setToast('DEPOSIT REGISTERED TO LEDGER'); }} />}
      {toast && <div className="toast" role="status"><Check size={15} />{toast}</div>}
    </div>
  );
}

function PageHeading({ kicker, title, intro }: { kicker: string; title: ReactNode; intro?: string }) {
  return <div className="page-heading reveal">
    <span className="eyebrow terracotta">{kicker}</span>
    <h1 className="serif">{title}</h1>
    {intro && <p>{intro}</p>}
  </div>;
}

function Dispatch({ setLocation, setInspect, setToast }: {
  setLocation: (path: string) => void; setInspect: (item: Specimen) => void; setToast: (message: string) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(102);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setSeconds(value => value >= 258 ? 0 : value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [playing]);
  const time = (n: number) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
  return <div className="content dispatch-content">
    <div className="dispatch-ribbon"><span><i className="live-dot" /> Archive Curation · Vol. 28 / Tokyo &amp; London Recordings</span><b>[RESTRICTED]</b></div>
    <PageHeading kicker="Dispatch / No. 042" title={<>Listening for what<br className="desktop-break" /> time leaves behind.</>} intro="A field note from the archive: rare pressings, printed matter, and the rooms they came from." />
    <section className="hero-dossier">
      <div className="dossier-head mono"><span>SPECIMEN NO. 0429 <em>·</em> ARCHIVED 14.10.24</span><span className="terracotta">FIRST PRESSING · DEEP GROOVE</span></div>
      <div className="hero-art">
        <img className="art-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgbiMoAS5HEOSrqFvu3skmKiLLOMwc3Z-yr7wYDfGTzIU2TPzHEUA63_6XbZJeo9JdLJMqhrifSGwm5GVkWyYQa7__Ge8oYrwSqpbBb8FjjfRGjs0fsgKo0T3PEY4jWBV_u3QbNRX5gAkmix36uI_XaPQjbzv3eP1uRZKZbwEkxYwSbGEaq6pAMnqHN8FhMKU8rnKNWGyWfZ4O7wc-YtMA-qVG4fioG-YDKkQBD-U3W7LyiNdrPIFf" alt="A rare 1970s Japanese vinyl pressing on an archival console" />
        <div className={`peek-disc ${playing ? 'turn' : ''}`} aria-hidden="true"><div className="disc-label">AA-7409<br /><small>33⅓ RPM</small></div></div>
        <span className="image-caption mono">MATRIX A-1 / MASTER RUNOUT</span>
      </div>
      <div className="hero-copy">
        <div className="tag-row"><span className="tag">[RPM: 33⅓]</span><span className="tag">[EDITION: 240 COPIES]</span><span className="tag tag-accent">[CAT: AA-7409]</span></div>
        <h2 className="serif">Acoustic Solitude &amp; Rare Pressings <span>(1974—1982)</span></h2>
        <div className="curator-note"><span className="eyebrow">Curator dispatch · Clara Vance</span><p>“Discovered in a water-sealed basement crate along the Odakyu rail corridor in Shimokitazawa. This uncirculated pressing captures acoustic fingerpicking recorded through a single Sony C-38B condenser onto custom half-inch tape. Surface noise is pristine, resonant, and remarkably quiet.”</p></div>
        <div className="mini-player">
          <button className="play-button" aria-label={playing ? 'Pause needle drop sample' : 'Play needle drop sample'} data-testid="button-dispatch-play" onClick={() => setPlaying(value => !value)}>{playing ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}</button>
          <div className="mini-player-info"><b>Needle Drop Preview</b><span>{playing ? 'Playing: Master Track 02 · Active Turntable' : 'Track 02 · 180g Vinyl Test Run'}</span></div>
          <span className="mono duration">{time(seconds)} / 04:18</span>
          <div className="wave-box"><div className={`waveform ${playing ? 'wave-animated' : ''}`} /></div>
        </div>
        <button className="text-link" onClick={() => { setLocation('/vault'); setToast('OPENING THE SPECIMEN DIRECTORY'); }}>Open specimen dossier <ArrowRight size={14} /></button>
      </div>
    </section>

    <section className="dispatch-section printed-section">
      <div className="section-title"><span className="section-marker" /><div><span className="eyebrow">Folio 09 / Printed matter</span><h2 className="serif">Printed Matter &amp; Photobooks</h2></div><button className="text-link" onClick={() => setLocation('/vault')}>View index <ArrowRight size={13} /></button></div>
      <div className="printed-feature">
        <div className="book-art"><img className="art-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR3tfxmOzlSC2SvfcXWYtbqz9xUCvkLAsKV_MpSPIF7vOlwpqt4b_bz2tTqA5gP4pCSZyrX6OgMRetjAFtohHJUG-Sfc8OyU61F-YX2edLt7hYf0G5jQSSXotHDPlPV09by6nPsyuTB0JrTmmJCpuNGH7fpcB63jtFC48XcLenIMN0O8eYJN0-0YFXkrifcRmuiZjFXALYTmCFABQ830eBck-RQb_BnyM7zO8NL_aEdyaGy_tslwB6" alt="Unbleached paper slipcase of a rare Japanese photography monograph" /><span className="image-caption mono">1993 ARCHIVE COPY · EX+</span></div>
        <div className="printed-copy"><span className="eyebrow terracotta">Tokyo Photothèque · OOP-JP-9304</span><h3 className="serif">Daidō Moriyama — Tokyo Color Studies</h3><p>Rare 88-plate saddle-stitched monograph published in limited numbers following the Shinjuku exhibition. Encased in a heavy unbleached chipboard slipcase with embossed kanji colophon.</p><div className="source-stamp mono">ACQUIRED AT KANDA JIMBOCHO BOOK MART <ArrowRight size={12} /></div><button className="button button-outline" onClick={() => setInspect(specimens[1])}>View specimen note</button></div>
      </div>
    </section>

    <section className="dispatch-section audio-section">
      <div className="section-title"><span className="section-marker accent-marker" /><div><span className="eyebrow">Magnetic tape / 3 field notes</span><h2 className="serif">Field Audio &amp; Cassettes</h2></div><button className="text-link" onClick={() => setLocation('/soundroom')}>Enter Soundroom <ArrowRight size={13} /></button></div>
      <div className="tape-strip">
        {[
          ['Hiroshi Yoshimura', "Sound Garden Installation '86", '46:12 · Misawa Museum', 'HY-86', 'Type II Chrome'],
          ['Midori Takada', 'Percussion & Bamboo Monologue', '38:40 · Sogetsu Hall Live', 'MT-83', 'Master Dub'],
          ['London Sound Unit', "Thames Tunnel Resonance '78", '52:00 · Binaural Reel', 'LSU-78', 'Field Mic Specimen'],
        ].map((tape, index) => <article className="tape-card" key={tape[3]}>
          <div className={`tape-illustration tape-${index}`}><AudioLines size={35} strokeWidth={1} /><span className="mono">{tape[3]}</span><span className="tape-badge">{tape[4]}</span></div>
          <span className="eyebrow terracotta">{tape[0]}</span><h3>{tape[1]}</h3><p>{tape[2]}</p>
          <button className="tape-play" aria-label={`Play ${tape[1]}`} onClick={() => { setLocation('/soundroom'); setToast(`${tape[0]} · CUEING TAPE`); }}><Play size={14} fill="currentColor" /> Listen in Soundroom</button>
        </article>)}
      </div>
    </section>
    <div className="depository-seal"><span className="seal-mark"><Archive size={20} /></span><span className="eyebrow">Depository Verification</span><p>All specimens verified with physical tactile inspection.<br />Kyoto &amp; Berlin depository.</p><span className="mono tiny">SEAL: #KY-BER-884　 /　 INSPECTED: C.V.</span></div>
  </div>;
}

function Vault({ globalSearch, setInspect, saved, toggleSave }: {
  globalSearch: string; setInspect: (item: Specimen) => void; saved: string[];
  toggleSave: (id: string) => void;
}) {
  const [medium, setMedium] = useState('All Mediums');
  const [decade, setDecade] = useState('All');
  const [query, setQuery] = useState(globalSearch);
  const [sort, setSort] = useState(false);
  useEffect(() => setQuery(globalSearch), [globalSearch]);
  const filtered = useMemo(() => specimens.filter(item => {
    const mediumMatch = medium === 'All Mediums' || (medium === '12" Vinyl' ? item.type === '12" Vinyl' : medium === '7" Acetate' ? item.type === '7" Acetate' : medium === 'Monographs & Zines' ? item.type === 'Monograph' : item.type === 'Cassette Reel');
    const decadeMatch = decade === 'All' || item.decade === decade;
    const searchMatch = `${item.title} ${item.creator} ${item.ref} ${item.location}`.toLowerCase().includes(query.toLowerCase());
    return mediumMatch && decadeMatch && searchMatch;
  }), [medium, decade, query]);
  const catalog = sort ? [...filtered].reverse() : filtered;
  const mediums = ['All Mediums', '12" Vinyl', '7" Acetate', 'Monographs & Zines', 'Cassette Reels'];
  return <div className="content vault-content">
    <div className="vault-banner"><div><span className="eyebrow">[ Depository Deck // Vault-B ]</span><p>Physical accession registry &amp; specimen ledger</p></div><span className="live-stack"><i /> Live stack</span><span className="mono tiny climate">TEMP: 19.4°C / RH: 44%</span></div>
    <PageHeading kicker="The Vault / Accession registry" title="Specimen directory" intro="A working ledger of material gathered, handled, and kept in circulation." />
    <div className="vault-controls">
      <div className="filters-top"><div className="filter-scroll" role="group" aria-label="Filter by medium">
        {mediums.map((option, index) => <button key={option} className={`filter-pill ${medium === option ? 'selected' : ''}`} onClick={() => setMedium(option)} aria-pressed={medium === option} data-testid={`filter-medium-${index}`}>
          {option}<small>{['1,482', '812', '204', '346', '120'][index]}</small>
        </button>)}
      </div></div>
      <div className="filter-matrix">
        <div className="chronology"><span className="eyebrow">Chronology span</span><div className="decade-set">{['All', '1960s', '1970s', '1980s'].map(value => <button key={value} className={decade === value ? 'selected' : ''} onClick={() => setDecade(value)} aria-pressed={decade === value}>{value}</button>)}</div></div>
        <div className="condition-key"><span className="eyebrow">Preservation grade <span className="float-right">[ISO-ARC-4]</span></span><div className="grade-list"><span><b>M</b><small>Mint</small></span><span><b>NM</b><small>Near mint</small></span><span><b>VG+</b><small>Very good+</small></span></div></div>
      </div>
    </div>
    <section className="catalog-section">
      <div className="catalog-heading"><div><span className="eyebrow">Catalog entries</span><span className="entry-count">{filtered.length} ready</span></div>
        <label className="catalog-search"><Search size={15} /><input aria-label="Search specimens" placeholder="Search ledger" value={query} onChange={event => setQuery(event.target.value)} data-testid="input-search-vault" /></label>
        <button className="sort-button" onClick={() => setSort(value => !value)}><SlidersHorizontal size={14} />{sort ? 'Newest' : 'Provenance'}</button>
      </div>
      {catalog.length ? <div className="vault-grid">
        {catalog.map((item, index) => <SpecimenCard key={item.id} specimen={item} index={index} logged={saved.includes(item.id)} onInspect={() => setInspect(item)} onSave={() => toggleSave(item.id)} />)}
      </div> : <div className="empty-state"><Search size={22} /><span className="eyebrow">No entries in this shelf</span><p>Try another medium, chronology, or ledger term.</p><button className="text-link" onClick={() => { setQuery(''); setMedium('All Mediums'); setDecade('All'); }}>Clear all filters</button></div>}
      <div className="catalog-end mono">END OF CURRENT ACCESSION · MORE SPECIMENS BY REQUEST</div>
    </section>
  </div>;
}

function SpecimenCard({ specimen, index, logged, onInspect, onSave }: {
  specimen: Specimen; index: number; logged: boolean; onInspect: () => void; onSave: () => void;
}) {
  return <article className="specimen-card reveal" style={{ animationDelay: `${index * 70}ms` }} data-testid={`card-specimen-${specimen.id}`}>
    <div className="specimen-photo">
      <img className="art-image" src={specimen.image} alt={`${specimen.type} specimen: ${specimen.title}`} />
      <span className="photo-chip">{specimen.type} <i>·</i> {specimen.type.includes('Vinyl') ? '33⅓ RPM' : specimen.type === 'Monograph' ? 'Staple bound' : '12" Rough Trade'}</span>
      <span className={`grade-chip ${specimen.grade === 'M' ? 'grade-olive' : ''}`}>{specimen.grade} grade</span>
      <div className="photo-foot mono"><span>{specimen.id.toUpperCase()}</span><span>{specimen.year} // {specimen.location.toUpperCase()}</span></div>
    </div>
    <div className="specimen-body">
      <div className="specimen-ref mono"><span>[REF: {specimen.ref}]</span><span>·</span><span>{specimen.type === 'Monograph' ? 'DRAWER #08' : 'BOX #14'}</span></div>
      <h2 className="serif">{specimen.title}</h2><p className="creator">{specimen.creator}</p>
      <div className="provenance-note"><span className="eyebrow"><Check size={12} /> Provenance dossier</span><p>{specimen.provenance}</p></div>
      {specimen.type === 'Monograph' ? <div className="specimen-measure mono"><span>DIMENSIONS: 210 × 297 MM</span><b>FOLIO: 68 PAGES</b></div> : <div className="audio-preview"><div><span className="mono">SAMPLE TRACK [01:42]</span><b className="mono">45 RPM ADAPTER EQ</b></div><div className="sample-progress"><i /></div></div>}
      <div className="specimen-actions">
        <button className="button button-dark" onClick={onInspect} data-testid={`button-inspect-${specimen.id}`}><BookOpen size={14} /> Request slip</button>
        <button className={`button ${logged ? 'button-terra' : 'button-muted'}`} onClick={onSave} data-testid={`button-save-${specimen.id}`}><Bookmark size={14} fill={logged ? 'currentColor' : 'none'} /> {logged ? 'Logged' : 'Box log'}</button>
      </div>
    </div>
  </article>;
}

function Soundroom({ setToast }: { setToast: (message: string) => void }) {
  const duration = 438;
  const [playing, setPlaying] = useState(true);
  const [position, setPosition] = useState(222);
  const [rpm, setRpm] = useState(33);
  const [pitchIndex, setPitchIndex] = useState(0);
  const [notesOpen, setNotesOpen] = useState(true);
  const pitches = ['±0.0%', '+0.8%', '−1.2%', '+2.0%'];
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setPosition(value => value >= duration ? 0 : value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [playing]);
  const time = (n: number) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
  return <div className="content sound-content">
    <div className="presence"><div><i className="live-dot" /><span className="eyebrow">Soundroom terminal 03</span></div><span className="mono tiny"><Headphones size={13} /> 4 listening now <span>(TYO · CDG · YUL)</span></span></div>
    <PageHeading kicker="Soundroom / Master reel cut" title="A room for listening." intro="One record at a time. Needle down, attention on." />
    <section className="turntable-stage">
      <div className="turntable-meta mono"><span>[REF: 1985-VNL-0402]　 MASTER REEL CUT</span><span className="rpm-indicator"><i /> {rpm === 33 ? '33⅓' : '45'} RPM STEREO</span></div>
      <div className="turntable-visual">
        <div className="platter-rim turn-slow"><div className="platter-ring" /></div>
        <div className={`vinyl-record ${playing ? 'turn' : ''}`}><div className="vinyl-grooves" /><div className="record-label"><span className="eyebrow terracotta">Canyon Rec.</span><b className="serif">JOMON-SHO</b><small>SIDE A · TRK 02</small><span className="spindle"><i /></span><small>C28R0132</small></div></div>
        <div className={`tonearm ${playing ? '' : 'lifted'}`} aria-hidden="true"><span /><i /></div>
        <span className="stylus-contact mono"><i /> Stylus contact: Track 02</span>
      </div>
      <div className="now-tracking"><span className="eyebrow terracotta">Now tracking · Canyon Records (1985)</span><h2 className="serif">Yas-Kaz — Jomon-Sho (縄文頌)</h2><p>Track 02: “The Way to the Jungle” (ジャングルへの道)</p></div>
      <div className="scrubber-area"><input type="range" min="0" max={duration} value={position} style={{ background: `linear-gradient(to right, #c85a32 0 ${(position / duration) * 100}%, #ded6ca ${(position / duration) * 100}% 100%)` }} aria-label="Track playback position" onChange={event => setPosition(Number(event.target.value))} data-testid="range-scrubber" /><div className="scrubber-meta mono"><span>{time(position)}</span><b>TRK 02 [{playing ? 'PLAYING' : 'PAUSED'}]</b><span>{time(duration)}</span></div></div>
    </section>

    <section className="console-panel">
      <div className="panel-heading"><span className="eyebrow">Console mechanical controls</span><span className="mono tiny">Direct-drive servo</span></div>
      <div className="control-grid">
        <button className="console-button" onClick={() => { setPosition(0); setToast('CUE IN · TRACK 02'); }}><ArrowLeft size={18} /><span>Cue in</span></button>
        <button className="console-button main-control" onClick={() => setPlaying(value => !value)}>{playing ? <Pause size={19} /> : <Play size={19} fill="currentColor" />}<span>{playing ? 'Needle lift' : 'Needle drop'}</span></button>
        <button className="console-button" onClick={() => setRpm(value => value === 33 ? 45 : 33)}><Disc3 size={18} /><span>{rpm === 33 ? '33⅓ RPM' : '45 RPM'}</span></button>
        <button className="console-button" onClick={() => setPitchIndex(value => (value + 1) % pitches.length)}><Volume2 size={18} /><span>{pitches[pitchIndex]} pitch</span></button>
      </div>
    </section>
    <section className="signal-panel">
      <div className="panel-heading"><span className="eyebrow">Signal path &amp; calibration</span><span className="mono tiny terracotta">96kHz / 24-bit</span></div>
      <div className="signal-list mono"><div><span>Cartridge head</span><b>Audio-Technica AT-ART9XI (Dual MC)</b></div><div><span>Preamplifier</span><b>Marantz 7C Point-to-Point Tube Repro</b></div><div><span>Groove noise floor</span><b className="terracotta">−64dB (Analog Master Direct DSD)</b></div></div>
    </section>
    <section className="liner-panel">
      <button className="liner-heading" aria-expanded={notesOpen} onClick={() => setNotesOpen(value => !value)}><span><BookOpen size={17} /><b className="serif">Curator’s Liner Notes</b></span><ChevronDown className={notesOpen ? 'rotate' : ''} size={17} /></button>
      {notesOpen && <div className="liner-content reveal"><div className="liner-photo"><img className="art-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6NRHzMr2xThNzUKJD-4swg93RNBZy1M8XnlMx5M943GPM1ejGvdkBrhEWMjHEBCJYGgmRoQ9v1J1BudDGzyLbrIzMNhDd_T70gtZfEyInxlHmYB6caN9jE-c31fEJOHaW1XCYn_z_wFj4kWGAuddoKJPb0UjhRXP8Ro-j2ses1LQv4BTr3ZJ95JGkV2ZYlRiwGYrcIzeGaej4PwH4lPtD1yPQLeUgdYz2oBv_XbeYS8Z8BORP8461" alt="Archival documentation from the 1985 studio session in Nagano" /><span className="mono">STUDIO ARCHIVE DOC · NAGANO 1985</span></div><div className="liner-prose"><p>Recorded live using hand-carved bamboo percussion, iron bells, and an EMS Synthi synthesizer in a secluded wooden mountain temple near Nagano. Yas-Kaz conceived this work as an acoustic communion between primordial Jomon pottery aesthetics and mid-1980s avant-garde environmental synthesis.</p><blockquote>“The needle captures the ambient reverberation off cedar rafters before the first mallet strike even blooms into the room tone.” <cite>— Archival Registry Note Nº 82</cite></blockquote></div><div className="liner-stamp mono"><span>STAMPER: 1S / MASTERED: CANYON TOKYO</span><b>GRADE: MINT [M]</b></div></div>}
    </section>
  </div>;
}

function Collection({ saved, deposits, setToast, openDeposit }: { saved: string[]; deposits: DepositEntry[]; setToast: (message: string) => void; openDeposit: () => void }) {
  const [openCrates, setOpenCrates] = useState<string[]>(() => readStorage<string[]>('aa-open-crates', []));
  const [logOpen, setLogOpen] = useState(false);
  const [scan, setScan] = useState(false);
  useEffect(() => localStorage.setItem('aa-open-crates', JSON.stringify(openCrates)), [openCrates]);
  const crates = [
    { id: 'a', icon: <Disc3 size={18} />, title: 'Crate A: Tokyo Ambient & Jazz', meta: '14 physical items · 33⅓ RPM masterings', tracks: [['Hiroshi Yoshimura — Green (1986)', 'AIR Records · [28AH 2022] · Mint', '33 RPM'], ['Eitetsu Hayashi — Kaze no Shisha', 'Victor Music · [VIH-28127] · EX+', '33 RPM'], ['Satoshi Ashikawa — Wave Notation 2', 'Sound Process · [WR-002] · Archival Master', 'RARE']] },
    { id: 'b', icon: <AudioLines size={18} />, title: 'Crate B: Free Improvisation & FMP Berlin', meta: '11 physical items · Letterpress sleeves', tracks: [['Peter Brötzmann Octet — Machine Gun', 'FMP Berlin · [FMP 0090] · 1968 Original', 'VAULT'], ['Alexander von Schlippenbach — The Living Music', 'Quark Master Series · [FMP 0100] · EX', '33 RPM']] },
    { id: 'c', icon: <BookOpen size={18} />, title: 'Crate C: Architecture Monographs & Type', meta: '13 physical items · Swiss & Ulm Folios', tracks: [['Josef Müller-Brockmann — Grid Systems', 'Arthur Niggli · 1981 Third Printing', 'FOLIO'], ['Typographische Monatsblätter (TM 1974)', 'Complete 12 Issues Bound in Canvas', 'RARE']] },
  ];
  const toggleCrate = (id: string) => setOpenCrates(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id]);
  return <div className="content collection-content">
    <PageHeading kicker="Collection / Curator’s logbook" title="The keeping of things." intro="A personal ledger of listening, looking, and passing objects along." />
    <section className="credential-card">
      <div className="credential-top"><div><span className="eyebrow">● Archivist credential folio</span><h2 className="serif">Clara Vance</h2><span className="member-id mono">Member Nº 0842 · Series IV</span></div><div className="credential-mark"><Disc3 size={30} strokeWidth={1.2} /></div></div>
      <div className="credential-data">
        <div><span className="eyebrow">Vault clearance</span><b className="olive-chip">Tier II Curator</b></div><p>Special Collections &amp; Master Acetate Repository Access</p><hr />
        <div><span className="eyebrow">Primary depositary</span><b>Tokyo Shibuya Box #14</b></div><div><span className="eyebrow">Secondary node</span><span>Cloud Ledger &amp; Physical Safe</span></div>
      </div>
    </section>
    <section className="holding-register"><div className="panel-heading"><span className="eyebrow">Archival holding register</span><span className="mono tiny">Audit 2024.Q4</span></div><div className="holding-stats"><div><b>38</b><span>Physical<br />specimens</span></div><div><b>03</b><span>Vault<br />reserves</span></div><div><b>12</b><span>Field<br />tapes</span></div></div></section>
    <section className="featured-acquisition">
      <div className="featured-head"><span className="eyebrow terracotta"><Check size={13} /> Featured acquisition</span><span className="mono tiny">[REF: 1978-PHO-0144]</span></div>
      <div className="featured-image"><img className="art-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Q9uy3tLhok87Zc94waRZSBm_VGSkRSqYaZ1A3xzw04TnMqLL_OglLPLOsDi2wnAO9umWlm5MoiAt2U0gwRNitADXBnzHKNYZ_tPYhVwWJSWmpCCWs9I6cowkrQfrESigSjqgWAG6-quIEMlMnoZy0j40cx48k3-Rd827eq3djMLvsCYzqRMCS1arJ-F2k8795ARBCx-5edrUsh49hF-EQUF9uLjavuRzSC7Qp4cNVQeIRtPIxLgx" alt="Luigi Ghirri’s Kodachrome on a linen examination desk" /><span className="mono">PRESERVATION GRADE: NM (NEAR MINT)</span></div>
      <h2 className="serif">Luigi Ghirri — Kodachrome</h2><p className="creator">1978 First Edition Photobook · Punto e Virgola, Modena</p>
      <div className="provenance-stamp"><div><span className="eyebrow">Provenance trace</span><p>Acquired Oct 14, 2024 via Milan Libreria Antiquaria</p></div><span className="verified-stamp"><Check size={16} /></span><div className="valuation"><span className="eyebrow">Current valuation est.</span><b className="mono">€1,450.00 EUR</b></div></div>
      <div className="featured-actions"><button className="button button-dark" onClick={() => setLogOpen(value => !value)}><BookOpen size={14} />{logOpen ? 'Collapse provenance log' : 'Provenance log (4 entries)'}</button><button className="button button-muted square-button" aria-label="Share ledger record" onClick={() => { void navigator.clipboard?.writeText('Analog Archivist · Luigi Ghirri — Kodachrome · REF: 1978-PHO-0144'); setToast('LEDGER REFERENCE COPIED'); }}><Share2 size={16} /></button></div>
      {logOpen && <div className="provenance-log reveal">{[['1978 · Origin', 'Modena, IT', 'Printed by Cooperativa Operai Tipografi. First press run of 1,200 copies.'], ['1994 · Estate Archive', 'Reggio Emilia', 'Acquired by private collector Gianni B. Vacuum-stored in non-acidic portfolio box.'], ['2024 · C. Vance Cataloging', 'Tokyo Depot #14', 'Verified spine condition, binding tension optimal, stamp verified by Archivist Panel #42.']].map(entry => <div className="log-entry" key={entry[0]}><div><b className="eyebrow">{entry[0]}</b><span className="mono tiny">{entry[1]}</span></div><p>{entry[2]}</p></div>)}</div>}
    </section>
    <section className="personal-crates"><div className="section-title"><div><span className="eyebrow">Clara’s shelf index</span><h2 className="serif">Personal Crates</h2></div><span className="mono tiny">{crates.length} crates active</span></div>
      {crates.map(crate => <div className="crate" key={crate.id}><button className="crate-trigger" aria-expanded={openCrates.includes(crate.id)} onClick={() => toggleCrate(crate.id)}><span className="crate-symbol">{crate.icon}</span><span className="crate-heading"><b className="serif">{crate.title}</b><small className="mono">{crate.meta}</small></span><ChevronDown size={17} className={openCrates.includes(crate.id) ? 'rotate' : ''} /></button>
        {openCrates.includes(crate.id) && <div className="crate-content reveal">{crate.tracks.map(track => <div className="crate-item" key={track[0]}><div><b>{track[0]}</b><span className="mono">{track[1]}</span></div><span className={`crate-label ${track[2] === 'RARE' || track[2] === 'VAULT' ? 'terracotta' : ''}`}>{track[2]}</span></div>)}</div>}
      </div>)}
    </section>
    {saved.length > 0 && <section className="saved-register"><div className="panel-heading"><span className="eyebrow">Your box log</span><span className="mono tiny">{saved.length} saved</span></div><p>Specimens held in your personal ledger.</p><div>{saved.map(id => specimens.find(item => item.id === id)).filter(Boolean).map(item => <div className="saved-row" key={item!.id}><span className="mono terracotta">{item!.id.toUpperCase()}</span><b>{item!.title}</b><span>{item!.creator}</span></div>)}</div></section>}
    {deposits.length > 0 && <section className="saved-register"><div className="panel-heading"><span className="eyebrow">Recent collective deposits</span><span className="mono tiny">{deposits.length} registered</span></div>{deposits.map((entry, index) => <div className="saved-row" key={`${entry.title}-${index}`}><span className="mono terracotta">{entry.ref || 'INGEST'}</span><b>{entry.title}</b><span>{entry.creator} · {entry.medium}</span></div>)}</section>}
    <section className="deposit-card"><div className="deposit-title"><Archive size={19} /><h2 className="serif">Deposit to Collective Vault</h2><span className="mono tiny">INGEST PORTAL</span></div><p>Register a physical addition to the archive ledger. Capture runout deadwax etchings, ISBN barcoding, or library accession stamps.</p>
      {!scan ? <button className="button button-terra scan-button" onClick={() => setScan(true)}><Plus size={16} /> Scan matrix runout / ISBN</button> : <div className="scan-panel reveal"><div className="scan-top"><span className="eyebrow">Optical ledger lens active</span><span className="mono tiny">Searching runout…</span></div><div className="scan-window"><div /><span className="mono">ALIGN DEADWAX ETCHING</span></div><button className="scan-cancel" onClick={() => setScan(false)}>Cancel session</button><button className="scan-continue" onClick={openDeposit}>Continue to deposit form <ArrowRight size={13} /></button></div>}
    </section>
  </div>;
}

function InspectionModal({ specimen, onClose, onConfirm }: { specimen: Specimen; onClose: () => void; onConfirm: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="dialog-sheet" role="dialog" aria-modal="true" aria-labelledby="inspection-title">
      <div className="dialog-top"><span className="eyebrow terracotta">[ Archival slip protocol ]</span><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={18} /></button></div>
      <h2 className="serif" id="inspection-title">{specimen.title}</h2><span className="mono tiny">REF: {specimen.ref}</span>
      <div className="inspection-specs"><div><span className="eyebrow">Clean room bay</span><b>Bay 04 (Turntable Deck)</b></div><div><span className="eyebrow">Required wear</span><b className="terracotta">White cotton gloves</b></div><div><span className="eyebrow">Supervised inspection</span><b>Curator on call</b></div></div>
      <label className="eyebrow">Collector call-card number<input value="ARC-MEMBER-8821" readOnly /></label>
      <button className="button button-terra confirm-button" onClick={onConfirm}><BookOpen size={15} /> Stamp &amp; queue inspection slip</button>
    </section>
  </div>;
}

function DepositModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: (entry: DepositEntry) => void }) {
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [medium, setMedium] = useState('12” Vinyl');
  const [ref, setRef] = useState('');
  const [error, setError] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !creator.trim()) { setError('TITLE AND MAKER ARE REQUIRED FOR INGEST.'); return; }
    onConfirm({ title: title.trim(), creator: creator.trim(), medium, ref: ref.trim() });
  };
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <form className="dialog-sheet deposit-form" role="dialog" aria-modal="true" aria-labelledby="deposit-title" onSubmit={submit}>
      <div className="dialog-top"><span className="eyebrow terracotta">[ Collection ingest / New entry ]</span><button type="button" className="icon-button" aria-label="Close deposit form" onClick={onClose}><X size={18} /></button></div>
      <h2 className="serif" id="deposit-title">Register a specimen.</h2><p className="dialog-intro">Add a physical object to the collective accession ledger.</p>
      <label>SPECIMEN TITLE<input required value={title} onChange={event => setTitle(event.target.value)} placeholder="Title as printed" /></label>
      <label>MAKER / CREATOR<input required value={creator} onChange={event => setCreator(event.target.value)} placeholder="Artist, author, or recording artist" /></label>
      <div className="form-row"><label>MEDIUM<select value={medium} onChange={event => setMedium(event.target.value)}><option>12” Vinyl</option><option>7” Acetate</option><option>Monograph</option><option>Cassette Reel</option></select></label><label>CATALOG REFERENCE<input value={ref} onChange={event => setRef(event.target.value)} placeholder="Optional" /></label></div>
      <label>PROVENANCE NOTES<textarea rows={3} placeholder="Origin, acquisition, condition…" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" className="button button-dark confirm-button"><Check size={15} /> Add to collective ledger</button>
    </form>
  </div>;
}

function NotFound({ goHome }: { goHome: () => void }) {
  return <div className="content"><div className="empty-state"><span className="eyebrow terracotta">Accession not found</span><h1 className="serif">This shelf is unindexed.</h1><p>The requested folio has no current location in the archive.</p><button onClick={goHome} className="button button-dark"><ArrowLeft size={15} /> Return to Dispatch</button></div></div>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><ArchiveApp /></WouterRouter>;
}

export default App;
