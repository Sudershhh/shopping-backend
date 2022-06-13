const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true,
        
    },
    products:[
        {
            productId: {
                type:String
            },
            quantity: {
                type:Number,
                default:1
            },
            title:{
                type:String
            },
            color:{
                type:String
            },
            size:{
                type:String
            },
            price:{
                type:Number
            },
            img:{
                type:String
            }

        }
    ],
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:'Pending'
    },
    payment:{
        type:Object,
        required:true
    }
 

    
    
},{timestamps:true})

module.exports = mongoose.model('Order',OrderSchema)