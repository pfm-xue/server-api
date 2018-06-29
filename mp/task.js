//task
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/task');

const express = require('express');
const multer = require('multer');
const path = require('path');

const dest = path.join(__dirname, '..', 'public');
const upload = multer({ dest });
const mdb = require('../mongoose');

const router = express.Router();
const checkManager = async (req) => {
  // const m = await mdb.Task.findById(req.$token);
  // if (m.role !== 'super_task') {
  //   throw new Error('auth err');
  // }
};

/**
# all task信息:
GET http://localhost:3001/mp/task/?page=1
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
*/
router.get('/', async (req, res) => {
  const { page } = req.query;  

  const count = await mdb.Task.count(); 
  const { pageSize } = config;

  const list = await mdb.Task.find()
    .sort('-_id')
    .skip((page - 1) * pageSize)
    .populate('task_user')
    .populate('task_admin')
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
# task信息:
GET http://localhost:3001/mp/task/5afbee7ed0e2860bdf0de484
*/
router.get('/:task_id', async (req, res) => {
console.log(req.params);

  if(req.params.title === "userId"){
    const task = await mdb.Task.find({"task_user" :req.params.userId});
    res.json({
      success: true,
      data: task,
    });
  } else {
    const { task_id } = req.params;
    const task = await mdb.Task.findById(task_id);
    res.json({
      success: true,
      data: task,
    });
  }
});

/**
# task信息:
DELETE http://localhost:3001/mp/task/5afbee7ed0e2860bdf0de484
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
*/
router.delete('/:task_id', async (req, res, next) => {
  // check manager
  await checkManager(req);

  const { task_id } = req.params;
  const task = await mdb.Task.findByIdAndRemove(task_id);
  res.json({
    success: true,
    data: task,
  });
});

/**
# new task信息:
POST http://localhost:3001/mp/task/
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

  let task;
  if (req.body.fields._id) {
    const data = req.body.fields;

    task = await mdb.Task.findByIdAndUpdate(req.body.fields._id, data, {
      new: true,
    });
  } else {
    const data = {
      ...req.body.fields,
    };
    delete data._id;
    task = new mdb.Task(data);
    await task.save();
  }

  // task = await mdb.Task.findById(task._id);

  // res.json({
  //   success: true,
  //   data: task,
  // });
});

/**
# 上载缩略图
# curl -X POST -H "Accept: application/json" -H "Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI" -F "cover=@/Users/zhaolei/Desktop/IMG_0861.JPG" http://localhost:3001/mp/task/uploadCover
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
