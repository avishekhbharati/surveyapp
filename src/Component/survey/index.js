import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Question } from "./question";

export default function Survey(props) {
  //gets params from url.
  const {
    match: { params },
  } = props;
  const [data, setData] = useState();
  const [payload, setPayload] = useState({
    surveyId: params.id,
    questionAns: [],
  });

  const fetchData = async () => {
    try {
      let response = await axios.get(`/api/survey/${params.id}`);
      //set states.
      await setData(response.data);

      let questions = [];
      response.data.forEach((element) => {
        let id = element.id;
        questions.push({ id: [] });
      });
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOptions = async (q, a, e) => {
    let { questionAns } = { ...payload };
    let newQnAns = [];

    if (questionAns.length > 0) {
      let existingQn = questionAns.find((x) => x.qid == q);

      //for existing question
      if (existingQn) {
        //check if the option already exists
        let answer = existingQn.ans.find((x) => x == a);

        //for existing answer if unchecked
        if (answer) {
          removeAnswer(q, a, e);
        }
        //for new selected answer
        else {
          addAnswer(q, a, e);
        }
        return;
      }
    }

    //add new question to the record
    handleNewQuestion(q, a, e);
    console.log(payload);
  };

  const addAnswer = async (q, a, e) => {
    //get the question

    //copy all questionAns list  from payload
    let { questionAns } = { ...payload };

    //add new answer
    questionAns.forEach((element) => {
      if (element.qid === q) {
        element.ans.push(a);
      }
    });

    //re init init state
    setPayload({
      ...payload,
      questionAns,
    });
  };

  const removeAnswer = async (q, a, e) => {
    //copy all questionAns list  from payload
    let { questionAns } = { ...payload };

    //add new answer
    questionAns.forEach((element) => {
      if (element.qid === q) {
        let newAns = element.ans.filter((x) => x !== a);
        element.ans = newAns;
      }
    });

    //re init init state
    setPayload({
      ...payload,
      questionAns,
    });
  };

  const handleNewQuestion = async (q, a, e) => {
    let { questionAns } = { ...payload };

    setPayload({
      ...payload,
      questionAns: questionAns.concat({
        qid: q,
        ans: [a],
      }),
    });
  };

  const handleSubmit = async (e) => {
    console.log(payload);
    //check if all the questions is answered.
    //if not alert
    //if yes save and redirect back to survey page
    //history.push("/auth/login");
  };

  return (
    <>
      {!data ? (
        ""
      ) : (
        <div>
          <h1>{data.name}</h1>
          {data.questions.map((item, index) => (
            <Question
              key={index}
              data={item}
              serialno={index + 1}
              handleOptions={handleOptions}
            ></Question>
          ))}

          <button onClick={handleSubmit}>Submit</button>

          <Link to={`/`}>
            <button>Back</button>
          </Link>
        </div>
      )}
    </>
  );
}
