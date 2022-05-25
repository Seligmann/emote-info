// handlers for routes (logic)
import DggerEmoteList from "../models/dggerEmoteList.js";

export const getDggers = async (req, res) => {
    try {
        const dggerEmotes = await DggerEmoteList.find();
        return res.status(200).json(dggerEmotes);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const createDgger = async (req, res) => {
    const dgger = req.body;
    const newDgger = new DggerEmoteList(dgger)

    try {
        // console.log(dgger.username);
        await newDgger.save();
        return res.status(201).json(newDgger);
    } catch (error) {
        return res.status(409).json({ message: error.message() });
    }
}