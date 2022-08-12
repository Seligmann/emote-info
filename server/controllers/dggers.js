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
            console.log("Month was not between January-December");
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
  username = username.toLowerCase();

  for (let i = 0; i < allMonthsYears.length; i++) {
    try {
      const month = allMonthsYears[i].split(" ")[0].trim();
      const year = allMonthsYears[i].split(" ")[1].trim();

      console.log(
        `https://overrustlelogs.net/api/v1/Destinygg/${month} ${year}/users.json`
      ); // NOTE months and years are parsed in descending order

      const response = await axios.get(
        `https://overrustlelogs.net/api/v1/Destinygg/${month} ${year}/users.json`
      );

      // Check if the desired user was active in specific month and year
      response.data.forEach((tmp) => {
        const activeUsername = tmp.substring(0, tmp.length - 4).toLowerCase();

        if (username === activeUsername.trim()) {
          userMonthYearUrls.push(
            `https://overrustlelogs.net/Destinygg%20chatlog/${month} ${year}/userlogs/${username}.txt`
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userMonthYearUrls;
}

async function userEmoteUsage(username) {
  console.log("Getting emote usage");
  let updates = {};
  let emotes = [];
  let emoteImages = new Map();
  username = username.toLowerCase();

  // Get current list of active emotes on dgg
  const response = await axios.get("https://cdn.destiny.gg/emotes/emotes.json");
  let asdf = 0;
  response.data.map((emoteInfo) => {
    emotes.push(emoteInfo.prefix);
    emoteImages.set(emoteInfo.prefix, emoteInfo.image[0].url);
  });

  // Get emote usage
  const db = new Database("dggers.db", {verbose: console.log});
  const messagesFromUser = db.prepare("SELECT message FROM logs WHERE username=(?)").all(username);

  messagesFromUser.forEach((tmp) => {
    const message = tmp["message"].split(/[, ]+/);
    emotes.forEach((emote) => { // FIXME this can be made faster w/ a map
      for (const word of message) {
        if (word === emote) {
          updates[emote] = isNaN(updates[emote]) ? 1 : updates[emote] + 1;
          break;
        }
      }
    })
  });

  // Update db w/ emote uses
  for (let emote in updates) {
    const stmt = db.prepare("INSERT INTO emote_info VALUES (?, ?, ?, ?)");
    stmt.run(username, emote, updates[emote], emoteImages.get(emote));
  }
}


// Controllers
export const updateLogs = async (req, res) => {
  try {
    let date = new Date(req.body.timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // months are 0-indexed
    let day = date.getDate() - 1; // logs in ORL are stored the day after

    console.log(`Yesterday's date: ${year}-${month}-${day}`);

    /*
    FIXME given that fetching logs is done from most recent to oldest, double check that the logic of updating 
    any misssed logs is correct
    */

    if (day === 0) {
      if (month === 1) {
        year -= 1;
      }

      month -= 1;
      day = [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;
    }

    // find date of most recent log in db
    const db = new Database("dggers.db", { verbose: console.log });
    const recentYear = db.prepare("SELECT MAX(year) FROM logs").get()["MAX(year)"];
    const recentMonth = db
      .prepare("SELECT MAX(month) FROM logs WHERE year=(?)")
      .get(recentYear)["MAX(month)"];
    const recentDay = db
      .prepare("SELECT MAX(day) FROM logs WHERE year=(?) AND month=(?)")
      .get(recentYear, recentMonth)["MAX(day)"];

    console.log(`Most recent log date: ${recentYear}-${recentMonth}-${recentDay}`);

    // Add messages to db
    while (
      !(year === recentYear && month === recentMonth && day === recentDay)
    ) {
      // NOTE: day and month may need 0 padding before val (e.g. month: 5 and/or day: 2 -> month: 05 and/or day: 02)
      let monthCheck;
      switch (month) {
        case 1:
          monthCheck = "January";
          break;
        case 2:
          monthCheck = "February";
          break;
        case 3:
          monthCheck = "March";
          break;
        case 4:
          monthCheck = "April";
          break;
        case 5:
          monthCheck = "May";
          break;
        case 6:
          monthCheck = "June";
          break;
        case 7:
          monthCheck = "July";
          break;
        case 8:
          monthCheck = "August";
          break;
        case 9:
          monthCheck = "September";
          break;
        case 10:
          monthCheck = "October";
          break;
        case 11:
          monthCheck = "November";
          break;
        case 12:
          monthCheck = "December";
          break;
        
        default:
          console.log("Month was not between 1-12");
          break;
      }

      let response;
      if (parseInt(day / 10) > 0) {
        console.log(parseInt(day / 10));
        if (parseInt(month / 10) > 0) {
          response = await axios.get(
            `https://overrustlelogs.net/Destinygg%20chatlog/${monthCheck} ${year}/${year}-${month}-${day}.txt`
          );
        }
        response = await axios.get(
          `https://overrustlelogs.net/Destinygg%20chatlog/${monthCheck} ${year}/${year}-0${month}-${day}.txt`
        );
      } else if (parseInt(month / 10) > 0) {
        response = await axios.get(
          `https://overrustlelogs.net/Destinygg%20chatlog/${monthCheck} ${year}/${year}-${month}-0${day}.txt`
        );
      } else {
        response = await axios.get(
          `https://overrustlelogs.net/Destinygg%20chatlog/${monthCheck} ${year}/${year}-0${month}-0${day}.txt`
        );
      }

      const messages = response.data.split(/\n/);
      messages.forEach((message) => {
        const start = message.indexOf(']') + 2;
        const tmp = message.substring(start);
        const end = tmp.indexOf(' ');
        const username = tmp.substring(0, end).toLowerCase();
        console.log(`username found during filling out logs: ${username}`);
        const stmt = db.prepare("INSERT INTO logs VALUES (?, ?, ?, ?, ?)");
        stmt.run(year, month, day, username, message);
      });

      // change year, month, and day before checking if another day is missing from current logs 
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
      console.log(`Next date: ${year}-${month}-${day}`);
    }
    return res.status(200).json({message: res.message});
  } catch (error) {
    return res.status(404).json({message: error.message});
  }
};

export const removeUser = async (req, res) => {
  try {
    let username = req.query.username.toLowerCase();
    console.log(`Deleting user ${username}`);
    const db = new Database("dggers.db", { verbose: console.log });
    const userInfo = db
      .prepare("DELETE FROM emote_info WHERE username= (?)")
      .run(username);
    return res.status(200).json(userInfo);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

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
    let username = req.query.username.toLowerCase();
    const db = new Database("dggers.db", { verbose: console.log });
    const userEmoteInfo = db
      .prepare("SELECT * FROM emote_info WHERE username= (?) ORDER BY uses DESC")
      .all(username);
    return res.status(200).json(userEmoteInfo);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createDgger = async (req, res) => { 
  const username = req.body.username.toLowerCase();
  const db = new Database("dggers.db", {verbose: console.log});
  const emoteUsage = await userEmoteUsage(username);
  return res.status(200).json(emoteUsage);
};

export const fillLogs = async (req, res) => {
  const db = new Database("dggers.db", {verbose: console.log});
  db.prepare("DROP TABLE logs").run();

  try {
    const monthsYears = await allMonthsYears();
    const txtUrls = await allTextUrls(monthsYears);

    db.prepare("CREATE TABLE IF NOT EXISTS logs('year' INT, 'month' INT, 'day' INT, 'username' varchar, 'message' varchar)").run();

    // put logs in db
    for (let i = 0; i < txtUrls.length; i++) {
      const response = await axios.get(txtUrls[i]);
      const messages = response.data.split(/\n/);

      console.log(`Getting logs at ${txtUrls[i]}`);
      messages.forEach((message) => {
        const year = message.substring(1, 5);
        const month = message.substring(6, 8);
        const day = message.substring(9, 11);

        const start = message.indexOf(']') + 2;
        const tmp = message.substring(start);
        const end = tmp.indexOf(' ');
        const username = tmp.substring(0, end - 1).toLowerCase();

        const stmt = db.prepare("INSERT INTO logs VALUES (?, ?, ?, ?, ?)");
        stmt.run(year, month, day, username, message); // FIXME might not want to store anything in the message except for the message itself
      });
    }

    return res.status(200).json({message: res.message});
  } catch (error) {
    console.log(error.message);
  }

}