//template
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/template');

const express = require('express');
const multer = require('multer');
const path = require('path');

const dest = path.join(__dirname, '..', 'public');
const upload = multer({ dest });
const mdb = require('../mongoose');

const router = express.Router();
const checkManager = async (req) => {
  // const m = await mdb.Template.findById(req.$token);
  // if (m.role !== 'super_template') {
  //   throw new Error('auth err');
  // }
};

/**
# all template信息:
GET http://localhost:3001/mp/template/?page=1
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
*/
router.get('/', async (req, res) => {
  const { page } = req.query;  

  const count = await mdb.Template.count(); 
  const { pageSize } = config;

  const list = await mdb.Template.find()
    .sort('-_id')
    .skip((page - 1) * pageSize)
    .populate('template_user')
    .populate('template_admin')
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
});

/**
# template信息:
GET http://localhost:3001/mp/template/5afbee7ed0e2860bdf0de484
*/
router.get('/:template_id', async (req, res) => {
  const { template_id } = req.params;
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  GET");
  const template = await mdb.Template.findById(template_id);
  console.log(template_id);
  console.log(template);
  var list = [template]; 
  res.json({
    list: list,
    pagination: {},    
  });
});

/**
# template信息:
DELETE http://localhost:3001/mp/template/5afbee7ed0e2860bdf0de484
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
*/
router.delete('/:template_id', async (req, res, next) => {
  // check manager
  await checkManager(req);

  const { template_id } = req.params;
  const template = await mdb.Template.findByIdAndRemove(template_id);
  res.json({
    success: true,
    data: template,
  });
});

/**
# new template信息:
POST http://localhost:3001/mp/template/
Content-Type: application/json
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
{
    "subject": "test #3",
    "category": "category #1"
}
#
*/
router.post('/', async (req, res, next) => {
  // check manager
  await checkManager(req);

  //TODO: 频度，数量的限制

  let template;
  if (req.body.template._id) {
    const data = req.body.template;

    template = await mdb.Template.findByIdAndUpdate(req.body.template._id, data, {
      new: true,
    });
  } else {
    const data = {
      ...req.body.template,
    };
    delete data._id;
    template = new mdb.Template(data);
    await template.save();
  }

  // template = await mdb.Template.findById(template._id);

  // res.json({
  //   success: true,
  //   data: template,
  // });
});

/**
# 上载缩略图
# curl -X POST -H "Accept: application/json" -H "Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI" -F "cover=@/Users/zhaolei/Desktop/IMG_0861.JPG" http://localhost:3001/mp/template/uploadCover
*/
router.post('/uploadThumbnail', upload.single('thumbnail'), async (req, res, next) => {
  // check manager
  await checkManager(req);

  logger.info(req.file);

  res.json({
    success: true,
    result: req.file.filename,
  });
});

module.exports = router;
