import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    const res = await register({ name, email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/');
    } else setErr(res.msg || res.error || 'Failed');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={handle} className="space-y-3">
        <input required className="w-full p-2 border" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input required className="w-full p-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input required type="password" className="w-full p-2 border" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full py-2 bg-green-600 text-white rounded">Register</button>
      </form>
    </div>
  );
}
