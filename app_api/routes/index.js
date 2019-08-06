var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');

var auth = jwt({
    secret: 'thisIsSecret',
    _userProperty: 'payload'
});

var ctrlTest = require('../controllers/test');
var ctrlAuth = require('../controllers/authentication');


router.get('/test', auth, ctrlTest.list);
router.get('/listResult/:id', auth, ctrlTest.listResult);
router.get('/findTest', auth, ctrlTest.findTest);
router.get('/questions/:id', auth, ctrlTest.getQuestions);
router.get('/answers/:id', auth, ctrlTest.getAnswers);
router.get('/getResult/:id', auth, ctrlTest.getResult);
router.post('/test', auth, ctrlTest.createTest);
router.post('/questions', auth, ctrlTest.createQuestions);
router.post('/answers', auth, ctrlTest.createAnswers);
router.post('/result', auth, ctrlTest.result);
router.delete('/test/:id', auth, ctrlTest.deleteT);
router.delete('/questions/:id', auth, ctrlTest.deleteQ);
router.delete('/answers/:id', auth, ctrlTest.deleteA);
router.delete('/results/:id', auth, ctrlTest.deleteR);
router.delete('/deleteResult/:id', auth, ctrlTest.deleteResult);
router.put('/update', ctrlTest.update);
router.put('/startTest/:id', ctrlTest.startTest);


router.post('/getUser', ctrlAuth.getUser);
router.put('/statusUser', ctrlAuth.statusUser);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
