const Item = require('../models/Item');
const { serverError } = require('../lib/server');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find({ user: req.user.id }).populate('user');
        return !items ? res.status(400).json({ msg: 'no items where found for this user' }) :
            res.json(items);
    } catch (error) {
        serverError(error, res);
    }
}

exports.addItem = async (req, res) => {
    const { todo } = req.body;
    const { id } = req.user;
    const item = new Item({ user: id, todo });
    try {
        await item.save();
        res.json({ item });
    } catch (error) {
        serverError(error, res);
    }
}

exports.updateItem = async (req, res) => {
    const filter = { _id: req.params.itemId };
    const data = { ...req.body };
    const optaions = { returnOriginal: false };
    try {
        const item = await Item.findOneAndUpdate(filter, data, optaions);
        return res.json({ item });
    } catch (error) {
        serverError(error, res);
    }
}

exports.deleteItem = async (req, res) => {
    const filter = { _id: req.params.itemId };
    const optaions = { returnOriginal: false };
    try {
        const item = await Item.findByIdAndDelete(filter, optaions);
        return item ?
            res.json({ item }) :
            res.status(301).json({ msg: 'No item was found' });
    } catch (error) {
        serverError(error, res);
    }
}