const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export function saveToken(token) { localStorage.setItem('token', token); }
export function getToken() { return localStorage.getItem('token'); }
export function authHeaders() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export async function register(body) {
  const res = await fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
  return res.json();
}
export async function login(body) {
  const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
  return res.json();
}
export async function uploadMaterial(file, text) {
  const form = new FormData();
  if (file) form.append('file', file);
  else form.append('text', text);
  const res = await fetch(`${API_BASE}/upload/material`, { method: 'POST', body: form });
  return res.json();
}
export async function generateQuiz({title, text, numQuestions}) {
  const res = await fetch(`${API_BASE}/quiz/generate`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify({title,text,numQuestions}) });
  return res.json();
}
export async function getQuiz(id) {
  const res = await fetch(`${API_BASE}/quiz/${id}`, { headers: authHeaders() });
  return res.json();
}
export async function submitQuiz(id, body) {
  const res = await fetch(`${API_BASE}/quiz/${id}/submit`, { method: 'POST', headers: {'Content-Type':'application/json', ...authHeaders()}, body: JSON.stringify(body) });
  return res.json();
}
export async function getAnalytics() {
  const res = await fetch(`${API_BASE}/analytics/me`, { headers: authHeaders() });
  return res.json();
}
