import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../src/context/CartContext'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

describe('CartContext', () => {
  test('cart starts empty', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.cart).toEqual([])
  })

  test('addToCart adds a product', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    const product = { id: '1', name: 'Tote Bag', price: 1500 }
    act(() => {
      result.current.addToCart(product)
    })
    expect(result.current.cart).toHaveLength(1)
    expect(result.current.cart[0].name).toBe('Tote Bag')
  })

  test('addToCart increases quantity if product exists', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    const product = { id: '1', name: 'Tote Bag', price: 1500 }
    act(() => {
      result.current.addToCart(product)
      result.current.addToCart(product)
    })
    expect(result.current.cart[0].quantity).toBe(2)
  })

  test('removeFromCart removes a product', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    const product = { id: '1', name: 'Tote Bag', price: 1500 }
    act(() => {
      result.current.addToCart(product)
      result.current.removeFromCart('1')
    })
    expect(result.current.cart).toHaveLength(0)
  })

  test('total calculates correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    const product = { id: '1', name: 'Tote Bag', price: 1500 }
    act(() => {
      result.current.addToCart(product)
    })
    expect(result.current.total).toBe(1500)
  })
})
