import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';

const MusicPlaylistManager = lazy(() => import('./MusicPlaylistManager'));
function Equalizer() {
  return <div className="rhythm-equalizer" aria-hidden="true">{[0,1,2,3,4].map(i => <i key={i} style={{'--i': i}} />)}</div>;
}
function Loading() {
  return <div className="rhythm-loading" role="status" aria-live="polite"><div className="rhythm-loader-record" aria-hidden="true">♫</div><Equalizer /><h1>Getting into your rhythm.</h1><p>Opening your music library…</p></div>;
}
export default function App() {
  const [inLibrary, setInLibrary] = useState(window.location.hash === '#library');
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    const navigate = () => { setInLibrary(window.location.hash === '#library'); window.scrollTo(0,0); };
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  useEffect(() => {
    document.title = inLibrary ? 'Your library · Rhythm' : 'Rhythm · A home for your music';
  }, [inLibrary]);
  useEffect(() => {
    if (!opening) return;
    let active = true;
    Promise.all([import('./MusicPlaylistManager'), new Promise(resolve => setTimeout(resolve, 1000))]).then(() => {
      if (active) { window.location.hash = 'library'; setInLibrary(true); setOpening(false); }
    }).catch(() => { if (active) { setOpening(false); window.location.hash = 'library'; } });
    return () => { active = false; };
  }, [opening]);
  const enter = event => { event.preventDefault(); setOpening(true); };
  if (opening) return <Loading />;
  if (inLibrary) return <Suspense fallback={<Loading />}><MusicPlaylistManager /></Suspense>;
  return <div className="rhythm-landing">
    <header className="rhythm-nav"><a className="rhythm-brand" href="./" aria-label="Rhythm home"><span>♫</span> rhythm<span>.</span></a><nav aria-label="Main navigation"><a className="rhythm-experience" href="#features">The experience</a><a className="rhythm-outline" href="#library" onClick={enter}>Open library <span aria-hidden="true">↗</span></a></nav></header>
    <main>
      <section className="rhythm-hero" aria-labelledby="rhythm-title">
        <div className="rhythm-copy"><p className="rhythm-eyebrow"><span /> YOUR MUSIC. YOUR OWN LITTLE WORLD.</p><h1 id="rhythm-title">Life has a<br />soundtrack.<br /><em>Make it yours.</em></h1><p className="rhythm-description">A home for every song you love. Bring your collection together, build playlists for every mood, and find your rhythm.</p><a className="rhythm-cta" href="#library" onClick={enter}>Enter your library <span aria-hidden="true">↗</span></a><p className="rhythm-footnote">Good music. A little more organized.</p></div>
        <div className="rhythm-art" role="img" aria-label="A green vinyl record surrounded by cards for late night playlists and favorite songs"><div className="rhythm-orbit" /><div className="rhythm-orbit outer" /><span className="rhythm-art-caption">CURATED BY YOU / PLAYED ON REPEAT</span><div className="rhythm-sleeve"><strong>THE EVERYDAY<br />COLLECTION</strong><small>VOL. 01 / RHYTHM</small></div><div className="rhythm-record"><div className="rhythm-label"><strong>rhythm.</strong><small>SIDE A • YOUR FAVORITES</small><i /></div></div><div className="rhythm-float rhythm-night"><span className="rhythm-moon">☾</span><div><small>FOR THE QUIET HOURS</small><strong>Late night thoughts</strong><p>Slow down. Tune in.</p></div></div><div className="rhythm-float rhythm-playing"><Equalizer /><div><small>ALWAYS A GOOD IDEA</small><strong>One more song.</strong></div><span className="rhythm-play">▶</span></div><span className="rhythm-art-bottom">33⅓ RPM <b>✦</b> ENDLESS POSSIBILITIES</span></div>
      </section>
      <section className="rhythm-features" id="features" aria-label="The Rhythm experience"><div><span className="rhythm-eyebrow">LESS SEARCHING. MORE FEELING.</span><h2>Your collection.<br />In harmony.</h2></div><article><span>01 / COLLECT</span><h3>Every favorite, together.</h3><p>Keep your songs in one place, with artist, genre, and mood details at your fingertips.</p></article><article><span>02 / CURATE</span><h3>A playlist for the moment.</h3><p>From slow mornings to your last set. Create collections that fit the way you feel.</p></article><article><span>03 / REDISCOVER</span><h3>Find your way back.</h3><p>Browse your recently played songs and return to the tracks that stayed with you.</p></article></section>
    </main>
    <footer className="rhythm-footer"><span>rhythm. <small>Made for the love of music.</small></span><span>YOUR NEXT FAVORITE MOMENT STARTS HERE ↗</span></footer>
  </div>;
}
