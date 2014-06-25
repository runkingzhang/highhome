var User = require('../proxy').User;
var UserModel = require('../models').User;
var Tag = require('../proxy').Tag;
var Topic = require('../proxy').Topic;
var TopicModel = require('../models').Topic;
var Reply = require('../proxy').Reply;
var ReplyModel = require('../models').Reply;
var Relation = require('../proxy').Relation;
var TopicCollect = require('../proxy').TopicCollect;
var TagCollect = require('../proxy').TagCollect;
var utility = require('utility');

var message = require('../services/message');
var Util = require('../libs/util');
var config = require('../config').config;
var EventProxy = require('eventproxy');
var check = require('validator').check;
var sanitize = require('validator').sanitize;
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var ndir = require('ndir');

exports.index = function (req, res, next) {
  //这边是get方法的参数传递
  var user_name = req.params.name;
  //User是应用了proxy中user这边是对数据库才操作
  //function 是的对应和返回函数内容。err和user都是function的两个参数内容
  User.getUserByName(user_name, function (err, user) {
	 //err是mongodb中数据库出现查询错误的问题信息
    if (err) {
      return next(err);
    }
	
    if (!user) {
      res.render('notify/notify', {error: '这个用户不存在。'});
      return;
    }
	
	 //render 是对proxy做的准备，相当于是proxy.assign中的function，以下都是返回了user对象的内容信息
    var render = function (recent_topics, recent_replies, relation) {
		
      user.friendly_create_at = Util.format_date(user.create_at, true);
      // 如果用户没有激活，那么管理员可以帮忙激活
      var token = '';
	  
      if (!user.active && req.session.user && req.session.user.is_admin) {
        token = utility.md5(user.email + config.session_secret);
      }
	  
	  //请求跳转到到了user/index的信息，还有对应的删除传递内容
      res.render('user/index', {
        user: user,
        recent_topics: recent_topics,
        recent_replies: recent_replies,
        relation: relation,
        token: token,
      });
    };
	//新建一个事件代理，事件代理相当于是对mongodb数据库中的操作内容
    var proxy = new EventProxy();
	//新建代理分配，这这边又是对应的参数传递和render方法。
    proxy.assign('recent_topics', 'recent_replies', 'relation', render);
	//代理失败就下一个
    proxy.fail(next);
	 //下面两个是对数据库信息的操作
    var query = {author_id: user._id};
    var opt = {limit: 5, sort: [['create_at', 'desc']]};
	 //下面是调用proxy中的方法，别且时间代理返回为recent _topic.这边的recent_toppic可以经过数据传递到页面内容信息中。
	 
    Topic.getTopicsByQuery(query, opt, proxy.done('recent_topics'));
	
	
    Reply.getRepliesByAuthorId(user._id, proxy.done(function (replies) {
      var topic_ids = [];
      for (var i = 0; i < replies.length; i++) {
        if (topic_ids.indexOf(replies[i].topic_id.toString()) < 0) {
          topic_ids.push(replies[i].topic_id.toString());
        }
      }
      var query = {_id: {'$in': topic_ids}};
      var opt = {limit: 5, sort: [['create_at', 'desc']]};
      Topic.getTopicsByQuery(query, opt, proxy.done('recent_replies'));
    }));

    if (!req.session.user) {
      proxy.emit('relation', null);
    } else {
      Relation.getRelation(req.session.user._id, user._id, proxy.done('relation'));
    }
  });
};

