import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { AccountEdit, Account } from 'mdi-material-ui';

import DeleteProfile from './DeleteProfile';
import { handleLoading, handleSnackbar } from '../../actions/app';
import axiosHeader from '../../services/api/axiosHeader';

function Profile() {
  const [user, setUser] = useState(null);
  const authUser = useSelector(state => state.auth.user);
  const { userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const config = axiosHeader();
  const url = `http://localhost:5000/api/users/${userId}`;

  useEffect(() => {
    const fetchUser = async url => {
      dispatch(handleLoading(true));
      try {
        const { data } = await axios.get(url, config);
        setUser(data.user);
      } catch (error) {
        const { data } = error.response;
        history.push('/auth/login');
        dispatch(handleSnackbar(true, 'error', data.message));
      } finally {
        dispatch(handleLoading(false));
      }
    };

    fetchUser(url);
    // eslint-disable-next-line
  }, [url]);

  return (
    <div className='container'>
      {user && (
        <ProfileContainer>
          <Typography variant='h4' className='mt-4 mb-2'>
            Profile: {`${user.firstname} ${user.lastname}`}
          </Typography>
          <Divider variant='inset' />
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Account />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.username} secondary={user.email} />
              {authUser && authUser._id === user._id && (
                <ListItemSecondaryAction>
                  <Link to={'edit/' + user._id}>
                    <Tooltip title='Update Profile'>
                      <IconButton>
                        <AccountEdit />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <DeleteProfile userId={user._id} authUser={authUser} />
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider variant='inset' />
            <ListItem>
              <ListItemText primary={user.about} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={'Joined: ' + new Date(user.createdAt).toDateString()}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={'Updated: ' + new Date(user.updatedAt).toDateString()}
              />
            </ListItem>
          </List>
        </ProfileContainer>
      )}
    </div>
  );
}

const ProfileContainer = styled.div`
  max-width: 720px;
  margin: 1em auto;
  padding: 2em 1.8em;
`;

export default Profile;
