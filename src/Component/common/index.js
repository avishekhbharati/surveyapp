import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    border:"1px solid grey",
    marginTop: theme.spacing(3)
  },
  myBtn: {
    borderRadius: "0",
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  }
}));

export function Question(props) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5">Question {props.serialno}</Typography>
          <Typography variant="h6">{props.data.title}</Typography>
          <Typography variant="caption">{props.data.subTitle}</Typography>
          {props.data.options.map((item, index) => (
            <div>
              <Checkbox
                onChange={(e) => {
                  props.handleOptions(props.data.id, item.id, e);
                }}
              />
              <label>{item.text}</label>
            </div>
          ))}
        </Paper>
      </Grid>
    </>
  );
}

export function MyButton(props) {
  const classes = useStyles();

  return (
      <Button 
      className={classes.myBtn}
      variant="contained" 
      clickable
      component={Link} 
      {...props} >
      {props.label ? props.label : "Ok"} 
      </Button>
  );
}