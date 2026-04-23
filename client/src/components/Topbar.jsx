import WaIcon from './WaIcon'

const WA_NUMBER = '254711292891'

export default function Topbar({ cartCount, onCartClick, onSearch, searchVal }) {
  return (
    <div className="topbar">
      <div className="logo">Aspire<span>Gadgets</span></div>
      <div className="search-wrap">
        <span className="search-icon">⚲</span>
        <input
          type="text"
          placeholder="Search phones, TVs, audio..."
          value={searchVal}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <div className="topbar-right">
        <button className="wa-top" onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=Hi! I'm interested in your products at Aspire Gadgets.`, '_blank')}>
          <WaIcon size={16} /> WhatsApp
        </button>
        <button className="cart-btn" onClick={onCartClick}>
          🛒 Cart <span className="cart-badge">{cartCount}</span>
        </button>
      </div>
    </div>
  )
}
