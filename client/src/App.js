import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import {Container} from '@material-ui/core';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {CssBaseline} from "@material-ui/core";

import { Dggers } from './components/Dggers/Dggers'
import dankG from './images/dankG.png';
import {Search, SearchIconWrapper, StyledInputBase} from './styles';

const App = () => {
    const [username, setUsername] = useState('');
    const [emote, setEmotes] = useState([]);
    const [uses, setUses] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers()
    }, []);

    /*     
    TODO
    
    - should only post entire new user if user isn't in table, update requests to API later on to 
    get, post for new uesr, and post for existing user.
    - deletion
    - editing of current emote info for existing users
    - write better JS
        - maybe even move to TS once v01 is done
    - move ORL logs into another local DB
    - make frontend look nice
    - default to 0 users showing
    - default to only the serached user showing upon post request for user
    - move search bar into mat-ui app bar
    */

    const fetchUsers = async () => { 
        axios
            .get('http://localhost:3000/dggers')
            .then(res => {
                let resEmotes = [];
                let resUses = [];

                res.data.map(row => {
                    resEmotes.push(row.emote);
                    resUses.push(row.uses);
                })

                setEmotes(resEmotes);
                setUses(resUses);
                setUsers(res.data);
                setLoading(false);
            })
            .catch(error => console.error(`Error while getting dgger list: ${error}`))
    }

    const handleUserSubmit = () => {
        if (username.length > 0) {
            handleUserCreate();
            console.info(`Fetching emote usage for ${username}.`);
        }
    }

    const handleUserCreate = () => {
        axios
            .post('http://localhost:3000/dggers', {
                username: username
            })
            .then(res => {
                console.log(`handleUserCreate response data: ${res.data}`);
                fetchUsers();
            })
            .catch(error => console.error(`Error while creating the user ${username}`))
    }

    return (
            <Container maxidth="lg">
                <CssBaseline>
                    <Box >
                      <AppBar position="fixed">
                        <Toolbar>
                            <img src={dankG} height='55' />
                          <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                          >
                           EmoteZ 
                          </Typography>
                            <Search>
                              <StyledInputBase
                                placeholder="Username"
                                inputProps={{ 'aria-label': 'search' }}
                                type='text'
                                id='username'
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.currentTarget.value)}
                              />
                              <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="search"
                                onClick={handleUserSubmit}
                              >
                                <SearchIconWrapper>
                                  <SearchIcon />
                                </SearchIconWrapper>
                              </IconButton>
                            </Search>
                        </Toolbar>
                      </AppBar>
                    </Box>
                    <Toolbar />
                </CssBaseline>
                <div className="user-list-wrapper">
                {/* form  */}
                {/* <div className="user-list-form">
                    <div className="form-wrapper" onSubmit={handleUserSubmit}>
                      <div className="form-row">
                        <fieldset>
                          <label className="form-label" htmlFor="username">Username</label>
                          <input className="form-input" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
                        </fieldset>
                      </div>
                    </div>
                    <button onClick={handleUserSubmit} className="btn btn-add">Search</button>
                  </div> */}

                  <Dggers users={users} loading={loading} />
                </div>
            </Container>
    );
}

export default App;