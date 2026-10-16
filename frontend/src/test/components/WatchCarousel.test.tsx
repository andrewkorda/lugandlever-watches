import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WatchCarousel } from '../../components/WatchCarousel';
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
  {
    id: 'w2',
    slug: 'diver-40',
    name: 'Pelagos Heritage Diver 40',
    category: 'WATCH',
    subCategory: 'DIVER',
    price: 890,
    currency: 'CAD',
    badge: 'Certified 200M',
    shortDescription: 'Diver piece',
    imageUrl: '/watch-diver.jpg',
    specs: { diameter: '40.0 mm' },
  },
];

describe('WatchCarousel Component', () => {
  it('renders Hamilton-style text underline tabs without boxed buttons', () => {
    render(
      <WatchCarousel
        watches={mockWatches}
        activeFilter="FEATURED"
        onFilterChange={vi.fn()}
        onViewSpecs={vi.fn()}
        onAcquire={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /featured/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /best sellers/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /community vault/i })).toBeInTheDocument();
  });

  it('triggers onFilterChange when a tab is selected', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();

    render(
      <WatchCarousel
        watches={mockWatches}
        activeFilter="FEATURED"
        onFilterChange={onFilterChange}
        onViewSpecs={vi.fn()}
        onAcquire={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /best sellers/i }));
    expect(onFilterChange).toHaveBeenCalledWith('BEST SELLERS');
  });

  it('renders left and right carousel nav controls', () => {
    render(
      <WatchCarousel
        watches={mockWatches}
        activeFilter="FEATURED"
        onFilterChange={vi.fn()}
        onViewSpecs={vi.fn()}
        onAcquire={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next slide/i })).toBeInTheDocument();
  });

  it('renders the synchronized scroll progress track', () => {
    render(
      <WatchCarousel
        watches={mockWatches}
        activeFilter="FEATURED"
        onFilterChange={vi.fn()}
        onViewSpecs={vi.fn()}
        onAcquire={vi.fn()}
      />
    );

    expect(screen.getByTestId('carousel-progress-track')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-progress-thumb')).toBeInTheDocument();
  });
});