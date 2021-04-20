import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";



const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
      margin: "10px 0px",
      padding: theme.spacing(1),
    },
  },
}));

export default function Home() {
  const [survey, setSurvey] = useState();
  const classes = useStyles();

  const fetchData = async () => {
    try {

      let response = await axios.get("/api/survey/list");
      setSurvey(response.data.surveys);

    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={classes.root}>
      <Typography variant="h4">Compass Surveys</Typography>
        {survey &&
          survey.map((item, index) => (
            <Button
              variant="contained"
              component={Link}
              to={`/survey/${item.id}`}
              surveyID={survey.id}
              surveyName={survey.name}
              fullWidth
            >
              {item.name}
            </Button>
          ))}
      </div>
    </>
  );
}
