var EventProxy = require('eventproxy');

var models = require('../models');
var Topic = models.Topic;
var TopicTag = models.TopicTag;
var User = require('./user');
var Tag = require('./tag');
var Reply = require('./reply');
var Util = require('../libs/util');

/**
 * 根据主题ID获取主题
 * Callback:
 * - err, 数据库错误
 * - topic, 主题
 * - tags, 标签列表
 * - author, 作者
 * - lastReply, 最后回复
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.getTopicById = function (id, callback) {
  var proxy = new EventProxy();
  //event是数组，表示对应的手动传递内容信息
  var events = ['topic', 'tags', 'author', 'last_reply', 'replies'];
  
  proxy.assign(events, function (topic, tags, author, last_reply, replies) {
    return callback(null, topic, tags, author, last_reply, replies);
  }).fail(callback);
	
  Topic.findOne({_id: id}, proxy.done(function (topic) {
    if (!topic) {
	 //这边是传递参数内容，是对应的手动传递内容信息。这边是绑定对应的参数内容。
      proxy.emit('topic', null);
      proxy.emit('tags', []);
      proxy.emit('author', null);
      proxy.emit('last_reply', null);
	  proxy.emit('replies', null);
      return;
    }
    proxy.emit('topic', topic);

    // TODO: 可以只查tag_id这个字段的吧？
    TopicTag.find({topic_id: topic._id}, proxy.done(function (topic_tags) {
      var tags_id = [];
      for (var i = 0; i < topic_tags.length; i++) {
        tags_id.push(topic_tags[i].tag_id);
      }
      Tag.getTagsByIds(tags_id, proxy.done('tags'));
    }));
	
    User.getUserById(topic.author_id, proxy.done('author'));
	Reply.getRepliesByTopicId(topic._id, proxy.done('replies'));
	
    if (topic.last_reply) {
      Reply.getReplyById(topic.last_reply, proxy.done(function (last_reply) {
        proxy.emit('last_reply', last_reply || null);
      }));
    } else {
      proxy.emit('last_reply', null);
    }
  }));
};

/**
 * 获取关键词能搜索到的主题数量
 * Callback:
 * - err, 数据库错误
 * - count, 主题数量
 * @param {String} query 搜索关键词
 * @param {Function} callback 回调函数
 */
exports.getCountByQuery = function (query, callback) {
  Topic.count(query, callback);
};

/**
 * 根据关键词，获取主题列表
 * Callback:
 * - err, 数据库错误
 * - count, 主题列表
 * @param {String} query 搜索关键词
 * @param {Object} opt 搜索选项
 * @param {Function} callback 回调函数 这边在这个的基础上放加上对应的replies
 *调用这个方法的时候参数已经有对应的传递了的。对数据库的操作要应用model层内容
 */
exports.getTopicsByQuery = function (query, opt, callback) {
  Topic.find(query, ['_id'], opt, function (err, docs) {
    if (err) {
      return callback(err);
    }
	// 这边是主题数目为0
    if (docs.length === 0) {
      return callback(null, []);
    }
	// 用遍历取到对应的主题id
    var topics_id = [];
    for (var i = 0; i < docs.length; i++) {
      topics_id.push(docs[i]._id);
    }
	
	//这边是定义一个时间变量
    var proxy = new EventProxy();
	
  	//对topic_replay进行一定的过滤
    proxy.after('topic_ready', topics_id.length, function (topics) {
      // 过滤掉空值
      var filtered = topics.filter(function (item) {
        return !!item;
      });
      return callback(null, filtered);
    });
	//时间代理出现错误的境况内容
    proxy.fail(callback);
	//遍历数组，找到对应的topic主题信息,这边用了forEach的内容
    topics_id.forEach(function (id, i) {
		//proxy.group基本等同proxy.done但是这边会对返回的数据进行编号处理，
		//这边有调用了一个新的方法\
		//这个是找到对应的回复信息
   	  	
		 //调用本地的参数内容
		 
      exports.getTopicById(id, proxy.group('topic_ready', function (topic, tags, author, last_reply, replies) {
        // 当id查询出来之后，进一步查询列表时，文章可能已经被删除了
        // 所以这里有可能是null
		
        if (topic) {
          topic.tags = tags;
          topic.author = author;
          topic.reply = last_reply;
		  topic.replies=replies;
          topic.friendly_create_at = Util.format_date(topic.create_at, true);
        }
		
        return topic;
      }));
    });
  });
};


/**
 * 获取所有信息的主题
 * Callback:
 * - err, 数据库异常
 * - message, 消息
 * - topic, 主题
 * - tags, 主题的标签
 * - author, 主题作者
 * - replies, 主题的回复
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.getFullTopic = function (id, callback) {
  var proxy = new EventProxy();
  
  var events = ['topic', 'tags', 'author', 'replies'];
  proxy.assign(events, function (topic, tags, author, replies) {
    callback(null, '', topic, tags, author, replies);
  }).fail(callback);

  Topic.findOne({_id: id}, proxy.done(function (topic) {
    if (!topic) {
      proxy.unbind();
      return callback(null, '此话题不存在或已被删除。');
    }
    proxy.emit('topic', topic);
	//这个是话题找到对应的标签
    TopicTag.find({topic_id: topic._id}, proxy.done(function (topic_tags) {
      var tags_ids = [];
      for (var i = 0; i < topic_tags.length; i++) {
        tags_ids.push(topic_tags[i].tag_id);
      }
      Tag.getTagsByIds(tags_ids, proxy.done('tags'));
    }));
	//这个是话题作者
    User.getUserById(topic.author_id, proxy.done(function (author) {
      if (!author) {
        proxy.unbind();
        return callback(null, '话题的作者丢了。');
      }
      proxy.emit('author', author);
    }));
	//这个是找到对应的回复信息
    Reply.getRepliesByTopicId(topic._id, proxy.done('replies'));
	
  }));
};

/**
 * 更新主题的最后回复信息
 * @param {String} topicId 主题ID
 * @param {String} replyId 回复ID
 * @param {Function} callback 回调函数
 */
exports.updateLastReply = function (topicId, replyId, callback) {
  Topic.findOne({_id: topicId}, function (err, topic) {
    if (err || !topic) {
      return callback(err);
    }
    topic.last_reply = replyId;
    topic.last_reply_at = new Date();
    topic.reply_count += 1;
    topic.save(callback);
  });
};

/**
 * 根据主题ID，查找一条主题
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.getTopic = function (id, callback) {
  Topic.findOne({_id: id}, callback);
};

/**
 * 将当前主题的回复计数减1，删除回复时用到
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.reduceCount = function (id, callback) {
  Topic.findOne({_id: id}, function (err, topic) {
    if (err) {
      return callback(err);
    }

    if (!topic) {
      return callback(new Error('该主题不存在'));
    }

    topic.reply_count -= 1;
    topic.save(callback);
  });
};

exports.newAndSave = function (title, content,describe, image,authorId, callback) {
  var topic = new Topic();
  topic.title = title;
  topic.content = content;
  topic.describe = describe;
  topic.image =image;
  topic.author_id = authorId;
  topic.save(callback);
};
