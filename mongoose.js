const config = require('./config');
const logger = require('./lib/logging').getLogger('mongoose');
const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect(config.mongoose.connect);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'mongo connection error.'));

exports.connection = mongoose.connection;

// Plan:計画書
const planSchema = mongoose.Schema({
  createDate: Date,  // 作成日
  createLastTime: Date,  // 前回作成日
  planAuthor: String, // 計画作成者

  // phonetic: String, // ふりがな
  // sex: Number, // 性別
  // birth: Date, // 生年月日
  // name: String, // 氏名

  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },

  certification: String, // 介護認定
  admin: String,  // 管理者
  nursing: String,  // 看護
  nursingCare: String, // 介護
  functionalTraining: String, // 機能訓練
  counselor: String, // 相談員
  oneselfDesire: String, // 本人の希望
  familyDesire: String,  // 家族の希望
  disorder: String,  // 障害老人の日常生活自立度
  dementia: String, // 認知症老人の日常生活自立度
  diseaseName: String, // 病名、合併症(心疾患、吸器疾患等)
  exerciseRisk: String, // 運動時のリスク(血圧、不整脈、呼吸等)
  lifeIssues: String, // 生活課題
  homeEnvironment: String, // 在宅環境(生活課題に関連する在宅環境課題)
  // 個別機能訓練加算Ⅰ
  additionalTraining: {
    longTermGoals: String,// 長期目標
    longCalculation: String,// 長期算定
    longTermGoalsDegree: String,// 目標逹成度
    shortTermGoals: String,// 短期目標
    shortCalculation: String,// 短期算定
    shortTermGoalsDegree: String,// 目標逹成度
    enum: [{
      programContent: String,// プログラム内容
      attention: String,// 留意点
      frequency: String,// 頻度
      time: String,// 時間
      personLiable: String,// 主な実施者
      editable: Boolean, // 編集許可
    }],
    mastermind: String,  // プログラム立案者
  },
  // 個別機能訓練計画書Ⅱ
  planTow: {
    longTermGoals: String,// 長期目標
    longCalculation: String,// 長期算定
    longTermGoalsDegree: String,// 目標逹成度
    shortTermGoals: String,// 短期目標
    shortCalculation: String,// 短期算定
    shortTermGoalsDegree: String,// 目標逹成度
    enum: [{
      key: String,           // 唯一の鍵
      programContent: String,// プログラム内容
      attention: String,// 留意点
      frequency: String,// 頻度
      time: String,// 時間
      personLiable: String,// 主な実施者
      editable: Boolean, // 編集許可
    }],
    mastermind: String,  // プログラム立案者
  },
  specialNotes: String, // 特記事項
  planBook: [
    {
      type: mongoose.Schema.Types.ObjectId,   // assessment:アセスメント
      ref: 'Assessment',
      index: true,
    }
  ],
  delete_flag: {
    type: Boolean,
    default: false,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

// Admin:管理者
const adminSchema = mongoose.Schema({
  adminId: {
    type: String,
    // unique: true,
  },
  adminName: String,        //管理者名前
  email: String,            //Email
  password: String,         //Password
  telephoneNumber: String,  //  電話番号
  address: String,          // アドレス
  role: String,             //役割
  post: String,             // 職務
  delete_flag: {
    type: Boolean,
    default: false,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});


// user:利用者
const userSchema = mongoose.Schema({
  name: String,             // 氏名
  phonetic: String,         // ふりがな
  sex: String,              // 性別
  birth: Date,              // 生年月日
  telephoneNumber: String,  //  電話番号
  address: String,          // アドレス
  planBook: [{
      type: mongoose.Schema.Types.ObjectId,   // 個別機能訓綶計画
      ref: 'Plan',
      index: true,
    }],
  image:[{
    name: String,     // 画像名前
    patch: String,     // 画像名前
  }],
  delete_flag: {
    type: Boolean,
    default: false,
  },
});

// assessment:アセスメント
const assessmentSchema = mongoose.Schema({
  // 関節可動域
  joint_arm: Number,            // 上肢
  joint_legs: Number,           // 下肢
  joint_runk: Number,           // 体幹
  // 筋力
  tendon_arm: Number,           // 上肢
  tendon_legs: Number,          // 下肢
  tendon_runk: Number,          // 体幹
  // 麻痺
  paralysis_arm: Number,        // 上肢
  paralysis_legs: Number,       // 下肢
  paralysis_finger: Number,     // 手指
  // ADL Barthel Index
  meal: Number,                  // 食事
  move: Number,                  // 車椅子〜ベッドへの移乗
  aesthetic: Number,             // 整容
  toilet: Number,                // トイレ動作
  bath: Number,                  // 入浴
  walking: Number,               // 歩行
  stairs: Number,                // 階段昇降
  change: Number,                // 着替え
  defecation: Number,            // 排便コントロール
  total: Number,                 // 合計点
  // 家庭でのIADL
  shopping: Number,              // 買い物
  cook: Number,                  // 調理
  cleaning: Number,              // 掃除
  washing: Number,               // 洗濯
  // 評価日
  total_Short: Date,             // 評価日
  delete_flag: {
    type: Boolean,
    default: false,
  },
});

// task:タスク
const taskSchema = mongoose.Schema({
  executeTime: Date,            // 実行時間
  arrivalTime: Date,            // 到着時間
    // 関連使用者
  task_user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
    // 関連管理者
  // task_admin: {
  //   ref: 'Admin',
  //   type: mongoose.Schema.Types.ObjectId,
  // },
    // 関連計画書
  task_plan: {
    ref: 'Plan',
    type: mongoose.Schema.Types.ObjectId,
  },
    // 実施記録
  recording: {
    // 実施者
    implement_admin: {
      ref: 'Admin',
      type: mongoose.Schema.Types.ObjectId,
    },
    startTime: Date,       // StartTime
    endTime: Date,         // EndTime
    program: String,       // プログラム
  },
    // バイタル
  vital: {
    vital1: String,     // 体温
    vital2: String,     // 血圧
    vital3: String,     // 脈帕
    spO2: String,       // SpO2
  },
    // 体力測定-アセスメント
  assessment: {
    ref: 'UAssessmenter',
    type: mongoose.Schema.Types.ObjectId,
  },    
  // determine: {
  //   determine1: String,
  //   determine2: String,
  // },
  delete_flag: {
    type: Boolean,
    default: false,
  },
});

// Template:テンプレート
const templateSchema = mongoose.Schema({
  project: String,  // プロジェクト
  projectData:[
    String,         // データ
  ],
  delete_flag: {
    type: Boolean,
    default: false,
  },
});

const Template = exports.Template = mongoose.model('Template', templateSchema);
const Task = exports.Task = mongoose.model('Task', taskSchema);
const Plan = exports.Plan = mongoose.model('Plan', planSchema);
const User = exports.User = mongoose.model('User', userSchema);
const Admin = exports.Admin = mongoose.model('Admin', adminSchema);
const Assessment = exports.Assessment = mongoose.model('Assessment', assessmentSchema);
