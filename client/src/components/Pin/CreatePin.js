import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
// import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
// import ClearIcon from "@material-ui/icons/Clear";
// import SaveIcon from "@material-ui/icons/SaveTwoTone";

const CreatePin = ({ classes }) => {
  return <div>CreatePin</div>;
};

const styles = theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing(1)
  },
  contentField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '95%'
  },
  input: {
    display: 'none'
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing(1)
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: 0
  }
});

export default withStyles(styles)(CreatePin);
