const express = require('express');
const passport  = require('passport');
const router = express.Router();
const homecontroller  = require('../controller/home_controller');



router.post('/add-expense',passport.authenticate('user',{session:false}),homecontroller.add_Expense);
router.post('/update-expense',passport.authenticate('user',{session:false}),homecontroller.updaterecord);

router.post('/login-user',homecontroller.user_token);
router.post('/sign-up-user',homecontroller.UserSign_up);

router.get('/expenses',passport.authenticate('user',{session:false}),homecontroller.get_Expense);
router.delete('/del-expense/:id',passport.authenticate('user',{session:false}), homecontroller.deleterecord);


module.exports=router ;