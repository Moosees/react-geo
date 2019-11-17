import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import ClearIcon from '@material-ui/icons/Clear';
import LandscapeIcon from '@material-ui/icons/LandscapeOutlined';
import SaveIcon from '@material-ui/icons/SaveTwoTone';
import React from 'react';

const CreatePin = ({ classes }) => {
  return (
    <form className={classes.form}>
      <Typography
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="secondary"
      >
        <LandscapeIcon className={classes.iconLarge} />
        Pin Location
      </Typography>
      <div>
        <TextField name="title" label="Title" placeholder="Add pin title" />
        <input
          className={classes.input}
          accept="image/*"
          id="image"
          type="file"
        />
        <label htmlFor="image">
          <Button className={classes.buttonRight} component="span">
            <AddAPhotoIcon className={classes.photoIcon} />
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField
          name="content"
          label="Description"
          fullWidth
          multiline
          rows="6"
          variant="outlined"
        />
      </div>
      <div>
        <Button
          className={classes.buttonLeft}
          variant="contained"
          color="primary"
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          className={classes.buttonRight}
          type="submit"
          variant="contained"
          color="secondary"
        >
          Save Pin
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  );
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
  photoIcon: {
    fontSize: 25
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing(1)
  },
  buttonLeft: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: 0
  },
  buttonRight: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: 0,
    marginLeft: theme.spacing(1)
  }
});

export default withStyles(styles)(CreatePin);
