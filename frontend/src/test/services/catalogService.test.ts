import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCatalog } from '../../services/catalogService';

describe('catalogService.fetchCatalog', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('builds clean query parameters and parses response JSON', async () => {
    const mockProducts = [{ id: '1', name: 'Test Diver', price: 800 }];
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const result = await fetchCatalog('WATCH', 'DIVER', 'heritage');

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/v1/catalog?category=WATCH&subCategory=DIVER&q=heritage',
      expect.objectContaining({ method: 'GET' })
    );
    expect(result).toEqual(mockProducts);
  });

  it('omits ALL keywords and empty query strings from endpoint URL', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    await fetchCatalog('ALL', 'ALL', '   ');

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/v1/catalog',
      expect.objectContaining({ method: 'GET' })
    );
  });
});