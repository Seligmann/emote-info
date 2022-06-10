import DggerEmoteList from "../models/dggerEmoteList.js";
import axios from 'axios';

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

    const url = "https://coinmarketcap.com/";
    axios(url).then((response) => {
          const html_data = response.data;
        console.log(html_data);
    });

    try {
        await newDgger.save();
        return res.status(201).json(newDgger);
    } catch (error) {
        return res.status(409).json({message: error.message()});
    }
}
