const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:0YPJc3h0uImqg0Jf@cluster0.9i4at.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var _db;

module.exports = {
  connectToServer: function(callback) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function( err, client ) {
      _db = client.db('adoptapetdb');
      return callback(err);
    } );
  },

  getDb: function() {
    return _db;
  }
}