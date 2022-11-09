// ==UserScript==
// @name         DEES - export List to CSV
// @namespace    http://tampermonkey.net/
// @version      0.1
// @icon         http://localhost/logos/crosshatch.jpg
// @description  export List to CSV
// @author       Gary Sherman
// @match        https://tampermonkey.net/index.php?version=4.7.54&ext=dhdg&updated=true
// @match        http://localhost/agent/listadmin/configure
// @match        https://localhost/agent/listadmin/configure
// @match        https://default.lclhst.io/agent/listadmin/configure
// @match        https://*.dovetailnow.com/agent/listadmin/configure
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// @grant        GM_addStyle

// ==/UserScript==

// TO DO:
// * option to filter out inactive elements
// * export to Excel

(function() {
    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );

    function exportToCSV(){
        const universalBOM = "\uFEFF";
        var outputCsv = universalBOM + "\"key\",\"displayedText\"";
        var itemCount = jQ("table#list-item-table tr.list-item").length;
        if (itemCount < 1){
            alert('No list is currently selected. Please search for and select a list on the left.');
            return
        }

        var allItems = jQ("table#list-item-table tr.list-item").each(function(){
            outputCsv += "\n\"" + jQ("span.item-key",this)[0].innerText + "\",\"" + jQ("span.item-text > input", this)[0].value + "\"";
        });
        //console.log(outputCsv);


        const blob = new Blob([outputCsv], { type: 'text/csv;charset=utf-8,' })
        const objUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', objUrl)
        link.setAttribute('download', 'list.csv');
        link.click();
    }

    var exportButton = '<button type="button" id="exportToCSV" class="exportToCSV">Export to CSV</button>'
    var tabs = jQ("ul.tabs");
    jQ(exportButton).insertAfter(tabs);
    document.getElementById("exportToCSV").addEventListener("click", exportToCSV);

    GM_addStyle(`
      .exportToCSV, .exportToExcelButton{
        padding: 5px;
        margin-left: 20px;
        margin-top: 2px;
      }
   `);


})();

