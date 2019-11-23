import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';
import SendIcon from '@material-ui/icons/Send';
import React, { useContext, useState } from 'react';
import Context from '../../context';
import { CREATE_COMMENT_MUTATION } from '../../graphql/mutations';
import { useGraphql } from '../../hooks/useGraphql';
import { CREATE_COMMENT } from '../../types';

const CreateComment = ({ classes }) => {
  const { state, dispatch } = useContext(Context);
  const { client } = useGraphql();
  const [comment, setComment] = useState('');

  const handleSubmit = async evt => {
    evt.preventDefault();
    const variables = { pinId: state.currentPin._id, text: comment };
    const { createComment } = await client.request(
      CREATE_COMMENT_MUTATION,
      variables
    );
    dispatch({ type: CREATE_COMMENT, payload: createComment });
    setComment('');
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <IconButton
          className={classes.clearButton}
          onClick={() => setComment('')}
        >
          <ClearIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          multiline
          placeholder="Add Comment"
          value={comment}
          onChange={evt => setComment(evt.target.value)}
        />
        <IconButton
          className={classes.sendButton}
          disabled={!comment.trim()}
          type="submit"
        >
          <SendIcon />
        </IconButton>
      </form>
      <Divider />
    </>
  );
};

const styles = theme => ({
  form: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  clearButton: {
    padding: 0,
    color: 'red'
  },
  sendButton: {
    padding: 0,
    color: theme.palette.secondary.dark
  }
});

export default withStyles(styles)(CreateComment);
