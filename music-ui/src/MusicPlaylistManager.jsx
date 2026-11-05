import { useState, useEffect } from "react";

const API = "http://localhost:8085";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Nunito', sans-serif; background: #0f0f0f; color: #fff; }
  .app { display: flex; height: 100vh; overflow: hidden; }
  .sidebar { width: 200px; background: #000; padding: 20px 12px; display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }
  .logo { display: flex; align-items: center; gap: 8px; padding: 0 8px 20px; }
  .logo-icon { font-size: 28px; }
  .logo-text { font-size: 16px; font-weight: 900; color: #1DB954; }
  .nav-btn { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 10px; border: none; background: transparent; color: #aaa; font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; transition: all .15s; text-align: left; width: 100%; }
  .nav-btn:hover { background: #1a1a1a; color: #fff; }
  .nav-btn.active { background: #1DB954; color: #000; }
  .nav-icon { font-size: 20px; }
  .sidebar-divider { height: 1px; background: #222; margin: 10px 0; }
  .playlist-section { flex: 1; overflow-y: auto; }
  .playlist-label { font-size: 10px; font-weight: 800; color: #555; text-transform: uppercase; letter-spacing: 1px; padding: 0 14px 8px; }
  .playlist-btn { display: block; width: 100%; padding: 9px 14px; border-radius: 8px; border: none; background: transparent; color: #888; font-family: 'Nunito', sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: all .15s; }
  .playlist-btn:hover { background: #1a1a1a; color: #fff; }
  .playlist-btn.active { color: #1DB954; }
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .content { flex: 1; overflow-y: auto; padding: 28px; }
  .topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; gap: 12px; flex-wrap: wrap; }
  .page-title { font-size: 24px; font-weight: 900; }
  .add-btn { display: flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 24px; border: none; background: #1DB954; color: #000; font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 800; cursor: pointer; transition: all .15s; }
  .add-btn:hover { background: #1ed760; transform: scale(1.04); }
  .search-box { display: flex; align-items: center; gap: 8px; background: #1a1a1a; border-radius: 24px; padding: 10px 16px; border: 2px solid transparent; transition: border .2s; }
  .search-box:focus-within { border-color: #1DB954; }
  .search-box input { background: none; border: none; outline: none; color: #fff; font-family: 'Nunito', sans-serif; font-size: 14px; width: 160px; }
  .search-box input::placeholder { color: #555; }
  .sort-row { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; align-items: center; }
  .sort-label { font-size: 12px; font-weight: 800; color: #555; }
  .sort-chip { padding: 6px 14px; border-radius: 20px; border: 2px solid #333; background: transparent; color: #888; font-family: 'Nunito', sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; transition: all .15s; }
  .sort-chip:hover { border-color: #555; color: #fff; }
  .sort-chip.on { background: #fff; color: #000; border-color: #fff; }
  .song-list { display: flex; flex-direction: column; gap: 4px; }
  .table-head { display: grid; grid-template-columns: 36px 1fr 120px 90px 80px 80px; padding: 0 14px 10px; gap: 8px; font-size: 11px; font-weight: 800; color: #444; text-transform: uppercase; letter-spacing: .5px; border-bottom: 1px solid #222; margin-bottom: 8px; }
  .song-row { display: grid; grid-template-columns: 36px 1fr 120px 90px 80px 80px; align-items: center; padding: 10px 14px; border-radius: 10px; cursor: pointer; transition: background .15s; gap: 8px; }
  .song-row:hover { background: #1a1a1a; }
  .song-row.now { background: rgba(29,185,84,.12); }
  .row-num { font-size: 14px; color: #555; text-align: center; font-weight: 700; }
  .row-num.now { color: #1DB954; }
  .song-meta { display: flex; align-items: center; gap: 10px; overflow: hidden; }
  .song-thumb { width: 40px; height: 40px; border-radius: 8px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .song-name { font-size: 14px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .song-artist { font-size: 12px; color: #888; margin-top: 1px; }
  .col-genre { font-size: 12px; color: #888; font-weight: 600; }
  .mood-chip { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; display: inline-block; }
  .m-Happy   { background: rgba(251,191,36,.2);  color: #fbbf24; }
  .m-Sad     { background: rgba(129,140,248,.2); color: #818cf8; }
  .m-Chill   { background: rgba(45,212,191,.2);  color: #2dd4bf; }
  .m-Workout { background: rgba(248,113,113,.2); color: #f87171; }
  .col-dur { font-size: 13px; color: #888; text-align: right; font-weight: 600; }
  .row-acts { display: flex; gap: 4px; justify-content: flex-end; }
  .act-btn { background: none; border: none; font-size: 15px; cursor: pointer; padding: 5px 7px; border-radius: 6px; transition: background .15s; color: #aaa; }
  .act-btn:hover { background: #333; color: #fff; }
  .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px,1fr)); gap: 16px; }
  .music-card { background: #181818; border-radius: 14px; padding: 16px; cursor: pointer; transition: background .2s; }
  .music-card:hover { background: #282828; }
  .card-art { width: 100%; aspect-ratio:1; border-radius: 10px; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; font-size: 44px; }
  .card-name { font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .card-sub { font-size: 12px; color: #888; font-weight: 600; }
  .card-acts { display: flex; gap: 6px; margin-top: 10px; }
  .card-act { background: #333; border: none; border-radius: 8px; padding: 5px 10px; font-size: 13px; cursor: pointer; transition: background .15s; color: #fff; }
  .card-act:hover { background: #444; }
  .recent-row { display: flex; align-items: center; gap: 14px; padding: 12px 14px; border-radius: 10px; cursor: pointer; transition: background .15s; }
  .recent-row:hover { background: #1a1a1a; }
  .recent-art { width: 46px; height: 46px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .recent-time { font-size: 11px; color: #555; font-weight: 600; margin-left: auto; }
  .player { background: #111; border-top: 1px solid #222; display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: center; padding: 0 24px; height: 86px; flex-shrink: 0; }
  .np-wrap { display: flex; align-items: center; gap: 12px; }
  .np-art { width: 50px; height: 50px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .np-name { font-size: 13px; font-weight: 800; }
  .np-artist { font-size: 11px; color: #888; margin-top: 2px; }
  .player-mid { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .ctrl-row { display: flex; align-items: center; gap: 14px; }
  .ctrl { background: none; border: none; color: #aaa; font-size: 22px; cursor: pointer; transition: all .15s; line-height: 1; padding: 4px; }
  .ctrl:hover { color: #fff; transform: scale(1.1); }
  .ctrl.big { width: 36px; height: 36px; border-radius: 50%; background: #fff; color: #000; display: flex; align-items: center; justify-content: center; font-size: 16px; }
  .ctrl.big:hover { background: #ddd; }
  .prog-bar { display: flex; align-items: center; gap: 8px; width: 100%; max-width: 380px; }
  .prog-time { font-size: 11px; color: #888; font-weight: 600; width: 30px; }
  .prog-track { flex: 1; height: 4px; background: #333; border-radius: 2px; cursor: pointer; }
  .prog-fill { height: 100%; background: #1DB954; border-radius: 2px; }
  .player-right { display: flex; align-items: center; justify-content: flex-end; gap: 10px; }
  .vol-bar { width: 80px; height: 4px; background: #333; border-radius: 2px; }
  .vol-fill { width: 65%; height: 100%; background: #aaa; border-radius: 2px; }
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.75); z-index: 999; display: flex; align-items: center; justify-content: center; }
  .modal { background: #222; border-radius: 16px; padding: 28px; width: 420px; max-width: 95vw; }
  .modal-title { font-size: 18px; font-weight: 900; margin-bottom: 20px; }
  .field { margin-bottom: 14px; }
  .field label { display: block; font-size: 11px; font-weight: 800; color: #888; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 6px; }
  .field input, .field select { width: 100%; padding: 10px 14px; background: #333; border: 2px solid transparent; border-radius: 10px; color: #fff; font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 600; outline: none; transition: border .2s; }
  .field input:focus, .field select:focus { border-color: #1DB954; }
  .field select option { background: #222; }
  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .modal-btns { display: flex; gap: 10px; margin-top: 20px; }
  .btn-cancel { flex: 1; padding: 12px; border-radius: 10px; border: none; background: #333; color: #aaa; font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; }
  .btn-ok { flex: 2; padding: 12px; border-radius: 24px; border: none; background: #1DB954; color: #000; font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 800; cursor: pointer; }
  .btn-ok:hover { background: #1ed760; }
  .empty { text-align: center; padding: 60px 20px; color: #555; font-size: 14px; font-weight: 700; }
  .empty-icon { font-size: 48px; margin-bottom: 12px; }
  .toast { position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: #1DB954; color: #000; padding: 10px 24px; border-radius: 24px; font-weight: 800; font-size: 14px; z-index: 9999; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
`;

const MOOD_EMOJI = { Happy:'😊', Sad:'😢', Chill:'😌', Workout:'💪' };
const MOOD_BG    = { Happy:'#78350f', Sad:'#1e1b4b', Chill:'#064e3b', Workout:'#7f1d1d' };
const GENRE_BG   = { Pop:'#6b21a8', Rock:'#292524', 'Hip-Hop':'#431407', Soul:'#1e3a5f', 'Lo-Fi':'#064e3b', Ambient:'#0c4a6e' };
const fmt = d => { const m = Math.floor(d), s = Math.round((d - m) * 60); return `${m}:${s.toString().padStart(2,'0')}`; };

export default function App() {
  const [tab, setTab]             = useState('songs');
  const [songs, setSongs]         = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [recent, setRecent]       = useState([]);
  const [modal, setModal]         = useState(null);
  const [form, setForm]           = useState({});
  const [search, setSearch]       = useState('');
  const [sort, setSort]           = useState('default');
  const [moodF, setMoodF]         = useState('all');
  const [curSong, setCurSong]     = useState(null);
  const [playing, setPlaying]     = useState(false);
  const [prog, setProg]           = useState(0);
  const [selPl, setSelPl]         = useState(null);
  const [toast, setToast]         = useState('');

  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // ── FIX 1: Single useEffect to load both songs and playlists ──
  useEffect(() => {
    loadSongs();
    loadPlaylists();
  }, []);

  // ── FIX 2: Progress bar useEffect ──
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProg(p => p >= 100 ? 0 : p + 0.4), 300);
    return () => clearInterval(t);
  }, [playing]);

  // ── Helper: show toast message ──
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // ── FIX 3: loadSongs and loadPlaylists as separate functions ──
  const loadSongs = () => {
    fetch(`${API}/api/songs/getAll`)
      .then(r => r.json())
      .then(data => setSongs(data))
      .catch(() => showToast('❌ Cannot connect to server'));
  };

  const loadPlaylists = () => {
    fetch(`${API}/api/playlists/getAll`)
      .then(r => r.json())
      .then(data => setPlaylists(data))
      .catch(() => showToast('❌ Cannot connect to server'));
  };

  // ── Play a song ──
  const play = song => {
    setCurSong(song);
    setPlaying(true);
    setProg(0);
    setRecent(r => [{ song, at: new Date() }, ...r.slice(0, 9)]);
    // record play in backend
    fetch(`${API}/api/recent/play/${song.sid}`, { method: 'POST' }).catch(() => {});
  };

  // ── Next / Previous (Doubly Linked List navigation) ──
  const next = () => {
    if (!songs.length) return;
    const all = [...songs].sort((a, b) => a.position - b.position);
    const i = all.findIndex(s => s.sid === curSong?.sid);
    play(all[(i + 1) % all.length]);
  };

  const prev = () => {
    if (!songs.length) return;
    const all = [...songs].sort((a, b) => a.position - b.position);
    const i = all.findIndex(s => s.sid === curSong?.sid);
    play(all[(i - 1 + all.length) % all.length]);
  };

  // ── FIX 4: saveSong — proper POST and PUT with reload ──
  const saveSong = () => {
    if (!form.title || !form.artist) {
      showToast('❌ Title and Artist are required!');
      return;
    }
    const method = form.sid ? 'PUT' : 'POST';
    const url = form.sid
      ? `${API}/api/songs/update/${form.sid}`
      : `${API}/api/songs/add`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        duration: parseFloat(form.duration) || 3.0,
        playCount: parseInt(form.playCount) || 0,
        position: parseInt(form.position) || 0,
      })
    })
      .then(r => r.json())
      .then(() => {
        loadSongs();
        setModal(null);
        setForm({});
        showToast(form.sid ? '✅ Song updated!' : '✅ Song added!');
      })
      .catch(() => showToast('❌ Save failed! Is Spring Boot running?'));
  };

  // ── FIX 5: deleteSong — calls backend then reloads ──
  const deleteSong = (e, sid) => {
    e.stopPropagation();
    if (!window.confirm('Delete this song?')) return;
    fetch(`${API}/api/songs/delete/${sid}`, { method: 'DELETE' })
      .then(() => {
        loadSongs();
        showToast('🗑️ Song deleted!');
      })
      .catch(() => showToast('❌ Delete failed! Is Spring Boot running?'));
  };

  // ── FIX 6: savePlaylist — calls backend ──
  const savePlaylist = () => {
    if (!form.name) {
      showToast('❌ Playlist name is required!');
      return;
    }
    const method = form.pid ? 'PUT' : 'POST';
    const url = form.pid
      ? `${API}/api/playlists/update/${form.pid}`
      : `${API}/api/playlists/createplaylist`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        mood: form.mood || null,
        genre: form.genre || null,
        autoGenerated: false,
      })
    })
      .then(r => r.json())
      .then(() => {
        loadPlaylists();
        setModal(null);
        setForm({});
        showToast(form.pid ? '✅ Playlist updated!' : '✅ Playlist created!');
      })
      .catch(() => {
        // fallback: update local state if backend has no update endpoint
        if (form.pid) {
          setPlaylists(ps => ps.map(p => p.pid === form.pid ? { ...p, ...form } : p));
        } else {
          setPlaylists(ps => [...ps, { ...form, pid: Date.now(), autoGenerated: false }]);
        }
        setModal(null);
        setForm({});
        showToast('✅ Playlist saved (local)');
      });
  };

  // ── FIX 7: deletePlaylist — calls backend ──
  const deletePlaylist = (e, pid) => {
    e.stopPropagation();
    if (!window.confirm('Delete this playlist?')) return;
    fetch(`${API}/api/playlists/delete/${pid}`, { method: 'DELETE' })
      .then(() => {
        loadPlaylists();
        if (selPl?.pid === pid) setSelPl(null);
        showToast('🗑️ Playlist deleted!');
      })
      .catch(() => {
        // fallback local delete
        setPlaylists(ps => ps.filter(p => p.pid !== pid));
        showToast('🗑️ Playlist deleted (local)');
      });
  };

  // ── Filter + Sort songs ──
  let shown = [...songs];
  if (search) shown = shown.filter(s =>
    s.title?.toLowerCase().includes(search.toLowerCase()) ||
    s.artist?.toLowerCase().includes(search.toLowerCase())
  );
  if (moodF !== 'all') shown = shown.filter(s => s.mood === moodF);

  if (sort === 'title') {
    // Bubble Sort
    let arr = [...shown], n = arr.length;
    for (let i = 0; i < n - 1; i++)
      for (let j = 0; j < n - i - 1; j++)
        if ((arr[j].title || '').localeCompare(arr[j+1].title || '') > 0) {
          let t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;
        }
    shown = arr;
  } else if (sort === 'duration')   shown.sort((a, b) => a.duration - b.duration);
  else if (sort === 'popularity')   shown.sort((a, b) => (b.playCount || 0) - (a.playCount || 0));

  const plSongs = selPl
    ? songs.filter(s =>
        (selPl.mood && s.mood === selPl.mood) ||
        (selPl.genre && s.genre === selPl.genre)
      )
    : [];

  // ── Reusable Song Table ──
  const SongTable = ({ list }) => (
    <div className="song-list">
      <div className="table-head">
        <span>#</span>
        <span>Song</span>
        <span>Genre</span>
        <span>Mood</span>
        <span style={{ textAlign: 'right' }}>Time</span>
        <span style={{ textAlign: 'right' }}>Actions</span>
      </div>
      {list.length === 0 && (
        <div className="empty">
          <div className="empty-icon">🎵</div>No songs found
        </div>
      )}
      {list.map((s, i) => (
        <div
          key={s.sid}
          className={`song-row ${curSong?.sid === s.sid ? 'now' : ''}`}
          onDoubleClick={() => play(s)}
        >
          <div className={`row-num ${curSong?.sid === s.sid ? 'now' : ''}`}>
            {curSong?.sid === s.sid && playing ? '▶' : i + 1}
          </div>
          <div className="song-meta">
            <div className="song-thumb" style={{ background: GENRE_BG[s.genre] || '#333' }}>🎵</div>
            <div>
              <div className="song-name" style={{ color: curSong?.sid === s.sid ? '#1DB954' : '#fff' }}>
                {s.title}
              </div>
              <div className="song-artist">{s.artist} · {s.playCount || 0} plays</div>
            </div>
          </div>
          <div className="col-genre">{s.genre}</div>
          <div>
            <span className={`mood-chip m-${s.mood}`}>
              {MOOD_EMOJI[s.mood] || ''} {s.mood}
            </span>
          </div>
          <div className="col-dur">{fmt(s.duration || 0)}</div>
          <div className="row-acts">
            <button
              className="act-btn"
              title="Play"
              onClick={e => { e.stopPropagation(); play(s); }}
            >▶</button>
            <button
              className="act-btn"
              title="Edit"
              onClick={e => { e.stopPropagation(); setModal('song'); setForm({ ...s }); }}
            >✏️</button>
            <button
              className="act-btn"
              title="Delete"
              onClick={e => deleteSong(e, s.sid)}
            >🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <style>{style}</style>
      <div className="app">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-icon">🎵</div>
            <div className="logo-text">SmartMix</div>
          </div>

          {[
            { id: 'songs',     icon: '🎵', label: 'Songs' },
            { id: 'playlists', icon: '📋', label: 'Playlists' },
            { id: 'mood',      icon: '✨', label: 'Mood' },
            { id: 'recent',    icon: '🕐', label: 'Recent' },
          ].map(n => (
            <button
              key={n.id}
              className={`nav-btn ${tab === n.id && !selPl ? 'active' : ''}`}
              onClick={() => { setTab(n.id); setSelPl(null); }}
            >
              <span className="nav-icon">{n.icon}</span>{n.label}
            </button>
          ))}

          <div className="sidebar-divider" />

          <div className="playlist-section">
            <div className="playlist-label">Playlists</div>
            {playlists.map(p => (
              <button
                key={p.pid}
                className={`playlist-btn ${selPl?.pid === p.pid ? 'active' : ''}`}
                onClick={() => setSelPl(p)}
              >
                {p.name}
              </button>
            ))}
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="main">
          <div className="content">

            {/* ══ SONGS TAB ══ */}
            {tab === 'songs' && !selPl && (
              <>
                <div className="topbar">
                  <div className="page-title">🎵 All Songs</div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div className="search-box">
                      <span style={{ color: '#555' }}>🔍</span>
                      <input
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                      />
                    </div>
                    <button
                      className="add-btn"
                      onClick={() => { setModal('song'); setForm({ mood: 'Happy', genre: 'Pop' }); }}
                    >
                      ＋ Add Song
                    </button>
                  </div>
                </div>

                <div className="sort-row">
                  <span className="sort-label">Sort:</span>
                  {[
                    { v: 'default',    l: 'Default' },
                    { v: 'title',      l: 'A–Z (Bubble Sort)' },
                    { v: 'duration',   l: 'Duration' },
                    { v: 'popularity', l: 'Most Played' },
                  ].map(s => (
                    <button
                      key={s.v}
                      className={`sort-chip ${sort === s.v ? 'on' : ''}`}
                      onClick={() => setSort(s.v)}
                    >
                      {s.l}
                    </button>
                  ))}
                  <span className="sort-label" style={{ marginLeft: 10 }}>Mood:</span>
                  {['all', 'Happy', 'Sad', 'Chill', 'Workout'].map(m => (
                    <button
                      key={m}
                      className={`sort-chip ${moodF === m ? 'on' : ''}`}
                      onClick={() => setMoodF(m)}
                    >
                      {m === 'all' ? 'All' : MOOD_EMOJI[m] + ' ' + m}
                    </button>
                  ))}
                </div>

                <SongTable list={shown} />
              </>
            )}

            {/* ══ PLAYLISTS TAB ══ */}
            {tab === 'playlists' && !selPl && (
              <>
                <div className="topbar">
                  <div className="page-title">📋 Playlists</div>
                  <button
                    className="add-btn"
                    onClick={() => { setModal('playlist'); setForm({}); }}
                  >
                    ＋ Create Playlist
                  </button>
                </div>
                <div className="cards-grid">
                  {playlists.map(p => {
                    const bg  = p.mood ? MOOD_BG[p.mood] : p.genre ? GENRE_BG[p.genre] : '#333';
                    const cnt = songs.filter(s =>
                      (p.mood && s.mood === p.mood) ||
                      (p.genre && s.genre === p.genre)
                    ).length;
                    return (
                      <div key={p.pid} className="music-card" onClick={() => setSelPl(p)}>
                        <div className="card-art" style={{ background: bg }}>
                          {p.mood ? MOOD_EMOJI[p.mood] : '🎵'}
                        </div>
                        <div className="card-name">{p.name}</div>
                        <div className="card-sub">{cnt} songs · {p.autoGenerated ? 'Auto' : 'Manual'}</div>
                        <div className="card-acts">
                          <button
                            className="card-act"
                            onClick={e => { e.stopPropagation(); setModal('playlist'); setForm({ ...p }); }}
                          >✏️ Edit</button>
                          <button
                            className="card-act"
                            onClick={e => deletePlaylist(e, p.pid)}
                          >🗑️</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ══ MOOD TAB ══ */}
            {tab === 'mood' && !selPl && (
              <>
                <div className="topbar">
                  <div className="page-title">✨ Mood Playlists</div>
                </div>
                <div className="cards-grid" style={{ marginBottom: 28 }}>
                  {['Happy', 'Sad', 'Chill', 'Workout'].map(m => (
                    <div
                      key={m}
                      className="music-card"
                      onClick={() => setMoodF(moodF === m ? 'all' : m)}
                    >
                      <div className="card-art" style={{ background: MOOD_BG[m], fontSize: 52 }}>
                        {MOOD_EMOJI[m]}
                      </div>
                      <div className="card-name">{m} Vibes</div>
                      <div className="card-sub">{songs.filter(s => s.mood === m).length} songs</div>
                    </div>
                  ))}
                </div>
                {moodF !== 'all' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div style={{ fontSize: 18, fontWeight: 800 }}>{MOOD_EMOJI[moodF]} {moodF} Songs</div>
                      <button className="sort-chip" onClick={() => setMoodF('all')}>✕ Clear</button>
                    </div>
                    <SongTable list={songs.filter(s => s.mood === moodF)} />
                  </>
                )}
              </>
            )}

            {/* ══ RECENTLY PLAYED TAB ══ */}
            {tab === 'recent' && !selPl && (
              <>
                <div className="topbar">
                  <div className="page-title">🕐 Recently Played</div>
                </div>
                {recent.length === 0 ? (
                  <div className="empty">
                    <div className="empty-icon">🎧</div>
                    Nothing played yet!<br />Double-click a song to play it.
                  </div>
                ) : (
                  recent.map((r, i) => (
                    <div key={i} className="recent-row" onDoubleClick={() => play(r.song)}>
                      <div className="recent-art" style={{ background: GENRE_BG[r.song.genre] || '#333' }}>🎵</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800 }}>{r.song.title}</div>
                        <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                          {r.song.artist} · {MOOD_EMOJI[r.song.mood]} {r.song.mood}
                        </div>
                      </div>
                      <div className="recent-time">
                        {r.at.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* ══ PLAYLIST DETAIL ══ */}
            {selPl && (
              <>
                <div className="topbar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <button className="sort-chip" onClick={() => setSelPl(null)}>← Back</button>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 900 }}>
                        {selPl.mood ? MOOD_EMOJI[selPl.mood] : ''} {selPl.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                        {plSongs.length} songs
                      </div>
                    </div>
                  </div>
                  <button
                    className="add-btn"
                    onClick={() => { if (plSongs[0]) play(plSongs[0]); }}
                  >
                    ▶ Play All
                  </button>
                </div>
                {plSongs.length === 0 ? (
                  <div className="empty">
                    <div className="empty-icon">🎵</div>
                    No songs match this playlist yet.
                  </div>
                ) : (
                  <SongTable list={plSongs} />
                )}
              </>
            )}

          </div>

          {/* ── PLAYER BAR ── */}
          <div className="player">
            <div className="np-wrap">
              {curSong ? (
                <>
                  <div className="np-art" style={{ background: GENRE_BG[curSong.genre] || '#333' }}>🎵</div>
                  <div>
                    <div className="np-name">{curSong.title}</div>
                    <div className="np-artist">{curSong.artist}</div>
                  </div>
                </>
              ) : (
                <div style={{ color: '#555', fontSize: 13 }}>No song playing</div>
              )}
            </div>

            <div className="player-mid">
              <div className="ctrl-row">
                <button className="ctrl">🔀</button>
                <button className="ctrl" onClick={prev}>⏮</button>
                <button className="ctrl big" onClick={() => setPlaying(p => !p)}>
                  {playing ? '⏸' : '▶'}
                </button>
                <button className="ctrl" onClick={next}>⏭</button>
                <button className="ctrl">🔁</button>
              </div>
              <div className="prog-bar">
                <span className="prog-time">{fmt(curSong ? curSong.duration * prog / 100 : 0)}</span>
                <div
                  className="prog-track"
                  onClick={e => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setProg(Math.round((e.clientX - r.left) / r.width * 100));
                  }}
                >
                  <div className="prog-fill" style={{ width: `${prog}%` }} />
                </div>
                <span className="prog-time">{fmt(curSong?.duration || 0)}</span>
              </div>
            </div>

            <div className="player-right">
              <span style={{ fontSize: 18 }}>🔊</span>
              <div className="vol-bar"><div className="vol-fill" /></div>
            </div>
          </div>
        </div>

        {/* ── MODAL: ADD / EDIT SONG ── */}
        {modal === 'song' && (
          <div className="overlay" onClick={() => { setModal(null); setForm({}); }}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-title">{form.sid ? '✏️ Edit Song' : '🎵 Add New Song'}</div>
              <div className="field">
                <label>Song Title</label>
                <input
                  placeholder="e.g. Blinding Lights"
                  value={form.title || ''}
                  onChange={e => sf('title', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Artist Name</label>
                <input
                  placeholder="e.g. The Weeknd"
                  value={form.artist || ''}
                  onChange={e => sf('artist', e.target.value)}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Genre</label>
                  <select value={form.genre || 'Pop'} onChange={e => sf('genre', e.target.value)}>
                    {['Pop','Rock','Hip-Hop','Soul','Lo-Fi','Ambient'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Mood</label>
                  <select value={form.mood || 'Happy'} onChange={e => sf('mood', e.target.value)}>
                    {['Happy','Sad','Chill','Workout'].map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Duration (e.g. 3.45 = 3 min 45 sec)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="3.20"
                  value={form.duration || ''}
                  onChange={e => sf('duration', e.target.value)}
                />
              </div>
              <div className="modal-btns">
                <button className="btn-cancel" onClick={() => { setModal(null); setForm({}); }}>Cancel</button>
                <button className="btn-ok" onClick={saveSong}>
                  {form.sid ? 'Save Changes' : 'Add Song'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: CREATE / EDIT PLAYLIST ── */}
        {modal === 'playlist' && (
          <div className="overlay" onClick={() => { setModal(null); setForm({}); }}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-title">{form.pid ? '✏️ Edit Playlist' : '📋 Create Playlist'}</div>
              <div className="field">
                <label>Playlist Name</label>
                <input
                  placeholder="e.g. Morning Vibes"
                  value={form.name || ''}
                  onChange={e => sf('name', e.target.value)}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Mood Filter</label>
                  <select value={form.mood || ''} onChange={e => sf('mood', e.target.value || null)}>
                    <option value="">None</option>
                    {['Happy','Sad','Chill','Workout'].map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Genre Filter</label>
                  <select value={form.genre || ''} onChange={e => sf('genre', e.target.value || null)}>
                    <option value="">None</option>
                    {['Pop','Rock','Hip-Hop','Soul','Lo-Fi','Ambient'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-btns">
                <button className="btn-cancel" onClick={() => { setModal(null); setForm({}); }}>Cancel</button>
                <button className="btn-ok" onClick={savePlaylist}>
                  {form.pid ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TOAST NOTIFICATION ── */}
        {toast && <div className="toast">{toast}</div>}

      </div>
    </>
  );
}
