import DggerEmoteList from "../models/dggerEmoteList.js";
import axios from 'axios';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

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

async function getValidMonthsYears(dgger, username) {
    const url = "https://overrustlelogs.net/Destinygg%20chatlog";
    let validCombinations = [];
    let validMonthsInCombination = [];
    let validYearsInCombination = [];

    await axios(url).then((response) => {
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
                            validCombinations.push("https://overrustlelogs.net/Destinygg%20chatlog/"+validMonth+"%20"+validYear+"/userlogs/");
                            validMonthsInCombination.push(validMonth);
                            validYearsInCombination.push(validYear);
                            console.log("https://overrustlelogs.net/Destinygg%20chatlog/"+validMonth+"%20"+validYear+"/userlogs/");

                            return false;
                        }
                        return true;
                    });
                    return false;
                }
                return true;
            });
        }
        console.log(validCombinations.length, validMonthsInCombination.length, validYearsInCombination.length);

        return getTxtLogFiles(validCombinations, validMonthsInCombination, validYearsInCombination, username, dgger);
    })
        .catch(error => console.log(error.message));
}

async function getTxtLogFiles(validMonthsYearsUrls, validMonths, validYears, username, dgger) {
    console.log("Getting urls to text logs");
    let txtFiles = [];
    const baseUrl = "https://overrustlelogs.net/Destinygg%20chatlog";
    let monthYearIndex = 0;
    for (let i = 0; i < validMonthsYearsUrls.length; i++) {
        await axios(validMonthsYearsUrls[i]).then((bruh) => {
            const yo = cheerio.load(bruh.data);
            const usernames = yo('a');
        
            for (let j = 0; j < usernames.length; j++) {
                let usernameScraped = yo(usernames[j]).text();
                usernameScraped = usernameScraped.substring(0, usernameScraped.length - 7); // remove .txt from name
                if (usernameScraped.trim() == username.trim()) {
                    const txtUrl = baseUrl + "/" + validMonths[monthYearIndex] + "%20" + validYears[monthYearIndex] + "/userlogs/" + username + ".txt";
                    monthYearIndex += 1;
                    console.log(txtUrl);
                    txtFiles.push(txtUrl);
        
                    break;
                }
            }
        })
            .catch(error => console.log(error.message));
    }
    return getUserEmoteUsage(txtFiles, dgger);
}

async function getUserEmoteUsage(txtFileUrls, dgger) {
    console.log("Getting user emote usage");
    let updates = {};

    const texts = await Promise.all(txtFileUrls.map(async url => {
        const resp = await fetch(url);
        return resp.text();
    }));

            return new DggerEmoteList(dgger);
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
    let dgger = req.body;

    const newDgger = await getValidMonthsYears(dgger, 'Ze1ig');

    // const txtFileUrls = await getValidMonthsYears(dgger, 'Ze1ig');
    // const newDgger = await getUserEmoteUsage(txtFileUrls, dgger);

    // const newDgger = new DggerEmoteList(dgger);

    try {
        await newDgger.save();
        newDgger.save();
        return res.status(201).json(newDgger);
    } catch (error) {
        return res.status(409).json({message: error});
    }

}

