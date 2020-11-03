/**
 * @disc: 主网 配置文件
 * @date: 2019-10-10 13:58
 * @author: Wave
 */
"use strict";

//开发模式
export const IS_DEV = process.env.NODE_ENV === 'production';
//请求最迟时间（毫秒）
export const API_TIME = IS_DEV ? '9000' : '9000';
//浏览器连接地址
export const EXPLORER_URL = IS_DEV ? 'http://explorer.nervedex.com/' : 'http://beta.explorer.nervedex.com/';
//ETH 网络信息 测试网:ropsten, 主网:homestead
export const ETHNET = 'homestead';
//默认配置
export const DEFAULT_CONFIG = {
  chainId: 9,
  assetId: 1,
  addressPrefix: "NERVE",
  walletPSUrl: "https://public.nerve.network/",
  walletApiUrl: "https://api.nerve.network/"
};
//跨链资产信息 chainId、assetId
export const CROSS_INFO = {chainId: 1, assetId: 1};
//dex 网络api
export const DEX_URL = IS_DEV ? 'http://pre.nervedex.com/' : 'http://pre.nervedex.com/';
//websocket api
export const WEBSOCKET_URL = () => {
  let newUrl = '';
  //let {host, protocol} = window.location;
  //const wsProtocol = protocol === 'http:' ? 'ws:' : 'wss:';
  if (IS_DEV) {
    //newUrl = wsProtocol + '//' + host + '/ws';
    newUrl = 'ws://pre.nervedex.com/ws';
  } else {
    newUrl = 'ws://pre.nervedex.com/ws';
  }
  return newUrl
};
