// ==UserScript==
// @name         create case page styling improvements
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  create case page styling improvements
// @author       You
// @icon         http://localhost/logos/crosshatch.jpg
// @match        https://tampermonkey.net/index.php?version=4.7.54&ext=dhdg&updated=true
// @grant GM_log
// @grant GM_addStyle
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// @match  https://default.lclhst.io/agent/*
// @match  https://default.lclhst.io/agent/*/*
// @match  https://default.lclhst.io/agent/*/*/*
// @match  https://*.dovetailnow.com/agent/*
// @match  https://*.dovetailnow.com/agent/*/*
// @match  https://*.dovetailnow.com/agent/*/*/*
// ==/UserScript==

(function() {

    //TODO
    //change the tab order (notes is wrong)
    //make work when create case page is the first page loaded in the app
    //make work for case-create-employee: /agent/cases/create/employee/GUID


    'use strict';
    var jQuery = window.$;
    var jQ = jQuery.noConflict( true );

    function watchLocation() {
        const observable = () => document.location.pathname;

        let oldValue = observable();
        const observer = new MutationObserver(() => {
            const newValue = observable();

            if (oldValue !== newValue) {
                console.log(`changed: ${oldValue} -> ${newValue}`);
                if (newValue.slice(0,19) == '/agent/cases/create'){
                    improveLayout();
                }
                oldValue = newValue;
        }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
    //console.log(document.location.pathname);

    if (document.location.pathname.slice(0,19) == '/agent/cases/create'){
        improveLayout();
    }
    watchLocation();

    function improveLayout() {

      console.log('applying custom create-case page layout and styling changes from tampermonkey script');
      //case type row
      var start = jQ('#create-case > div:nth-child(4) > div:nth-child(1) > div:nth-child(1)');
      //list of case attachments
      var end = jQ('.case-attachments-list');

      //wrap the less important elements with a details tag, so it becomes an open/close accordian
      jQ(start).nextUntil(end).add(end).wrapAll("<details id='additional-info'></details>");
      jQ('#additional-info').prepend("<summary>Additional Info</summary>");

      jQ('#title').attr("placeholder", "Enter a summary");

      //wrap the concerning employee with a details tag, so it becomes an open/close accordian
      jQ('div.concerning-selector').wrapAll("<details id='concerning-info'></details>");
      jQ('#concerning-info').prepend("<summary>Concerning Employee</summary>");

    //add custom CSS
    GM_addStyle(`

/* make the labels for the title and employee pickers full width */
   label[for="title"],
   label[for="employeeId-selectized"],
   label[for="concerningEmployeeId-selectized"]{
     /* this is the same as col-md-12 */
     flex: 0 0 100%;
     max-width: 100%;
    }

/* make the text/picker elements for the title and employee pickers full width */
   label[for="title"] + div,
   label[for="employeeId-selectized"] + div,
   label[for="concerningEmployeeId-selectized"] +div{
      /* this is the same as col-md-12 */
      flex: 0 0 100%;
      max-width: 100%;
   }

/* spacing for case status
   select[data-list-name="CaseStatus"],
   label[for="title"] + div{
     padding-right:48px;
   }

/* make the labels be bold */
   .col-form-label{font-weight:bold;}

/* but keep the FA labels normal (not bold)
  .flexible-attribute-fields > .col-form-label{font-weight:normal;}

/* swap the left/right position of the case notes and the less important fields */
   #create-case > div:nth-child(4){flex-direction: row-reverse;}

/* spacing on the less important controls within the new additional info details*/
   #additional-info{padding-right: 16px;}

/* style the new Additional Info summary element */
   summary{font-weight:bold;margin-bottom: 1rem;width: fit-content;}

/* spacing on the case type row */
   div.form-group:has(label[for="caseType"]){margin-right: 0px;}

/* make the Files header be bold */
   #additional-info >  h2 {
      font-size:20px;
   }

/* make the FA header bold, and give it some spacing */
   .flexible-attribute-header {
      font-size:20px;
      margin-top:20px;
   }

/* tighten up the vertical spacing for the case title and employee selector */
   #create-case > div.form-group:nth-child(1),
   #create-case > div.employee-selector> div.form-group{
      margin-bottom: 0rem;
    }

/* unbold the froala toolbar icons */
   div.fr-toolbar  i.fas{
     font-weight: normal;
   }

/* hide the concerning employee label, as the summary element now acts as a label */
   label[for="concerningEmployeeId-selectized"]{
     display:none;
   }

/* add some spacing to the concerning employee section
   #concerning-info{
     margin-bottom:2rem;
   }


`);

}
})();