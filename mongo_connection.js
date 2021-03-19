const MongoClient = require('mongodb').MongoClient;
const uri = "";

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