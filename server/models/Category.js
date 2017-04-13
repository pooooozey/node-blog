var mongoose = require('mongoose');

var categoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('Category',categoriesSchema);
//使用这个schema表结构对象创建一个叫User的模型
