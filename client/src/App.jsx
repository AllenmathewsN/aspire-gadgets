import { useState, useEffect, useCallback } from 'react'
import Topbar from './components/Topbar'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import Checkout from './components/Checkout'
import Toast from './components/Toast'
import WaIcon from './components/WaIcon'

const WA_NUMBER = '254711292891'

const API = import.meta.env.VITE_API_URL || 'https://aspire-gadgets-production.up.railway.app'

export default function App() {
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchVal, setSearchVal] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [panelLabel, setPanelLabel] = useState('Browse category')
  const [modalItem, setModalItem] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [view, setView] = useState('store') // 'store' | 'checkout'
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then(r => r.json())
      .then(data => {
        setCategories(data)
        if (data.length) loadTab(0, data)
      })
  }, [])

  function loadTab(idx, cats = categories) {
    setActiveTab(idx)
    setSearchVal('')
    setSearchResults(null)
    setPanelLabel(cats[idx]?.label || '')
    setLoading(true)
    fetch(`${API}/api/products?category_id=${cats[idx].id}`)
      .then(r => r.json())
      .then(data => { setItems(data); setLoading(false) })
  }

  function handleSearch(val) {
    setSearchVal(val)
    if (!val.trim()) { setSearchResults(null); setPanelLabel(categories[activeTab]?.label || ''); return }
    fetch(`${API}/api/products/search?q=${encodeURIComponent(val)}`)
      .then(r => r.json())
      .then(data => { setSearchResults(data); setPanelLabel(`Results for "${val}"`) })
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }

  function addToCart(item) {
    setCartItems(c => [...c, item])
    showToast(`${item.name} added to cart`)
  }

  function removeFromCart(i) {
    setCartItems(c => { const n = [...c]; n.splice(i, 1); return n })
  }

  function showCheckout() {
    if (!cartItems.length) { showToast('Your cart is empty'); return }
    setView('checkout')
  }

  function resetStore() {
    setCartItems([])
    setView('store')
    loadTab(0)
  }

  const displayItems = searchResults ?? items

  return (
    <>
      <Topbar
        cartCount={cartItems.length}
        onCartClick={showCheckout}
        onSearch={handleSearch}
        searchVal={searchVal}
      />

      {view === 'store' && (
        <>
          <div className="tab-bar">
            {categories.map((c, i) => (
              <div key={c.id} className={`tab${i === activeTab ? ' active' : ''}`} onClick={() => loadTab(i)}>
                {c.icon} {c.label}
              </div>
            ))}
          </div>
          <div className="main">
            <div className="section-label">{panelLabel}</div>
            {loading
              ? <div className="loading">Loading...</div>
              : <ProductGrid items={displayItems} catLabel={categories[activeTab]?.label} onOpen={setModalItem} />}
          </div>
        </>
      )}

      {view === 'checkout' && (
        <Checkout
          cartItems={cartItems}
          onRemove={i => { removeFromCart(i); if (cartItems.length === 1) setView('store') }}
          onBack={() => setView('store')}
          onSuccess={resetStore}
          showToast={showToast}
        />
      )}

      {modalItem && (
        <ProductModal
          item={modalItem}
          onClose={() => setModalItem(null)}
          onAddToCart={addToCart}
        />
      )}

      <button className="wa-float" onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=Hi! I'm interested in your products at Aspire Gadgets.`, '_blank')}>
        <WaIcon size={18} /> Chat with us
      </button>

      <Toast message={toast} />
    </>
  )
}
