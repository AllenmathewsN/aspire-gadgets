const CAT_EMOJIS = { 'Hot Phones': '📱', Smartphones: '📱', Accessories: '🎧', TVs: '📺', Audio: '🔊' }

function ImgOrPlaceholder({ src, cls, emoji }) {
  if (src) return (
    <>
      <img className={cls} src={src} alt="" loading="lazy"
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
      <div className={`${cls}-placeholder`} style={{ display: 'none' }}>{emoji || '📦'}</div>
    </>
  )
  return <div className={`${cls}-placeholder`}>{emoji || '📦'}</div>
}

export default function ProductGrid({ items, catLabel, onOpen }) {
  if (!items.length) return <div style={{ color: '#999', padding: '3rem', textAlign: 'center' }}>No results found</div>
  return (
    <div className="grid">
      {items.map((it, i) => (
        <div className="card" key={i} onClick={() => onOpen(it)}>
          <ImgOrPlaceholder src={it.img} cls="card-img" emoji={CAT_EMOJIS[it.cat || catLabel]} />
          <div className="card-body">
            <div className={it.range ? 'card-range' : 'card-name'}>{it.name}</div>
            <div className="card-price">{it.price}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
