import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../api';

export default function Nav() {
  const navigate = useNavigate();
  const logged = getToken();
  return (
    <nav className="bg-white shadow">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">AI Quiz</Link>
        <div className="space-x-3">
          <Link to="/upload" className="px-3 py-1 border rounded">Upload</Link>
          {logged ? <button className="px-3 py-1 border rounded" onClick={()=>{ localStorage.clear(); navigate('/login'); }}>Logout</button> :
            <>
              <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
              <Link to="/register" className="px-3 py-1 border rounded">Register</Link>
            </>}
        </div>
      </div>
    </nav>
  );
}
