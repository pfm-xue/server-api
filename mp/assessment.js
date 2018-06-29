//assessment
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/assessment');

const express = require('express');
const multer = require('multer');
const path = require('path');

const dest = path.join(__dirname, '..', 'public');
const upload = multer({ dest });
const mdb = require('../mongoose');

const router = express.Router();
const checkManager = async (req) => {
  // const m = await mdb.Assessment.findById(req.$token);
  // if (m.role !== 'super_assessment') {
  //   throw new Error('auth err');
  //}
};

/**
# 所有 assessment
GET http://localhost:3001/mp/assessment/?page=1
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
#
*/
router.get('/', async (req, res) => {
  const { page } = req.query;

  const count = await mdb.Assessment.count();
  const { pageSize } = config;

  const list = await mdb.Assessment.find()
    .sort('-_id')
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  res.json({
    success: true,
    list,
    pagination: {
      page: parseInt(page, 10),
      pageSize,
      rowCount: count,
    },
  });
});

/**
# assessment信息:
GET http://localhost:3001/mp/assessment/xxx
#
*/
router.get('/xxx', async (req, res) => {
  res.json({"websocket":true,"origins":["*:*"],"cookie_needed":false,"entropy":463037764});
});

/**
# assessment信息:
GET http://localhost:3001/mp/assessment/5b10e0c1082a60435c5019e2
#
*/
router.get('/:assessment_id', async (req, res) => {
  const { assessment_id } = req.params;
  const assessment = await mdb.Assessment.findById(assessment_id);

  res.json({
    success: true,
    data: assessment,
  });
});

/**
# assessment信息:
DELETE http://localhost:3001/mp/assessment/5b10e0c1082a60435c5019e2
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
#
*/
router.delete('/:assessment_id', async (req, res, next) => {
  // check manager
  await checkManager(req);

  const { assessment_id } = req.params;
  const assessment = await mdb.Assessment.findByIdAndRemove(assessment_id);
  res.json({
    success: true,
    data: assessment,
  });
});

/**
# new assessment信息:
POST http://localhost:3001/mp/assessment/
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
  let assessment;
  if (req.body._id) {
    const data = req.body;

    assessment = await mdb.Assessment.findByIdAndUpdate(req.body._id, data, {
      new: true,
    });
  } else {
    const data = {
      ...req.body,
    };
    delete data._id;
    assessment = new mdb.Assessment(data);
    await assessment.save();
  }

  assessment = await mdb.Assessment.findById(assessment._id);

  res.json({
    success: true,
    data: assessment,
  });
});

/**
# 上载缩略图
# curl -X POST -H "Accept: application/json" -H "Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI" -F "thumbnail=@/Assessments/zhaolei/Desktop/IMG_0861.JPG" http://localhost:3001/mp/assessment/upload
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
