var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config').config;
var ObjectId = Schema.ObjectId;
//上面是对model的引用，下面是对user字段的定义。但是这边我看不出对应的数据之间的关系，本来就可能没有关系的
var UserSchema = new Schema({
  //基本信息
  name: { type: String, index: true },
  loginname: { type: String, unique: true },
  nickname:{ type:String  },
  pass: { type: String },
  hometown:{type:String},//++ 家乡  如：浙江省杭州市
  job:{type:String}, //++ 职业
  interests:{type:String},//
  signature: { type: String },//个性签名
  profile: { type: String },//个人简介
  url: { type: String },
  avatar: { type: String },
  profile_image_url: {type: String},
  //联系方式
  email: { type: String, unique: true },
  qq:{type:String},
  phone:{type:String},
  weibo: { type: String },
  githubId: { type: String, index: true },
  githubUsername: {type: String},
  is_block: {type: Boolean, default: false},
  score: { type: Number, default: 0 },
  topic_count: { type: Number, default: 0 },
  reply_count: { type: Number, default: 0 },
  follower_count: { type: Number, default: 0 },
  following_count: { type: Number, default: 0 },
  collect_tag_count: { type: Number, default: 0 },
  collect_topic_count: { type: Number, default: 0 },
   zhan_topic_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  
  is_star: { type: Boolean },
  level: { type: String },
  active: { type: Boolean, default: true },

  receive_reply_mail: {type: Boolean, default: false },
  receive_at_mail: { type: Boolean, default: false },
  from_wp: { type: Boolean },
  retrieve_time : {type: Number},
  retrieve_key : {type: String},
  //hourse 信息
  address:{type:String},
  community:{type:Number},
  village:{type:Number},//++ 园区 这边要划分各个元对应的编码内容信息
  building:{type:Number},//++几幢 这边自己让用户填写或者让用户选择都是可以的
  atunit:{type:Number},//++单元数
  room:{type:Number}//++房间号
});

UserSchema.virtual('avatar_url').get(function () {
  var url = this.profile_image_url || this.avatar || config.site_static_host + '/public/images/user_icon&48.png';
  return url.replace('http://www.gravatar.com/', 'http://cnodegravatar.u.qiniudn.com/');
});

mongoose.model('User', UserSchema);
