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
import {Users} from "./Users";
import feelsOkayMan from "../images/feelsOkayMan.png";
import github from "../images/GitHub-Mark-Light-120px-plus.png";
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
    const [channel, setChannel] = useState("");
    const [loading, setLoading] = useState(null);
    const [users, setUsers] = useState({});
    const [searched, setSearched] = useState(null);
    const [userFound, setUserFound] = useState(null);

    // console.log(username, channel, loading, searched);

    return (
        <Container maxWidth={false} maxidth="lg">
            <Helmet>
                <style>{"body { background-color: #363636; color: #ffffff; }"}</style>
            </Helmet>
            <CssBaseline>
                <Grid container spacing={3}>
                    <Grid item style={classes.appbar} xs={12}>
                        <AppBar
                            style={{background: "#3f4042"}}
                            position={"fixed"}
                        >
                            <Toolbar >
                                <img
                                    src={feelsOkayMan}
                                    style={{height: 50, width: 50, marginRight: 7}}
                                    alt="feelsOkayMan"
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
                                    <img id="githubLogo" style={{height: 50, width: 50}} src={github} alt="github"/>
                                </a>
                            </Toolbar>
                        </AppBar>
                    </Grid>

                    <Grid container direction={"column"} rowSpacing={1} item xs={12} sm={12} md={3} lg={3}>
                        <Grid item>
                            <SearchForm users={users}
                                        setUsers={setUsers}
                                        username={username}
                                        setUsername={setUsername}
                                        channel={channel}
                                        setChannel={setChannel}
                                        loading={loading}
                                        setLoading={setLoading}
                                        searched={searched}
                                        setSearched={setSearched}
                                        userFound={userFound}
                                        setUserFound={setUserFound}/>
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
                            <Users
                                users={users}
                                username={username}
                                channel={channel}
                                searched={searched}
                                loading={loading}
                                userFound={userFound}
                            />
                        </div>
                    </Grid>
                </Grid>
            </CssBaseline>
        </Container>
    );
};

export default App;
