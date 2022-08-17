
/*     
TODO

Needed
------
- rewrite to get user emote stats from DB
- add emote images
- sort lists in descending order
- don't GET user info until it's been checked if the user needs to be UPDATEd or POSTed
- add list for the users top emotes for the current month

- move ORL logs into another local DB
- this codebase is terrible to read even though i'm the one who wrote it... fix this ... 
*/

/*
FIXME
- Users (sometimes?...) can't be re-searched in the same session *thinking* . Make sure that if there are props that exist and there are new props coming in, that the previous props have 
  been deleted so that the component knows that it's been changed even if its searching a user that was previously searched in the same session.
- As a username is being typed in, there is background processing that is slowing stuff down. Check how often props are being updated (see how to only process props on submit. I
  think they're being updated on change...)
- some indentation is 2 spaces, some is 4 spaces, i love switching to vim :)
*/
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
import { Helmet } from "react-helmet";

import { Dggers } from "./components/Dggers/Dggers";
import dankG from "./images/dankG.png";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles";

// const timestamp = new Date().getTime();
// console.log(timestamp);

// axios.post("https://www.zelig.dev/dggers", {timestamp: timestamp})
//   .then(() => {
//     console.log("Updated logs successfully");
//   })
//   .catch((error) => {
//     console.log(`Error updating logs: ${error}`);
//   });

const App = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState({});
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUsers = async () => {
    axios
      .get("https://www.zelig.dev/dggers")
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
    console.log(`fetchUser for ${username}`);

    axios
      .get(`https://www.zelig.dev/dggers/user?username=${username}`)
      .then((res) => {

        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // FIXME right now we're deleting emote_info for user and replacing it with new info... is it a better idea to use UPDATE to just update the user instead?
  // Note that it isn't promised that the user used a NEW emote from last time. They may have just used the same emotes more. 
  const handleUserSubmit = async (e) => { 
    e.preventDefault();
    if (username.length > 0) {
      console.log(`Submission successful for ${username}`);

			if (searched && users?.length > 0) {
				setUsers({});
			}

      setSearched(true);
			setLoading(true);
      await handleUserDelete();
      await handleUserCreate();
      fetchUser();
			setLoading(false);
    }
  };

  const handleUserDelete = async () => {
    console.log(`Deleting user ${username}`);
    await axios.delete(`https://www.zelig.dev/dggers/user?username=${username}`)
      .then((res) => console.log(`Deleted user ${username}`))
      .catch((error) => console.error(error.message));
  }

  const handleUserCreate = async () => {
    console.log(`Creating emote profile for ${username}`);
    await axios
      .post("https://www.zelig.dev/dggers/user", { username: username })
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
        <style>{"body { background-color: #363636; color: #ffffff; }"}</style>
      </Helmet>
      <CssBaseline>
        <Box> 
          <AppBar style={{ background: "#3f4042"}} position={"fixed"}>
            <Toolbar>
              <img id="logo" src={dankG} style={{ paddingRight: 10 }} alt=""/>
              <Typography
                variant="h6"
                component="div"
              >
                EmoteZ
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <form onSubmit={handleUserSubmit}>
                  <StyledInputBase
                    style={{ color: "#ffffff" }}
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
