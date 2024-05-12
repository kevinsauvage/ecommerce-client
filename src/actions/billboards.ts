const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

interface billboardQuery {
  isFeatured?: boolean;
}

export async function getBillboards(query: billboardQuery = {}) {
  const params = new URLSearchParams();
  query &&
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

  const res = await fetch(`${API_URL}?${params.toString()}`);
  return await res.json();
}

export async function getBillboard(id: string) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}
