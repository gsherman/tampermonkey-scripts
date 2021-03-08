// ==UserScript==
// @name         identify test tenants
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  identify test tenants
// @author       You
// @match        https://tampermonkey.net/index.php?version=4.7.54&ext=dhdg&updated=true
// @grant GM_log
// @require http://code.jquery.com/jquery-1.11.2.min.js
// @run-at       document-end

// @include    xhttp://localhost/agent/*
// @include    xhttp://localhost/agent/*/*

// @include    https://*test.dovetailnow.com/agent/*
// @include    https://*test.dovetailnow.com/agent/*/*


// ==/UserScript==

(function() {
    'use strict';
    var timer;
    var duration = 300;
    var $ = window.$;

    function observe(){
        var observer = new MutationObserver(resetTimer);
        timer = setTimeout(action, duration, observer); // wait for the page to stay still for some time
        observer.observe(document, {childList: true, subtree: true});
    }

    function resetTimer(changes, observer) {
        clearTimeout(timer);
        timer = setTimeout(action, duration, observer);
    }

    function action(o) {
        o.disconnect();
        stylePage()
    }

    function stylePage(){
        var text = "<span style='color:white;font-weight:bold;font-size:20px;float:left;padding-top:5px;margin-right:30px;'>TEST!</span>";

        //config settings page
        $(".mainbar").css("background-color","red");
        $(text).insertAfter( "a.navbar-brand" );

        //setup page
        $("div.fill").css("background-color","red");

        //spa pages
        $(".navbar").css("cssText", "+=;background-color:red !important;");
        $(".navbar").css("justify-content", "start");

        //setup and spa pages
        $(text).insertAfter( "a.brand" );

    }

    observe();

})();

