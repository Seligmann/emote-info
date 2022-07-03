import React, { useEffect } from 'react';
import {
    Container,
    AppBar,
    Typography,
    Grow,
    Grid,
    Divider,
    Box,
    createTheme,
    ThemeProvider,
    Toolbar,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getDggers } from './actions/dggers';
import Dggers from "./components/Dggers/Dggers";
import Form from "./components/Form/Form";
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
    FIXME should only post entire new user if user isn't in table, update requests to API later on to 
    get, post for new uesr, and post for existing user.
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
        if (username.length > 0 && emotes.length > 0 && uses.length > 0) {
            handleUserCreate();
            console.info(`User ${username} with the emotes ${emotes} and ${uses} respectively added.`);
        }
        else if (username.length == undefined || username.length == 0 || username.length == null) {
            console.log('Invalid username entered.');
        } else {
            console.log(`Found no emote usage for ${username}.`);
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
                        <Typography className={classes.heading} variant="h2" align="center">frfr ong</Typography>
                        <img className={classes.image} src={burself} alt="emotes" height="60"/>
                    </AppBar>
                    <Toolbar />
                </CssBaseline>
                <Grow in>
                    <Container>
                        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Dggers />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Form />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
    );
}

export default App;