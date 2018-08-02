//user
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/user');
const XLSX = require('xlsx');

const express = require('express');
const multer = require('multer');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');

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

  const list = await mdb.User.find()
    .sort('-_id');
    console.log(list);
    
  res.json({
    list: list,
    pagination: {
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
  const user = await mdb.User.find(user_id);
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
  const { page } = req.query;

  if (req.body.fields.printing) {
    const list = await mdb.User.find()
    .sort('-_id');
    // CSV出力
      const fileName = '使用者List.DAT';

      const lsi = _.join(
        _.map(list, (user) => {
          console.log(user);
          const name = user.name;
          const phonetic = user.phonetic;
          const birth = moment(user.birth).format('YYYY-MM-DD');
          console.log(birth);          
          const sex = user.sex;
          const telephoneNumber = user.telephoneNumber;
          const address = user.address;
          const text = `${name},${phonetic},${birth},${sex},${telephoneNumber},${address},`;
          return text;
        }), '\n'
      );
      
      const content = `${'利用者氏名,ふりがな,生年月日,性別,電話番号,アドレス'}\n${lsi}`;   
      const csv_file = path.join('/my-project/public/', fileName);
      await fs.writeFile(csv_file, content);
  } else {
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
  }

  const list = await mdb.User.find()
  .sort('-_id')
  .skip((page - 1) * pageSize)
  .limit(pageSize);

  res.json({
    list: list,
    pagination: {
      page: parseInt(page, 10),
      pageSize,
      rowCount: count,
    },
  });  
});

function validNotNull(rows, cols) {
  for (const row of rows) {
    for (const col of cols) {
      if (row[col] === undefined) {
        logger.error(`行${row}列${col}的数据格式检查失败。`, row);
        return false;
      }
    }
  }
  return true;
}

/**
# 上载缩略图
# curl -X POST -H "Accept: application/json" -H "Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI" -F "thumbnail=@/Users/zhaolei/Desktop/IMG_0861.JPG" http://localhost:3001/mp/user/upload
*/
router.post('/upload', upload.single('file'), async (req, res, next) => {
  // check manager
  await checkManager(req);

  logger.info(req.file);

  const cols = ['利用者氏名', 'ふりがな', '生年月日', '性別', '電話番号', 'アドレス'];

  async function processRows(rows) {
    console.log("------------------1--------------------------");
    // check
    if (rows.length === 0) {
      return '没有业务数据';
    }
    const user_promises = _.map(rows, async (row) => {
      logger.debug(row[cols[2]]);
      let data = {
        name: row[cols[0]],
        phonetic: row[cols[1]],
        birth: row[cols[2]],
        sex: row[cols[3]],
        telephoneNumber: row[cols[4]],
        address: row[cols[5]],
      };
      console.log("-----------------2--------------------data");
      console.log(data);
      user = new mdb.User(data);
      await user.save();
    });

    await Promise.all(user_promises);
  }

  const template_path = path.join(__dirname, '..', 'public', req.file.filename);

  const workbook = XLSX.readFile(template_path);
  console.log("+++++++++++++++++++++++++++++++++++++++++++");
  // console.log(workbook);
  
  
  const rows = _.flatten(_.map(workbook.SheetNames, (ws) => {
    const worksheet = workbook.Sheets[ws];
    const rs = XLSX.utils.sheet_to_row_object_array(worksheet);
    return rs;
  }));

  console.log(rows);
  

  if (!validNotNull(rows, cols)) {
    return '数据解析错误';
  }

  await processRows(rows);
  // return `${rows.length}条数据导入完毕。`;

  res.json({
    success: true,
    result: req.file.filename,
  });
});

module.exports = router;
