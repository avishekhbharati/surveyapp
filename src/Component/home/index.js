import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Home(){
    const [survey, setSurvey] = useState();

    const fetchData = async () => {
        try {
          let response = await axios.get("/api/survey/list");
          let data = response.data.surveys;  
          
          //set states.
          setSurvey(data);  
  
        } catch (err) {
          console.log(err.response.data);
        }
      };

    useEffect(() => {     
        fetchData();
      }, []);

    return(
        <>
            <h1>Compass Surveys</h1>
            <div>
            <ul>
                {survey && survey.map((item, index) => (
                    <li key={index}>
                    <Link to={`/survey/${item.id}`}  surveyID={survey.id} surveyName={survey.name}>
                        {item.name}
                    </Link>
                    </li>                    
                ))} 
                </ul>
            </div>
        </>
    );
}