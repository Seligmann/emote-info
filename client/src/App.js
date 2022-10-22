import axios from "axios";
import {useEffect, useState} from "react";
import * as React from "react";
import {Container} from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {CssBaseline} from "@material-ui/core";
import {Helmet} from "react-helmet";
import dotenv from "dotenv";
import {Dggers} from "./components/Dggers/Dggers";
import dankG from "./images/dankG.png";
import github from "./images/GitHub-Mark-Light-120px-plus.png";
import {SearchForm} from "./form";

dotenv.config();

const classes = {
    root: {
        flexGrow: 1,
        display: "flex",
    },
    appbar: {
        marginBottom: "50px",
    },
    info: {
        backgroundColor: "#3f4042",
        color: "white",
    },
    note: {
        backgroundColor: "#732f2f"
    },
    emoteList: {
        paddingTop: "17px",
        textAlign: "center",
        backgroundColor: "#363636",
        maxWidth: "100%",
    },
};

const App = () => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState({});
    const [searched, setSearched] = useState(false);
    const [userFound, setUserFound] = useState(null);

    useEffect(() => {
        if (searched) fetchUser();
    }, []);

    const PORT = process.env.REACT_APP_PORT;
    const HOST = process.env.REACT_APP_HOST;
    let URL;
    if (HOST === "localhost") {
        URL = `http://${HOST}:${PORT}`;
    } else {
        URL = `https://${HOST}`;
    }

    const fetchUsers = async () => {
        axios
            .get(`${URL}/dggers`)
            .then((res) => {
                let resEmotes = [];
                let resUses = [];

                res.data.map((row) => {
                    resEmotes.push(row.emote);
                    resUses.push(row.uses);
                });

                setUsers(res.data);
            })
            .catch((error) =>
                console.error(`Error while getting dgger list: ${error}`)
            );
    };

    const fetchUser = async () => {
        await axios
            .get(`${URL}/dggers/user?username=${username}`)
            .then((res) => {
                setUsers(res.data);
                res.data.length > 0 && !loading
                    ? setUserFound(true)
                    : setUserFound(false);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // FIXME right now we're deleting emote_info for user and replacing it with new info... is it a better idea to use UPDATE to just update the user instead?
    // Note that it isn't promised that the user used a NEW emote from last time. They may have just used the same emotes more.
    const handleUserSubmit = async (e) => {
        e.preventDefault();
        setUserFound(null);
        setUsers({});
        if (username.length > 0) {
            setSearched(true);
            setLoading(true);
            await handleUserDelete();
            await handleUserCreate();
            fetchUser();
        }
    };

    const handleUserDelete = async () => {
        await axios
            .delete(`${URL}/dggers/user?username=${username}`)
            .catch((error) => console.error(error.message));
    };

    const handleUserCreate = async () => {
        await axios
            .post(`${URL}/dggers/user`, {username: username})
            .then((res) => {
            })
            .catch((error) =>
                console.error(`Error while creating the user ${username}`)
            );
    };

    return (
        <Container maxWidth={false} maxidth="lg">
            <Helmet>
                <style>{"body { background-color: #363636; color: #ffffff; }"}</style>
            </Helmet>
            <CssBaseline>
                <div style={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item style={classes.appbar} xs={12}>
                            <Box>
                                <AppBar
                                    style={{height: 60, background: "#3f4042"}}
                                    position={"fixed"}
                                >
                                    <Toolbar>
                                        <img
                                            id="logo"
                                            src={dankG}
                                            style={{paddingRight: 10}}
                                            alt=""
                                        />
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{display: {xs: "none", sm: "block"}}}
                                        >
                                            EmoteInfo
                                        </Typography>
                                        <a
                                            title="Github"
                                            style={{
                                                paddingLeft: 15,
                                                marginLeft: "auto",
                                                marginTop: 5,
                                            }}
                                            href="https://github.com/Seligmann/emote-info"
                                        >
                                            {" "}
                                            <img id="githubLogo" src={github} alt=""/>
                                        </a>
                                    </Toolbar>
                                </AppBar>
                            </Box>
                        </Grid>

                        <Grid container direction={"column"} rowSpacing={1} item xs={12} sm={12} md={3} lg={3}>
                            <Grid item>
                                <SearchForm/>
                            </Grid>
                            <Grid item>
                                <div style={classes.note} id="info">
                                    <h4 id="infoTitle">Note</h4>
                                    <p id="infoParagraph">
                                        A domain that EmoteInfo is dependent on for logs from{" "}
                                        <a id="link" href="https://www.destiny.gg/">
                                            destiny.gg
                                        </a>
                                        {" "}is unavailable for an unknown reason, so current emote usage
                                        counts will remain unchanged indefinitely in regards to this channel.
                                    </p>
                                </div>
                            </Grid>
                            <Grid item>
                                <div style={classes.info} id="info">
                                    <h4 id="infoTitle">About</h4>
                                    <p id="infoParagraph">
                                        EmoteInfo allows anyone to see user-level emote usage for
                                        all users on{" "}
                                        <a id="link" href="htt  ps://www.destiny.gg/">
                                            destiny.gg
                                        </a>
                                        . This site will support{" "}
                                        <a id="link" href="https://www.twitch.tv/xqc">
                                            twitch.tv/xqc
                                        </a>{" "}
                                        in the future, and possibly more channels. Simply search for a
                                        username (e.g. <code style={{backgroundColor: "black"}}>ze1ig</code>, <code
                                        style={{backgroundColor: "black"}}>cake</code>) to get started.
                                    </p>
                                </div>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={9} lg={9}>
                            <div style={classes.emoteList} id="user-list-wrapper">
                                <Dggers
                                    users={users}
                                    searched={searched}
                                    loading={loading}
                                    userFound={userFound}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </CssBaseline>
        </Container>
    );
};

export default App;
