import { useState } from "react";
import Layout from "./LayoutWrapper";
import axios from "axios";
import { DynamicUrl } from "./DynamicUrl";

type Question = {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  score: number;
};

function CreateQuiz() {
  const [title, setTitle] = useState<string>("");
  const createEmptyQuestion = (): Question => ({
    id: crypto.randomUUID(),
    question: "",
    options: { A: "", B: "", C: "", D: "" },
    correctAnswer: "",
    score: 0,
  });

  const [questions, setQuestions] = useState<Question[]>([createEmptyQuestion()]);

  const isQuestionValid = (q: Question) =>
    q.question.trim() &&
    q.options.A.trim() &&
    q.options.B.trim() &&
    q.options.C.trim() &&
    q.options.D.trim() &&
    q.correctAnswer &&
    q.score > 0;

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, question: value } : q)));
  };

  const handleOptionChange = (id: string, optionKey: keyof Question["options"], value: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, options: { ...q.options, [optionKey]: value } } : q))
    );
  };

  const handleCorrectAnswer = (id: string, value: string) => {
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, correctAnswer: value } : q)));
  };

  const handleScoreChange = (id: string, value: number) => {
    setQuestions(prev => prev.map(q => (q.id === id ? { ...q, score: value } : q)));
  };

  const addQuestion = () => {
    const lastQuestion = questions[questions.length - 1];
    if (!isQuestionValid(lastQuestion)) {
      alert("Fill all required fields.");
      return;
    }
    setQuestions(prev => [...prev, createEmptyQuestion()]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("User does not exist!");

      const response = await axios.post(
        `${DynamicUrl()}/quiz/create`,
        { title, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Saved quiz", response.data);
      setTitle("");
      setQuestions([createEmptyQuestion()]);
      alert("Quiz saved successfully!");
    } catch (error) {
      console.error("Error adding questions", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
        
          <div>
            <label className="block font-semibold mb-2">Quiz Title</label>
            <input
              type="text"
              placeholder="Enter quiz title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

       
          {questions.map(q => (
            <div key={q.id} className="bg-white shadow-md rounded-xl p-6 space-y-4">
              <div>
                <label className="block font-semibold mb-2">Question</label>
                <input
                  type="text"
                  placeholder="Enter question"
                  value={q.question}
                  onChange={e => handleQuestionChange(q.id, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(["A", "B", "C", "D"] as const).map(letter => (
                  <div key={letter}>
                    <label className="block font-medium mb-1">Option {letter}</label>
                    <input
                      type="text"
                      value={q.options[letter]}
                      onChange={e => handleOptionChange(q.id, letter, e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label className="block font-medium mb-1">Correct Answer</label>
                  <select
                    value={q.correctAnswer}
                    onChange={e => handleCorrectAnswer(q.id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div className="w-32">
                  <label className="block font-medium mb-1">Score</label>
                  <input
                    type="number"
                    min={0}
                    value={q.score}
                    onChange={e => handleScoreChange(q.id, Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <button
              type="button"
              onClick={addQuestion}
              className="px-6 py-2 bg-green-500 cursor-pointer text-white rounded-lg hover:bg-green-600 transition"
            >
              Add Question
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Quiz
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CreateQuiz;
