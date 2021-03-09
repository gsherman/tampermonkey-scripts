// ==UserScript==
// @name         Admin Menu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add an Admin menu to DEES Agent
// @author       Gary Sherman
// @match        http://localhost/agent/query/my-cases
// @grant        none
// @include     http://localhost/agent/*
// @include     https://*.dovetailnow.com/agent/*
// @require http://code.jquery.com/jquery-1.11.2.min.js

// ==/UserScript==

// TODO
// * Only add these menus if user is a root admin

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );

    // SPA:
    var menu = '';
    menu+='<li class="nav-item dropdown">';
    menu+='<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Admin</a>';
    menu+= '<div class="dropdown-menu">';
    menu+='<a class="dropdown-item" href="support" target="_self">Support</a>';
    menu+='<a class="dropdown-item" href="famanager/edit" target="_self">FA Manager</a>';
    menu+='<a class="dropdown-item" href="config/settings" target="_self">Settings</a>';
    menu+='<a class="dropdown-item" href="/api/doc" target="_blank">API docs</a>';
    menu+='</div></li>';

    jQ(".navbar-nav").first().append(menu);

    //Legacy:
    var legacyMenu = '';
    legacyMenu+='<li class="dropdown " data-dropdown="dropdown">';
    legacyMenu+='<a href="#" class="dropdown-toggle">Admin</a>';
    legacyMenu+='<ul class="dropdown-menu">';
    legacyMenu+='<li><a id="support" class="js-create-new dropdown-icon full-screen"  href="/agent/support">Support</a</li>';
    legacyMenu+='<li><a id="fa-manager" class="js-create-new dropdown-icon full-screen"  href="/agent/famanager/edit">FA Manager</a</li>';
    legacyMenu+='<li><a id="settings" class="js-create-new dropdown-icon full-screen"  href="/agent/config/settings">Settings</a</li>';
    legacyMenu+='<li><a id="api-docs" class="js-create-new dropdown-icon full-screen"  href="/api/doc" target="_blank">API Docs</a</li>';
    legacyMenu+='</ul>';

    jQ("div.menubar ul.nav").first().append(legacyMenu);

})();
