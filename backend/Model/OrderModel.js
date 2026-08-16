const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },


    customer:{

        name:String,
        phone:String,
        email:String,
        address:String,
        city:String,
        state:String,
        pincode:String

    },


    products:[

        {

            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },

            title:String,

            image:String,

            category:{
                type:[String],
                default:[]
            },

            platform:{
                type:[String],
                default:[]
            },

            publisher:String,

            quantity:{
                type:Number,
                required:true
            },


            price:{
                type:Number,
                required:true
            }

        }

    ],


    totalAmount:{
        type:Number,
        required:true
    },


    status:{
        type:String,
        default:"Pending",
        enum:[
            "Pending",
            "Confirmed",
            "Delivered",
            "Cancelled"
        ]
    }


},
{
    timestamps:true
});


module.exports = mongoose.model("Order",orderSchema);