exports.myself = function (req, res, next) {
  var user_name = req.params.name;
  User.getUserByName(user_name, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.render('notify/notify', {error: '这个用户不存在。'});
      return;
    }
	 //zhe
	//这边是一个对应的数据跳转和参数传递。
    var render = function (recent_topics, recent_replies, relation) {
      user.friendly_create_at = Util.format_date(user.create_at, true);
      // 如果用户没有激活，那么管理员可以帮忙激活
      var token = '';
	  
      if (!user.active && req.session.user && req.session.user.is_admin) {
        token = utility.md5(user.email + config.session_secret);
      }
	  
      res.render('user/myself', {
		  // 如果用户没有激活，那么管理员可以帮忙激活
        user: user,
		//一个是最近发布话题，一个是最近回复话题
        recent_topics: recent_topics,
        recent_replies: recent_replies,
        relation: relation,
        token: token,
      });
    };
	
    var proxy = new EventProxy();
	//assign是代理分派，recent_topics 相当于是参数传递的呃逆荣信息
    proxy.assign('recent_topics', 'recent_replies', 'relation', render);
	
    proxy.fail(next);

    var query = {author_id: user._id};
	
    var opt = {limit: 5, sort: [['create_at', 'desc']]};
	
    Topic.getTopicsByQuery(query, opt, proxy.done('recent_topics'));

	
    Reply.getRepliesByAuthorId(user._id, proxy.done(function (replies) {
      var topic_ids = [];
      for (var i = 0; i < replies.length; i++) {
        if (topic_ids.indexOf(replies[i].topic_id.toString()) < 0) {
          topic_ids.push(replies[i].topic_id.toString());
        }
      }
      var query = {_id: {'$in': topic_ids}};
      var opt = {limit: 5, sort: [['create_at', 'desc']]};
      Topic.getTopicsByQuery(query, opt, proxy.done('recent_replies'));
    }));

    if (!req.session.user) {
      proxy.emit('relation', null);
    } else {
      Relation.getRelation(req.session.user._id, user._id, proxy.done('relation'));
    }
  });
};

//显示的是对应的的明星用户信息
exports.show_stars = function (req, res, next) {
  User.getUsersByQuery({is_star: true}, {}, function (err, stars) {
    if (err) {
      return next(err);
    }
    res.render('user/stars', {stars: stars});
  });
};

//exports.是对外的接口信息内容
exports.showSetting = function (req, res, next) {
  //这边表示用户还没有登陆,不存在在session中的数据内容
  if (!req.session.user) {
    res.redirect('home');
    return;
  }
	//通过用户id来选取user
  User.getUserById(req.session.user._id, function (err, user) {
	 //如果出现错误 
    if (err) {
      return next(err);
    }
	//对应的用户信息
    if (req.query.save === 'success') {
      user.success = '保存成功。';
    }
    user.error = null;
	//跳转到对应的连接上面
    return res.render('user/setting', user);
  });
};
//密码修改内容
exports.show_change_password = function (req, res, next) {
  //这边表示用户还没有登陆,不存在在session中的数据内容
  if (!req.session.user) {
    res.redirect('home');
    return;
  }
	//通过用户id来选取user
  User.getUserById(req.session.user._id, function (err, user) {
	 //如果出现错误 
    if (err) {
      return next(err);
    }
	//对应的用户信息
    if (req.query.save === 'success') {
      user.success = '保存成功。';
    }
    user.error = null;
	//跳转到对应的连接上面
    return res.render('user/change_password', user);
  });
};


