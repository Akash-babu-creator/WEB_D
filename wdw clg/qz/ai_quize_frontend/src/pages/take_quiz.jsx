import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuiz, submitQuiz } from '../api';

export default function TakeQuiz(){
  const { id } = useParams();
  const [quiz,setQuiz] = useState(null);
  const [answers,setAnswers] = useState({});
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=> {
    (async()=> {
      const data = await getQuiz(id);
      setQuiz(data.quiz);
    })();
  }, [id]);

  const handleChange = (qid, val) => {
    setAnswers(prev => ({ ...prev, [qid]: val }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const answerArray = Object.entries(answers).map(([q,resp]) => ({ question: q, response: resp }));
    const res = await submitQuiz(id, { answers: answerArray, durationSeconds: 120 });
    setLoading(false);
    if (res.submissionId) {
      navigate(`/results/${res.submissionId}`, { state: { details: res } });
    } else {
      alert('Submit failed: ' + (res.error || 'unknown'));
    }
  };

  if (!quiz) return <div>Loading quiz...</div>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
      <div className="space-y-4">
        {quiz.questions.map(q => (
          <div key={q._id} className="p-4 border rounded bg-white">
            <div className="font-semibold">{q.text}</div>
            {q.type === 'mcq' && q.options && q.options.map((opt, idx) => (
              <label key={idx} className="block">
                <input type="radio" name={q._id} onChange={()=>handleChange(q._id, opt)} />
                <span className="ml-2">{opt}</span>
              </label>
            ))}
            {q.type === 'tf' && (
              <div>
                <label><input type="radio" name={q._id} onChange={()=>handleChange(q._id, 'True')} /> True</label>
                <label className="ml-4"><input type="radio" name={q._id} onChange={()=>handleChange(q._id, 'False')} /> False</label>
              </div>
            )}
            {q.type === 'short' && (
              <textarea className="w-full p-2 border mt-2" rows={3} onChange={(e)=>handleChange(q._id, e.target.value)} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">{loading ? 'Submitting...' : 'Submit Quiz'}</button>
      </div>
    </div>
  );
}
