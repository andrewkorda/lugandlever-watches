import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CartProvider, useCart } from '../../../features/cart/CartContext';
import { CartDrawer } from '../../../features/cart/CartDrawer';
import type { Product } from '../../../services/catalogService';

const mockWatch: Product = {
  id: 'watch-1',
  slug: 'khaki-field-38',
  name: 'Khaki Expedition Field 38',
  category: 'WATCH',
  subCategory: 'FIELD',
  price: 740,
  currency: 'CAD',
  badge: 'In-House Regulated',
  shortDescription: 'Field watch',
  imageUrl: '/watch-field.jpg',
  specs: { diameter: '38.0 mm' },
};

const mockStrap: Product = {
  id: 'strap-1',
  slug: 'canvas-strap',
  name: 'Mil-Spec Washed Canvas Strap',
  category: 'STRAP',
  subCategory: 'CANVAS',
  price: 52,
  currency: 'CAD',
  shortDescription: 'Canvas strap',
  imageUrl: '/gear-strap.jpg',
  specs: { diameter: '20mm & 22mm' },
};

function TestHarness() {
  const { addItem, openCart } = useCart();
  return (
    <>
      <button onClick={() => addItem(mockWatch)}>Add Watch</button>
      <button onClick={() => addItem(mockStrap, '20mm')}>Add Strap 20mm</button>
      <button onClick={openCart}>Open Bag</button>
      <CartDrawer />
    </>
  );
}

// Ensure a clean localStorage between tests.
beforeEach(() => {
  window.localStorage.clear();
});

describe('CartDrawer Component', () => {
  it('does not render drawer visible by default', () => {
    render(
      <CartProvider>
        <CartDrawer />
      </CartProvider>
    );
    expect(screen.queryByText(/acquisition bag/i)).not.toBeInTheDocument();
  });

  it('opens drawer, lists added products, and calculates subtotal in CAD', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestHarness />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Watch'));
    await user.click(screen.getByText('Open Bag'));

    expect(screen.getByText(/acquisition bag/i)).toBeInTheDocument();
    expect(screen.getByText('Khaki Expedition Field 38')).toBeInTheDocument();
    
    // Check that $740 CAD is rendered in both the line item and subtotal
    expect(screen.getAllByText(/\$740\s+CAD/i)).toHaveLength(2);
    expect(screen.getByTestId('cart-subtotal')).toHaveTextContent('$740 CAD');
  });

  it('supports strap width variant selection and displays selected size in the bag', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestHarness />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Strap 20mm'));
    await user.click(screen.getByText('Open Bag'));

    expect(screen.getByText('Mil-Spec Washed Canvas Strap')).toBeInTheDocument();
    expect(screen.getByText(/width: 20mm/i)).toBeInTheDocument();
  });

  it('updates quantity and recalculates totals correctly', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestHarness />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Strap 20mm'));
    await user.click(screen.getByText('Open Bag'));

    const incrementButton = screen.getByRole('button', { name: /increase quantity/i });
    await user.click(incrementButton);

    expect(screen.getByTestId('cart-item-qty')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-subtotal')).toHaveTextContent('$104 CAD');
  });

  it('displays complimentary shipping qualification when subtotal exceeds $500 CAD', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestHarness />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Watch'));
    await user.click(screen.getByText('Open Bag'));

    expect(screen.getByText(/complimentary expedited courier unlocked/i)).toBeInTheDocument();
  });

  it('persists added items into localStorage', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestHarness />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Watch'));

    const stored = window.localStorage.getItem('lug_and_lever_cart');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].product.name).toBe('Khaki Expedition Field 38');
  });

  it('restores persisted items from localStorage on initial render', async () => {
    const user = userEvent.setup();
    const preloadedState = [
      {
        product: mockWatch,
        quantity: 2,
        selectedOption: undefined,
      },
    ];
    window.localStorage.setItem('lug_and_lever_cart', JSON.stringify(preloadedState));

    render(
      <CartProvider>
        <TestHarness />
      </CartProvider>
    );

    // Subtotal should immediately reflect 2 x $740 CAD = $1480 CAD
    const openBagBtn = screen.getByText('Open Bag');
    await user.click(openBagBtn);

    expect(screen.getByTestId('cart-subtotal')).toHaveTextContent('$1480 CAD');
    expect(screen.getByTestId('cart-item-qty')).toHaveTextContent('2');
  });
});