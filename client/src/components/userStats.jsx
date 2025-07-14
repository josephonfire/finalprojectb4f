export async function getUserStats(token) {
  const res = await fetch('http://localhost:3030/api/user-stats', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Erro ao buscar estatísticas');
  return res.json();
}