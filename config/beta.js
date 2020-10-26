/**
 * @disc: 测试网 配置文件
 * @date: 2019-10-10 13:58
 * @author: Wave
 */
"use strict";
//开发模式
export const IS_DEV = process.env.NODE_ENV === 'production';
//请求最迟时间（毫秒）
export const API_TIME = IS_DEV ? '9000' : '7000';
//浏览器连接地址
export const EXPLORER_URL = 'http://beta.explorer.nervedex.com/';
//ETH 网络信息 测试网:ropsten, 主网:homestead
export const ETHNET = 'ropsten';
//默认配置
export const DEFAULT_CONFIG = {
  chainId: 5,
  assetId: 1,
  addressPrefix: "TNVT",
  walletPSUrl: "http://beta.public.nerve.network/",
  walletApiUrl: "http://beta.api.nerve.network/"
};
//跨链资产信息 chainId、assetId
export const CROSS_INFO = {chainId: 2, assetId: 1};
//dex 网络api
//export const DEX_URL = IS_DEV ? '/' : 'http://192.168.1.60:8081';
export const DEX_URL = IS_DEV ? '/' : 'http://beta.nervedex.com';
//websocket api
export const WEBSOCKET_URL = () => {
  let newUrl = '';
  let {host, protocol} = window.location;
  const wsProtocol = protocol === 'http:' ? 'ws:' : 'wss:';
  if (IS_DEV) {
    // let newHost = window.location.host;
    newUrl = wsProtocol+'//' + host + '/ws';
  } else {
    //newUrl = wsProtocol+'//192.168.1.60:8081/ws';
    newUrl = 'ws://beta.nervedex.com/ws';
  }
  return newUrl
};
