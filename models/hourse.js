var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//上面是对model的引用，下面是对user字段的定义。但是这边我看不出对应的数据之间的关系，本来就可能没有关系的
var HourseSchema = new Schema({
  //基本信息
  address:{type:String},
  community:{type:Number},
  village:{type:Number},//++ 园区 这边要划分各个元对应的编码内容信息
  building:{type:Number},//++几幢 这边自己让用户填写或者让用户选择都是可以的
  Dunit:{type:Number},//++单元数
  room:{type:Number},//++房间号
  
});


mongoose.model('Hourse', UserSchema);
