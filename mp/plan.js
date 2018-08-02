//plan
const config = require('../config');
const logger = require('../lib/logging').getLogger('mp/plan');

const express = require('express');
const multer = require('multer');
const path = require('path');
const moment = require('moment');

const dest = path.join(__dirname, '..', 'public');
const exportXlsx = require('../lib/export_xlsx');
const upload = multer({ dest });
const mdb = require('../mongoose');

const router = express.Router();
const checkManager = async (req) => {
  // const m = await mdb.Plan.findById(req.$token);
  // if (m.role !== 'super_admin') {
  //   throw new Error('auth err');
  // }
};

/**
# all plan信息:
GET http://localhost:3001/mp/plan/?page=1
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
*/
router.get('/', async (req, res) => {

  const count = await mdb.Plan.count();

  const list = await mdb.Plan.find()
    .sort('-_id')
    .populate('user');
  res.json({
    list,
    pagination: {
      rowCount: count,
    },
  });
});

/**
# plan信息:
GET http://localhost:3001/mp/plan/5afbee7ed0e2860bdf0de484
*/
router.get('/:plan_id', async (req, res) => {
  const { plan_id } = req.params;
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  GET");
  const plan = await mdb.Plan.findById(plan_id).populate('user');

  console.log(plan_id);
  console.log(plan);
  var list = [plan]; 
  res.json({
    list: list,
    pagination: {},    
  });
});


/**
# plan信息:
GET http://localhost:3001/mp/plan/5afbee7ed0e2860bdf0de484
*/
router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  uer_id");
  console.log(user_id);
  
  const list = await mdb.Plan.find({user: user_id })
  .sort('-_id')
  .populate('user');
  res.json({
    list: list,
    pagination: {},    
  });
});



/**
# plan信息:
DELETE http://localhost:3001/mp/plan/5afbee7ed0e2860bdf0de484
Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI
*/
router.delete('/:plan_id', async (req, res, next) => {
  // check manager
  await checkManager(req);

  const { plan_id } = req.params;
  const plan = await mdb.Plan.findByIdAndRemove(plan_id);
  res.json({
    success: true,
    data: plan,
  });
});

/**
# new plan信息:
POST http://localhost:3001/mp/plan/
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
    if (req.body.planData.printing) {
      const filename = await exportXlsx.printTicketTemplate(req.body.planData);
    } else {
        let plan;
        if (req.body.planData._id) {
          const data = req.body.planData;
      
          plan = await mdb.Plan.findByIdAndUpdate(req.body.planData._id, data, {
            new: true,
          });
        } else {
          const data = {
            ...req.body.planData,
          };
          delete data._id;
          plan = new mdb.Plan(data);
          await plan.save();
    
          //  task 作成
          const starttime = moment(data.createDate).format('YYYY-MM-DD');
          const endTime = moment(starttime).add(3, 'M');
    
          var nextDate = starttime;
          let task;
          let taskData = {
            executeTime: '',
            task_user: data.user,
            task_plan: plan._id,
            recording: {
              startTime: '',
              endTime: '',
              program: '',
            },
            vital: {
              vital1: '',
              vital2: '',
              vital3: '',
              spO2: '',
            },
          };
          for (let i = 0; i < 100; i += 1) {
            if (moment(endTime).isBefore(nextDate)) {
              break;
            }
            if (moment(nextDate).format('dddd') === "Wednesday") {
              taskData.executeTime = moment(nextDate).format('YYYY-MM-DD');
              task = new mdb.Task(taskData);
              await task.save();
            }
            if (moment(nextDate).format('dddd') === "Friday") {
              taskData.executeTime = moment(nextDate).format('YYYY-MM-DD');
              task = new mdb.Task(taskData);
              await task.save();
            } 
            nextDate = moment(nextDate).add(1, 'd');
          }
        }
        plan = await mdb.Plan.findById(plan._id);
        
        var list = [plan]; 
        res.json({
          list: list,
          pagination: {},    
        });
      } 
});

/**
# 上载缩略图
# curl -X POST -H "Accept: application/json" -H "Authorization: Bearer odif2wvI8hUXIXBTcg4rarBYOfCI" -F "cover=@/Users/zhaolei/Desktop/IMG_0861.JPG" http://localhost:3001/mp/plan/uploadCover
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
