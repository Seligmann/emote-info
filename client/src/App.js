import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Container,
    AppBar,
    Typography,
    Toolbar,
} from '@material-ui/core';

import { Dggers } from './components/Dggers/Dggers'
import burself from './images/burself.png';
import useStyles from './styles';
import {CssBaseline} from "@material-ui/core";

const App = () => {
    const classes = useStyles();

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
                    <AppBar className={classes.appBar} color="inherit" >
                        <Typography className={classes.heading} variant="h2" align="center">Emote Profiler</Typography>
                        <img className={classes.image} src={burself} alt="emotes" height="60"/>
                    </AppBar>
                    <Toolbar />
                </CssBaseline>
                <div className="user-list-wrapper">
                {/* form  */}
                <div className="user-list-form">
                    <div className="form-wrapper" onSubmit={handleUserSubmit}>
                      <div className="form-row">
                        <fieldset>
                          <label className="form-label" htmlFor="username">Username</label>
                          <input className="form-input" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
                        </fieldset>
                      </div>
                    </div>
                    <button onClick={handleUserSubmit} className="btn btn-add">Search</button>
                  </div>

                  <Dggers users={users} loading={loading} />
                </div>
            </Container>
    );
}

export default App;