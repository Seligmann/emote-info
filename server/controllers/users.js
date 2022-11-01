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

/*
Gets all urls to a .txt file for every user, for every month and year combination.

monthsYears: data from a response that holds
*/
async function allTextUrls(monthsYears) {
    let txtUrls = [];
    const monthToNum = {
        "January": "01",
        "February": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12"
    }

    for (let i = 0; i < monthsYears.length; i++) {
        try {
            let month = monthsYears[i].split(" ")[0].trim();
            const year = monthsYears[i].split(" ")[1].trim();
            const days = await axios.get(`https://overrustlelogs.net/api/v1/Destinygg/${month} ${year}/days.json`); // [broadcasters.txt, subscribers.txt, 2022-08-02.txt, ...]

            days.data.forEach((day) => {
                let monthCheck = monthToNum[month];

                if (day.substring(0, 4).includes(year) && day.substring(5, 7).includes(monthCheck)) { // day = 2022-12-31
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

async function userEmoteUsage(username, channel) {
    let updates = {};
    let emotes = [];
    let emoteImages = new Map();

    // Get current list of active emotes on dgg
    const response = await axios.get("https://cdn.destiny.gg/emotes/emotes.json");
    response.data.map((emoteInfo) => {
        emotes.push(emoteInfo.prefix);
        emoteImages.set(emoteInfo.prefix, emoteInfo.image[0].url);
    });

    // Get emote usage
    const db = new Database("logs.db", {verbose: console.log});
    let messagesFromUser;

    if (channel.toString() === "destiny")
        messagesFromUser = db.prepare("SELECT message FROM destiny WHERE username=(?)").all(username);
    else if (channel.toString() === "xqc")
        messagesFromUser = db.prepare("SELECT message FROM xqc WHERE username=(?)").all(username);

    // FIXME for some reason, the props finish as "ze1ig destiny true false false" ...
    // FIXME

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
        const stmt = db.prepare("INSERT INTO emote_info VALUES (?, ?, ?, ?)"); // FIXME don't use db.prepare more than needed
        stmt.run(username, emote, updates[emote], emoteImages.get(emote));
    }
}


// Controllers

// Updates local db of logs from Destiny's channel with overrustlelogs
export const updateLogs = async (req, res) => {
    try {
        let date = new Date(req.body.timestamp);
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
        const db = new Database("logs.db", {verbose: console.log});
        const recentYear = db.prepare("SELECT MAX(year) FROM destiny").get()["MAX(year)"];
        const recentMonth = db
            .prepare("SELECT MAX(month) FROM destiny WHERE year=(?)")
            .get(recentYear)["MAX(month)"];
        const recentDay = db
            .prepare("SELECT MAX(day) FROM destiny WHERE year=(?) AND month=(?)")
            .get(recentYear, recentMonth)["MAX(day)"];

        console.log(`Most recent log date: ${recentYear}-${recentMonth}-${recentDay}`);

        // Add messages to db
        while (
            !(year === recentYear && month === recentMonth && day === recentDay)
            ) {
            // NOTE: day and month may need 0 padding before val (e.g. month: 5 and/or day: 2 -> month: 05 and/or day: 02)
            let monthCheck;
            const numToMonth = {
                1: "January",
                2: "February",
                3: "March",
                4: "April",
                5: "May",
                6: "June",
                7: "July",
                8: "August",
                9: "September",
                10: "October",
                11: "November",
                12: "December"
            }

            monthCheck = numToMonth[month];

            let response;
            if (parseInt(day / 10) > 0) {
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
                const stmt = db.prepare("INSERT INTO destiny VALUES (?, ?, ?, ?, ?)"); // FIXME don't use db.prepare more than needed
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
        }
        return res.status(200).json({message: res.message});
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};

export const removeUser = async (req, res) => {
    try {
        let username = req.query.username.toLowerCase();
        const db = new Database("logs.db", {verbose: console.log});
        const userInfo = db
            .prepare("DELETE FROM emote_info WHERE username= (?)")
            .run(username);
        return res.status(200).json(userInfo);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};

export const getDgger = async (req, res) => {
    try {
        let username = req.query.username.toLowerCase();
        const db = new Database("logs.db", {verbose: console.log});
        const userEmoteInfo = db
            .prepare("SELECT * FROM emote_info WHERE username=(?) ORDER BY uses DESC")
            .all(username);
        return res.status(200).json(userEmoteInfo);
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
};

export const createDgger = async (req, res) => {
    const username = req.body.username.toLowerCase();
    const channel = req.body.channel.toLowerCase();
    const emoteUsage = await userEmoteUsage(username, channel);
    return res.status(200).json(emoteUsage);
};

/*
WARNING: Only for initialization of the "destiny" table. This will also drop the "destiny" table if there is a current one
in existence.

Initializes "destiny" table from start of ORL logging to current date (the table "destiny" holds entries of [year, month, day, username, message])
*/
export const fillLogs = async (req, res) => {
    const db = new Database("logs.db", {verbose: console.log});
    db.prepare("DROP TABLE destiny").run();
    db.prepare("CREATE TABLE IF NOT EXISTS destiny('year' INT, 'month' INT, 'day' INT, 'username' varchar, 'message' varchar)").run();

    try {
        const monthsYears = await allMonthsYears();
        const txtUrls = await allTextUrls(monthsYears);

        const insert = db.prepare("INSERT INTO destiny VALUES (?, ?, ?, ?, ?)");

        const insertMany = db.transaction((messages) => {
            messages.forEach((message) => {
                const year = message.substring(1, 5);
                const month = message.substring(6, 8);
                const day = message.substring(9, 11);

                const start = message.indexOf(']') + 2;
                const tmp = message.substring(start);
                const end = tmp.indexOf(' ');
                const username = tmp.substring(0, end - 1).toLowerCase();

                // const stmt = db.prepare("INSERT INTO logs VALUES (?, ?, ?, ?, ?)");
                insert.run(year, month, day, username, message); // FIXME might not want to store anything in the message except for the message itself
            });
        })

        for (let i = 0; i < txtUrls.length; i++) {
            console.log(txtUrls[i]);
            const response = await axios.get(txtUrls[i]);
            const messages = response.data.split(/\n/);

            insertMany(messages);
        }

        return res.status(200).json({message: res.message});
    } catch (error) {
        console.log(error.message);
    }
}
