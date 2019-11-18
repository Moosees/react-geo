import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import ClearIcon from '@material-ui/icons/Clear';
import LandscapeIcon from '@material-ui/icons/LandscapeOutlined';
import SaveIcon from '@material-ui/icons/SaveTwoTone';
import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import React, { useContext, useState } from 'react';
import Context from '../../context';
import { CREATE_PIN_MUTATION } from '../../graphql/mutations';
import { DISCARD_DRAFT_PIN } from '../../types';

const CreatePin = ({ classes }) => {
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async evt => {
    evt.preventDefault();
    setIsSubmitting(true);

    try {
      const idToken = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse().id_token;

      const url = await uploadImage();
      const { longitude, latitude } = state.draft;
      const variables = {
        title,
        image: url,
        content,
        longitude,
        latitude
      };

      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: { authorization: idToken }
      });

      const { createPin } = await client.request(
        CREATE_PIN_MUTATION,
        variables
      );

      console.log({ createPin });
      setIsSubmitting(false);
      handleDiscard();
    } catch (e) {
      setIsSubmitting(false);
      console.error('Error creating pin', e);
    }
  };

  const handleDiscard = () => {
    setTitle('');
    setImage(null);
    setContent('');
    dispatch({ type: DISCARD_DRAFT_PIN });
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'react-geo');
    data.append('cloud_name', 'moosees');

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/moosees/image/upload',
      data
    );

    return res.data.url;
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
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
        <TextField
          name="title"
          label="Title"
          placeholder="Add pin title"
          value={title}
          onChange={evt => setTitle(evt.target.value)}
        />
        <input
          className={classes.input}
          accept="image/*"
          id="image"
          type="file"
          onChange={evt => setImage(evt.target.files[0])}
        />
        <label htmlFor="image">
          <Button
            className={classes.buttonRight}
            component="span"
            style={{ color: image && 'green' }}
          >
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
          value={content}
          onChange={evt => setContent(evt.target.value)}
        />
      </div>
      <div>
        <Button
          className={classes.buttonLeft}
          variant="contained"
          color="primary"
          onClick={handleDiscard}
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          className={classes.buttonRight}
          type="submit"
          variant="contained"
          color="secondary"
          disabled={isSubmitting || !title.trim() || !content.trim() || !image}
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
