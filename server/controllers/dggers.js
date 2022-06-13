import DggerEmoteList from "../models/dggerEmoteList.js";
import axios from 'axios';
import * as cheerio from 'cheerio';
import request from 'request';

class Month {
    static January = new Month("January");
    static February = new Month("February");
    static March = new Month("March");
    static April = new Month("April");
    static May = new Month("May");
    static June = new Month("June");
    static July = new Month("July");
    static August = new Month("August");
    static September = new Month("September");
    static October = new Month("October");
    static November = new Month("November");
    static December = new Month("December");

    constructor(name) {
        this.name = name;
    }
}

async function getDggerEmoteStats(username, dgger) {
    const url = "https://overrustlelogs.net/Destinygg%20chatlog";
    var updates = {};

    axios(url).then((response) => {
        const $ = cheerio.load(response.data);
        const monthsAndYears = $('a');

        // Check if each (month,year) scraped is valid, then scrape 
        for (let i = 0; i < monthsAndYears.length; i++ ) {
            let monthAndYear = $(monthsAndYears[i]).text();
            let validMonths = Object.keys(Month);
            let validYears = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
            validMonths.every(validMonth => {
                if (monthAndYear.includes(validMonth)) {
                    validYears.every(validYear => {
                        if (monthAndYear.includes(validYear)) {
                            // Check if user has logs for particular (month,year)
                            const allUserLogsUrl = "https://overrustlelogs.net/Destinygg%20chatlog/"+validMonth+"%20"+validYear+"/userlogs/";

                            axios(allUserLogsUrl).then((bruh) => {
                                const yo = cheerio.load(bruh.data);
                                const usernames = yo('a');

                                for (let j = 0; j < usernames.length; j++) {
                                    let usernameScraped = yo(usernames[j]).text();
                                    usernameScraped = usernameScraped.substring(0, usernameScraped.length - 7); // remove .txt from name
                                    if (usernameScraped.trim() == username.trim()) {
                                        const txtUrl = url + "/" + validMonth + "%20" + validYear + "/userlogs/" + username + ".txt";
                                        console.log(txtUrl);

                                        request(txtUrl, (error, response, html) => {
                                            const messages = html.split(/\r?\n/);
                                            for (let k = 0; k < messages.length; k++) {
                                                for (let emote in DggerEmoteList.schema.paths) {
                                                    if (messages[k].includes(emote)) {
                                                        updates[emote] += 1;
                                                    }
                                                }
                                            }

                                        });

                                        break;
                                    }
                                }
                            }).catch(error => console.log(error.message));
                            return false;
                        }
                        return true;
                    });
                    return false;
                }
                return true;
            });
        }
    }).catch(error => console.log(error.message));
}

export const getDggers = async (req, res) => {
    try {
        const dggerEmotes = await DggerEmoteList.find();
        return res.status(200).json(dggerEmotes);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const createDgger = async (req, res) => {
    var dgger = req.body;
    const newDgger = new DggerEmoteList(dgger)
    getDggerEmoteStats('Ze1ig', dgger);
    try {
        await newDgger.save();
        return res.status(201).json(newDgger);
    } catch (error) {
        return res.status(409).json({message: error.message()});
    }
}
