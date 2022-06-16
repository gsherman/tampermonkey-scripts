// ==UserScript==
// @name         employee page styling improvements
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  employee page styling improvements
// @author       You
// @match        https://tampermonkey.net/index.php?version=4.7.54&ext=dhdg&updated=true
// @grant GM_log
// @grant GM_addStyle
// @require http://code.jquery.com/jquery-1.11.2.min.js
// @match  https://default.lclhst.io/agent/employees/*

// ==/UserScript==

(function() {
    'use strict';
    var $ = window.$;

    GM_addStyle(`

.cclyiy:nth-child(n+3) {margin-top: 3.0rem;}
.cclyiy table{
    border: solid 1px #c7c3c3;
    border-radius: 0.5rem;
    border-collapse: separate;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
    }
div.details .hAeJjz:nth-child(1)  {margin-bottom:3.0rem;}
h5 {margin-bottom:10px !important;}

`);


})();

