export interface Product {
    id: string;
    slug: string;
    name: string;
    category: 'WATCH' | 'STRAP' | 'ACCESSORY';
    subCategory: string;
    price: number;
    currency: string;
    badge?: string;
    shortDescription: string;
    imageUrl: string;
    specs: Record<string, string>;
  }
  
  export async function fetchCatalog(category?: string, subCategory?: string, query?: string): Promise<Product[]> {
    const params = new URLSearchParams();
    if (category && category !== 'ALL') params.append('category', category.trim());
    if (subCategory && subCategory !== 'ALL') params.append('subCategory', subCategory.trim());
    if (query && query.trim()) params.append('q', query.trim());
  
    const queryString = params.toString();
    const url = queryString ? `/api/v1/catalog?${queryString}` : '/api/v1/catalog';
  
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
  
    if (!res.ok) throw new Error(`Failed to load catalog: ${res.statusText}`);
    return res.json();
  }