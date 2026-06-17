var express = require("express");
var router = express.Router();


const Cart = require("../model/order");


router.post("/add", async (req, res) => {

    try {

        const cartItem = new Cart(req.body);

        await cartItem.save();
        console.log("Saved",cartItem);

        res.json({
            message: "Added to cart",
            cartItem
        });

    } catch (error) {

    console.log("SAVE ERROR:", error);

    res.status(500).json({
        error: error.message
    });
}
});



router.post("/proceed/:id", async (req, res) => {

    try {

        // find product from wishlist
        const item = await Wishlist.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Product not found in wishlist"
            });
        }

        // create cart item
        const cartItem = new Cart({

            orderId: "ORD" + Date.now(),

            productName: item.productName,

            price: item.price,

            status: "Ordered"
        });

        await cartItem.save();

        res.status(200).json({
            message: "Product added to cart",
            cartItem
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

router.get("/user/:userId", async (req, res) => {

    try {

        const orders = await Cart.find({
            userId: req.params.userId
        });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

router.get("/orders", async (req, res) => {

    try {

        const orders = await Cart.find();

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});
router.put("/update-status/:id", async (req, res) => {
    console.log("UPDATE ROUTE HIT"); 
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/order/:orderId", async (req, res) => {
    try {
        const order = await Cart.findOne({ orderId: req.params.orderId });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/user-confirmed/:userId", async (req, res) => {
    try {
        const orders = await Cart.find({
            userId: req.params.userId,
            status: "Confirmed"
        });

        res.json(orders);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