//用户的设置信息
exports.setting = function (req, res, next) {
	
  if (!req.session.user) {
    res.redirect('home');
    return;
  }

  // post
  var action = req.body.action;
  if (action === 'change_setting') {
	 //基本信息
    var name = sanitize(req.body.name).trim();
    name = sanitize(name).xss();
	var nickname = sanitize(req.body.nickname).trim();
    nickname = sanitize(nickname).xss();
	
	var hometown = sanitize(req.body.hometown).trim();
    hometown = sanitize(hometown).xss();
	var job = sanitize(req.body.job).trim();
    job = sanitize(job).xss();
	var interests = sanitize(req.body.interests).trim();
    interests = sanitize(interests).xss();
	var url = sanitize(req.body.url).trim();
    url = sanitize(url).xss();
	 var signature = sanitize(req.body.signature).trim();
    signature = sanitize(signature).xss();
    var profile = sanitize(req.body.profile).trim();
    profile = sanitize(profile).xss();
	
	//联系方式
    var email = sanitize(req.body.email).trim();
    email = sanitize(email).xss();
    var phone = sanitize(req.body.phone).trim();
    phone = sanitize(phone).xss();
	var qq = sanitize(req.body.qq).trim();
    qq = sanitize(qq).xss();
   	var weibo = sanitize(req.body.weibo).trim();
    weibo = sanitize(weibo).xss();
	
	 var profile_image_url='';
	 // 图片上传  ,这边应该是设计到node.js中关于一步的操作了的。
	
  var file = req.files.photo;
   console.log(__dirname);
   if (file.name=='') {
    profile_image_url ='';
  }else{
  var uid = req.session.user._id.toString();
   var userDir = path.join(config.upload_dir, uid);
   
   var filename = Date.now() + '_' + file.name;
   var savepath = path.resolve(path.join(userDir, filename));
   //这边上传的路径还是不对的，这边的path在浏览器中区分/ 和 \ 内容的
   profile_image_url ='../../public/user_data/images/'+uid+'/'+filename;
  console.log(profile_image_url);
  // 图片上传,这边是图片上传修临时目录内容
  ndir.mkdir(userDir, function (err) {
    if (err) {
      return next(err);
    }
   
    if (savepath.indexOf(path.resolve(userDir)) !== 0) {
      return res.send({status: 'forbidden'});
    }
	
    fs.rename(file.path, savepath, function (err) {
      if (err) {
        return next(err);
      }
      var url =file.path+ '/upload/' + uid + '/' + encodeURIComponent(filename);
	  
    });
	
  });
  }
  
	
    var receive_at_mail = req.body.receive_at_mail === 'on';
    var receive_reply_mail = req.body.receive_reply_mail === 'on';
	//上面是对参数传递的修改
	//下面是对数据信息内容的判断
	
    if (url !== '') {
      try {
        if ((url.indexOf('http://') < 0) && (url.indexOf('https://') < 0)) {
          url = 'http://' + url;
        }
        check(url, '不正确的个人网站。').isUrl();
      } catch (e) {
		  
        res.render('user/setting', {
          error: e.message,
          name: name,
          email: email,
          url: url,
          profile_image_url: profile_image_url,
          signature: signature,
          profile: profile,
          weibo: weibo,
          receive_at_mail: receive_at_mail,
          receive_reply_mail: receive_reply_mail
        });
        return;
      }
    }
	
    if (weibo) {
      try {
        if (weibo.indexOf('http://') < 0) {
          weibo = 'http://' + weibo;
        }
        check(weibo, '不正确的微博地址。').isUrl();
      } catch (e) {
        res.render('user/setting', {
          error: e.message,
          name: name,
          email: email,
          url: url,
          profile_image_url: profile_image_url,
       
          signature: signature,
          profile: profile,
          weibo: weibo,
          
          receive_at_mail: receive_at_mail,
          receive_reply_mail: receive_reply_mail
        });
        return;
      }
    }

    User.getUserById(req.session.user._id, function (err, user) {
      if (err) {
        return next(err);
      }
	  user.nickname = nickname;
	  user.profile_image_url = profile_image_url;
	  user.hometown = hometown;
	  user.job = job;
	  user.interests = interests;
      user.url = url;
	  user.signature = signature;
      user.profile = profile;
      
	  user.phone = phone;
	  user.qq = qq;
	  user.weibo = weibo;
	  
      
     
      user.weibo = weibo;
  
      user.receive_at_mail = receive_at_mail;
      user.receive_reply_mail = receive_reply_mail;
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/setting?save=success');
      });
    });

  }
  //这边相当于在一个setting方法中，用action来分成两个方法可以做对应的选取。
  if (action === 'change_password') {
	
    var old_pass = sanitize(req.body.old_pass).trim();
    var new_pass = sanitize(req.body.new_pass).trim();
	
    User.getUserById(req.session.user._id, function (err, user) {
      if (err) {
        return next(err);
      }
	  
      var md5sum = crypto.createHash('md5');
      md5sum.update(old_pass);
      old_pass = md5sum.digest('hex');

      if (old_pass !== user.pass) {
        res.render('user/setting', {
          error: '当前密码不正确。',
          name: user.name,
          email: user.email,
          url: user.url,
          profile_image_url: user.profile_image_url,
          location: user.location,
          signature: user.signature,
          profile: user.profile,
          weibo: user.weibo,
          github: user.githubUsername,
          receive_at_mail: user.receive_at_mail,
          receive_reply_mail: user.receive_reply_mail
        });
        return;
      }

      md5sum = crypto.createHash('md5');
      md5sum.update(new_pass);
      new_pass = md5sum.digest('hex');

      user.pass = new_pass;
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        res.render('user/change_password', {
          success: '密码已被修改。',
          name: user.name,
          email: user.email,
          url: user.url,
          profile_image_url: user.profile_image_url,
          location: user.location,
          signature: user.signature,
          profile: user.profile,
          weibo: user.weibo,
          github: user.githubUsername,
          receive_at_mail: user.receive_at_mail,
          receive_reply_mail: user.receive_reply_mail
        });
        return;

      });
    });
  }
};


