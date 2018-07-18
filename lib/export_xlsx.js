const config = require('../config');
const logger = require('../lib/logging').getLogger('lib/export_xlsx');

const xlsxTemplate = require('xlsx-template');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const moment = require('moment');

const mdb = require('../mongoose');

//读模板
function readFileP(template_path) {
  return fs.readFileSync(template_path);
}
//写文件
function writeFileP(filename, newData) {
  fs.writeFileSync(path.join('/pfm-xue-project/excel/', `${filename}.xlsx`), newData, 'binary');
}
//
// 打印租户入住搬家审批表
//
exports.printTicketTemplate = async (ticket) => {
  const form_data = ticket;
  
  const filename = "個別機能訓綶計画書";
  const template_path = path.join(__dirname, '..', 'public', '個別機能訓綶計画書.xlsx');
  const data = await readFileP(template_path);
  const t = new xlsxTemplate(data);
  
  if (form_data.planAuthor !== "") {
    t.substitute(1, {
      createDate: moment(form_data.createDate).format('YYYY-MM-DD'), // 作成日
      createLastTime: moment(form_data.createLastTime).format('YYYY-MM-DD'), // 前回作成日
      planAuthor: form_data.planAuthor, // 計画作成者
      certification: form_data.certification, // 介護認定
      admin: form_data.admin, // 管理者
      nursing: form_data.nursing, // 看護
      nursingCare: form_data.nursingCare, // 介護
      functionalTraining: form_data.functionalTraining, // 機能訓練
      counselor: form_data.counselor, // 相談員
      oneselfDesire: form_data.oneselfDesire, // 本人の希望
      familyDesire: form_data.familyDesire, // 家族の希望
      disorder: form_data.disorder, // 障害老人の日常生活自立度
      dementia: form_data.dementia, // 認知症老人の日常生活自立度
      diseaseName: form_data.diseaseName, // 病名、合併症(心疾患、吸器疾患等)
      exerciseRisk: form_data.exerciseRisk, // 運動時のリスク(血圧、不整脈、呼吸等)
      lifeIssues: form_data.lifeIssues, // 生活課題
      homeEnvironment: form_data.homeEnvironment, // 在宅環境(生活課題に関連する在宅環境課題)

      // 個別機能訓練加算Ⅰ
      add_longTermGoals: form_data.additionalTraining.longTermGoals, // 長期目標
      add_longTermGoalsDegree: form_data.additionalTraining.longTermGoalsDegree, // 目標逹成度
      add_shortTermGoals: form_data.additionalTraining.shortTermGoals, // 短期目標
      add_shortTermGoalsDegree: form_data.additionalTraining.shortTermGoalsDegree, // 目標逹成度

      // add_enum_programContent: form_data.add_enum_programContent, // プログラム内容
      // add_enum_attention: form_data.add_enum_attention, // 留意点
      // add_enum_frequency: form_data.add_enum_frequency, // 頻度
      // add_enum_time: form_data.add_enum_time, // 時間
      // add_enum_personLiable: form_data.add_enum_personLiable, // 主な実施者

      // 個別機能訓練計画書Ⅱ
      plan_longTermGoals: form_data.planTow.longTermGoals, // 長期目標
      plan_longTermGoalsDegree: form_data.planTow.longTermGoalsDegree, // 目標逹成度
      plan_shortTermGoals: form_data.planTow.shortTermGoals, // 短期目標
      plan_shortTermGoalsDegree: form_data.planTow.shortTermGoalsDegree, // 目標逹成度

      // plan_enum_programContent: form_data.plan_enum_programContent, // プログラム内容
      // plan_enum_attention: form_data.plan_enum_attention, // 留意点
      // plan_enum_frequency: form_data.plan_enum_frequency, // 頻度
      // plan_enum_time: form_data.plan_enum_time, // 時間
      // plan_enum_personLiable: form_data.plan_enum_personLiable, // 主な実施者

      specialNotes: form_data.specialNotes, // 特記事項


    });
  }

  //新文件名
  const newData = t.generate();
  await writeFileP(filename, newData);
  return `${filename}.xlsx`;
};
