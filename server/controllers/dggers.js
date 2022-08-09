import axios from "axios";
import Database from "better-sqlite3";

async function allMonthsYears() {
  try {
    const response = await axios.get(
      "https://overrustlelogs.net/api/v1/Destinygg/months.json"
    );
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

      const response = await axios.get(`https://overrustlelogs.net/api/v1/Destinygg/${month} ${year}/users.json`);

      // Check if the desired user was active in specific month and year
      response.data.forEach((tmp) => {
        const activeUsername = tmp.substring(0, tmp.length - 4);
        if (username.toLowerCase() === activeUsername.trim().toLowerCase()) {
          userMonthYearUrls.push(`https://overrustlelogs.net/Destinygg%20chatlog/${month} ${year}/userlogs/${username}.txt`);
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
  const response = await axios.get("https://cdn.destiny.gg/emotes/emotes.json");
  response.data.map((emoteInfo) => {
    emotes.push(emoteInfo.prefix);
  });

  // Get emote usage
  for (let i = 0; i < userMonthYearUrls.length; i++) {
    try {
      const response = await axios.get(userMonthYearUrls[i]);
      const messages = response.data.split(/\n/);

      messages.forEach((tmp) => {
        const message = tmp.split(/[, ]+/);

        emotes.forEach((emote) => {
          for (const word of message) {
            if (word === emote) {
              updates[emote] = isNaN(updates[emote]) ? 1 : updates[emote] + 1;
              break;
            }
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Update db
  const db = new Database("dggers.db", { verbose: console.log });
  for (let emote in updates) {
    const stmt = db.prepare("INSERT INTO emote_info VALUES (?, ?, ?)");
    stmt.run(username, emote, updates[emote]);
  }
}

// Controllers
export const updateLogs = async (req, res) => {
  try {
    let date = req.query.date; // NOTE there might be an issue with conditionals regarding dates being compared if one thing is an int
    // one thing is all lowercase, one thing has one capital letter starting it off, etc... (i dont think this is
    // the case but if something goes terribly wrong.. check)
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // months are 0-indexed
    let day = date.getDate() - 1; // logs in ORL are stored the day after
    if (day === 0) {
      if (month === 1) {
        year -= 1;
      }

      month -= 1;
      day = [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
    }

    const db = new Database("logs.db", { verbose: console.log });
    const recentYear = db.prepare("SELECT MAX(year) FROM logs").run();
    const recentMonth = db
      .prepare("SELECT MAX(month) FROM logs WHERE year=(?)")
      .run(recentYear);
    const recentDay = db
      .prepare("SELECT MAX(day) FROM logs WHERE year=(?) AND month=(?)")
      .run(recentYear, recentMonth);

    // is it even possible to hardcode this any more for dgg ... -_-
    // This is only useful if logs from twitch also have the date for each message (which I would think they would...)
    while (
      !(year === recentYear && month === recentMonth && day === recentDay)
    ) {

      // add messages to db
      const response = await axios.get(
        `https://overrustlelogs.net/Destinygg%20chatlog/${month} ${year}/${day}.txt`
      );

      const messages = response.data.split(/\n/);
      messages.forEach((message) => {
        // const message = tmp.split(/[, ]+/);

        // TODO: insert each chat message into db // db.prepare("INSERT INTO logs VALUES (?, ?, ")
      });

      // change year, month, day
      if (day === 1) {
        month -= 1;

        if (month === 0) {
          year -= 1;

          if (year === 2012) {
            break;
          }

          month = 12;
        }

        day = [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
      }
    }
  } catch (error) {
    console.log(`error while updating logs database: ${error}`);
  }
};

export const removeUser = async (req, res) => {
	try {
		let username = req.query.username;
		const db = new Database("dggers.db", {verbose: console.log});
		const userInfo = db.prepare("DELETE FROM emote_info WHERE username= (?)").all(username);
		return res.status(200).json(userInfo);
	} catch (error) {
		return res.status(404).json({message: error.message});
	}
}

export const getDggers = async (req, res) => {
  try {
    const db = new Database("dggers.db", { verbose: console.log });
    const dggerEmotes = db.prepare("SELECT * FROM emote_info").all();
    return res.status(200).json(dggerEmotes);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getDgger = async (req, res) => {
  try {
    let username = req.query.username;
    const db = new Database("dggers.db", { verbose: console.log });
    const userEmoteInfo = db
      .prepare("SELECT * FROM emote_info WHERE username= (?)")
      .all(username);
    return res.status(200).json(userEmoteInfo);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createDgger = async (req, res) => {
  const username = req.body.username;

  const monthsYearsAvailable = await allMonthsYears();
  const textUrls = await userLogUrls(monthsYearsAvailable, username);
  const emoteUsage = await userEmoteUsage(textUrls, username);
  return res.status(200).json(emoteUsage);
};