exports.follow = function (req, res, next) {
  var follow_id = req.body.follow_id;
  User.getUserById(follow_id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({status: 'failed'});
    }

    var proxy = EventProxy.create('relation_saved', 'message_saved', function () {
      res.json({status: 'success'});
    });
    proxy.fail(next);
    Relation.getRelation(req.session.user._id, user._id, proxy.done(function (doc) {
      if (doc) {
        return proxy.emit('relation_saved');
      }

      // 新建关系并保存
      Relation.newAndSave(req.session.user._id, user._id);
      proxy.emit('relation_saved');

      User.getUserById(req.session.user._id, proxy.done(function (me) {
        me.following_count += 1;
        me.save();
      }));

      user.follower_count += 1;
      user.save();

      req.session.user.following_count += 1;
    }));

    message.sendFollowMessage(follow_id, req.session.user._id);
    proxy.emit('message_saved');
  });
};

exports.un_follow = function (req, res, next) {
  if (!req.session || !req.session.user) {
    res.send('forbidden!');
    return;
  }
  var follow_id = req.body.follow_id;
  User.getUserById(follow_id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({status: 'failed'});
      return;
    }
    // 删除关系
    Relation.remove(req.session.user._id, user._id, function (err) {
      if (err) {
        return next(err);
      }
      res.json({status: 'success'});
    });

    User.getUserById(req.session.user._id, function (err, me) {
      if (err) {
        return next(err);
      }
      me.following_count -= 1;
      if (me.following_count < 0) {
        me.following_count = 0;
      }
      me.save();
    });

    user.follower_count -= 1;
    if (user.follower_count < 0) {
      user.follower_count = 0;
    }
    user.save();

    req.session.user.following_count -= 1;
    if (req.session.user.following_count < 0) {
      req.session.user.following_count = 0;
    }
  });
};

exports.toggle_star = function (req, res, next) {
  if (!req.session.user || !req.session.user.is_admin) {
    res.send('forbidden!');
    return;
  }
  var user_id = req.body.user_id;
  User.getUserById(user_id, function (err, user) {
    if (err) {
      return next(err);
    }
    user.is_star = !user.is_star;
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json({ status: 'success' });
    });
  });
};

exports.get_collect_tags = function (req, res, next) {
  var name = req.params.name;
  User.getUserByName(name, function (err, user) {
    if (err || !user) {
      return next(err);
    }
    TagCollect.getTagCollectsByUserId(user._id, function (err, docs) {
      if (err) {
        return next(err);
      }
      var ids = [];
      for (var i = 0; i < docs.length; i++) {
        ids.push(docs[i].tag_id);
      }
      Tag.getTagsByIds(ids, function (err, tags) {
        if (err) {
          return next(err);
        }
        res.render('user/collect_tags', { tags: tags, user: user });
      });
    });
  });
};

