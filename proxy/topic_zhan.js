
//这边是找到对应模型内容。
var TopicZhan = require('../models').TopicZhan;
//这边是找到对应的zhan内容
exports.getTopicZhan = function (userId, topicId, callback) {
  TopicZhan.findOne({user_id: userId, topic_id: topicId}, callback);
  
};
//查找用户zhan过的内容
exports.getTopicZhanByUserId = function (userId, callback) {
  TopicZhan.find({user_id: userId}, callback);
};
//新建和保存一个zhan
exports.newAndSave = function (userId, topicId, callback) {
  var topic_zhan = new TopicZhan();
  topic_zhan.user_id = userId;
  topic_zhan.topic_id = topicId;
  topic_zhan.save(callback);
};
//删除zhan
exports.remove = function (userId, topicId, callback) {
  TopicZhan.remove({user_id: userId, topic_id: topicId}, callback);
};

