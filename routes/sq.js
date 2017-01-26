var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://chandan:duvarko315@localhost:5432/diary');

var User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  password: {
    type: Sequelize.STRING
  }
},{
timestamps: false,
});

/*User.sync({force: true}).then(function () {
  // Table created  
});
*/
module.exports = User;