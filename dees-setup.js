// ==UserScript==
// @name         DEES Setup
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Simplify the Admin Setup page
// @author       Gary Sherman
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match        https://localhost/agent/setup
// @include      https://*.dovetailnow.com/agent/setup
// @resource html     https://raw.githubusercontent.com/gsherman/tampermonkey-scripts/master/dees-setup-page.html
// @grant  GM_getResourceText


// ==/UserScript==

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );

    jQ("#header-spacing").after (GM_getResourceText("html"));
    jQ("#content").hide();
    jQ("#item-summary").hide();

})();

