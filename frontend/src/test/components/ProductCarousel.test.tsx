import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ProductCarousel } from '../../components/ProductCarousel';
import type { Product } from '../../services/catalogService';

const mockWatches: Product[] = [
  {
    id: 'w1',
    slug: 'khaki-38',
    name: 'Khaki Expedition Field 38',
    category: 'WATCH',
    subCategory: 'FIELD',
    price: 740,
    currency: 'CAD',
    badge: 'In-House Regulated',
    shortDescription: 'Field piece',
    imageUrl: '/watch-field.jpg',
    specs: { diameter: '38.0 mm' },
  },
];

const mockTabs = [
  { id: 'FEATURED', label: 'FEATURED' },
  { id: 'BEST_SELLERS', label: 'BEST SELLERS' },
];

describe('ProductCarousel Component', () => {
  it('renders underline tabs and triggers selection', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();

    render(
      

<ProductCarousel
        id="timepieces"
        eyebrow="The Catalog"
        title="Timepieces"
        tabs={mockTabs}
        activeTab="FEATURED"
        onTabChange={onTabChange}
        items={mockWatches}
        onAcquire={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /featured/i })).toBeInTheDocument();
    const bestSellersBtn = screen.getByRole('button', { name: /best sellers/i });
    await user.click(bestSellersBtn);

    expect(onTabChange).toHaveBeenCalledWith('BEST_SELLERS');
  });

  it('renders progress tracks correctly', () => {
    render(
      

<ProductCarousel
        id="gear"
        eyebrow="Modular Versatility"
        title="Straps & Travel Gear"
        tabs={mockTabs}
        activeTab="FEATURED"
        onTabChange={vi.fn()}
        items={mockWatches}
        onAcquire={vi.fn()}
      />
    );

    expect(screen.getByTestId('gear-progress-track')).toBeInTheDocument();
    expect(screen.getByTestId('gear-progress-thumb')).toBeInTheDocument();
  });
});