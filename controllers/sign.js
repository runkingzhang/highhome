var check = require('validator').check,
  sanitize = require('validator').sanitize;

var crypto = require('crypto');
var config = require('../config').config;

var User = require('../proxy').User;
var Message = require('../proxy').Message;
var mail = require('../services/mail');

//sign up 注册后跳转到对应的页面
exports.showSignup = function (req, res) {
  res.render('sign/signup');
  //可以将res.render当做是一个页面的跳转代码
};

//post 后会返回get的方法
exports.signup = function (req, res, next) {
  //获取传过来的参数信息
  var name = sanitize(req.body.name).trim();
  name = sanitize(name).xss();
  var loginname = name.toLowerCase();
  var pass = sanitize(req.body.pass).trim();
  pass = sanitize(pass).xss();
  var email = sanitize(req.body.email).trim();
  email = email.toLowerCase();
  email = sanitize(email).xss();
  var re_pass = sanitize(req.body.re_pass).trim();
  re_pass = sanitize(re_pass).xss();
 //新加住址信息
  var community = sanitize(req.body.community).trim();
  community = sanitize(community).xss();
  var village = sanitize(req.body.village).trim();
  village = sanitize(village).xss();
  var building = sanitize(req.body.building).trim();
  building = sanitize(building).xss();
  var atunit = sanitize(req.body.atunit).trim();
  atunit = sanitize(atunit).xss();
  var room = sanitize(req.body.room).trim();
  room = sanitize(room).xss();
  
  

  //几个注册信息都不能为空，erro 和success的内容会存在参数里面当做对应的信息。
  if (name === '' || pass === '' || re_pass === '' || email === '') {
    res.render('sign/signup', {error: '信息不完整。', name: name, email: email});
    return;
  }
  //组织信息不能为空
 if (community === '' || village === '' || building === '' || atunit === ''|| room === '') {
    res.render('sign/signup', {error: '请选择你的家。', name: name, email: email});
    return;
  }
  
  if (name.length < 5) {
    res.render('sign/signup', {error: '用户名至少需要5个字符。', name: name, email: email});
    return;
  }

  try {
    check(name, '用户名只能使用0-9，a-z，A-Z。').isAlphanumeric();
  } catch (e) {
    res.render('sign/signup', {error: e.message, name: name, email: email});
    return;
  }

  if (pass !== re_pass) {
    res.render('sign/signup', {error: '两次密码输入不一致。', name: name, email: email});
    return;
  }

  try {
    check(email, '不正确的电子邮箱。').isEmail();
  } catch (e) {
    res.render('sign/signup', {error: e.message, name: name, email: email});
    return;
  }
  //这边是调用userModel中的方法。和数据库打交道的方法都在proxy中user中，这些方法可以在头部的应用文件中慢慢的找到。
  //这边是用mongodb的参数方法在传递数据。
  User.getUsersByQuery({'$or': [{'loginname': loginname}, {'email': email}]}, {}, function (err, users) {
    if (err) {
      return next(err);
    }
    //存在对应的用户
    if (users.length > 0) {
      res.render('sign/signup', {error: '用户名或邮箱已被使用。', name: name, email: email});
      return;
    }
	
    // md5 the pass 把密码转移
    pass = md5(pass);
    // create gavatar 
    var avatar_url = 'http://www.gravatar.com/avatar/' + md5(email.toLowerCase()) + '?size=48';
	//上面都是对参数方法的调用newAndSave才是保存数据信息
    User.newAndSave(name, loginname, pass, email, community, village, building,atunit,room, avatar_url, false, function (err) {
      if (err) {
        return next(err);
      }
      // 发送激活邮件
      mail.sendActiveMail(email, md5(email + config.session_secret), name);
      res.render('sign/signup', {
		 //运行到最后可以是对应的
        success: '欢迎加入 ' + config.name + '！请加入QQ群，和邻居聊聊天，让管理员帮助你激活账号。'
      });
    });
  });
};


/**
 * Show user login page.
 *
 * @param  {HttpRequest} req
 * @param  {HttpResponse} res
 */
exports.showLogin = function (req, res) {
  req.session._loginReferer = req.headers.referer;
  //页面跳转
  res.render('sign/signin');
};

/**
 * define some page when login just jump to the home page
 * @type {Array}
 */
var notJump = [
  '/active_account', //active page
  '/reset_pass',     //reset password page, avoid to reset twice
  '/signup',         //regist page
  '/search_pass'    //serch pass page
];

