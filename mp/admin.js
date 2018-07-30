//admin
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/admin');

const express = require('express');
const multer = require('multer');
const path = require('path');

const dest = path.join(__dirname, '..', 'public');
const upload = multer({ dest });
const mdb = require('../mongoose');

const router = express.Router();
const checkManager = async (req) => {
  // const m = await mdb.Admin.findById(req.$token);
  // if (m.role !== 'super_admin') {
  //   throw new Error('auth err');
  //}
};

/**
# 所有 admin
GET http://localhost:3001/mp/admin/?page=1
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
#
*/
router.get('/', async (req, res) => {
  const { page } = req.query;

  const count = await mdb.Admin.count();
  const { pageSize } = config;

  const list = await mdb.Admin.find()
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
# admin信息:
GET http://localhost:3001/mp/admin/59967ac40d030771af51647a
#
*/
router.get('/:admin_id', async (req, res) => {
  const { admin_id } = req.params;
  const admin = await mdb.Admin.findById(admin_id);
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  GET");
  console.log(admin_id);
  console.log(admin);
  const list = [admin];
  res.json({
    list: list,
    pagination: {},     
  });
});

/**
# admin信息:
DELETE http://localhost:3001/mp/admin/5b10e0c1082a60435c5019e2
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
#
*/
router.delete('/:admin_id', async (req, res, next) => {
  // check manager
  await checkManager(req);

  const { admin_id } = req.params;
  const admin = await mdb.Admin.findByIdAndRemove(admin_id);
  res.json({
    success: true,
    data: admin,
  });
});

/**
# new admin信息:
POST http://localhost:3001/mp/admin/
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

  //TODO: 频度，数量的限制
  let admin;
  
  if (req.body.login) {
    let status,
     admin = await mdb.Admin.findOne({email : req.body.userName });
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++ admin");
    console.log(admin);
    if (admin.password === req.body.password  ) {
      status = 'ok';
    } else {
      status = 'error';
    }
    res.json({
      status,
      type: 'account',
      currentAuthority: 'admin',
    });
  } else {
    if (req.body.fields._id) {
      const data = req.body.fields;
  
      admin = await mdb.Admin.findByIdAndUpdate(req.body.fields._id, data, {
        new: true,
      });
    } else {
      const data = {
        ...req.body.fields,
      };
      delete data._id;
      admin = new mdb.Admin(data);
      await admin.save();
    }
  
    admin = await mdb.Admin.findById(admin._id);

  }


  // res.render('/role/physician-role');
});

/**
# 上载缩略图
# curl -X POST -H "Accept: application/json" -H "Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI" -F "thumbnail=@/Admins/zhaolei/Desktop/IMG_0861.JPG" http://localhost:3001/mp/admin/upload
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
