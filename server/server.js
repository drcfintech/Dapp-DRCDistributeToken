const Web3 = require("web3");
const solc = require('solc');
const fs = require("fs");
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const render = require('koa-art-template');
const path = require('path');
const views = require('koa-views');
const HDWalletProvider = require('truffle-hdwallet-provider');
const walletConfig = require('./walletConfig.json');
const Tx = require('ethereumjs-tx');
//init
const app = new Koa();
var web3 = new Web3();
//init contractname
var Contract_Token;
var Contract_Drop;
var Contract_TokenMgr;
/*方法说明
 *@method 方法名
 *@for 所属类名
 *@param{参数类型}参数名 参数说明
 *@return {返回值类型} 返回值说明
*/
/**Read me
 * 1.简称(Token=>T,Drop=>D,TokenMgr=>M)
 * 2.Actions_data=>参数初始化(各种初始化参数)
 * 3.Actions_Koa=>Koa框架以及Koa插件初始化和启动配置(Koa相关)
 * 4.Actions_Router=>router路由的get方法，post方法配置
 * 5.Actions_initWeb3Provider=>web3js相关初始化参数(web3,合约实例等)
 * 6.Actions_Web3jsCommonMethod=>webjs常用的方法(获取各种参数)
 * 7.Actions_Web3jsUtils=>web3js相关的工具方法(转换,校验等)
 * 8.Actions_Contrant_Token=>skt测试代币的相关方法的实现(Token)
 * 9.Actions_Contrant_Drop=> 空投合约的相关方法的实现(Drop)
 *10.Actions_Contrant_TokenMgr=>项目之前空投合约的相关方法的实现(TokenMgr)
 *11.Actions_Configure=>项目相关配置信息()
 *12.Json_list=>常量信息的相关管理(abi,合约地址,gas参数,等)
 *13.Json_Bz=>其它备注信息(追加,扩展)
 */
