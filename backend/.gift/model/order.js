var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var order = new Schema({
    userId:{
        type:String,
        required:true
    },
    orderId:{
    type: String,
    required:true,
    },
    productName :{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default: "Ordered",
    },
    paymentMethod: {
    type: String,
    default: "COD"
}
   
});
module.exports=mongoose.model("order",order);
