const express = require('express')

const port = 5001
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay') 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post('/pricing', (req,res)=>{
    var instance = new Razorpay({ key_id: req.body.auth.username, key_secret: req.body.auth.password })

    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: req.body.currency,
        receipt: req.body.receipt,
        notes: req.body.notes
    };
    instance.orders.create(options, function(err, order) {
    console.log(";",order);
    if (err) {
        return res.status(401).send({status: 'Failed', status_code: 401 ,message: 'order is not created!'})
    }
    return res.status(201).send({
    message: `It's called`,
    status: "success",
    status_code: 201,
        res: order
    })
});
})

app.listen(port, (error)=>{
    if (error) {
        console.log('Server is not Run !!');
    }
    console.log('Server is Running in thi port :', port);
})