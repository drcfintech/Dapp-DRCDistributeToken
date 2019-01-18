
const fs = require("fs");
const xlsx = require('node-xlsx');
const Web3 = require("web3");
const log4js = require('log4js')
const ajax = require('ajax');
const http = require('http');
const queryString = require('querystring');
const logger = log4js.getLogger();
let web3 = new Web3();
//init

//业务action
var Action_Methods = {
  //初始化参数
  Init:()=>{
    console.log("*********Starting*********");
    //ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
    logger.level = 'info';
    //其他初始化配置
  },

  //读取文件
  ReadFile:()=>{
    let Filesdata = fs.readFileSync('testdemo1.xlsx');
    logger.info("读取文件成功");
    //返回
    return Filesdata;
  },

  //序列化文件
  Serializedfile:(data)=>{
    let Workdata = xlsx.parse(data);
    logger.info("序列化数据成功");
    //返回,这里要做处理,就是在要获取对象里面的data而不是data
    let cData =Workdata[0].data;
    return cData;
  },

  //校验数据
  CheckData:(data)=>{
    //
   let lengths = data.length;
    // 结果集
    let result = {
      State: 0, //0 1 3
      Tote: lengths,
      Valid: 0,
      UnValid: 0,
      ValidData: [],
      UnValidData: [],
      Bz: [],
      sData:{
        address:[],
        value:[],
        state:[]
      }
    }
    // 01. 首先判断数据长度
    if (data.length <= 0) {
      //对象长度小于0
      logger.error("数据长度小于0");
      result.State = 7; //
      return result;
    }
    //02. 判断地址和内容是否为空
    for (let i = 0; i < lengths; i++) {
      //01.首先判断2个参数都为空
      if ((data[i][0] == null ||data[i][0] == undefined ||data[i][0] == '') && (data[i][1] == null || data[i][1] == undefined || data[i][1] == '')) {
        //01.如果两位数据都是空
        result.UnValid += 1;
        //对象保存 序号：数据
        let rows = {
          no:  i,
          address:data[i][0],
          value: data[i][1],
          state: 1
        }
        result.UnValidData.push(rows);
        //
        continue;
      } else {
        //02. 判断地址为空的情况
        if (data[i][0] == null ||data[i][0] == undefined ||data[i][0] == '') {
          result.UnValid += 1;
          //对象保存 序号：数据
          let rows = {
            no: i,
            address:data[i][0],
            value: data[i][1],
            state: 3
          }
          result.UnValidData.push(rows);
          continue;
        } else if (data[i][1] == null || data[i][1] == undefined || data[i][1] == '') {
          result.UnValidData += 1;
          //对象保存 序号：数据
          let rows = {
            no: i,
            address:data[i][0],
            value: data[i][1],
            state: 5
          }
          result.UnValidData.push(rows);
          continue;
        }
      }
      //02. 判断地址是否合法
      if (!web3.isAddress(data[i][0])) {
        //如果不是有效地址
        result.UnValid += 1;
        //对象保存 序号：数据
        let rows = {
          no: i,
          address:data[i][0],
          value: data[i][1],
          state: 7
        }
        result.UnValidData.push(rows);
        continue;
      } else {
        //如果是有效地址
        result.Valid += 1;
        //对象保存 序号：数据
        let rows = {
          no: i,
          address:data[i][0],
          value: data[i][1],
          state: 2
        }
        result.ValidData.push(rows);
        //分开追加数据
        result.sData.address.push(data[i][0]);
        result.sData.value.push( parseInt(data[i][1]+'00000000'));
      }
      //数据处理完成后，返回参数
      //处理完标志
      result.State = 3;
    }
    return result;


  },

 //发送数据
 SendData:(data)=>{
   let  cData = '2';
   let opt = {
       host:'127.0.0.1', //注意:不用协议部分(http://)
       port:'3003',
       path: '/Bolt/flyDrop', //斜杠开头
       method:'POST',
       headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} //设置content-type 头部
   };

   let body = '';
   let req = http.request(opt, function(res){
       res.statusCode == 200 && console.log('REQUEST OK..' );
       res.setEncoding('utf8');//res为ClientResponse的实例，是readableStream, 设置字符编码

       res.on('data', function(chunk){
           body += chunk;
       }).on('end', function(){
           console.log('Got data: ', body);//end事件中 打印全部响应数据
       });
   }).on('error', function(err){

       console.log('error: ', err.message);
      cData  =  err.message;
       return err;
   });

   let cdata = data;
   let data1 = JSON.stringify(data);
   let data2 = queryString.stringify(cdata); //注意 querystring.stringify 和 JSON.stringify的区别
   // console.log(data1);
   // console.log(data2);
   req.write(data2); //req为ClientRequest的实例，是writableStream，写数据到流中
   req.end();//结束请求
   return cData;
 }
}
//一级启动
var Action_Start ={

  init:(data)=>{
  console.log(data);
  //
  Action_Starting.init();
},

  web_init:()=>{
  console.log("---");
  }
}

//二级启动
var Action_Starting = {
  //
  init:()=>{
    Action_Methods.Init();
    let FileData = Action_Methods.ReadFile();
    let FuData  = Action_Methods.Serializedfile(FileData);
    let ResultData = Action_Methods.CheckData(FuData);
    //
    let Rest =  Action_Methods.SendData(ResultData.sData);
    logger.info("代币空投成功...............");
  }
}
//参数
const JSON_LIST = {
  FileName:{
    File_01:"testdemo1.xlsx",
    File_02:"testdemo1.xlsx"
  }

}

//启动
Action_Start.init("----");
