// import {updateDggerTable, getEmoteList} from "../models/dggerEmoteList.js";
import axios from "axios";
import Database from 'better-sqlite3';

async function allMonthsYears() {
  try {
    const response = await axios.get(
      "https://overrustlelogs.net/api/v1/Destinygg/months.json"
    );
    console.log(response.data[0]);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function userLogUrls(allMonthsYears, username) {
  let userMonthYearUrls = [];

  for (let i = 0; i < allMonthsYears.length; i++) {
    try {
      const month = allMonthsYears[i].split(" ")[0].trim();
      const year = allMonthsYears[i].split(" ")[1].trim();

      const response = await axios.get(
        "https://overrustlelogs.net/api/v1/Destinygg" +
          "/" +
          month +
          "%20" +
          year +
          "/users.json"
      );

      // Check if the desired user was active in specific month and year
      response.data.forEach((tmp) => {
        const activeUsername = tmp.substring(0, tmp.length - 4);
        if (username.toLowerCase() === activeUsername.trim().toLowerCase()) {
          userMonthYearUrls.push(
            "https://overrustlelogs.net/Destinygg%20chatlog" +
              "/" +
              month +
              "%20" +
              year +
              "/" +
              "userlogs" +
              "/" +
              username +
              ".txt"
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userMonthYearUrls;
}

async function userEmoteUsage(userMonthYearUrls, username) {
  console.log("Getting emote usage");
  let updates = {};
  let emotes = [];

  // Get current list of active emotes on dgg
  const response = await axios.get('https://cdn.destiny.gg/emotes/emotes.json');
  response.data.map(emoteInfo => {emotes.push(emoteInfo.prefix)});
   
  // Get emote usage
  for (let i = 0; i < userMonthYearUrls.length; i++) {
    try {
      const response = await axios.get(userMonthYearUrls[i]);
      const messages = response.data.split(/\n/);
      
      messages.forEach((tmp) => {
        console.log(tmp);
        const message = tmp.split(/[, ]+/);

        emotes.forEach(emote => {
          for (const word of message) {
            if (word === emote) {
              updates[emote] = isNaN(updates[emote]) ? 1 : updates[emote] + 1;
              break;
            }
          }
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  const db = new Database('dggers.db', {verbose:console.log});
  for (let emote in updates) {
    console.log(username, emote, updates[emote]);
    // const stmt = db.prepare(`INSERT INTO emote_info VALUES (${username}, ${emote}, ${updates[emote]})`);
    const stmt = db.prepare('INSERT INTO emote_info VALUES (?, ?, ?)');
    stmt.run(username, emote, updates[emote]);

    // dgger[key] = updates[key];
  }
  // return dgger;
}

// Controllers
export const getDggers = async (req, res) => {
  // try {
  //   const dggerEmotes = await DggerEmoteList.find();
  //   return res.status(200).json(dggerEmotes);
  // } catch (error) {
  //   return res.status(404).json({ message: error.message });
  // }
};

export const createDgger = async (req, res) => {
  // updateDggerTable(await getEmoteList(), db);

  // const dgger = req.body;

  // dgger.username = "Bing";
  const username = 'Bing';

  const monthsYearsAvailable = await allMonthsYears();
  const textUrls = await userLogUrls(monthsYearsAvailable, username);
  await userEmoteUsage(textUrls, username);

  const db = new Database('dggers.db', { verbose: console.log });
  console.log(db.prepare('SELECT * FROM emote_info').columns());
  // console.log(db.); // FIXME 

  // const newDgger = new DggerEmoteList(dgger);
  // try {
  //   await newDgger.save();
  //   return res.status(201).json(newDgger);
  // } catch (error) {
  //   return res.status(409).json({ message: error });
  // }
};
