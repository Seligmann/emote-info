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
    return getUserEmoteUsage(txtFiles, dgger, username);
}

async function getUserEmoteUsage(txtFileUrls, dgger) {
    let updates = {};

    console.log("Fetching logs");
    const texts = await Promise.all(txtFileUrls.map(async url => {
        const resp = await fetch(url);
        return resp.text();
    }));

    console.log("Parsing logs");
    texts.forEach(text => {
        const messages = text.split(/\r?\n/);
        for (let i in messages) {
            if (!messages[i].includes(dgger.username)) { continue }

            for (let emote in DggerEmoteList.schema.paths) {
                if (messages[i].includes(String(emote))) {
                    updates[emote] = (isNaN(updates[emote])) ? 1 : updates[emote] + 1;
                }
            }
        }
    })

    dgger.Abathur = updates['Abathur'];
    dgger.AMAZIN = updates['AMAZIN'];
    dgger.AngelThump = updates['AngelThump'];
    dgger.ApeHands = updates['ApeHands'];
    dgger.Askers = updates['Askers'];
    dgger.ASLAN = updates['ASLAN'];
    dgger.ATAB = updates['ATAB'];
    dgger.AYAYA = updates['AYAYA'];
    dgger.AYYYLMAO = updates['AYYYLMAO'];
    dgger.BasedGod = updates['BasedGod'];
    dgger.BASEDWATM8 = updates['BASEDWATM8'];
    dgger.BERN = updates['BERN'];
    dgger.BibleThump = updates['BibleThump'];
    dgger.BINGQILIN = updates['BINGQILIN'];
    dgger.BLADE = updates['BLADE'];
    dgger.Blesstiny = updates['Blesstiny'];
    dgger.Blubstiny = updates['Blubstiny'];
    dgger.BOGGED = updates['BOGGED'];
    dgger.BOOMER = updates['BOOMER'];
    dgger.BoomerSippy = updates['BoomerSippy'];
    dgger.catJAM = updates['catJAM'];
    dgger.CheekerZ = updates['CheekerZ'];
    dgger.ChibiDesti = updates['ChibiDesti'];
    dgger.Clap = updates['Clap'];
    dgger.COGGERS = updates['COGGERS'];
    dgger.ComfyAYA = updates['ComfyAYA'];
    dgger.ComfyDan = updates['ComfyDan'];
    dgger.ComfyDog = updates['ComfyDog'];
    dgger.ComfyFerret = updates['ComfyFerret'];
    dgger.ComfyMel = updates['ComfyMel'];
    dgger.coMMMMfy = updates['coMMMMfy'];
    dgger.COOMER = updates['COOMER'];
    dgger.COOMfy = updates['COOMfy'];
    dgger.Copium = updates['Copium'];
    dgger.CROPSTINY = updates['CROPSTINY'];
    dgger.CuckCrab = updates['CuckCrab'];
    dgger.Cutestiny = updates['Cutestiny'];
    dgger.CUX = updates['CUX'];
    dgger.DaFeels = updates['DaFeels'];
    dgger.DAFUK = updates['DAFUK'];
    dgger.DANKMEMES = updates['DANKMEMES'];
    dgger.DappaKappa = updates['DappaKappa'];
    dgger.DatGeoff = updates['DatGeoff'];
    dgger.DCOLON = updates['DCOLON'];
    dgger.DEATH = updates['DEATH'];
    dgger.Depresstiny = updates['Depresstiny'];
    dgger.Derpstiny = updates['Derpstiny'];
    dgger.DestiSenpaii = updates['DestiSenpaii'];
    dgger.dggL = updates['dggL'];
    dgger.Disgustiny = updates['Disgustiny'];
    dgger.Dravewin = updates['Dravewin'];
    dgger.DuckerZ = updates['DuckerZ'];
    dgger.DURRSTIN = updates['DURRSTIN'];
    dgger.ECH = updates['ECH'];
    dgger.FeedNathan = updates['FeedNathan'];
    dgger.FeelsAmazingMan = updates['FeelsAmazingMan'];
    dgger.FeelsBadMan = updates['FeelsBadMan'];
    dgger.FeelsBirthdayMan = updates['FeelsBirthdayMan'];
    dgger.FeelsDankMan = updates['FeelsDankMan'];
    dgger.FeelsGimiMan = updates['FeelsGimiMan'];
    dgger.FeelsGoodMan = updates['FeelsGoodMan'];
    dgger.FeelsOkayMan = updates['FeelsOkayMan'];
    dgger.FeelsPeekMan = updates['FeelsPeekMan'];
    dgger.FeelsStrongMan = updates['FeelsStrongMan'];
    dgger.FeelsWeirdMan = updates['FeelsWeirdMan'];
    dgger.FerretLOL = updates['FerretLOL'];
    dgger.FiveHead = updates['FiveHead'];
    dgger.ForYou = updates['ForYou'];
    dgger.FourHead = updates['FourHead'];
    dgger.FrankerZ = updates['FrankerZ'];
    dgger.gachiGASM = updates['gachiGASM'];
    dgger.GameOfThrows = updates['GameOfThrows'];
    dgger.GIGACHAD = updates['GIGACHAD'];
    dgger.GODSTINY = updates['GODSTINY'];
    dgger.GRUG = updates['GRUG'];
    dgger.GRUGingOverIt = updates['GRUGingOverIt'];
    dgger.HACKERMAN = updates['HACKERMAN'];
    dgger.haHAA = updates['haHAA'];
    dgger.Heimerdonger = updates['Heimerdonger'];
    dgger.Hhhehhehe = updates['Hhhehhehe'];
    dgger.HmmStiny = updates['HmmStiny'];
    dgger.INFESTINY = updates['INFESTINY'];
    dgger.ITSRAWWW = updates['ITSRAWWW'];
    dgger.JAMSTINY = updates['JAMSTINY'];
    dgger.Kappa = updates['Kappa'];
    dgger.KappaRoss = updates['KappaRoss'];
    dgger.KING = updates['KING'];
    dgger.Klappa = updates['Klappa'];
    dgger.LeRuse = updates['LeRuse'];
    dgger.LIES = updates['LIES'];
    dgger.LOVE = updates['LOVE'];
    dgger.LUL = updates['LUL'];
    dgger.LULW = updates['LULW'];
    dgger.MALARKEY = updates['MALARKEY'];
    dgger.MASTERB8 = updates['MASTERB8'];
    dgger.melW = updates['melW'];
    dgger.Memegasm = updates['Memegasm'];
    dgger.Milkerino = updates['Milkerino'];
    dgger.miyanobird = updates['miyanobird'];
    dgger.MiyanoHype = updates['MiyanoHype'];
    dgger.MLADY = updates['MLADY'];
    dgger.MMMM = updates['MMMM'];
    dgger.monkaS = updates['monkaS'];
    dgger.monkaSMEGA = updates['monkaSMEGA'];
    dgger.monkaVirus = updates['monkaVirus'];
    dgger.MotherFuckinGame = updates['MotherFuckinGame'];
    dgger.Nappa = updates['Nappa'];
    dgger.nathanAYAYA = updates['nathanAYAYA'];
    dgger.nathanBlub = updates['nathanBlub'];
    dgger.nathanBogged = updates['nathanBogged'];
    dgger.nathanBoomer = updates['nathanBoomer'];
    dgger.nathanD = updates['nathanD'];
    dgger.nathanDank = updates['nathanDank'];
    dgger.nathanDerp = updates['nathanDerp'];
    dgger.nathanEZ = updates['nathanEZ'];
    dgger.nathanF = updates['nathanF'];
    dgger.nathanFeels = updates['nathanFeels'];
    dgger.nathanGG = updates['nathanGG'];
    dgger.nathanGod1 = updates['nathanGod1'];
    dgger.nathanGod2 = updates['nathanGod2'];
    dgger.nathanGod3 = updates['nathanGod3'];
    dgger.nathanGod4 = updates['nathanGod4'];
    dgger.nathanGodstiny = updates['nathanGodstiny'];
    dgger.nathanNotears = updates['nathanNotears'];
    dgger.nathanObject = updates['nathanObject'];
    dgger.nathanOOO = updates['nathanOOO'];
    dgger.nathanPrime = updates['nathanPrime'];
    dgger.nathanRuse = updates['nathanRuse'];
    dgger.nathanRustle = updates['nathanRustle'];
    dgger.nathanSenpai = updates['nathanSenpai'];
    dgger.nathanShroom = updates['nathanShroom'];
    dgger.nathanThinking = updates['nathanThinking'];
    dgger.nathanTiny1 = updates['nathanTiny1'];
    dgger.nathanTiny2 = updates['nathanTiny2'];
    dgger.nathanTiny2_OG = updates['nathanTiny2_OG'];
    dgger.nathanTowel = updates['nathanTowel'];
    dgger.nathanW = updates['nathanW'];
    dgger.nathanWat = updates['nathanWat'];
    dgger.nathanWeeb = updates['nathanWeeb'];
    dgger.nathanYee = updates['nathanYee'];
    dgger.nathanYikes = updates['nathanYikes'];
    dgger.nathanZoomer = updates['nathanZoomer'];
    dgger.NiceMeMe = updates['NiceMeMe'];
    dgger.NOBULLY = updates['NOBULLY'];
    dgger.NODDERS = updates['NODDERS'];
    dgger.NOPERS = updates['NOPERS'];
    dgger.NoTears = updates['NoTears'];
    dgger.NOTMYTEMPO = updates['NOTMYTEMPO'];
    dgger.OBJECTION = updates['OBJECTION'];
    dgger.OhKrappa = updates['OhKrappa'];
    dgger.OhMyDog = updates['OhMyDog'];
    dgger.OMEGALUL = updates.OMEGALUL;
    dgger.OOOO = updates['OOOO'];
    dgger.OverRustle = updates['OverRustle'];
    dgger.Painstiny = updates['Painstiny'];
    dgger.PARDNER = updates['PARDNER'];
    dgger.peepoRiot = updates['peepoRiot'];
    dgger.PEPE = updates['PEPE'];
    dgger.PepeHands = updates['PepeHands'];
    dgger.PepeLaugh = updates['PepeLaugh'];
    dgger.PepeMods = updates['PepeMods'];
    dgger.pepeSteer = updates['pepeSteer'];
    dgger.pepeW = updates['pepeW'];
    dgger.PepoComfy = updates['PepoComfy'];
    dgger.PepoG = updates['PepoG'];
    dgger.PepOk = updates['PepOk'];
    dgger.PepoThink = updates['PepoThink'];
    dgger.PepoTurkey = updates['PepoTurkey'];
    dgger.PepoWant = updates['PepoWant'];
    dgger.PICNIC = updates['PICNIC'];
    dgger.Pog = updates['Pog'];
    dgger.POGGERS = updates['POGGERS'];
    dgger.POTATO = updates['POTATO'];
    dgger.RapThis = updates['RapThis'];
    dgger.RaveDoge = updates['RaveDoge'];
    dgger.REE = updates['REE'];
    dgger.Shroomstiny = updates['Shroomstiny'];
    dgger.Shrugstiny = updates['Shrugstiny'];
    dgger.SICKO = updates['SICKO'];
    dgger.Sippy = updates['Sippy'];
    dgger.SLEEPSTINY = updates['SLEEPSTINY'];
    dgger.Slugstiny = updates['Slugstiny'];
    dgger.Slumlord = updates['Slumlord'];
    dgger.SMASHit = updates['SMASHit'];
    dgger.SNAP = updates['SNAP'];
    dgger.SoDoge = updates['SoDoge'];
    dgger.SOTRIGGERED = updates['SOTRIGGERED'];
    dgger.SOY = updates['SOY'];
    dgger.SpookerZ = updates['SpookerZ'];
    dgger.SURPRISE = updates['SURPRISE'];
    dgger.SWEATSTINY = updates['SWEATSTINY'];
    dgger.TeddyPepe = updates['TeddyPepe'];
    dgger.tf = updates['tf'];
    dgger.tonyW = updates['tonyW'];
    dgger.triHarder = updates['triHarder'];
    dgger.TRUMPED = updates['TRUMPED'];
    dgger.UNLUCKY = updates['UNLUCKY'];
    dgger.UWOTM8 = updates['UWOTM8'];
    dgger.WEOW = updates['WEOW'];
    dgger.WhoahDude = updates['WhoahDude'];
    dgger.widepeepoHappy = updates['widepeepoHappy'];
    dgger.WOOF = updates['WOOF'];
    dgger.WooYeah = updates['WooYeah'];
    dgger.WORTH = updates['WORTH'];
    dgger.Wowe = updates['Wowe'];
    dgger.YAM = updates['YAM'];
    dgger.YEE = updates['YEE'];
    dgger.YEEHAW = updates['YEEHAW'];
    dgger.YeeLaugh = updates['YeeLaugh'];
    dgger.YeeMods = updates['YeeMods'];
    dgger.Yoda1 = updates['Yoda1'];
    dgger.ZOOMER = updates['ZOOMER'];

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
    const newDgger = await getValidMonthsYears(dgger, dgger.username);

    try {
        await newDgger.save();
        newDgger.save();
        return res.status(201).json(newDgger);
    } catch (error) {
        return res.status(409).json({message: error});
    }

}

