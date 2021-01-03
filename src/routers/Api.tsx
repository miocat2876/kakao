import React from 'react';
import axios from 'axios';

const urlList = {
    chatList : {url: 'http://3.35.140.126:9000/apis/chats/rooms', method: 'get'}

}
const Api = (param:any) => {
    // console.log(param);
    const {params, apiname} = param;
    // console.log(apiname);
    console.log(urlList[apiname]);
    let apiParam = {url: urlList[apiname].url, method: urlList[apiname].method, params: params};

    
    return axios(apiParam);

}

export default Api;


