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

const CreateComment = ({ classes }) => {
  const { state } = useContext(Context);
  const { client } = useGraphql();
  const [comment, setComment] = useState('');

  const handleSubmit = async evt => {
    evt.preventDefault();
    const variables = { pinId: state.currentPin._id, text: comment };
    await client.request(CREATE_COMMENT_MUTATION, variables);
    setComment('');
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <IconButton
          className={classes.clearButton}
          disabled={!comment.trim()}
          onClick={() => setComment('')}
        >
          <ClearIcon />
        </IconButton>
        <InputBase
          className={classes.input}
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
    alignItems: 'center',
    padding: '1em 0.5em 0'
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
