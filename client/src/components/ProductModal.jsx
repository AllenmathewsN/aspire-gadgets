import WaIcon from './WaIcon'

const CAT_EMOJIS = { 'Hot Phones': '📱', Smartphones: '📱', Accessories: '🎧', TVs: '📺', Audio: '🔊' }
const WA_NUMBER = '254711292891'

export default function ProductModal({ item, onClose, onAddToCart }) {
  if (!item) return null

  function waItem() {
    const msg = encodeURIComponent(`Hi Aspire Gadgets! I'm interested in: *${item.name}* (${item.price}). Can you tell me more?`)
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <div className="overlay show" onClick={e => e.target.classList.contains('overlay') && onClose()}>
      <div className="modal-wrap">
        <div className="modal">
          <div>
            {item.img
              ? <img className="modal-img" src={item.img} alt={item.name} />
              : <div className="modal-img-placeholder">{CAT_EMOJIS[item.cat] || '📦'}</div>}
          </div>
          <div className="modal-body">
            <div className="modal-cat">{item.cat}</div>
            <div className="modal-name">{item.name}</div>
            <div className="modal-price">{item.price}</div>
            <div className="modal-desc">{item.description}</div>
            <div className="modal-actions">
              <button className="btn-add" onClick={() => { onAddToCart(item); onClose() }}>Add to cart</button>
              <button className="btn-wa" onClick={waItem}>
                <WaIcon size={16} /> Ask on WhatsApp
              </button>
            </div>
          </div>
        </div>
        <button className="btn-close" onClick={onClose}>×</button>
      </div>
    </div>
  )
}
