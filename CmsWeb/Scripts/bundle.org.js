function RebindMemberGrids(){$.formAjaxClick($("a.setfilter"))}function AddSelected(){RebindMemberGrids()}function CloseAddDialog(e){$("#memberDialog").dialog("close")}$(function(){function e(e,t){$.post("/Org/UpdateOrgIds",{id:$("#OrganizationId").val(),list:e},function(e){$("#orgpickdiv").replaceWith(e),t.modal("hide")})}function t(){$("div.movable-list").each(function(){$(this).children("div.movable").each(function(){$(this).removeClass("cutting")})})}function i(){$("div.movable-list").each(function(){$(this).children("div.movable").length<=1&&$(this).children("div.movable").find("div a.cut").addClass("disabled"),$(this).children("div.movable").find("div a.paste").addClass("disabled")})}function n(e){$(e).children("div.movable").each(function(){$(this).find("div a.paste").first().removeClass("disabled")})}function o(){$("div.movable-list").each(function(){$(this).children("div.movable").find("div a.movetop").removeClass("disabled"),$(this).children("div.movable").find("div a.moveup").removeClass("disabled"),$(this).children("div.movable").first().find("div a.movetop").addClass("disabled"),$(this).children("div.movable").first().find("div a.moveup").addClass("disabled")})}function a(){$("div.movable-list").each(function(){$(this).children("div.movable").find("div a.movebottom").removeClass("disabled"),$(this).children("div.movable").find("div a.movedown").removeClass("disabled"),$(this).children("div.movable").last().find("div a.movebottom").addClass("disabled"),$(this).children("div.movable").last().find("div a.movedown").addClass("disabled")})}function r(e,i,o){if(o.preventDefault(),$(e).hasClass("disabled"))return!1;var a=$(e).closest("div.movable-list"),r=$(e).closest("div.movable");switch(i){case"top":var s=$(a).children("div.movable").first();$(r).clone(!0,!0).insertBefore(s);break;case"up":var l=r.prev("div.movable");$(r).clone(!0,!0).insertBefore(l);break;case"cut":return t(),$(r).addClass("cutting"),n(a),!1;case"paste":var c=$(e).closest("div.movable");r=$(a).children("div.cutting").first(),$(r).clone(!0,!0).insertAfter(c);break;case"down":var d=r.next("div.movable");$(r).clone(!0,!0).insertAfter(d);break;case"bottom":var u=$(a).children("div.movable").last();$(r).clone(!0,!0).insertAfter(u);break;case"delconfirm":if(!$(e).attr("href"))return!1;if(!confirm("are you sure?"))return!1;break;case"delete":if(!$(e).attr("href"))return!1}$(r).remove(),$.InitFunctions.updateQuestionList(),$.InitFunctions.movequestions()}$('a[data-toggle="tab"]').on("shown",function(e){e.preventDefault();var t=$(e.target).attr("href").replace("#","#tab-");return window.location.hash=t,$.cookie("lasttab",t),!1});var s=$.cookie("lasttab");if(window.location.hash&&(s=window.location.hash),$("a[href='#Settings-tab']").on("shown",function(e){$("#SettingsOrg").length<2&&$("a[href='#SettingsOrg']").click().tab("show")}),$("#tab-area > ul.nav-tabs > li > a").on("shown",function(e){switch($(this).text()){case"People":$("#bluetoolbarstop li > a.qid").parent().removeClass("hidy");break;case"Settings":case"Meetings":$("#bluetoolbarstop li > a.qid").parent().addClass("hidy")}}),s){var l=$("a[href='"+s.replace("tab-","")+"']"),c=l.closest("ul").data("tabparent");c&&$("a[href='#"+c+"']").click().tab("show"),"#"!==l.attr("href")&&($.cookie("lasttab",l.attr("href")),l.click().tab("show"))}$.InitFunctions.Editable=function(){$("a.editable").editable(),$("a.editable-bit").editable({type:"checklist",mode:"inline",source:{True:"True"},emptytext:"False"})},$("a.click-pencil").live("click",function(e){return e.stopPropagation(),$(this).prev().editable("toggle"),!1}),$("#excludesg").live("click",function(e){e.stopPropagation(),$(this).toggleClass("active"),$(this).hasClass("active")?$("a.selectsg .fa-minus").show():$("a.selectsg .fa-minus").hide()}),$("a.selectsg").live("click",function(e){e.preventDefault();var t=$(this).text(),i=$("#sgFilter").val();switch(t){case"Match All":i="All:"+i;break;case"None Assigned":i="None";break;default:i&&"All:"!==i&&(i+=";"),$("#excludesg").hasClass("active")&&(t="-"+t),i+=t}return $("#sgFilter").val(i),$("#excludesg").removeClass("active"),$("a.selectsg .fa-minus").hide(),!1}),$("#showhide").live("click",function(e){return e.preventDefault(),$(this).toggleClass("active"),$("#ShowHidden").val($(this).hasClass("active")),RebindMemberGrids(),!1}),$("a.setfilter").live("click",function(e){return e.preventDefault(),$("#FilterIndividuals").val(!$("#filter-ind").hasClass("active")),RebindMemberGrids(),!1}),$("#filter-ind").live("click",function(e){return e.preventDefault(),$(this).toggleClass("active"),$("#FilterIndividuals").val($(this).hasClass("active")),RebindMemberGrids(),!1}),$("#filter-tag").live("click",function(e){return e.preventDefault(),$(this).toggleClass("active"),$("#FilterTag").val($(this).hasClass("active")),RebindMemberGrids(),!1}),$("#clear-filter").live("click",function(e){e.preventDefault(),$("textarea[name='sgFilter']").val(""),$("textarea[name='nameFilter']").val(""),$("#FilterTag").val(!1),$("#FilterIndividuals").val(!1),RebindMemberGrids()}),$("#ministryinfo").live("click",function(e){return e.preventDefault(),$(this).toggleClass("active"),$("#ShowMinistryInfo").val($(this).hasClass("active")),RebindMemberGrids(),!1}),$("#showaddress").live("click",function(e){return e.preventDefault(),$(this).toggleClass("active"),$("#ShowAddress").val($(this).hasClass("active")),RebindMemberGrids(),!1}),$("#multigroup").live("click",function(e){e.preventDefault();var t=$(this);t.toggleClass("active");var i=t.hasClass("active");return $("#MultiSelect").val(i),i?($("#groupSelector button.dropdown-toggle").hide(),$("li.orgcontext").hide()):($("#groupSelector button.grp.active").removeClass("active"),$("#groupSelector button[value='10']").addClass("active").closest("button.dropdown-toggle").show(),$("#GroupSelect").val("10"),$("#showhide").removeClass("active"),$("#ShowHidden").val($("#showhide").hasClass("active"))),RebindMemberGrids(),!1}),$("#groupSelector button.grp").live("click",function(e){e.preventDefault();var t=$(this);if($("#multigroup").hasClass("active"))t.toggleClass("active");else switch($("#groupSelector button.grp.active").removeClass("active"),$("#groupSelector button.dropdown-toggle").hide(),t.addClass("active"),t.next().find("button.dropdown-toggle").show(),$("li.orgcontext").hide(),t.text()){case"Members":$("li.current-list").show();break;case"Pending":$("li.pending-list").show()}var i="";return $("#groupSelector button.grp.active").each(function(){i+=$(this).val()}),""===i?(t.toggleClass("active"),!1):($("#GroupSelect").val(i),RebindMemberGrids(),!1)});var d=null;$("input.omck").live("click",function(e){var t=null;if(e.shiftKey&&d){var i=$("input.omck").index(this),n=$("input.omck").index(d);t=$("input.omck").slice(Math.min(i,n),Math.max(i,n)+1),t.attr("checked",d.checked)}else t=$(this),d=this;var o=t.map(function(){return $(this).val()}).get();$.post("/Org/ToggleCheckboxes/{0}".format($("#Id").val()),{pids:o,chkd:d.checked})}),$("#deleteorg").click(function(e){e.preventDefault();var t=$(this).attr("href");return confirm("Are you sure you want to delete?")&&($.block("deleting org"),$.post(t,null,function(e){"ok"!=e?window.location=e:($.block("org deleted"),$(".blockOverlay").attr("title","Click to unblock").click(function(){$.unblock(),window.location="/"}))})),!1}),$("#sendreminders").click(function(e){e.preventDefault();var t=$(this).attr("href");confirm("Are you sure you want to send reminders?")&&($.block("sending reminders"),$.post(t,null,function(e){"ok"!=e?($.unblock(),$.growlUI("error",e)):($.unblock(),$.growlUI("Email","Reminders Sent"))}))}),$("#reminderemails").click(function(e){e.preventDefault();var t=$(this).attr("href");return confirm("Are you sure you want to send reminders?")&&($.block("sending reminders"),$.post(t,null,function(e){"ok"!=e?($.block(e),$(".blockOverlay").attr("title","Click to unblock").click($.unblock)):($.block("org deleted"),$(".blockOverlay").attr("title","Click to unblock").click(function(){$.unblock(),window.location="/"}))})),!1}),$(".CreateAndGo").click(function(e){return e.preventDefault(),confirm($(this).attr("confirm"))&&$.post($(this).attr("href"),null,function(e){window.location=e}),!1}),$("a.members-dialog").live("click",function(e){$(this);e.preventDefault(),$("<div />").load(this.href,{},function(){var e=$(this),t=e.find("form");t.modal("show"),$.DatePickersAndChosen(),t.on("hidden",function(){e.remove(),t.remove(),RebindMemberGrids()})})}),$("a.membertype").live("click",function(e){e.preventDefault(),$("<div />").load(this.href,{},function(){var e=$(this),t=e.find("form");t.modal("show"),t.on("hidden",function(){e.remove(),t.remove(),RebindMemberGrids()})})}),$("#orgpicklist").live("click",function(e){e.preventDefault(),$("<div />").load(this.href,{},function(){var e=$(this),t=e.find("form");t.modal("show"),$.initializeSelectOrgsDialog(t),t.on("hidden",function(){e.remove(),t.remove()})})}),$.initializeSelectOrgsDialog=function(t){$("#select-orgs #UpdateSelected").live("click",function(i){i.preventDefault();var n=$("#select-orgs input[type=checkbox]:checked").map(function(){return $(this).val()}).get().join(",");return e(n,t),!1}),$("#select-orgs").on("keydown","#name",function(e){return 13===e.keyCode?(e.preventDefault(),$("#select-orgs #search").click(),!1):!0}),$.SaveOrgIds=function(e){var t=$("#select-orgs input[type=checkbox]:checked").map(function(){return $(this).val()}).get().join(",");$.post("/SearchOrgs/SaveOrgIds/"+$("#select-orgs #id").val(),{oids:t})},$("body").on("change","#select-orgs input:checkbox",$.SaveOrgIds)},$("#divisionlist").live("click",function(e){e.preventDefault();var t=$(this);$("<div />").load(t.attr("href"),{},function(){var e=$(this),i=e.find("form");i.modal("show"),i.on("hidden",function(){t.load(t.data("refresh"),{}),e.remove(),i.remove()}),i.on("change","input:checkbox",function(){$("input[name='TargetDivision']",i).val($(this).val()),$("input[name='Adding']",i).val($(this).is(":checked")),$.formAjaxClick($(this),"/SearchDivisions/AddRemoveDiv")}),i.on("click","a.move",function(){$("input[name='TargetDivision']",i).val($(this).data("moveid")),$.formAjaxClick($(this),"/SearchDivisions/MoveToTop")})})}),$.maxZIndex=$.fn.maxZIndex=function(e){var t={inc:10,group:"*"};$.extend(t,e);var i=0;return $(t.group).each(function(){var e=parseInt($(this).css("z-index"));i=e>i?e:i}),this.jquery?this.each(function(){i+=t.inc,$(this).css("z-index",i)}):i},$.InitFunctions.popovers=function(e){$('[data-toggle="popover"]').popover({html:!0,placement:"bottom"}),$("body").on("click",function(e){$('[data-toggle="popover"]').each(function(){$(this).is(e.target)||0!==$(this).has(e.target).length||0!==$(".popover").has(e.target).length||$(this).popover("hide")})})},$.InitFunctions.popovers(),$.InitFunctions.timepicker=function(e){$(".timepicker").datetimepicker({format:"H:ii P",showMeridian:!0,autoclose:!0,todayBtn:!1,pickerPosition:"bottom-left",startView:1,minView:0,maxView:1}),$(".datetimepicker-hours table thead, .datetimepicker-minutes table thead").attr("style","display:block; overflow:hidden; height:0;")},$.InitFunctions.ReloadMeetings=function(e){$("#Meetings-tab").load("/Org/Meetings",{id:$("input[name=Id]","#Meetings-tab").val()})},$.InitFunctions.showHideRegTypes=function(e){switch($("#Fees-tab").show(),$("#Questions-tab").show(),$("#Messages-tab").show(),$("#QuestionList").show(),$("#TimeSlotsList").hide(),$("#RegistrationType_Value").val()){case"0":$("#Fees-tab").hide(),$("#Questions-tab").hide(),$("#Messages-tab").hide();break;case"6":$("#QuestionList").hide(),$("#TimeSlotsList").show()}},$("#org_RegistrationTypeId").live("change",$.InitFunctions.showHideRegTypes),$("#selectquestions a").live("click",function(e){return e.preventDefault(),$.post("/Org/NewAsk/",{id:"AskItems",type:$(this).attr("type")},function(e){$("#addQuestions").modal("hide"),$("html, body").animate({scrollTop:$("body").height()},800);$("#QuestionList").append(e);$.InitFunctions.updateQuestionList(),$.InitFunctions.popovers(),$.InitFunctions.movequestions()}),!1}),$("ul.enablesort a.del").live("click",function(e){return e.preventDefault(),$(this).attr("href")?($(this).parent().parent().parent().remove(),!1):!1}),$.exceptions=["AskDropdown","AskCheckboxes","AskExtraQuestions","AskHeader","AskInstruction","AskMenu","AskText"],$.InitFunctions.updateQuestionList=function(){$("#selectquestions li").each(function(){var e=this.className,t=$(this).text();t||(t=e),$(this).html($.inArray(e,$.exceptions)>=0||0==$("li.type-"+e).length?"<a href='#' type='"+e+"'>"+t+"</a>":"<span style='text-decoration: line-through;'>"+t+"</span>")})},$(".helptip").tooltip({showBody:"|",blocked:!0}),$("form.DisplayEdit a.submitbutton").live("click",function(e){e.preventDefault();var t=$(this).closest("form");if(!$(t).valid())return!1;var i=t.serialize();return $.post($(this).attr("href"),i,function(e){e.startsWith("error:")?$("div.formerror",t).html(e.substring(6)):$(t).html(e).ready(function(){$(".submitbutton,.bt").button(),$.regsettingeditclick(t),$.showHideRegTypes()})}),!1}),$("#Future").live("click",function(){$.formAjaxClick($(this))}),$.InitFunctions.CreateMeeting=function(e){},$("a.taguntag").live("click",function(e){return e.preventDefault(),$.post("/Org/ToggleTag/"+$(this).attr("pid"),null,function(t){$(e.target).text(t)}),!1}),$.validator.addMethod("time",function(e,t){return this.optional(t)||/^\d{1,2}:\d{2}\s(?:AM|am|PM|pm)/.test(e)},"time format h:mm AM/PM"),$.validator.setDefaults({highlight:function(e){$(e).addClass("ui-state-highlight")},unhighlight:function(e){$(e).removeClass("ui-state-highlight")}}),$("#orginfoform").validate({rules:{"org.OrganizationName":{required:!0,maxlength:100}}}),$("#settingsForm").validate({rules:{"org.SchedTime":{time:!0},"org.OnLineCatalogSort":{digits:!0},"org.Limit":{digits:!0},"org.NumCheckInLabels":{digits:!0},"org.NumWorkerCheckInLabels":{digits:!0},"org.FirstMeetingDate":{date:!0},"org.LastMeetingDate":{date:!0},"org.RollSheetVisitorWks":{digits:!0},"org.GradeAgeStart":{digits:!0},"org.GradeAgeEnd":{digits:!0},"org.Fee":{number:!0},"org.Deposit":{number:!0},"org.ExtraFee":{number:!0},"org.ShirtFee":{number:!0},"org.ExtraOptionsLabel":{maxlength:50},"org.OptionsLabel":{maxlength:50},"org.NumItemsLabel":{maxlength:50},"org.GroupToJoin":{digits:!0},"org.RequestLabel":{maxlength:50},"org.DonationFundId":{number:!0}}}),$("#nameFilter,#sgFilter").live("keypress",function(e){return 13===(e.keyCode||e.which)&&(e.preventDefault(),RebindMemberGrids()),!0}),$("#addsch").live("click",function(e){e.preventDefault();var t=$(this).attr("href");if(t){{$(this).closest("form")}$.post(t,null,function(e){$("#schedules").append(e).ready(function(){$.InitFunctions.timepicker(),$.renumberListItems()})})}return!1}),$("a.delete-well").live("click",function(e){e.preventDefault(),$(this).closest("div.well").remove(),$.renumberListItems()}),$.renumberListItems=function(){var e=1;$(".renumberMe").each(function(){$(this).val(e),e++})},$("#ScheduleListPrev").change(function(){var e=$(this).val().split(",");$("#PrevMeetingDate").val(e[0]),$("#NewMeetingTime").val(e[1]),$("#AttendCreditList").val(e[2])}),$("#ScheduleListNext").change(function(){var e=$(this).val().split(",");$("#NextMeetingDate").val(e[0]),$("#NewMeetingTime").val(e[1]),$("#AttendCreditList").val(e[2])}),$.GetPrevMeetingDateTime=function(){var e=$("#PrevMeetingDate").val();return $.GetMeetingDateTime(e)},$.GetNextMeetingDateTime=function(){var e=$("#NextMeetingDate").val();return $.GetMeetingDateTime(e)},$.GetMeetingDateTime=function(e){var t=/^ *(\d{1,2}):[0-5][0-9] *((a|p|A|P)(m|M)){0,1} *$/,i=$("#NewMeetingTime").val(),n=!0;return t.test(i)||($.growlUI("error","enter valid time"),n=!1),$.DateValid(e)||($.growlUI("error","enter valid date"),n=!1),{date:e,time:i,valid:n}},$("a.joinlink").live("click",function(e){e.preventDefault();var t=$(this);return bootbox.confirm(t.attr("confirm"),function(e){e&&$.post(t[0].href,function(e){"ok"===e?RebindMemberGrids():alert(e)})}),!1}),$.extraEditable=function(){$(".editarea").editable("/Organization/EditExtra/",{type:"textarea",submit:"OK",rows:5,width:200,indicator:'<img src="/Content/images/loading.gif">',tooltip:"Click to edit..."}),$(".editline").editable("/Organization/EditExtra/",{indicator:"<img src='/Content/images/loading.gif'>",tooltip:"Click to edit...",style:"display: inline",width:200,height:25,submit:"OK"})},$.extraEditable(),$("a.deleteextra").live("click",function(e){return e.preventDefault(),confirm("are you sure?")&&$.post("/Organization/DeleteExtra/"+$("#OrganizationId").val(),{field:$(this).attr("field")},function(e){e.startsWith("error")?alert(e):($("#extras > tbody").html(e),$.extraEditable())}),!1}),$.updateTable=function(e){if(!e)return!1;var t=e.closest("form.ajax");return t.length&&$.formAjaxClick(e),!1},$.InitFunctions.ReloadPeople=function(){RebindMemberGrids()},$("#Schedule_Value").live("change",function(){var e=$(this).val().split(",");$(".modal #MeetingDate").val(e[0]),$(".modal #AttendCredit_Value").val(e[1])}),$("body").on("click","div.newitem > a",function(e){if(!$(this).attr("href"))return!1;e.preventDefault();{var t=$(this);t.closest("form")}$.post(t.attr("href"),null,function(e){t.parent().prev().append(e),$.InitFunctions.movequestions(),$.InitFunctions.timepicker()})}),$.InitFunctions.movequestions=function(){t(),i(),o(),a(),$("body a.movetop").off().on("click",function(e){r($(this),"top",e)}),$("body a.moveup").off().on("click",function(e){r($(this),"up",e)}),$("body a.cut").off().on("click",function(e){r($(this),"cut",e)}),$("body a.paste").off().on("click",function(e){r($(this),"paste",e)}),$("body a.movedown").off().on("click",function(e){r($(this),"down",e)}),$("body a.movebottom").off().on("click",function(e){r($(this),"bottom",e)}),$("body a.delconfirm").off().on("click",function(e){r($(this),"delconfirm",e)}),$("body a.delete").off().on("click",function(e){r($(this),"delete",e)})},$.InitFunctions.movequestions()}),function(e){function t(e){window.console&&window.console.log&&window.console.log("SearchUsers selection count: "+e.size())}e.fn.SearchUsers=function(i){t(this);var n=e.extend({},{},i);return this.each(function(){var t=e(this);t.click(function(i){i.preventDefault();var o=e(this).attr("href");return e("<div />").load(o,{},function(){var i=e(this),o=i.find("form");o.modal("show"),e(o).off("click",".UpdateSelected"),e(o).on("click",".UpdateSelected",function(i){i.preventDefault();var a=e("table.results tbody tr:first ",o).find("input[type=checkbox]").attr("value"),r=e("#topid0").val();return n.UpdateShared&&n.UpdateShared(a,r,t),o.modal("hide"),!1}),e(o).off("keypress","#searchname"),e(o).on("keypress","#searchname",function(t){return t.which&&13==t.which||t.keyCode&&13==t.keyCode?(t.preventDefault(),e("a.search").click(),!1):!0}),e(o).off("click","input[type='checkbox']"),e(o).on("change","input[type='checkbox']",function(){var t=e(this).parents("tr:eq(0)").find("span.move"),i=e(this).is(":checked"),n=e(this).attr("value"),o=e("#ordered").val();e.post("/SearchUsers/TagUntag/"+n,{ischecked:!i,isordered:o},function(o){i&&!o?t.html("<a href='#' class='move' value='"+n+"'>move to top</a>"):t.empty(),o&&e("#topid").val(n)})}),e(o).off("click","a.move"),e(o).on("click","a.move",function(t){t.preventDefault();var i=e(this).closest("form");e("#topid").val(e(this).attr("value"));var n=i.serialize();e.post("/SearchUsers/MoveToTop",n,function(t){e("table.results",i).replaceWith(t).ready(function(){e("table.results > tbody > tr:even",i).addClass("alt")})})}),o.on("hidden",function(){i.remove(),o.remove()})}),!1})})}}(jQuery),$(function(){$.InitFunctions.SettingFormsInit=function(e){$("a.notifylist").SearchUsers({UpdateShared:function(e,t,i){$.post("/Org/UpdateNotifyIds",{id:$("#OrganizationId").val(),topid:e,field:i.data("field")},function(e){i.html(e)})}})};var e=$(".device-xs").is(":visible"),t=$(".device-sm").is(":visible");$("body").on("click","a.editor",function(i){if(!$(this).attr("href"))return!1;var n=$(this).attr("tb");return i.preventDefault(),e||t||(CKEDITOR.instances.editor&&CKEDITOR.instances.editor.destroy(),CKEDITOR.env.isCompatible=!0,CKEDITOR.plugins.addExternal("specialLink","/content/touchpoint/lib/ckeditor/plugins/specialLink/","plugin.js"),$.fn.modal.Constructor.prototype.enforceFocus=function(){var e=this;$(document).on("focusin.modal",function(t){e.$element[0]!==t.target&&!e.$element.has(t.target).length&&$(t.target.parentNode).hasClass("cke_contents cke_reset")&&e.$element.focus()})},CKEDITOR.replace("editor",{height:200,allowedContent:!0,customConfig:"/scripts/js/ckeditorconfig.js",extraPlugins:"specialLink"})),e||t?$("#editor").val($("#"+n).val()):CKEDITOR.instances.editor.setData($("#"+n).val()),$("#editor-modal").modal("show"),$("#save-edit").off("click").on("click",function(i){i.preventDefault();var o;return o=e||t?$("#editor").val():CKEDITOR.instances.editor.getData(),$("#"+n).val(o),$("#"+n+"_ro").html(o),e||t?$("#editor").val(""):CKEDITOR.instances.editor.setData(""),$("#editor-modal").modal("hide"),!1}),!1})}),$(function(){$("#membergroups .ckbox").live("click",function(e){var t=$(this).closest("form"),i=t.serialize()+"&"+$.param({ck:$(this).is(":checked")});return $.post($(this).attr("href"),i),!0}),$("#membergroups .update-smallgroup").live("click",function(e){e.preventDefault();var t=$(this).attr("href"),i="This will add or remove everybody to/from this sub-group. Are you sure?";return bootbox.confirm(i,function(e){e&&$.post(t)}),!1}),$("#OrgSearch").live("keydown",function(e){13===e.keyCode&&(e.preventDefault(),$("#orgsearchbtn").click())}),$("a.movemember").live("click",function(e){e.preventDefault();var t=$(this).closest("form"),i=t.serialize(),n=$(this).attr("href");return bootbox.confirm("are you sure?",function(e){e&&$.post(n,i,function(e){t.modal("hide"),RebindMemberGrids()})}),!1})});