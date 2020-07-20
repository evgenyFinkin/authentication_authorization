const router = require('express').Router();

// handlers
const { isValidToken } = require('../../controllers/authHendler');
const { getAllItems, addItem, updateItem, deleteItem } = require('../../controllers/itemHendler');
const { checkTodo, isValidated } = require('../../controllers/checkRequest');


/**
 * @routh   GET apiV1/item/getAll
 * @desc    Get all users items
 * @access  Private
 * */
router.get('/getAll', isValidToken, getAllItems);

/**
 * @routh   POST apiV1/item
 * @desc    Add a new item
 * @access  Private
 * */
router.post('/', isValidToken, checkTodo, isValidated, addItem);

/**
 * @routh   PATCH apiV1/item/:itemId
 * @desc    update an item
 * @access  Private
 * */
router.patch('/:itemId', isValidToken, updateItem);

/**
 * @routh   DELETE apiV1/item/:itemId
 * @desc    delete an item
 * @access  Private
 * */
router.delete('/:itemId', isValidToken, deleteItem);



module.exports = router;