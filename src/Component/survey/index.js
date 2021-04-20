import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Question, MyButton } from "../common";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  btnContainer: {
    textAlign: "center",
    margin: "10px",
  },
}));

export default function Survey(props) {
  const classes = useStyles();

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

    if (questionAns.length > 0) {
      let existingQn = questionAns.find((x) => x.qid == q);

      //for existing question
      if (existingQn) {
        //for existing answer if unchecked
        if (!e.target.checked) {
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
    let totalQns = data.questions.length;
    let qnsInPayload = payload.questionAns.length;

    if (qnsInPayload < totalQns)
      return alert("Please answer all the questions. 1");

    //check the case where it can have all the questions but no answers selected.
    let emptyResponse = payload.questionAns.find((x) => x.ans.length === 0);

    if (emptyResponse) {
      return alert("Please answer all the questions.!");
    }

    //make http post request
    let response = await axios.post("/api/survey/submit", payload);
    console.log(response);
    alert(response.data.message);
  };

  return (
    <>
      {!data ? (
        ""
      ) : (
        <div>
          <Typography variant="h4">{data.name}</Typography>
          {data.questions.map((item, index) => (
            <Question
              key={index}
              data={item}
              serialno={index + 1}
              handleOptions={handleOptions}
            ></Question>
          ))}

          <div className={classes.btnContainer}>
            <MyButton onClick={handleSubmit} color="primary" label="Submit" />

            <MyButton component={Link} to={`/`} label="Back" />
          </div>
        </div>
      )}
    </>
  );
}
