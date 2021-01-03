import React from 'react';
import axios from 'axios';

const urlList = {
    chatList : {url: 'http://3.35.140.126:9000/apis/chats/rooms', method: 'get'},
    logout : {url: 'http://3.35.140.126:9000/user/logout', method: 'get'},
    login : {url: 'http://3.35.140.126:9000/apis/securitys/login', method: 'POST'},
    roomCreate : {url: 'http://3.35.140.126:9000/chat/room-create', method: 'POST'}
}

const Api = (param:any) => {
    const {params, apiname} = param;
<<<<<<< HEAD
=======

    console.log(params);
    // console.log(apiname);
>>>>>>> 389e6fd3af16df7696bc70d0c3b4b8a404385a34
    console.log(urlList[apiname]);
    let apiParam = {url: urlList[apiname].url, method: urlList[apiname].method, data: params};

    
    return axios(apiParam);

}

export default Api;


