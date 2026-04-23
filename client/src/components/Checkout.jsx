import { useState } from 'react'
import WaIcon from './WaIcon'

const CAT_EMOJIS = { 'Hot Phones': '📱', Smartphones: '📱', Accessories: '🎧', TVs: '📺', Audio: '🔊' }
const WA_NUMBER = '254712345678'

export default function Checkout({ cartItems, onRemove, onBack, onSuccess, showToast }) {
  const [form, setForm] = useState({ fname: '', lname: '', phone: '', location: '', payment: '' })
  const [done, setDone] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function placeOrder() {
    if (!form.fname || !form.payment) { showToast('Please fill in your name and payment method'); return }
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { fname: form.fname, lname: form.lname, phone: form.phone, location: form.location, payment: form.payment },
          items: cartItems
        })
      })
    } catch (_) { /* order still shows success */ }
    setSuccessMsg(`Thank you ${form.fname}! Your ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} will be confirmed shortly. We'll reach you via ${form.payment}.`)
    setDone(true)
  }

  function waOrder() {
    if (!cartItems.length) { showToast('Your cart is empty'); return }
    const list = cartItems.map(it => `• ${it.name} (${it.price})`).join('\n')
    const msg = encodeURIComponent(`Hi Aspire Gadgets! I'd like to order:\n\n${list}\n\nName: ${form.fname || 'a customer'}\nLocation: ${form.location || '(location not specified)'}\n\nPlease confirm availability and delivery cost.`)
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank')
  }

  if (done) return (
    <div className="checkout show">
      <div className="success show">
        <div className="success-icon">✓</div>
        <div className="success-title">Order placed!</div>
        <div className="success-sub">{successMsg}</div>
        <button className="btn-continue" onClick={onSuccess}>Continue shopping</button>
      </div>
    </div>
  )

  return (
    <div className="checkout show">
      <button className="back-btn" onClick={onBack}>← Back to store</button>
      <div className="checkout-title">Your cart</div>

      <div className="cart-list">
        {cartItems.map((it, i) => (
          <div className="cart-row" key={i}>
            {it.img
              ? <img className="cart-row-img" src={it.img} alt="" />
              : <div className="cart-row-img-ph">{CAT_EMOJIS[it.cat] || '📦'}</div>}
            <div className="cart-row-info">
              <div className="cart-row-name">{it.name}</div>
              <div className="cart-row-price">{it.price}</div>
            </div>
            <button className="cart-remove" onClick={() => onRemove(i)}>×</button>
          </div>
        ))}
      </div>

      <div className="summary">
        <div className="summary-row"><span>Items in cart</span><span>{cartItems.length}</span></div>
        <div className="summary-row"><span>Delivery</span><span>Calculated on confirmation</span></div>
        <hr className="summary-divider" />
        <div className="summary-total"><span>Total</span><span>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span></div>
      </div>

      <div className="form-section">
        <div className="form-title">Delivery details</div>
        <div className="form-grid">
          <input placeholder="First name" value={form.fname} onChange={e => set('fname', e.target.value)} />
          <input placeholder="Last name" value={form.lname} onChange={e => set('lname', e.target.value)} />
          <input placeholder="Phone number" value={form.phone} onChange={e => set('phone', e.target.value)} className="full" />
          <input placeholder="Delivery location" value={form.location} onChange={e => set('location', e.target.value)} className="full" />
          <select value={form.payment} onChange={e => set('payment', e.target.value)} className="full">
            <option value="">Select payment method</option>
            <option>M-Pesa</option>
            <option>Card</option>
            <option>Cash on delivery</option>
          </select>
        </div>
      </div>

      <button className="btn-pay" onClick={placeOrder}>✓ Place order</button>
      <button className="btn-wa-checkout" onClick={waOrder}>
        <WaIcon size={18} /> Order via WhatsApp
      </button>
    </div>
  )
}
