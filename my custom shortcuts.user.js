// ==UserScript==
// @name         my custom shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tampermonkey.net/index.php?version=4.7.54&ext=dhdg&updated=true
// @grant       GM.xmlHttpRequest
// @include     http://localhost/agent/*
// @require     http://cdn.craig.is/js/mousetrap/mousetrap.min.js?9d308
// @require      http://code.jquery.com/jquery-1.11.2.min.js

// ==/UserScript==

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );

    Mousetrap.bind('g b', openBatchActionReportPage);
    Mousetrap.bind('g u p', openPreferences);
    Mousetrap.bind('g p c', openPortalConfig);
    Mousetrap.bind(['command+i', 'ctrl+i'],findById);

    function openBatchActionReportPage(){
        document.location = 'http://localhost/agent/batch-action-reports/';
    }

    function openPreferences(){
        document.location = 'http://localhost/agent/preferences';
    }

    function openPortalConfig(){
        document.location = 'http://localhost/agent/admin/portal-configs';
    }

    function findById(){
        var caseId = prompt("Enter an ID number\nBy default, it's a Case ID\nFor Solutions, use \"Solution + ID\"", "");
        if (!caseId) {return false;}

        var token = unsafeWindow.dtData.security.antiForgery;
        var formData = "GoToText=" + caseId + "&__RequestVerificationToken=" + encodeURIComponent(token);

        GM.xmlHttpRequest({
            method: "POST",
            url: "http://localhost/agent/go/goto",
            data: formData,
            headers: {"Content-Type": "application/x-www-form-urlencoded","Accept":"application/json"},
            onload: function(response) {
                if (response.status === 200) {
                    //response looks like:
                    //
                    // <html><body><textarea rows="10" cols="80">{"success":true,"refresh":false,"navigatePage":"/agent/case/7af0476f-10e3-4d7b-8d84-acdb015cbf2e"}</textarea></body></html>
                    // OR
                    // <html><body><textarea rows="10" cols="80">{"success":false,"refresh":false,"errors":[{"category":null,"field":"en-US_GoToText","label":null,"message":"Could not find object matching the criteria"}]}</textarea></body></html>
                    // sheesh

                    var parser = new DOMParser();
                    var htmlDoc = parser.parseFromString(response.responseText, 'text/html');
                    var textareaValue = htmlDoc.getElementsByTagName('textarea')[0].value;
                    var json = JSON.parse(textareaValue);
                    if (json.success)
                    {
                        document.location = json.navigatePage;
                    }else{
                        alert(caseId + ': ' + json.errors[0].message);
                    }
                }else{
                    alert(response.responseText);
                }
            }
        })

        return false;
    }


})();

