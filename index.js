const express = require("express")
const app = express();

const stripe = require('stripe')('sk_test_51KeHsESA71D2oM6y8prwHmJYSER7UmiDzMHUslS0wS9lRL76ClePME2jd0q2zWrt3srEWFHtC0oVy3cC6P6a4Om400falPLNg5');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
//setting view engine to ejs
app.set("view engine", "ejs");

app.get('/',(req, res)=>{
    res.render('paymentPage')
})

app.post('/purchase', async (req, res) => {
    console.log(req.body, req.query);
    // Create Customer
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
      });

    //   Create Product
    const charge = await stripe.charges.create({
        customer: customer.id,
        description: 'Custom t-shirt',
        amount: '6000',//order.amount,
        currency: 'USD',
      });

    // Make Payment
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            product: 'prod_LKzG6v1ZyWHFuZ',
            unit_amount: 1500,
            currency: 'usd',
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });

console.log("sessionsessionsessionsession", session);
});


app.listen(8080, function () {
  console.log("Server is running on port 8080 ");
});