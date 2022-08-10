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

async function allTextUrls(monthsYears) {
  let txtUrls = [];

  for (let i = 0; i < monthsYears.length; i++) {
    try {
      let month = monthsYears[i].split(" ")[0].trim();
      const year = monthsYears[i].split(" ")[1].trim();

      const days = await axios.get(`https://overrustlelogs.net/api/v1/Destinygg/${month} ${year}/days.json`); // [broadcasters.txt, subscribers.txt, 2022-08-02.txt, ...]


      days.data.forEach((day) => {
        let monthCheck;
        switch (month) {
          case "January":
            monthCheck = "01";
            break;
          case "February":
            monthCheck = "02";
            break;
          case "March":
            monthCheck = "03";
            break;
          case "April":
            monthCheck = "04";
            break;
          case "May":
            monthCheck = "05";
            break;
          case "June":
            monthCheck = "06";
            break;
          case "July":
            monthCheck = "07";
            break;
          case "August":
            monthCheck = "08";
            break;
          case "September":
            monthCheck = "09";
            break;
          case "October":
            monthCheck = "10";
            break;
          case "November":
            monthCheck = "11";
            break;
          case "December":
            monthCheck = "12";
            break;
        
          default:
            break;
        }
        if (day.substring(0, 5).includes(year) && day.substring(8).includes(monthCheck)) { // day = 2022-12-31
          txtUrls.push(`https://overrustlelogs.net/Destinygg%20chatlog/${month} ${year}/${day}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return txtUrls;
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

export const fillLogs = async (req, res) => {
  try {
    const monthsYears = await allMonthsYears();
    const txtUrls = await allTextUrls(monthsYears);
  
    const db = new Database("dggers.db", {verbose: console.log});
    const createTable = db.prepare("CREATE TABLE IF NOT EXISTS logs('year' INT, 'month' INT, 'day' INT, 'username' varchar, 'message' varchar)").run();

    // put logs in db
    for (let i = 0; i < txtUrls.length; i++) {
      console.log(txtUrls[i]);
      const response = await axios.get(txtUrls[i]);
      const messages = response.data.split(/\n/);
      console.log(messages);

      messages.forEach((message) => {
        // FIXME this might be too rough of a filter for usernames
        const year = message.substring(1, 5);
        const month = message.substring(6, 8);
        const day = message.substring(9, 11);

        const start = message.indexOf(']') + 2;
        const tmp = message.substring(start);
        const end = tmp.indexOf(' ');
        const username = tmp.substring(0, end);

        console.log(`year ${year}, month ${month}, day ${day}, username ${username}, message ${message}`);
        const stmt = db.prepare("INSERT INTO logs VALUES (?, ?, ?, ?, ?)");
        stmt.run(year, month, day, username, message); // FIXME might not want to store anything in the message except for the message itself
      });
    }

    return res.status(200).json({message: res.message});
  } catch (error) {
    console.log(error.message);
  }

}

// Controllers
export const updateLogs = async (req, res) => {
  try {
    let date = req.query.date; // NOTE there might be an issue with conditionals regarding dates being compared if one thing is an int
    // one thing is all lowercase, one thing has one capital letter starting it off, etc... (i dont think this is
    // the case but if something goes terribly wrong.. check)
    // let timestamp = req.body.timestamp;
    console.log(req.body.timestamp);
    let date = new Date(req.body.timestamp);
    console.log(`date: ${date}`);
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

    // find date of most recent log in db
    const db = new Database("dggers.db", { verbose: console.log });
    const createTable = db.prepare("CREATE TABLE IF NOT EXISTS logs('year' INT, 'month' INT, 'day' INT, 'username' varchar, 'message' varchar)").run();
    const recentYear = db.prepare("SELECT MAX(year) AS recentYear FROM logs").run();
    const recentMonth = db
      .prepare("SELECT MAX(month) AS recentMonth FROM logs WHERE year=(?)")
      .run(recentYear);
    const recentDay = db
      .prepare("SELECT MAX(day) AS recentDay FROM logs WHERE year=(?) AND month=(?)")
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

        // FIXME this might be too rough of a filter for usernames
        const start = message.indexOf(']') + 2;
        const tmp = message.substring(start);
        const end = tmp.indexOf(' ');
        const username = tmp.substring(0, end);
        console.log(`username found during filling out logs: ${username}`);
        const stmt = db.prepare("INSERT INTO logs VALUES (?, ?, ?, ?, ?");
        stmt.run(year, month, day, username, message); // FIXME might not want to store anything in the message except for the message itself
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
    return res.status(404).json({message: error.message});
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
