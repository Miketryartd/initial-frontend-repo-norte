import { useState, useEffect, useRef } from "react";
import Layout from "./LayoutWrapper";
import { useParams } from "react-router-dom";
import { DynamicUrl } from "./DynamicUrl";

interface Question {
  _id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  score: number;
}

interface Quiz {
  _id: string;
  title: string;
  username: string;
  questions: Question[];
}

function Quizzes() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ correct: number; score: number } | null>(null);

  const { id: quizId } = useParams<{ id: string }>();
  const resultRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("User does not exist!");
          setLoading(false);
          return;
        }

        const res = await fetch(`${DynamicUrl()}/quiz/quizzes/${quizId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch quiz");

        const data: Quiz = await res.json();
        setQuiz(data);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswer = (question: Question, selected: string) => {
    if (answers[question._id]) return;

    setAnswers((prev) => ({
      ...prev,
      [question._id]: selected,
    }));
  };

  const submitQuiz = async (quizId: string, username: string) => {
    if (!quiz) return;
  
    const allQuestions: Question[] = quiz.questions;
    const correct = allQuestions.filter(q => answers[q._id] === q.correctAnswer).length;
    const score = allQuestions.reduce((sum: number, q: Question) => sum + (answers[q._id] === q.correctAnswer ? q.score : 0), 0);
  
    setResult({ correct, score });
  
    const token = localStorage.getItem("token");
    if (!token) return alert("User not logged in!");
  
    try {
      const res = await fetch(`${DynamicUrl()}/quiz/submit/${quizId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answers,
          score,
          title: quiz.title, 
          username,
        }),
      });
  
      if (!res.ok) throw new Error("Failed to submit quiz");
  
      const data = await res.json();
      if (!data) {
        return alert("Error fetching quiz data");
      }
      if (resultRef.current){
        resultRef.current.scrollIntoView({behavior: "smooth"});
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
    
    
  }
  

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-6">
        {isLoading ? (
          <p className="text-center text-lg font-semibold">Loading quiz...</p>
        ) : quiz ? (
          <>
            {result && (
              <div ref={resultRef} className="bg-green-50 border border-green-300 shadow rounded-2xl p-4 mb-6 flex justify-around gap-2">
                <h3 className="font-semibold">Correct Answers: <span className="font-bold">{result.correct}</span></h3>
                <h3 className="font-semibold">Score: <span className="font-bold">{result.score}</span></h3>
                <button className="text-gray-500 cursor-pointer italic" onClick={handleRetry}>Retry</button>
              </div>
            )}

            <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
              <div className="border-b pb-3 mb-4">
                <h2 className="text-xl font-bold">Created by {quiz.username}</h2>
                <p className="text-sm text-gray-500">
                  Total Quiz Score: {quiz.questions.reduce((sum: number, q: Question) => sum + q.score, 0)}
                </p>
              </div>

              {quiz.questions.map((question: Question) => (
                <div key={question._id} className="mb-6 p-4 border rounded-xl ">
                  <h4 className="font-semibold mb-3">{question.question}</h4>
                  <div className="space-y-2">
                    {(["A", "B", "C", "D"] as const).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleAnswer(question, key)}
                        disabled={!!answers[question._id]}
                        className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                          answers[question._id] === key ? "bg-sky-200 border-gray-400" : "hover:bg-gray-100"
                        }`}
                      >
                        {key}: {question.options[key]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={() => submitQuiz(quiz._id, quiz.username)}
                className="mt-4 w-full bg-sky-500 text-white py-2 rounded-xl hover:bg-sky-600 transition cursor-pointer"
              >
                Submit Answers
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-red-500">Quiz not found!</p>
        )}
      </div>
    </Layout>
  );
}

export default Quizzes;
