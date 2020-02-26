import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { ArrowRight, Account, AccountGroup } from 'mdi-material-ui';
import styled from 'styled-components';

import { handleLoading, handleSnackbar } from '../../actions/app';

function UsersList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(handleLoading(true));
      try {
        const { data } = await axios.get('http://localhost:5000/api/users');
        setUsers(data.users);
      } catch (error) {
        console.log(error);
        const { data } = error.response;
        dispatch(handleSnackbar(true, 'error', data.message));
      } finally {
        dispatch(handleLoading(false));
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container mt-5'>
      <Container>
        <div className='title'>
          <span>
            <AccountGroup />
          </span>
          <Typography variant='h5'>Users</Typography>
        </div>
        <List dense>
          {users &&
            users.map((user, i) => {
              return (
                <Link to={'/users/' + user._id} key={i}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar>
                        <Account />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        user.username[0].toUpperCase() + user.username.slice(1)
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <ArrowRight />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </Link>
              );
            })}
        </List>
      </Container>
    </div>
  );
}

const Container = styled.div`
  box-shadow: 0 0 8px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  border-radius: 12px;
  padding: 2em 1.8em;
  max-width: 620px;
  margin: 0 auto;

  h5 {
    margin: 0 0 12px 0;
    text-align: center;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: baseline;

    span {
      margin-right: 1em;
      svg {
        padding-top: 2px;
        fill: darkgray;
      }
    }
  }
`;

export default UsersList;
