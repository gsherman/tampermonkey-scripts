// ==UserScript==
// @name         DEES - show full app setting name
// @namespace    http://tampermonkey.net/
// @version      0.1
// @icon         http://localhost/logos/crosshatch.jpg
// @description  click edit button for a setting - display the full setting name
// @author       Gary Sherman
// @match        https://tampermonkey.net/index.php?version=4.7.54&ext=dhdg&updated=true
// @match        https://default.lclhst.io/agent/admin/settings
// @match        https://default.lclhst.io/agent/admin/settings/*
// @match        https://*.dovetailnow.com/agent/admin/settings
// @match        https://*.dovetailnow.com/agent/admin/settings/*
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// @grant        GM_addStyle

// ==/UserScript==
//TODO: fix: this doesn't work correctly if multiple settings are being edited at the same time. So just edit one at a time.

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );

    function on_window_click(event)
    {
    let e = event.target;

    while (e !== null)
    {
        if (e.getAttribute(`data-testid`) == 'edit-button')
        {
            var form = jQ( "form[data-testid='edit-form']")[0];

            var formField = jQ(form).find('input')[0];
            if (!formField){
                formField = jQ(form).find('textarea')[0];
            }
            if (!formField){
                formField = jQ(form).find('select')[0];
            }

            var settingKey = formField.getAttribute('id');
            jQ(form).prepend( "<p><b>FullSettingName: </b>" + settingKey + " </p>" );
        }

        e = e.parentElement;
    }
}

window.addEventListener("click", on_window_click);

})();

