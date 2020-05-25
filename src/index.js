import * as $ from 'jquery';
import '@style/style.css';

import "core-js/stable";
import "@babel/polyfill";
import "regenerator-runtime/runtime";
import './asyn.js';
import {getWordsWithoutArrays} from "./wordBreaker.js";
import watchNode from "./proxy.js";
import * as User from "./callback.js";



User.regUser()
    .then((result) => {
        console.log(result.msg)
        return User.authUser(result.id)
    })
    .then((result) => {
        console.log(result.msg);
        return User.getUserData(result.token)
    })
    .then((result) => {
        console.log(result)
    })
    .catch((e) => {
        console.log(e)
    })


    