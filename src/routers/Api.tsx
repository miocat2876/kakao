import React from 'react';
import axios from 'axios';

const urlList = {
    chatList : {url: 'http://3.35.140.126:9000/apis/chats/rooms', method: 'GET'},
    logout : {url: 'http://3.35.140.126:9000/user/logout', method: 'GET'},//주소없음.
    login : {url: 'http://3.35.140.126:9000/apis/securitys/login', method: 'POST'},
    roomCreate : {url: 'http://3.35.140.126:9000/apis/chats/rooms', method: 'POST'},
    duplicateCheck : {url: 'http://3.35.140.126:9000/apis/users/duplicate_check', method: 'GET'},
    join : {url: 'http://3.35.140.126:9000/apis/users/joins', method: 'POST' ,contentType : false, processData : false}    
}

const Api = (param:any) => {
    const {params, apiname} = param;
    let apiParam = urlList[apiname];
    apiParam.data = params;

    console.log(params);

    return axios(apiParam);
}

export default Api;


