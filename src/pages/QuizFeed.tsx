import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./LayoutWrapper";
import { DynamicUrl } from "./DynamicUrl";

interface QuizTtile {
    _id: string;
    username: string;
    title: string;
    questions: string[];
    createdAt: Date;
}

function QuizFeed(){

    const [quizf, setQuizF] = useState<QuizTtile[]>([]);

    useEffect(() =>{


        const fetchUserQuizzes = async () =>{
            
            try{

                const token = localStorage.getItem("token");
                if (!token) return alert("User does not exist!");
                const res = await fetch(`${DynamicUrl()}/quiz/quizzes`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`
                    }
                  });

                  const data = await res.json();
            
                  setQuizF(data);
            } catch (error){
                console.error('Error fetching quiz titles:', error);
            }
        }
   fetchUserQuizzes();
    }, [])

    return (

        <>
        <Layout>
          
          <div className="w-full h-screen flex flex-col gap-5">
            {quizf.map((quiz, index) => (
                <div className=" w-full bg-white p-10 shadow-sm rounded-xl hover:bg-sky-50" key={index}>
                    <Link to={`/Quiz/${quiz._id}`}>
                    <h3 className="text-black">Created by <span className="font-medium">{quiz.username}</span></h3>
                    <div className="flex flex-row gap-2 p-2 text-gray-600">
                    <h1 className="text-xl font-bold">{quiz.title} /</h1>
                    <h3 >Total questions [{quiz.questions.length}] /</h3>
                    <h3>Created at {new Date(quiz.createdAt).toLocaleString()}</h3>
                    </div>
                    </Link>

                    </div>
            ))}
          </div>
        </Layout>

      
        
        </>


    )
}

export default QuizFeed;