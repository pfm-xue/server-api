//assessment
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/assessment');

const express = require('express');
const multer = require('multer');
const path = require('path');

const dest = path.join(__dirname, '..', 'public');
const exportXlsx = require('../lib/export_xlsx');
const upload = multer({ dest });
const mdb = require('../mongoose');

const router = express.Router();
const checkManager = async (req) => {
  // const m = await mdb.Assessment.findById(req.$token);
  // if (m.role !== 'super_admin') {
  //   throw new Error('auth err');
  // }
};

/**
# all assessment信息:
GET http://localhost:3001/mp/assessment/?page=1
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
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
GET http://localhost:3001/mp/assessment/5afbee7ed0e2860bdf0de484
*/
router.get('/:assessment_id', async (req, res) => {
  const { assessment_id } = req.params;
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  GET");
  const assessment = await mdb.Assessment.findById(assessment_id);

  const filename = await exportXlsx.printTicketTemplate(assessment);

  console.log(filename+"++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Name");

  console.log(assessment_id);
  console.log(assessment);
  var list = [assessment]; 
  res.json({
    list: list,
    pagination: {},    
  });
});

/**
# assessment信息:
DELETE http://localhost:3001/mp/assessment/5afbee7ed0e2860bdf0de484
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
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
    "subject": "test #3",
    "category": "category #1"
}
#
*/
router.post('/', async (req, res, next) => {
  // check manager
  await checkManager(req);

  //TODO: 频度，数量的限制

  let assessment;
  if (req.body.assessmentData._id) {
    const data = req.body.assessmentData;

    assessment = await mdb.Assessment.findByIdAndUpdate(req.body.assessmentData._id, data, {
      new: true,
    });
  } else {
    const data = {
      ...req.body.assessmentData,
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
# curl -X POST -H "Accept: application/json" -H "Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI" -F "cover=@/Users/zhaolei/Desktop/IMG_0861.JPG" http://localhost:3001/mp/assessment/uploadCover
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