exports.get_collect_topics = function (req, res, next) {
  var name = req.params.name;
  User.getUserByName(name, function (err, user) {
    if (err || !user) {
      return next(err);
    }

    var page = Number(req.query.page) || 1;
    var limit = config.list_topic_count;

    var render = function (topics, pages) {
      res.render('user/collect_topics', {
        topics: topics,
        current_page: page,
        pages: pages,
        user: user
      });
    };

    var proxy = EventProxy.create('topics', 'pages', render);
    proxy.fail(next);

    TopicCollect.getTopicCollectsByUserId(user._id, proxy.done(function (docs) {
      var ids = [];
      for (var i = 0; i < docs.length; i++) {
        ids.push(docs[i].topic_id);
      }
      var query = { _id: { '$in': ids } };
      var opt = {
        skip: (page - 1) * limit,
        limit: limit,
        sort: [ [ 'create_at', 'desc' ] ]
      };
      Topic.getTopicsByQuery(query, opt, proxy.done('topics'));
      Topic.getCountByQuery(query, proxy.done(function (all_topics_count) {
        var pages = Math.ceil(all_topics_count / limit);
        proxy.emit('pages', pages);
      }));
    }));
  });
};

exports.get_followings = function (req, res, next) {
  var name = req.params.name;
  User.getUserByName(name, function (err, user) {
    if (err || !user) {
      return next(err);
    }
    Relation.getFollowings(user._id, function (err, docs) {
      if (err) {
        return next(err);
      }
      var ids = [];
      for (var i = 0; i < docs.length; i++) {
        ids.push(docs[i].follow_id);
      }
      User.getUsersByIds(ids, function (err, users) {
        if (err) {
          return next(err);
        }
        res.render('user/followings', { users: users, user: user });
      });
    });
  });
};

exports.get_followers = function (req, res, next) {
  var name = req.params.name;
  User.getUserByName(name, function (err, user) {
    if (err || !user) {
      return next(err);
    }
    var proxy = new EventProxy();
    proxy.fail(next);
    Relation.getRelationsByUserId(user._id, proxy.done(function (docs) {
      var ids = [];
      for (var i = 0; i < docs.length; i++) {
        ids.push(docs[i].user_id);
      }
      User.getUsersByIds(ids, proxy.done(function (users) {
        res.render('user/followers', {users: users, user: user});
      }));
    }));
  });
};
//这个是选取前一百个用户内容

exports. top100= function (req, res, next) {
// 定义mongodb的操作内容信息,这个是直接查询到对应的内容信息
  var opt = {limit: 100, sort: [['score', 'desc']]};
  User.getUsersByQuery({}, opt, function (err, tops) {
	  
    if (err) {
      return next(err);
    }
    res.render('user/top100', {users: tops});
  });
};

exports.allusers= function (req, res, next) {
  var opt = {  sort: [['score', 'desc']]};
  User.getUsersByQuery({}, opt, function (err, allusers) {
    if (err) {
      return next(err);
    }
    res.render('user/allusers', {users: allusers});
  });
};

//查找同一单元的用户,这边的同一单元和同一幢都是假象而已了。
exports.same = function (req, res, next) {
  var user_name= req.params.name;
   //先找到这个用户，再找到对应的用户
   User.getUserByName(user_name, function (err, user) {
    if (err) {
      return next(err);
    }
	var villageNum= user.village;
	var buildingNum= user.building;
	var atunitNum= user.atunit;
   var opt = { sort: [['score', 'desc']]};
  //这边注意查询条件是单独的写出来的，要不然opt只是对应的
   User.getUsersByQuery({village:villageNum,building:buildingNum,atunit:atunitNum}, opt, function (err, sameatunit) {
	 
    if (err) {
      return next(err);
    }
	
    res.render('user/sameatunit', {users: sameatunit});
  });
  
 	});
	//这边是没有
	
};


exports.same_building = function (req, res, next) {
	 var user_name= req.params.name;
   //先找到这个用户，再找到对应的用户
   User.getUserByName(user_name, function (err, user) {
    if (err) {
      return next(err);
    }
	var villageNum= user.village;
	var buildingNum= user.building;
	
   var opt = { sort: [['score', 'desc']]};
  //这边注意查询条件是单独的写出来的，要不然opt只是对应的
   User.getUsersByQuery({village:villageNum,building:buildingNum}, opt, function (err, sameatunit) {
    if (err) {
      return next(err);
    }
    res.render('user/samebuilding', {users: sameatunit});
  });
 	});
	//这边是没有
  
};

