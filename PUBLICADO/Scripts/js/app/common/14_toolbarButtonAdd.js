
// By David

$.fn.extend({
    toolbarButtonAdd: function(elem, p) {
        p = $.extend({
            caption: "newButton",
            title: '',
            buttonicon: 'ui-icon-newwin',
            onClickButton: null,
            position: "last",
            buttonid: "id_newButton"
        }, p || {});

        var tableString = '<table cellspacing="0" cellpadding="0" border="0" class="ui-pg-table" style="width: 100%; table-layout: fixed; height: 100%;" role="row"><tbody><tr><td align="left">';
        tableString += '<table cellspacing="0" cellpadding="0" border="0" class="ui-pg-table navtable" style="float: left;table-layout: auto;">';
        tableString += "<tbody> <tr></tr></table>";
        tableString += "</td></tr></tbody></table>";

        return this.each(function() {
            if (!this.grid) { return; }
            if (elem.indexOf("#") != 0) {
                elem = "#" + elem;
            }

            if ($("tr td:eq(0)", $(elem).children('table')).children('table').length === 0) {
                //if ($(elem).children('table').length === 0) {
                $(elem).append(tableString);
                $(elem).addClass('ui-state-default ui-jqgrid-pager ui-corner-bottom')
            }
            var tbd = $("<td></td>");
            $(tbd)
            .addClass('ui-pg-button ui-corner-all')
            .append("<div class='ui-pg-div'><span class='ui-icon " + p.buttonicon + "'></span>" + "" + p.caption + "" + "</div>")
            .attr("title", p.title || "")
            .attr("id", p.buttonid)
             .button()
             .removeClass("ui-button ui-widget ui-state-default ui-button-text-only")
             
            
            
            
            //$(tbd).addClass('ui-toolbar-button ui-corner-all').append("<div class='ui-toolbar-div'><span class='ui-icon " + p.buttonicon + "'></span>" + "<span>" + p.caption + "</span>" + "</div>").attr("title", p.title || "")

			.click(function(e) {
			    if ($.isFunction(p.onClickButton)) { p.onClickButton(); }
			    return false; 
			});
			/*.hover(
				function() { $(this).addClass("ui-state-hover"); },
				function() { $(this).removeClass("ui-state-hover"); }
			);*/
			
            if (p.id) { $(tbd).attr("id", p.id); }
            if (p.align) { $(elem).attr("align", p.align); }
            //var findnav = $(elem).children('table');
            //var findnav = $("tr td:eq(0)", $(elem).children('table')).children('table');
            var findnav = $(".navtable", elem)[0];
            if (p.position === 'first') {
                if ($(findnav).find('td').length === 0) {
                    $("tr", findnav).append(tbd);
                } else {
                    $("tr td:eq(0)", findnav).before(tbd);
                }
            } else {
                $("tr", findnav).append(tbd);
            }
        });
    },
    toolSeparatorAdd: function(c, d) {
        d = $.extend({
            sepclass: "ui-separator",
            sepcontent: ""
        }, d || {});
        return this.each(function() {
            if (this.grid) {
                "string" === typeof c && 0 !== c.indexOf("#") && (c = "#" + $.jgrid.jqID(c));
                var e = $(".navtable", c)[0];
                if (e) {
                    var n = "<td class='ui-pg-button ui-state-disabled' style='width:4px;'><span class='" +
                        d.sepclass + "'></span>" + d.sepcontent + "</td>";
                    $("tr", e).append(n)
                }
            }
        })
    }
});


//$.fn.extend({

//toolbarButtonDisable: function(elem) {
//        return this.each(function() {
//            console.log($(this));
//            $(this).button("disable");
//        });
//    },
//    toolbarButtonEnable: function(elem) {
//        return this.each(function() {
//        $(this).button("enable");
//        });
//    }
//});
//Fin David