import { Router } from 'express'
import pool from '../db.js'

const router = Router()

// GET all categories
router.get('/categories', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM categories ORDER BY id')
  res.json(rows)
})

// GET products by category
router.get('/products', async (req, res) => {
  const { category_id } = req.query
  const { rows } = await pool.query(
    'SELECT p.*, c.label as cat FROM products p JOIN categories c ON p.category_id = c.id WHERE p.category_id = $1 ORDER BY p.id',
    [category_id]
  )
  res.json(rows)
})

// GET search products
router.get('/products/search', async (req, res) => {
  const { q } = req.query
  const { rows } = await pool.query(
    `SELECT p.*, c.label as cat FROM products p JOIN categories c ON p.category_id = c.id
     WHERE p.name ILIKE $1 OR p.description ILIKE $1 ORDER BY p.id`,
    [`%${q}%`]
  )
  res.json(rows)
})

// POST place order
router.post('/orders', async (req, res) => {
  const { customer, items } = req.body
  const { fname, lname, phone, location, payment } = customer
  const { rows } = await pool.query(
    'INSERT INTO orders (fname, lname, phone, location, payment) VALUES ($1,$2,$3,$4,$5) RETURNING id',
    [fname, lname, phone, location, payment]
  )
  const orderId = rows[0].id
  for (const item of items) {
    await pool.query(
      'INSERT INTO order_items (order_id, product_name, product_price, product_img) VALUES ($1,$2,$3,$4)',
      [orderId, item.name, item.price, item.img || null]
    )
  }
  res.json({ success: true, order_id: orderId })
})

export default router
