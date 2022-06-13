const express = require('express');
const router = express.Router();
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middlewares/verifytoken')
const Product = require('../models/Product');





//ADD PRODUCT

router.post('/',verifyTokenAndAdmin ,async(req,res)=>
{
    const newProduct = new Product(req.body)
    try
    {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct);

    }catch(err)
    {
        res.status(500).json(err)
    }
})



//UPDATE PRODUCT

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try
    {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true})

        res.status(200).json(updatedProduct)

    }catch(err)
    {
        res.status(500).json(err)
    }

})


//GET PRODUCT

router.get("/find/:id",async(req,res) => {
    try
    {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }
    catch(err)
    {
        res.status(500).json(err)
    }

})


//GET ALL PRODUCTS

router.get('/',async(req,res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try
    {

        let allProducts;
       

        if(qNew)
        {
            allProducts = await Product.find({}).sort({createdAt:-1}).limit(5)
        }
        else if(qCategory)
        {
            allProducts = await Product.find({categories:{$in:[qCategory]}})
        }
        else
        {
            allProducts = await Product.find({})
        }

        res.status(200).json(allProducts)

    }catch(err)
    {
        res.status(500).json(err)
    }
})



//DELETE PRODUCT

router.delete('/:id', verifyTokenAndAdmin,async(req,res) => {

    try
    {
        const deletedProduct=await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedProduct)
    }
    catch(err)
    {
        res.status(500).json(err)
    }

})



module.exports = router;