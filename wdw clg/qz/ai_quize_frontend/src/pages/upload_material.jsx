import React, { useState } from 'react';
import { uploadMaterial, generateQuiz } from '../api';
import { useNavigate } from 'react-router-dom';

export default function UploadMaterial(){
  const [file,setFile] = useState(null);
  const [text,setText] = useState('');
  const [title,setTitle] = useState('Auto Quiz');
  const [num, setNum] = useState(6);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uploaded = await uploadMaterial(file, text);
    if (uploaded.text) {
      const gen = await generateQuiz({ title, text: uploaded.text, numQuestions: num });
      setLoading(false);
      if (gen.quiz) {
        navigate(`/quiz/${gen.quiz._id}`);
      } else {
        alert('Failed to generate quiz: ' + (gen.error || 'unknown'));
      }
    } else {
      setLoading(false);
      alert('Upload failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Material / Paste Text</h2>
      <form className="space-y-3" onSubmit={handleUpload}>
        <input placeholder="Quiz Title" className="w-full p-2 border" value={title} onChange={e=>setTitle(e.target.value)} />
        <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files[0])} />
        <textarea placeholder="Or paste study text here" className="w-full p-2 border" rows={6} value={text} onChange={e=>setText(e.target.value)} />
        <div className="flex items-center space-x-3">
          <label>Number Questions</label>
          <input type="number" min={3} max={20} value={num} onChange={e=>setNum(Number(e.target.value))} className="w-20 p-1 border" />
        </div>
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Generating...' : 'Generate Quiz'}</button>
      </form>
    </div>
  );
}