exports.same_village= function (req, res, next) {
  var user_name= req.params.name;
   //先找到这个用户，再找到对应的用户
   User.getUserByName(user_name, function (err, user) {
    if (err) {
      return next(err);
    }
	var villageNum= user.village;
	
   var opt = { sort: [['score', 'desc']]};
  //这边注意查询条件是单独的写出来的，要不然opt只是对应的
   User.getUsersByQuery({village:villageNum}, opt, function (err, sameatunit) {
    if (err) {
      return next(err);
    }
    res.render('user/samevillage', {users: sameatunit});
  });
 	});
};

exports.my_neighbour= function (req, res, next) {
 var user_name = req.params.name;
 
  //找到当前的用户
 User.getUserByName(user_name, function (err, user) {
    if (err) {
      return next(err);
    }
	var villageNum= user.village;
	var buildingNum= user.building;
	var atunitNum= user.atunit;
	var roomNum = user.room;
	console.log( user);
	var opt = { sort: [['score', 'desc']]};
	
	//如果房号是X01
	if(roomNum%2==1){
				roomNum=user.room+1;
				User.getUsersByQuery({village:villageNum,building:buildingNum,atunit:atunitNum,room:roomNum}, opt, function (err, sameVillage) {
				if (err) {
				  return next(err);
				}
				res.render('user/my_neighbour', {users: sameVillage});
			  });
			  
		}else{
			  	roomNum=user.room-1;
				User.getUsersByQuery({village:villageNum,building:buildingNum,atunit:atunitNum,room:roomNum}, opt, function (err, sameVillage) {
				if (err) {
				  return next(err);
				}
				res.render('user/my_neighbour', {users: sameVillage});
			  });
		}
  //这边注意查询条件是单独的写出来的，要不然opt只是对应的
 	});
};

exports.my_upstairs= function (req, res, next) {
 var user_name = req.params.name;
  //找到当前的用户
 User.getUserByName(user_name, function (err, user) {
    if (err) {
      return next(err);
    }
	var villageNum= user.village;
	var buildingNum= user.building;
	var atunitNum= user.atunit;
	var roomNum = user.room;
	console.log( user);
	var opt = { sort: [['score', 'desc']]};
				roomNum=user.room+100;
				User.getUsersByQuery({village:villageNum,building:buildingNum,atunit:atunitNum,room:roomNum}, opt, function (err, sameVillage) {
				if (err) {
				  return next(err);
				}
				res.render('user/my_neighbour', {users: sameVillage});
			  });
  //这边注意查询条件是单独的写出来的，要不然opt只是对应的
 	});
};


exports.my_downstair= function (req, res, next) {
 var user_name = req.params.name;
  //找到当前的用户
 User.getUserByName(user_name, function (err, user) {
    if (err) {
      return next(err);
    }
	var villageNum= user.village;
	var buildingNum= user.building;
	var atunitNum= user.atunit;
	var roomNum = user.room;
	var opt = { sort: [['score', 'desc']]};
				roomNum=user.room-100;
				User.getUsersByQuery({village:villageNum,building:buildingNum,atunit:atunitNum,room:roomNum}, opt, function (err, sameVillage) {
				if (err) {
				  return next(err);
				}
				res.render('user/my_neighbour', {users: sameVillage});
			  });
  //这边注意查询条件是单独的写出来的，要不然opt只是对应的
 	});
};


exports.my_nextdoor= function (req, res, next) {
 var user_name = req.params.name;
  //找到当前的用户
 User.getUserByName(user_name, function (err, user) {
    if (err) {
      return next(err);
    }
	var villageNum= user.village;
	var buildingNum= user.building;
	var atunitNum= user.atunit;
	var roomNum = user.room;
		var opt = { sort: [['score', 'desc']]};
	//如果房号是X01
	if(roomNum%2==1){
				roomNum=user.room+1;
				atunitNum=user.atunit-1;
				User.getUsersByQuery({village:villageNum,building:buildingNum,atunit:atunitNum,room:roomNum}, opt, function (err, sameVillage) {
				if (err) {
				  return next(err);
				}
				res.render('user/my_neighbour', {users: sameVillage});
			  });
			  
		}else{
			  	roomNum=user.room-1;
				atunitNum=user.atunit+1;
				User.getUsersByQuery({village:villageNum,building:buildingNum,atunit:atunitNum,room:roomNum}, opt, function (err, sameVillage) {
				if (err) {
				  return next(err);
				}
				res.render('user/my_neighbour', {users: sameVillage});
			  });
		}
	
	
  //这边注意查询条件是单独的写出来的，要不然opt只是对应的
 	});
};


