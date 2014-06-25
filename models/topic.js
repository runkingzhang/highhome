var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//topic和tag是对应的多对多的关系数据内容

var TopicSchema = new Schema({
  title: { type: String },
  content: { type: String },
  describe: { type: String },
  author_id: { type: ObjectId },
  top: { type: Boolean, default: false },
  reply_count: { type: Number, default: 0 },
  visit_count: { type: Number, default: 0 },
  collect_count: { type: Number, default: 0 },
  zhan_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  last_reply: { type: ObjectId },
  last_reply_at: { type: Date, default: Date.now },
  content_is_html: { type: Boolean },
  image:{type:String}
  
});

mongoose.model('Topic', TopicSchema);