/**
 * Handle user login.
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.login = function (req, res, next) {
  var loginname = sanitize(req.body.name).trim().toLowerCase();
  var pass = sanitize(req.body.pass).trim();
  //error 这个会出现对应的页面中，相当于是一个变量加上了对应的值
  if (!loginname || !pass) {
    return res.render('sign/signin', { error: '信息不完整。' });
  }

  User.getUserByLoginName(loginname, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('sign/signin', { error: '这个用户不存在。' });
    }
    pass = md5(pass);
    if (pass !== user.pass) {
      return res.render('sign/signin', { error: '密码错误。' });
    }
    if (!user.active) {
      // 从新发送激活邮件
      mail.sendActiveMail(user.email, md5(user.email + config.session_secret), user.name);
      return res.render('sign/signin', { error: '此帐号还没有被激活，激活链接已发送到 ' + user.email + ' 邮箱，请查收。' });
    }
    // store session cookie  有session就可以不再重复登录
    gen_session(user, res);
    //check at some page just jump to home page
    var refer = req.session._loginReferer || 'home';
    for (var i = 0, len = notJump.length; i !== len; ++i) {
      if (refer.indexOf(notJump[i]) >= 0) {
        refer = 'home';
        break;
      }
    }
    res.redirect(refer);
  });
};

// sign out
exports.signout = function (req, res, next) {
  //这边涉及到浏览器的session和cookie的问题，这边是java web中的重要内容
  req.session.destroy();
  res.clearCookie(config.auth_cookie_name, { path: '/' });
  res.redirect(req.headers.referer || 'home');
};
//激活账号
exports.active_account = function (req, res, next) {
  //取到url连接中的两个参数内容那个
  var key = req.query.key;
  var name = req.query.name;

  User.getUserByName(name, function (err, user) {
    //代码是从上往下一部一部执行的。
    if (err) {
      return next(err);
    }
    if (!user || md5(user.email + config.session_secret) !== key) {
      return res.render('notify/notify', {error: '信息有误，帐号无法被激活。'});
    }
    if (user.active) {
      return res.render('notify/notify', {error: '帐号已经是激活状态。'});
    }
    //将个人的激活站台设置为true并且保存
    user.active = true;
    user.save(function (err) {
      if (err) {
        return next(err);
      }
	  //这边是吊装到对应的页面
      res.render('notify/notify', {success: '帐号已被激活，请登录'});
    });
  });
};


exports.showSearchPass = function (req, res) {
  res.render('sign/search_pass');
};

exports.updateSearchPass = function (req, res, next) {
  var email = req.body.email;
  email = email.toLowerCase();

  try {
    check(email, '不正确的电子邮箱。').isEmail();
  } catch (e) {
    res.render('sign/search_pass', {error: e.message, email: email});
    return;
  }

  // 动态生成retrive_key和timestamp到users collection,之后重置密码进行验证
  var retrieveKey = randomString(15);
  var retrieveTime = new Date().getTime();
  User.getUserByMail(email, function (err, user) {
    if (!user) {
      res.render('sign/search_pass', {error: '没有这个电子邮箱。', email: email});
      return;
    }
    user.retrieve_key = retrieveKey;
    user.retrieve_time = retrieveTime;
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      // 发送重置密码邮件
      mail.sendResetPassMail(email, retrieveKey, user.name);
      res.render('notify/notify', {success: '我们已给您填写的电子邮箱发送了一封邮件，请在24小时内点击里面的链接来重置密码。'});
    });
  });
};

/**
 * reset password
 * 'get' to show the page, 'post' to reset password
 * after reset password, retrieve_key&time will be destroy
 * @param  {http.req}   req
 * @param  {http.res}   res
 * @param  {Function} next
 */
exports.reset_pass = function (req, res, next) {
  var key = req.query.key;
  var name = req.query.name;
  User.getUserByQuery(name, key, function (err, user) {
    if (!user) {
      return res.render('notify/notify', {error: '信息有误，密码无法重置。'});
    }
    var now = new Date().getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    if (!user.retrieve_time || now - user.retrieve_time > oneDay) {
      return res.render('notify/notify', {error : '该链接已过期，请重新申请。'});
    }
    return res.render('sign/reset', {name : name, key : key});
  });
};

exports.update_pass = function (req, res, next) {
  var psw = req.body.psw || '';
  var repsw = req.body.repsw || '';
  var key = req.body.key || '';
  var name = req.body.name || '';
  if (psw !== repsw) {
    return res.render('sign/reset', {name : name, key : key, error : '两次密码输入不一致。'});
  }
  User.getUserByQuery(name, key, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('notify/notify', {error : '错误的激活链接'});
    }
    user.pass = md5(psw);
    user.retrieve_key = null;
    user.retrieve_time = null;
    user.active = true; // 用户激活
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      return res.render('notify/notify', {success: '你的密码已重置。'});
    });
  });
};
//获取一个默认的地址信息。
function getAvatarURL(user) {
  if (user.avatar_url) {
    return user.avatar_url;
  }
  var avatar_url = user.profile_image_url || user.avatar;
  if (!avatar_url) {
    avatar_url = config.site_static_host + '/public/images/user_icon&48.png';
  }
  return avatar_url;
}

// auth_user middleware
exports.auth_user = function (req, res, next) {
  if (req.session.user) {
    if (config.admins.hasOwnProperty(req.session.user.name)) {
      req.session.user.is_admin = true;
    }
    Message.getMessagesCount(req.session.user._id, function (err, count) {
      if (err) {
        return next(err);
      }
      req.session.user.messages_count = count;
      if (!req.session.user.avatar_url) {
        req.session.user.avatar_url = getAvatarURL(req.session.user);
      }
      res.local('current_user', req.session.user);
      return next();
    });
  } else {
    var cookie = req.cookies[config.auth_cookie_name];
    if (!cookie) {
      return next();
    }

    var auth_token = decrypt(cookie, config.session_secret);
    var auth = auth_token.split('\t');
    var user_id = auth[0];
    User.getUserById(user_id, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        if (config.admins.hasOwnProperty(user.name)) {
          user.is_admin = true;
        }
        Message.getMessagesCount(user._id, function (err, count) {
          if (err) {
            return next(err);
          }
          user.messages_count = count;
          req.session.user = user;
          res.local('current_user', req.session.user);
          return next();
        });
      } else {
        return next();
      }
    });
  }
};

// private  这边是测试对应的信息内容元素
function gen_session(user, res) {
  var auth_token = encrypt(user._id + '\t' + user.name + '\t' + user.pass + '\t' + user.email, config.session_secret);
  res.cookie(config.auth_cookie_name, auth_token, {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}); //cookie 有效期30天
}

exports.gen_session = gen_session;

function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

function randomString(size) {
  size = size || 6;
  var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var max_num = code_string.length + 1;
  var new_pass = '';
  while (size > 0) {
    new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
    size--;
  }
  return new_pass;
}
