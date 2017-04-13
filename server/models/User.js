var mongoose = require('mongoose');

var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User',usersSchema);
//使用这个schema表结构对象创建一个叫User的模型