//2.Actions_data=>参数初始化(各种初始化参数)
var Actions_data = {
  Type_init: () => {

  }
}
//3.Actions_Koa=>Koa框架以及Koa插件初始化和启动配置(Koa相关)
var Actions_Koa = {
  render: () => {
    render(app, {
      root: path.join(__dirname, '../views'), // 视图的位置
      extname: '.html', // 后缀名
      debug: process.env.NODE_ENV !== 'production' //是否开启调试模式
    })
  },
  user: () => {
    app.use(views('../views', {
      extension: 'ejs'
    }));
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.use(bodyParser());
    app.listen(3003, () => {
      console.log("start at port 3003");
    });
  }

}
//4.Actions_Router=>router路由的get方法，post方法配置
var Actions_Router = {
  router_get: () => {

    router.get('/', (ctx, next) => {
      // TODO:
      ctx.body = "测试路由";
    });
    //
    router.get('/Token/T_transferFrom', (ctx, next) => {
      // TODO:校验数据
      let sFrom = Json_list.ADDRESS_TOKEN;
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_transferFrom({
          from: data,
          to: data,
          value: data
        });
        console.log("1111=>", result);
        return result;
      }
      //结果返回
      deploy(sFrom).then(res => {
        ctx.body = "调用tranfer结果是=>" + res;
      });
    });

    router.get('/Token/T_transfer', (ctx, next) => {
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_transfer({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用tranfer结果是=>" + res;
      });
    });
    router.get('/Token/T_balanceOf', (ctx, next) => {
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_balanceOf({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用T_balanceOf结果是=>" + res;
      });
    });

    router.get('/Token/T_approve', (ctx, next) => {
      // TODO:
      ctx.body = "T_approve"; //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_approve({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用T_approve结果是=>" + res;
      });
    });

    router.get('/Token/T_allowance', (ctx, next) => {
      // TODO:
      ctx.body = "T_allowance";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.T_allowance({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用T_allowance结果是=>" + res;
      });
    });

    router.get('/Drop/D_setToken', (ctx, next) => {
      // TODO:
      ctx.body = "D_setToken";
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Drop.D_setToken({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用D_setToken结果是=>" + res;
      });
    });

    router.get('/Drop/D_multiSendandself', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiSendandself";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Drop.D_multiSendandself({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {
        ctx.body = "调用D_multiSendandself结果是=>" + res;

      });
    });

    router.get('/Drop/D_multiSend', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiSend";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_setToken({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    router.get('/Drop/D_multiSend2', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiSend2";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_multiSend2({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    router.get('/Drop/D_multiself', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiself";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_multiself({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    router.get('/Drop/D_settrustOwner', (ctx, next) => {
      // TODO:
      ctx.body = "D_settrustOwner";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_settrustOwner({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    router.get('/Drop/D_seterctypeName', (ctx, next) => {
      // TODO:
      ctx.body = "D_seterctypeName";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_seterctypeName({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    router.get('/Drop/D_sethistoricalOwner', (ctx, next) => {
      // TODO:
      ctx.body = "D_sethistoricalOwner";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_sethistoricalOwner({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    router.get('/Drop/D_transfer', (ctx, next) => {
      // TODO:
      ctx.body = "D_transfer";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_transfer({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    router.get('/Drop/D_approve', (ctx, next) => {
      // TODO:
      ctx.body = "D_approve";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_approve({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    router.get('/Drop/D_transferFrom', (ctx, next) => {
      // TODO:
      ctx.body = "D_transferFrom";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_transferFrom({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });

    router.get('/Drop/D_balanceOf', (ctx, next) => {
      // TODO:
      ctx.body = "D_balanceOf";
      // TODO:
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {
        data: {
          address: ctx.request.query.address,
          uint256: ctx.request.query.uint256
        },
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      deploy = async (data, next) => {
        let result = await Actions_Contrant_Token.D_balanceOf({
          state: data,
          data: data,
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      deploy(Pms_package.data).then(res => {});
    });
    //
    //  M_prepare 路由
    router.get('/Drop/M_prepare', (ctx, next) => {
      //  01. TODO:校验数据
      //  02. 解析数据打包
      let Pms_package = {

        //参数解析
        data: {
          rand: ctx.request.query.rand,//数组
          from: ctx.request.query.from,
          token: ctx.request.query.token,
          value: ctx.request.query.value
        },

        //url 解析
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },

        //地址解析
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      Querydata = async (data, next) => {
        //调用查询合约方法
        let result = await Actions_Contrant_TokenMgr.M_prePare({
          //1.状态
          state: data,
          //2.参数
          data: data,
          //3.系统参数
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      Querydata(Pms_package.data).then(res => {
        ctx.body = "调用M_prePare结果是=>" + res;
      });
    });

    router.get('/Drop/M_flyDrop', (ctx, next) => {
      //  01. TODO:校验数据
      console.log("url：http://127.0.0.1:3003/Drop/M_flyDrop");
      //  02. 解析数据打包
      let Pms_package = {

        //参数解析
        data: {
          destAddrs: ctx.request.query.destAddrs,//数组
          values: ctx.request.query.value
        },

        //url 解析
        ctx: {
          url: ctx.url,
          request: ctx.request,
          req_querystring: ctx.req_querystring,
          req_querystring: ctx.req_querystring
        },

        //地址解析
        address: {
          from: "",
          to: "",
          value: ''
        },
        bz: {}
      }
      //  03. 查询方法
      Querydata = async (data, next) => {
        //调用查询合约方法
        let result = await Actions_Contrant_TokenMgr.M_flyDrop({
          //1.状态
          state: data,
          //2.参数
          data: data,
          //3.系统参数
          system: data
        });
        console.log("=>", result);
        return result;
      }
      //  04. 结果返回
      Querydata(Pms_package.data).then(res => {
        ctx.body = "调用flyDrop结果是=>" + res;
      });
    });
  },
  router_post: () => {

    router.post('/', (ctx, next) => {
      // TODO:
      ctx.body = "测试路由111";
    });
    //
    router.post('/Token/T_transferFrom', (ctx, next) => {
      // TODO:
      ctx.body = "T_transferFrom";
      //ctx.request.body
    });

    router.post('/Token/T_transfer', (ctx, next) => {
      // TODO:
      ctx.body = "T_transfer";
    });

    router.post('/Token/T_approve', (ctx, next) => {
      // TODO:
      ctx.body = "T_approve";
    });

    router.post('/Token/T_allowance', (ctx, next) => {
      // TODO:
      ctx.body = "T_allowance";
    });

    router.post('/Drop/D_setToken', (ctx, next) => {
      // TODO:
      ctx.body = "D_setToken";
    });

    router.post('/Drop/D_multiSendandself', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiSendandself";
    });

    router.post('/Drop/D_multiSend', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiSend";
    });

    router.post('/Drop/D_multiSend2', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiSend2";
    });

    router.post('/Drop/D_multiself', (ctx, next) => {
      // TODO:
      ctx.body = "D_multiself";
    });

    router.post('/Drop/D_settrustOwner', (ctx, next) => {
      // TODO:
      ctx.body = "D_settrustOwner";
    });

    router.post('/Drop/D_seterctypeName', (ctx, next) => {
      // TODO:
      ctx.body = "D_seterctypeName";
    });

    router.post('/Drop/D_sethistoricalOwner', (ctx, next) => {
      // TODO:
      ctx.body = "D_sethistoricalOwner";
    });

    router.post('/Drop/D_transfer', (ctx, next) => {
      // TODO:
      ctx.body = "D_transfer";
    });

    router.post('/Drop/D_approve', (ctx, next) => {
      // TODO:
      ctx.body = "D_approve";
    });

    router.post('/Drop/D_transferFrom', (ctx, next) => {
      // TODO:
      ctx.body = "D_transferFrom";
    });

    router.post('/Drop/D_balanceOf', (ctx, next) => {
      // TODO:
      ctx.body = "D_balanceOf";
    });

    //
    router.post('/Drop/M_prePare', (ctx, next) => {
      // TODO:
      ctx.body = "M_prepare";
    });

    router.post('/Drop/M_flyDrop', (ctx, next) => {
      // TODO:
      ctx.body = "M_flyDrop";
    });

  }
}
//5.Actions_initWeb3Provider=>web3js相关初始化参数(web3,合约实例等)
var Actions_initWeb3Provider = {
  initWeb3: () => {
    //创建一个web3实例，设置一个provider,成功引入后，就可以用web3的api
    if (typeof web3 == 'undefined') {
      web3 = new Web3(web3.currentProvider); //新建web3对象
      console.log("web  undefined");
    } else {
      // TODO:
      web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/ee23e77aa14846d88eb5cad3d59e37f2"));
      //
      console.log("web3初始化完成");
    } //设置一个provider
    // TODO:
    console.log("web3实例化完成=>");
    console.log("web3.currentProvider=>", web3.currentProvider);
    console.log("web3是否连接成功=>", web3.isConnected());
    console.log("默认账户", web3.eth.defaultAccount);
    console.log("默认区块", web3.eth.defaultBlock);
    // web3.eth.defaultAccount = "";
    web3.eth.defaultAccount = '0x38a8DC14edE1DEf9C437bB3647445eEec06fF105';
    console.log("默认账户", web3.eth.defaultAccount);

  },
  initContract_Token: () => {
    // TODO:
    let Abi_Token = Json_list.ABI_TOKEN;
    let Address_Token = Json_list.ADDRESS_TOKEN;
    //Token  实例化
    Contract_Token = web3.eth.contract(Abi_Token).at(Address_Token);
    // TODO:
    console.log("Token合约实例完成=>");
  },
  initContract_Drop: () => {
    // TODO:
    let Abi_drop =  Json_list.ABI_DROP;
    let Address_drop =Json_list.ADDRESS_DROP;
    //drop  实例化
   Contract_Drop = web3.eth.contract(Abi_drop).at(Address_drop);
  },
  initContract_TokenMgr: () => {
    // TODO:
    let Abi_TokenMgr = "";
    let Address_TokenMgr = "";
    //TokenMgr  实例化
    var Contract_drop = web3.eth.constant(Abi_TokenMgr).at(Address_TokenMgr);
  }
}
//6.Actions_Web3jsCommonMethod=>webjs常用的方法(获取各种参数)
var Actions_Web3jsCommonMethod = {
  web_api: () => {
    // TODO:
  },
  web_node: () => {
    // TODO:

  },
  web3_isConnected: () => {
    // TODO:
  },
  web3_currentProvider: () => {
    // TODO:
  }
}
//7.Actions_Web3jsUtils=>web3js相关的工具方法(转换,校验等)
var Actions_Web3jsUtils = {
  web_api: () => {
    // TODO:
  },
  web_node: () => {
    // TODO:

  },
  web3_isConnected: () => {
    // TODO:
  },

  //工具函数@预估gas
  web3_estimateGas: (address, data) => {
    // TODO:
    let estimateGas = web3.eth.estimateGas({
      to: address,
      data: data
    });
    estimateGas = this.web3.toHex(estimateGas);
    return estimateGas;
  },
  // 工具函数@预估区块高度
  web3_getNonce: (address) => {
    // TODO:
    let nonce = web3.eth.getTransactionCount(address);
    return nonce;
  },
  //工具函数@序列化私钥
  web3_bufferPrivateKey: (value) => {
    // TODO:from
    const privateKey = new Buffer.from(value, 'hex');
    return privateKey;
  },
  web3_currentProvider: () => {
    // TODO:
  }
}
//8.Actions_Contrant_Token=>skt测试代币的相关方法的实现(Token)
var Actions_Contrant_Token = {
  /*方法说明
   *@method T_transferFrom 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:_from(address),2:_value(uint256)}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  T_transferFrom: async (data) => {
    // TODO:
    console.log("调用合约方法-Token-T_transferFrom...");
    //参数
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address _form",
        param2:"address _to",
        param3:"uint256 _value"
      },
      Value:{
        param1:data.from,
        param2:data.to,
        param3:data.value
      }
    }
    // let data;
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      //// TODO:
      Tx_data: Contract_Token.transferFrom.getData(Parames_address.fromAddress, Parames_address.toAddress, 1000000000, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Drop_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  },
  /*方法说明
   *@method T_transfer 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:_to(address),2:_value(uint256)}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  T_transfer: async (data) => {
    // TODO:
    console.log("调用合约方法-Token-T_transfer...");
    //参数
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address _form",
        param2:"uint256 _value"
      },
      Value:{
        param1:data.from,
        param2:data.value
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Token.transfer.getData(Parames_address.fromAddress, Parames_address.toAddress, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Token_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  },
  /*方法说明
   *@method T_balanceOf 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:_owner(address)}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  T_balanceOf: async (data) => {
    // TODO:
    console.log("3调用合约方法-Token-T_balanceOf........");
    //参数
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address _owner"
      },
      Value:{
        param1:data.owner,
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Token.balanceOf.getData(Parames_address.fromAddress, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Token_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  },
  /*方法说明
   *@method T_approve 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:spender(address),2:value(uint256)}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  T_approve: async (data) => {
    // TODO:
    console.log("调用合约方法-Token-T_approve...");
    //参数
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address _spender",
        param2:"uint256 _value"
      },
      Value:{
        param1:data.spender,
        param2:data.value
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Token.approve.getData(Parames_address.fromAddress,Parames_data.Value.param2, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Token_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  },
  /*方法说明
   *@method T_allowance 方法名
   *@for Actions_Contrant_Token 所属
   *@param{{1:_owner(address),2:_spender(address)}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  T_allowance: async (data) => {
    // TODO:
    console.log("调用合约方法-Token-T_allowance...");
    //参数
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address _owner",
        param2:"address _spender"
      },
      Value:{
        param1:data.owner,
        param2:data.spender
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Token.allowance.getData(Parames_data.Value.param1,Parames_data.Value.param2, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Token_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  }
}
//9.Actions_Contrant_Drop=> 空投合约的相关方法的实现(Drop)
var Actions_Contrant_Drop = {

  /*方法说明
   *@method D_setToken :设置代币种类  //设置代币
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_token(address)}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_setToken: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_setToken...");
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address _token"
      },
      Value:{
        param1:data.token
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.setToken.getData(Parames_address.fromAddress, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Token_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  },
  /*方法说明
   *@method D_multiSendandself
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_destAddrs(address[],2:_valuesmyself(uint256[]),3:_valuesmyself(uint256))}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_multiSendandself: async (data) => {
    //参数
    console.log("调用合约方法-D_multiSendandself...");
    let result; //结果集
    let Parames_data = {
      Type:{

        param1:"address[] _destAddrs",
        param2:"uint256[] _values",
        param3:"uint256 _valuesmyself"
      },
      Value:{
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.multiSendandself.getData(Parames_data.Value.param1,Parames_data.Value.param2,Parames_data.Value.param3, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Token_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  },
  /*方法说明
   *@method D_multiSend
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_destAddrs(address[],2:_valuesmyself(uint256[]))}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_multiSend: async (data) => {
    //参数
    console.log("调用合约方法-D_multiSend...");
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address[] _destAddrs",
        param2:"uint256[] _values"
      },
      Value:{
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
        param1:data.destAddrs,
        param2:data.values,
        param3:data.valuesmyself
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.multiSend.getData(Parames_data.Value.param1,Parames_data.Value.param2,Parames_data.Value.param3, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Token_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  },
  /*方法说明
   *@method D_multiSend2
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_destAddrs(address[],2:_values(uint256[]) )}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_multiSend2: async (data) => {
    //参数
    console.log("调用合约方法-D_multiSend2...");
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address[] _destAddrs",
        param2:"uint256[] _values"
      },
      Value:{
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
        param1:data.destAddrs,
        param2:data.values,
        param3:data.valuesmyself
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.multiSend2.getData(Parames_data.Value.param1,Parames_data.Value.param2,Parames_data.Value.param3, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Token_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  },
  /*方法说明
   *@method D_multiself
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_multiself: async (data) => {
    //参数
    console.log("调用合约方法-D_multiSendandself...");
    let result; //结果集
    let Parames_data = {
      Type:{

        param1:"address[] _destAddrs",
        param2:"uint256[] _values",
        param3:"uint256 _valuesmyself"
      },
      Value:{
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.multiSendandself.getData(Parames_data.Value.param1,Parames_data.Value.param2,Parames_data.Value.param3, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Token_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  },
  /*方法说明
   *@method D_settrustOwner 存入白名单
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_settrustOwner: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_settrustOwner...");
    let result; //结果集
    //
    let Parames_data = {
      Type:{
        param1:"address _ownaddress",
        param2:"string memory _owntext"
      },
      Value:{
        ownaddress:data.ownaddress,
        owntext:data.owntext
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.settrustOwner.getData(Parames_data.Value.ownaddress, Parames_data.Value.owntext,{
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Drop_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   return result;
  },
  /*方法说明
   *@method D_seterctypeName
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_seterctypeName: async (data) => {
    //参数
    console.log("调用合约方法-D_seterctypeName...");
    let result; //结果集
    let Parames_data = {
      Type:{

        param1:"address _tokentype",
        param2:"string[] _tokenName"
      },
      Value:{
        // param1:data.destAddrs,
        // param2:data.values,
        // param3:data.valuesmyself
        // param1:data.destAddrs,
        tokentype:data.tokentype,
        tokenName:data.tokenName
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.multiSendandself.getData(Parames_data.Value.tokentype,Parames_data.Value.tokenName, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Drop_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   //
   return result;
  },
  /*方法说明
   *@method D_sethistoricalOwner
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_sethistoricalOwner: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_sethistoricalOwner......");
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address _hisaddress",
        param2:"string _histext"
      },
      Value:{
        hisaddress:data.hisaddress,
        histext:data.histext
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.transfer.getData(Parames_data.Value.hisaddress,Parames_data.Value.histext, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.Drop_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   //
   return result;
  },
  /*方法说明
   *@method D_transfer
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_transfer: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_transfer......");
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address to",
        param2:"uint256 value"
      },
      Value:{
        to:data.to,
        value:data.value
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.transfer.getData(Parames_data.Value.to,Parames_data.Value.value, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.TokenMgr_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   //
   return result;
  },
  /*方法说明
   *@method D_approve
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_approve: async (data) => {
    //参数
    //参数
    console.log("调用合约方法-Token-D_approve......");
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address spender",
        param2:"uint256 value"
      },
      Value:{
        spender:data.spender,
        value:data.value
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.approve.getData(Parames_data.Value.spender,Parames_data.Value.value, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.TokenMgr_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   //
   return result;
  },
  /*方法说明
   *@method D_transferFrom
   *@for Actions_Contrant_Drop 所属
   *@param{{1:_values(uint256),2:addres_owner(address))}}参数名 参数说明
   *@return {1:hash} 返回值说明
  */
  D_transferFrom: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_transferFrom...");
    let result; //结果集
    let Parames_data = {
      Type:{
        param1:"address from",
        param2:"address indexed to",
        param3:"uint256 value"
      },
      Value:{
        from:data.from,
        to:data.to,
        value:data.value
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.transferFrom.getData(Parames_data.Value.from,Parames_data.Value.to,Parames_data.Value.value, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.TokenMgr_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   //返回
   return result;
  },
  D_totalSupply: async (data) => {
    //参数
    console.log("调用合约方法-Token-D_totalSupply...");
    let result; //结果集
    //
    let Parames_data = {
      Type:{
        //空
      },
      Value:{
        //nil
      }
    // TODO:
  }
    // let data;
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_TokenMgr.totalSupply.getData((), {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.TokenMgr_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   //
   return result;
  },
  D_balanceOf: async (data) => {
    //参数
    console.log("调用合约方法-Actions_Contrant_Drop-D_balanceOf...");
    let result; //结果集

    let Parames_data = {
      Type:{
        param1:"address who"
      },
      Value:{
        who:data.who
      }
    }
    // let data;
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),
      Tx_gasLimit: web3.toHex(90000),
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",
      // TODO:
      Tx_data: Contract_Drop.balanceOf.getData(Parames_data.Value.who, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.TokenMgr_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   //
   return result;
  }
}
//10.Actions_Contrant_TokenMgr=>项目之前空投合约的相关方法的实现(TokenMgr)
var Actions_Contrant_TokenMgr = {
  /*方法说明
   *@method M_prePare :将令牌发送到一个函数中的其他多个地址
   *@for Actions_Contrant_TokenMgr 所属
   *@param_rand随机索引，用于选择FlyDropToken契约地址
   *@param_From地址-您希望从地址发起
   *@param_value uint 256发送令牌的地址发送
   *@param_Token地址ERC 20令牌地址
   *@return {1:hash} 返回值说明
  */
  M_prePare: async (data) => {
    // TODO:
    //参数
    console.log("调用合约方法-TokenMgr-M_prePare......");
    let result; //结果集
    //参数结构
    let Parames_data = {
      Type:{
        param1:"uint256 _rand",
        param2:"address _from",
        param3:"address _token",
        param4:"uint256 _value"
      },
      Value:{
        param1:data.rand,
        param2:data.from,
        param3:data.token,
        param4:data.value
      }
    }
    // let data;
    // TODO:
    //地址
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),// TODO:
      Tx_gasLimit: web3.toHex(90000),// TODO:
      Tx_from: Parames_address.fromAddress,
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",// TODO:
      // TODO:
      Tx_data: Contract_TokenMgr.prepare.getData(
        Parames_data.Value.rand,
        Parames_data.Value.from,
        Parames_data.Value.token,
        Parames_data.Value.value,{
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.TokenMgr_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   //08.  back
   return result;
  },

  /*方法说明
   *@method M_flyDrop :将令牌发送到一个函数中的其他多个地址
   *@for Actions_Contrant_TokenMgr 所属
   *@param_destAddrs将要发送令牌的地址发送
   *@param_value uint 256要发送的令牌数量
   *@return {1:hash} 返回值说明
  */
  M_flyDrop: async (data) => {
    // TODO:
    //参数
    console.log("调用合约方法-TokenMgr-M_flyDrop......");
    let result; //结果集
    //参数结构
    let Parames_data = {
      Type:{
        param1:"address[]  _destAddrs",
        param2:"uint256[]  _values"
      },
      Value:{
        destAddrs:data.destAddrs,
        values:data.values
      }
    }
    // TODO:
    let Parames_address = {
      //合约地址
      contractAddress: "0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a",
      //发送者
      fromAddress: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
      //调用者
      toAddress: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1"
    }
    //  04. 打包数据
    let Parames_row = {
      Tx_nonce: web3.toHex(web3.eth.getTransactionCount(Parames_address.fromAddress)),
      Tx_gasPrice: web3.toHex(web3.eth.gasPrice),// TODO:
      Tx_gasLimit: web3.toHex(90000),// TODO:
      Tx_from: Parames_address.fromAddress,// TODO:
      Tx_to: Parames_address.contractAddress,
      Tx_value: "0x0",// TODO:
      // TODO:
      Tx_data: Contract_Drop.flyDrop.getData(Parames_data.Value.destAddrs,Parames_data.Value.values, {
        from: Parames_address.fromAddress
      })
    }
    //  05  对接数据
    let rawTx = {
      nonce: Parames_row.Tx_nonce,
      gasPrice: Parames_row.Tx_gasPrice, // TODO:
      gasLimit: Parames_row.Tx_gasLimit,
      from: Parames_row.Tx_from,
      to: Parames_row.Tx_to,
      value: Parames_row.Tx_value, // TODO:
      data: Parames_row.Tx_data
    }
    //06.获取处理后的数据
   let SignData =  Actions_CommonTool.Tool_SignData({rawTx:rawTx,key:Json_list.PRIVATEKEY.TokenMgr_privateKey});
   //07.  发送
   result = await web3.eth.sendRawTransaction(SignData);
   //08.  back
   return result;
  }
}
//11.Actions_Configure=>项目相关配置信息()
var Actions_Configure = {
  Abi_Token: {

  },
  Abi_drop: {

  },
  Abi_TokenMgr: {

  }

}
//13.Actions_Commontool =>公共方法
var Actions_CommonTool = {

  Tool_SignData: (data) => {
    //  01.封装对象
    let tx = new Tx(data.rawTx);
    //  02.序列化私钥
    let privateKey = Actions_Web3jsUtils.web3_bufferPrivateKey(data.key);
    //  03. 用私钥给数据签名
    tx.sign(privateKey);
    //  04. 对数据编码
    let serializeTx ='0x'+ tx.serialize().toString('hex');
    //  05 返回
    return  serializeTx;
  },
  Tool_bufferPrivateKey: (data) => {
    let  key;
    switch (data.key) {
      case 'key_token':
        key = Actions_Web3jsUtils.web3_bufferPrivateKey(Json_list.PRIVATEKEY.Token_privateKey);
        break;
      case 'key_drop':
        key = Actions_Web3jsUtils.web3_bufferPrivateKey(Json_list.PRIVATEKEY.Drop_privateKey);
        break;
      case 'key_mgr':
        key = Actions_Web3jsUtils.web3_bufferPrivateKey(Json_list.PRIVATEKEY.TokenMgr_privateKey);
          break;
      default:
        key = "";
          break;
    }
    return key;
  },
  Tool_bufferPrivateKey11: () => {


  }

}
//12.Json_list=>常量信息的相关管理(abi,合约地址,gas参数,等)
const Json_list = {
  ABI_TOKEN: [{
      "constant": false,
      "inputs": [{
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [{
        "name": "success",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [{
        "name": "success",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "_owner",
        "type": "address"
      }],
      "name": "balanceOf",
      "outputs": [{
        "name": "balance",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [{
        "name": "success",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [{
        "name": "remaining",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    }
  ],
  ADDRESS_TOKEN: '0xaA3A01dBa149B109d5e9090f1ad1f2cEbA1C272a',
  ABI_DROP: [{
      "constant": false,
      "inputs": [{
          "name": "spender",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_destAddrs",
          "type": "address[]"
        },
        {
          "name": "_values",
          "type": "uint256[]"
        },
        {
          "name": "_valuesmyself",
          "type": "uint256"
        }
      ],
      "name": "multiSendandself",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
        "name": "_token",
        "type": "address"
      }],
      "name": "setToken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "",
        "type": "address"
      }],
      "name": "historicalOwner",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "from",
          "type": "address"
        },
        {
          "name": "to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "",
        "type": "address"
      }],
      "name": "snList",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "spender",
          "type": "address"
        },
        {
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "",
        "type": "address"
      }],
      "name": "erctypeName",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
        "name": "_owneraddress",
        "type": "address"
      }],
      "name": "deltrustOwner",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "",
        "type": "address"
      }],
      "name": "trustOwner",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_destAddrs",
          "type": "address[]"
        },
        {
          "name": "_values",
          "type": "uint256[]"
        }
      ],
      "name": "multiSend2",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_ownaddress",
          "type": "address"
        },
        {
          "name": "_owntext",
          "type": "string"
        }
      ],
      "name": "settrustOwner",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "owner",
        "type": "address"
      }],
      "name": "balanceOf",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "a",
        "type": "string"
      }],
      "name": "myself",
      "outputs": [{
        "name": "",
        "type": "string"
      }],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
          "name": "a",
          "type": "uint256"
        },
        {
          "name": "b",
          "type": "uint256"
        }
      ],
      "name": "add",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [{
        "name": "",
        "type": "address"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_tokentype",
          "type": "address"
        },
        {
          "name": "_tokenName",
          "type": "string"
        }
      ],
      "name": "seterctypeName",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "spender",
          "type": "address"
        },
        {
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "to",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_destAddrs",
          "type": "address[]"
        },
        {
          "name": "_values",
          "type": "uint256[]"
        }
      ],
      "name": "multiSend",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_values",
          "type": "uint256"
        },
        {
          "name": "addres_owner",
          "type": "address"
        }
      ],
      "name": "multiself",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
          "name": "owner",
          "type": "address"
        },
        {
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_hisaddress",
          "type": "address"
        },
        {
          "name": "_histext",
          "type": "string"
        }
      ],
      "name": "sethistoricalOwner",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    }
  ],
  ADDRESS_DROP: '0x7Dc6Dc91178a6fEF2Fa5Bd1de32c5642e6Ae421b',
  ABI_TOKENMGR: [],
  ADDRESS_TOKENMGR: "",
  PRIVATEKEY: {
    Token_privateKey: "F9B224ECF9161EEA3A815338FA70EF11F82AC1C5CAB145D264ADC1E110FA0907",
    TokenMgr_privateKey: "F9B224ECF9161EEA3A815338FA70EF11F82AC1C5CAB145D264ADC1E110FA0907",
    Drop_privateKey: "F9B224ECF9161EEA3A815338FA70EF11F82AC1C5CAB145D264ADC1E110FA0907",
    TEST: "123"
  },
  USE_ADDRESS: {
    User_1: "0x38a8DC14edE1DEf9C437bB3647445eEec06fF105",
    User_2: "0xd2580AB2EB3313B0972e9e47b05eE4c15320A6D1",
    User_3: "0xA9af645Ce31AF413b24a3b913f1a5Bf57A7a1C50",
    User_4: "0x3846a0e5e3a93900B5c0F8BA1504e0B55Ca201e5"
  }

};
//13.追加配置
const Json_Bz = {};
//二级启动
var Actions_Starting = {
  //init  web3, 合约对象
  init: () => {
    //
    Actions_initWeb3Provider.initWeb3();
    // Actions_initWeb3Provider.initContract_Token();
    Actions_initWeb3Provider.initContract_Drop();
  },
  //test 启动
  test: () => {
    console.log("log........");
  },
  log: () => {
    console.log("-");
  }
}
//一级启动
var Actions = {
  //Action 启动其它函数
  init: (data) => {
    Actions_Koa.render();
    Actions_Koa.user();
    //
    Actions_Router.router_get();
    Actions_Router.router_post();
    //
    Actions_Starting.init();
    // Actions_Starting.test;

    // Actions_initWeb3Provider.initWeb3();
    // Actions_initWeb3Provider.initContract_Token();
    console.log(data);
  }
}
//启动
Actions.init("starting........");
