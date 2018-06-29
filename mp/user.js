//user
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/user');

const express = require('express');
const multer = require('multer');
const path = require('path');

const dest = path.join(__dirname, '..', 'public');
const upload = multer({ dest });
const mdb = require('../mongoose');

const router = express.Router();
const checkManager = async (req) => {
  // const m = await mdb.User.findById(req.$token);
  // if (m.role !== 'super_user') {
  //   throw new Error('auth err');
  //}
};

/**
# 所有 user
GET http://localhost:3001/mp/user/?page=1
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
#
*/
router.get('/', async (req, res) => {
  const { page } = req.query;

  const count = await mdb.User.count();
  const { pageSize } = config;

  const list = await mdb.User.find()
    .sort('-_id')
    .skip((page - 1) * pageSize)
    .limit(pageSize);
    console.log(list);
    
  res.json({
    list: list,
    pagination: {
      page: parseInt(page, 10),
      pageSize,
      rowCount: count,
    },
  });
  // res.json({"list":[{"key":0,"disabled":true,"href":"https://ant.design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png","no":"0","title":"一个任务名称 0","owner":"曲丽丽","description":"这是一段描述","callNo":7,"status":1,"birthday":"1987-09-20","six":"女","role":"相談員","phone":"15541166566","updatedAt":"2017-06-30T16:00:00.000Z","createdAt":"2017-06-30T16:00:00.000Z","progress":24},{"key":1,"disabled":false,"href":"https://ant.design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png","no":"1","title":"一个任务名称 1","owner":"曲丽丽","description":"这是一段描述","callNo":569,"status":1,"birthday":"1987-09-20","six":"女","role":"相談員","phone":"15541166566","updatedAt":"2017-06-30T16:00:00.000Z","createdAt":"2017-06-30T16:00:00.000Z","progress":85},{"key":2,"disabled":false,"href":"https://ant.design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png","no":"2","title":"一个任务名称 2","owner":"曲丽丽","description":"这是一段描述","callNo":335,"status":1,"birthday":"1987-09-20","six":"女","role":"相談員","phone":"15541166566","updatedAt":"2017-07-01T16:00:00.000Z","createdAt":"2017-07-01T16:00:00.000Z","progress":91},{"key":3,"disabled":false,"href":"https://ant.design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png","no":"3","title":"一个任务名称 3","owner":"曲丽丽","description":"这是一段描述","callNo":181,"status":0,"birthday":"1987-09-20","six":"女","role":"相談員","phone":"15541166566","updatedAt":"2017-07-01T16:00:00.000Z","createdAt":"2017-07-01T16:00:00.000Z","progress":71},{"key":4,"disabled":false,"href":"https://ant.design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png","no":"4","title":"一个任务名称 4","owner":"曲丽丽","description":"这是一段描述","callNo":935,"status":3,"birthday":"1987-09-20","six":"女","role":"相談員","phone":"15541166566","updatedAt":"2017-07-02T16:00:00.000Z","createdAt":"2017-07-02T16:00:00.000Z","progress":82},{"key":5,"disabled":false,"href":"https://ant.design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png","no":"5","title":"一个任务名称 5","owner":"曲丽丽","description":"这是一段描述","callNo":139,"status":0,"birthday":"1987-09-20","six":"女","role":"相談員","phone":"15541166566","updatedAt":"2017-07-02T16:00:00.000Z","createdAt":"2017-07-02T16:00:00.000Z","progress":22},{"key":6,"disabled":true,"href":"https://ant.design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png","no":"6","title":"一个任务名称 6","owner":"曲丽丽","description":"这是一段描述","callNo":229,"status":0,"birthday":"1987-09-20","six":"女","role":"相談員","phone":"15541166566","updatedAt":"2017-07-03T16:00:00.000Z","createdAt":"2017-07-03T16:00:00.000Z","progress":43},{"key":7,"disabled":false,"href":"https://ant.design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png","no":"7","title":"一个任务名称 7","owner":"曲丽丽","description":"这是一段描述","callNo":325,"status":1,"birthday":"1987-09-20","six":"女","role":"相談員","phone":"15541166566","updatedAt":"2017-07-03T16:00:00.000Z","createdAt":"2017-07-03T16:00:00.000Z","progress":63},{"key":8,"disabled":false,"href":"https://ant.design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png","no":"8","title":"一个任务名称 8","owner":"曲丽丽","description":"这是一段描述","callNo":601,"status":3,"birthday":"1987-09-20","six":"女","role":"相談員","phone":"15541166566","updatedAt":"2017-07-04T16:00:00.000Z","createdAt":"2017-07-04T16:00:00.000Z","progress":9},{"key":9,"disabled":false,"href":"https://ant.design","avatar":"https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png","no":"9","title":"一个任务名称 9","owner":"曲丽丽","description":"这是一段描述","callNo":439,"status":1,"birthday":"1987-09-20","six":"女","role":"相談員","phone":"15541166566","updatedAt":"2017-07-04T16:00:00.000Z","createdAt":"2017-07-04T16:00:00.000Z","progress":99}],"pagination":{"total":46,"pageSize":10,"current":1}});

});

/**
# user信息:
GET http://localhost:3001/mp/user/59967ac40d030771af51647a
#
*/
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const user = await mdb.User.findById(user_id);
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  GET");
  console.log(user_id);
  console.log(user);
  var list = [user]; 
  res.json({
    list: list,
    pagination: {},    
  });
});

/**
# user信息:
DELETE http://localhost:3001/mp/user/5b10e0c1082a60435c5019e2
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
#
*/
router.delete('/:user_id', async (req, res, next) => {
  // check manager
  await checkManager(req);

  const { user_id } = req.params;
  const user = await mdb.User.findByIdAndRemove(user_id);
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  GET");
  console.log(user_id);
  console.log(user);
  res.json({
    success: true,
    data: user,
  });
});

/**
# new user信息:
POST http://localhost:3001/mp/user/
Content-Type: application/json
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
{
    "username": "nakata",
    "email": "nakata@gmail.com",
    "password": "xxx"
}
#
*/
router.post('/', async (req, res, next) => {
  // check manager
  await checkManager(req);

  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log(req.body.fields);
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++");
  
  //TODO: 频度，数量的限制
  let user;
  if (req.body.fields._id) {
    const data = req.body.fields;

    user = await mdb.User.findByIdAndUpdate(req.body.fields._id, data, {
      new: true,
    });
  } else {
    const data = {
      ...req.body.fields,
    };
    delete data._id;
    user = new mdb.User(data);
    await user.save();
  }

  user = await mdb.User.findById(user._id);

  res.json({
    success: true,
    data: user,
  });
});

/**
# 上载缩略图
# curl -X POST -H "Accept: application/json" -H "Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI" -F "thumbnail=@/Users/zhaolei/Desktop/IMG_0861.JPG" http://localhost:3001/mp/user/upload
*/
router.post('/upload', upload.single('thumbnail'), async (req, res, next) => {
  // check manager
  await checkManager(req);

  logger.info(req.file);

  res.json({
    success: true,
    result: req.file.filename,
  });
});

module.exports = router;
