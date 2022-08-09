import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";
import { Container } from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { CssBaseline } from "@material-ui/core";
import {Helmet} from "react-helmet";

import { Dggers } from "./components/Dggers/Dggers";
import dankG from "./images/dankG.png";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles";

const App = () => {
  const [username, setUsername] = useState("");
  const [emotes, setEmotes] = useState([]);
  const [uses, setUses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({});
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  /*     
    TODO
    - GET for single user
    -   if user isn't in table, POST for single user, then GET the single user, and display in UI

    - default to 0 users showing
    - default to only the serached user showing upon post request for user

    - make frontend look nice
    
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
    // setLoading(true);
    axios
      .get("http://localhost:8000/dggers")
      .then((res) => {
        let resEmotes = [];
        let resUses = [];

        res.data.map((row) => {
          resEmotes.push(row.emote);
          resUses.push(row.uses);
        });

        setEmotes(resEmotes);
        setUses(resUses);
        setUsers(res.data);
      })
      .catch((error) =>
        console.error(`Error while getting dgger list: ${error}`)
      );
  };

  const fetchUser = async () => {
    console.log(`fetchUser for ${username}`);

    axios
      .get(`http://localhost:8000/dggers/user?username=${username}`)
      .then((res) => {
        let resEmotes = [];
        let resUses = [];

        res.data.map((row) => {
          resEmotes.push(row.emote);
          resUses.push(row.uses);
        });

        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (username.length > 0) {
      console.log(`Submission successful for ${username}`);
      setSearched(true);
      handleUserCreate();
      fetchUser(); // FIXME when the response is received, they should be passed to the dgger component
    }
  };

  const handleUserCreate = () => {
    console.log(`Creating emote profile for ${username}`);
    axios
      .post(
        "http://localhost:8000/dggers", {username: username})
      .then((res) => {
        console.log(`Created emote profile for ${username}`);
      })
      .catch((error) =>
        console.error(`Error while creating the user ${username}`)
      );
  };

  return (
    <Container maxidth="lg">
		<Helmet>
			<style>{'body { background-color: #363636; color: #ffffff; }'}</style>
		</Helmet>
      <CssBaseline>
        <Box>
          <AppBar style={{ background: '#3f4042' }} position={"fixed"}>
            <Toolbar>
				<img src={dankG} height="55" style={{paddingRight: 10}} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                EmoteZ
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <form onSubmit={handleUserSubmit}>
                  <StyledInputBase
					style={{color: '#ffffff'}}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </form>
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <Toolbar />
      </CssBaseline>
      <div className="user-list-wrapper">
        <Dggers users={users} searched={searched} loading={loading} />
      </div>
    </Container>
  );
};

export default App;