exports.list_topics = function (req, res, next) {
  var user_name = req.params.name;
  var page = Number(req.query.page) || 1;
  var limit = config.list_topic_count;

  User.getUserByName(user_name, function (err, user) {
    if (!user) {
      res.render('notify/notify', {error: '这个用户不存在。'});
      return;
    }

    var render = function (topics, relation, pages) {
      user.friendly_create_at = Util.format_date(user.create_at, true);
      res.render('user/topics', {
        user: user,
        topics: topics,
        relation: relation,
        current_page: page,
        pages: pages
      });
    };

    var proxy = new EventProxy();
    proxy.assign('topics', 'relation', 'pages', render);
    proxy.fail(next);

    var query = {'author_id': user._id};
    var opt = {skip: (page - 1) * limit, limit: limit, sort: [['create_at', 'desc']]};
    Topic.getTopicsByQuery(query, opt, proxy.done('topics'));

    if (!req.session.user) {
      proxy.emit('relation', null);
    } else {
      Relation.getRelation(req.session.user._id, user._id, proxy.done('relation'));
    }

    Topic.getCountByQuery(query, proxy.done(function (all_topics_count) {
      var pages = Math.ceil(all_topics_count / limit);
      proxy.emit('pages', pages);
    }));
  });
};

exports.list_replies = function (req, res, next) {
  var user_name = req.params.name;
  var page = Number(req.query.page) || 1;
  var limit = config.list_topic_count;

  User.getUserByName(user_name, function (err, user) {
    if (!user) {
      res.render('notify/notify', {error: '这个用户不存在。'});
      return;
    }

    var render = function (topics, relation, pages) {
      user.friendly_create_at = Util.format_date(user.create_at, true);
      res.render('user/replies', {
        user: user,
        topics: topics,
        relation: relation,
        current_page: page,
        pages: pages
      });
    };

    var proxy = new EventProxy();
    proxy.assign('topics', 'relation', 'pages', render);
    proxy.fail(next);

    Reply.getRepliesByAuthorId(user._id, proxy.done(function (replies) {
      // 获取所有有评论的主题
      var topic_ids = [];
      for (var i = 0; i < replies.length; i++) {
        if (topic_ids.indexOf(replies[i].topic_id.toString()) < 0) {
          topic_ids.push(replies[i].topic_id);
        }
      }
      var query = {'_id': {'$in': topic_ids}};
      var opt = {skip: (page - 1) * limit, limit: limit, sort: [['create_at', 'desc']]};
      Topic.getTopicsByQuery(query, opt, proxy.done('topics'));

      Topic.getCountByQuery(query, proxy.done(function (all_topics_count) {
        var pages = Math.ceil(all_topics_count / limit);
        proxy.emit('pages', pages);
      }));
    }));

    if (!req.session.user) {
      proxy.emit('relation', null);
    } else {
      Relation.getRelation(req.session.user._id, user._id, proxy.done('relation'));
    }
  });
};

exports.block = function (req, res, next) {
  var userName = req.params.name;
  User.getUserByName(userName, function (err, user) {
    if (err) {
      return next(err);
    }
    if (req.body.action === 'set_block') {
      var ep = EventProxy.create();
      ep.fail(next);
      ep.all('block_user', 'del_topics', 'del_replys',
        function (user, topics, replys) {
          res.json({status: 'success'});
        });
      user.is_block = true;
      user.save(ep.done('block_user'));
      // TopicModel.remove({author_id: user._id}, ep.done('del_topics'));
      // ReplyModel.remove({author_id: user._id}, ep.done('del_replys'));
      ep.emit('del_topics');
      ep.emit('del_replys');
    } else if (req.body.action === 'cancel_block') {
      user.is_block = false;
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        res.json({status: 'success'});
      });
    }

  });
};
