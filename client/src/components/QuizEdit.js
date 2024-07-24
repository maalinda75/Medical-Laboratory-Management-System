import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditQuestions() {
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState("mcq");
  const [category, setCategory] = useState("");
 
 const { id } = useParams();

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await axios.get(`http://localhost:8070/quiz/get/${id}`);
        const question= response.data.question;
        const category=response.data.category;

        setQuestion(question);
        setCategory(category);

            }catch(err){
              console.log(err);
            }
            
          }
        
fetchQuestion();
} ,[id])

         async function setData(e){
        
                e.preventDefault();
                const newQuestion={
                    question,
                    category,
                    answerType,
            
                }
                console.log(newQuestion);
              const res= await axios.put(`http://localhost:8070/quiz/edit/${id}`,newQuestion);
              window.location="/quiz";

              console.log(res.status);
        }

  return(
    <div className="container">
      <div className="header-quiz">
        <h1 className="q-h1 text-center" id="title">Thank You</h1>
        <p id="descriptionq" className="text-center">
          You are making a real difference in people's lives
        </p>
      </div>
      <div className="form-wrap-q">	
        <form id="survey-form">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group form-group-q">
                <label id="name-label" htmlFor="name">Question</label>
                <input type="text" name="name" id="question" placeholder="Enter the question" className="form-control form-control-q" onChange={(e) => setQuestion(e.target.value)} value={question} required />
              </div>
            </div>
          </div>
                        <div className="row text-center">
                        <div className="col-12">
                        <button type="submit" id="submit" className="btn btn-primary btn-q btn-primary-q btn-block"onClick={setData}>Update Question</button>
                        </div>
                        </div>
                        
                        </form>
                        </div>	
                        </div>
                        )
}