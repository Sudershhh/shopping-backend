const express = require('express');
const router = express.Router();
const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken} = require('../middlewares/verifytoken')
const Cart = require('../models/Cart');





//CREATE CART

router.post('/',verifyToken ,async(req,res)=>
{
    const newCart = new Cart(req.body)
    try
    {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart);

    }catch(err)
    {
        res.status(500).json(err)
    }
})



//ADD PRODUCT TO CART - NO

router.post('/:id',verifyTokenAndAuthorization,async(req,res)=>{

    try{
        const addCart = await Cart.findOne({userId:req.params.id},{
            $set:req.body
        },{new:true})
    }
    catch(err)
    {
        res.status(500).json(err)
    }


})





//UPDATE CART

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try
    {
        const updatedCart = await Cart.updateOne({userId:req.params.id},{
            $set: req.body
        },{new:true})

        res.status(200).json(updatedCart)

    }catch(err)
    {
        res.status(500).json(err)
    }

})




//GET USER CART

router.get("/find/:id",verifyTokenAndAuthorization,async(req,res) => {
    try
    {
        const cart = await Cart.findOne({userId:req.params.id})
        res.status(200).json(cart)
    }
    catch(err)
    {
        res.status(500).json(err)
    }

})


//GET ALL CARTS

router.get('/', verifyTokenAndAdmin ,async(req,res) => {

    try
    {
        const allCarts = await Cart.find({})
        res.status(200).json(allCarts)

    }catch(err)
    {
        res.status(500).json(err)
    }
})



//DELETE CART

router.delete('/:id', verifyTokenAndAuthorization,async(req,res) => {

    try
    {
        const deletedCart=await Cart.deleteOne({userId:req.params.id})
        res.status(200).json(deletedCart)
    }
    catch(err)
    {
        res.status(500).json(err)
    }

})



module.exports = router;