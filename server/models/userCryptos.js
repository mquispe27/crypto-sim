const mongoose = require("mongoose");

const UserCryptosSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  balance: mongoose.SchemaTypes.Decimal128,
  cash: mongoose.SchemaTypes.Decimal128,
  numCryptosOwned: [mongoose.SchemaTypes.Decimal128],
  cryptosOwned: [String],
  valsAtPurchase: [mongoose.SchemaTypes.Decimal128],

});

// compile model from schema
module.exports = mongoose.model("userCryptos", UserCryptosSchema);
