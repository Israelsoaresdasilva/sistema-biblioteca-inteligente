const BASE_URL = 'https://openlibrary.org';

export interface Livro {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
}

export function getCoverUrl(coverId: number, size: 'S' | 'M' | 'L' = 'M') {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export async function buscarLivros(query: string): Promise<Livro[]> {
  const res = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=20`);
  const data = await res.json();
  return data.docs || [];
}

export async function buscarPorCategoria(categoria: string): Promise<Livro[]> {
  const res = await fetch(`${BASE_URL}/search.json?subject=${encodeURIComponent(categoria)}&limit=20`);
  const data = await res.json();
  return data.docs || [];
}

export async function buscarDetalhes(key: string) {
  const res = await fetch(`${BASE_URL}${key}.json`);
  return res.json();
}
