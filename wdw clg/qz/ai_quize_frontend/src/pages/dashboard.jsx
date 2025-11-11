import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to AI Quiz Portal</h1>
      <p className="mb-4">Upload your study materials and generate AI-powered quizzes that adapt to learners.</p>
      <div className="space-x-3">
        <Link to="/upload" className="px-4 py-2 bg-blue-600 text-white rounded">Create Quiz</Link>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Quick Steps</h3>
        <ol className="list-decimal ml-6">
          <li>Register / Login</li>
          <li>Upload PDF or paste text</li>
          <li>Generate quiz</li>
          <li>Take quiz & get instant AI feedback</li>
        </ol>
      </div>
    </div>
  );
}
