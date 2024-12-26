imageFormat = function(cellvalue, options, rowdata) {
    return '<img src="' + pathImage + cellvalue + '" />';
};

imageUnFormat = function(cellvalue, options) {
    return $('img', cellvalue).attr('src');
};

postError = function(requestData, errMessage, errNumber) {
    if (errNumber == '') {
        openDialogError("No se puede determinar el error.");
    } else {
        openDialogError(errNumber + ': ' + errMessage);
    }
};

function procesarConsultaSubProceso(source, parameters, fnc, dataType) {
    if (dataType != null || dataType != undefined) {
        _post = $.post(path + "jqgrid/" + source, parameters, function(request) {
        }, dataType);
    }
    else {
        _post = $.post(path + "jqgrid/" + source, parameters);
    }
    _post.success(fnc);
}

function procesarConsultaSubProceso(source, parameters, fnc, dataType) {
    if (dataType != null || dataType != undefined) {
        _post = $.post(path + "jqgrid/" + source, parameters, function (request) {
        }, dataType);
    }
    else {
        _post = $.post(path + "jqgrid/" + source, parameters);
    }
    _post.success(fnc);
}


function procesarSeleccion(idPanel, idx, _options, parameters) {
    procesarConsultaSubProceso('seleccionar', parameters, function(requestData) {
        $("#" + idPanel).html(requestData);
        actualizarGrid(idx, _options);
    });
}

function procesarProcedimiento(idPanel, idx, _options, parameters, bindkeys, navGrid) {
    procesarConsultaSubProceso('registrar', parameters, function(requestData) {
        $("#" + idPanel).html(requestData);
        actualizarGrid(idx, _options, bindkeys, navGrid);
    });
}

function procesarJSON(idPanel, idx, _options, bindkeys, navGrid) {
    html = "<table id=" + idx + "></table>";
    html += "<div id=p" + idx + "></div>";
    html += "<input type='hidden' id='c" + idx + "' name='c" + idx + "' value='' />";

    $("#" + idPanel).html(html);
    reloadJQGrid(idx, _options, bindkeys, navGrid);
}

function procesarProcedimientoJSON(idPanel, idx, _options, parameters, bindkeys, navGrid) {
    html = "<table id=" + idx + "></table>";
    html += "<div id=p" + idx + "></div>";
    html += "<input type='hidden' id='c" + idx + "' name='c" + idx + "' value='' />";

    $("#" + idPanel).html(html);
    procesarConsultaSubProceso('registrar', parameters, function(requestData) {
        $("#c" + idx).val(requestData.length);
        _options = $.extend(_options, {
            datatype: "local",
            data: requestData
        });
        
        reloadJQGrid(idx, _options, bindkeys, navGrid);
    },'json');
}

function reloadJQGrid(id, _options, bindkeys, navGrid) {
    options = $.extend({
        // scroll: 1,
        // loadComplete: function (data){},
        height: 250,
        data: [],
        datatype: "local",
        rowNum: 10,
        rownumbers: false,
        recordtext: "{0} - {1} de {2} registros",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pag: {0} de {1}',
        pager: "#p" + id,
        viewrecords: true,
        shrinkToFit: false,
        loadonce: true,
        scrollOffset: 1,
        subGrid: false,
        footerrow: false,
        sortable: false
    }, _options);
    idx = "#" + id;
    $(idx).jqGrid(options);
    $(idx).jqGrid('setFrozenColumns');
    if (bindkeys != undefined || bindkeys != null) {
        $(idx).jqGrid('bindKeys', bindkeys);
    }
    if (navGrid != undefined || navGrid != null) {
        navGrid();
    }
}

function actualizarGrid(id, _options, bindkeys, navGrid) {
    _url = path + "jqgrid/paginar?name=" + id;
    options = $.extend({
        url: _url,
        datatype: "json"
    }, _options);
    reloadJQGrid(id, options, bindkeys, navGrid);
}

function inicializarGrid(id, _options, bindkeys, navGrid) {
    reloadJQGrid(id, _options, bindkeys, navGrid);
}

function contenidoJson(_proc, _parameters) {

    _Jsonarray = [];
    //_post = $.post(path + "util/combocontenedor", { "procedure": _proc, "parameters": '{}', "value": display.value, "display": display.display },
    _post = $.post(path + "util/Jsonarray", { "procedure": _proc, "parameters": _parameters },
        function (request) {
            $.each(request, function (i, columns) {
                _Jsonarray[i] = request[i];
            });
        }, 'json');
    //console.log(_Jsonarray);
    return _Jsonarray;

}

function contenidocomboContenedorjqGrid(_proc, display,_parameters) {
    var optionsjq = {};
    optionsjq.value = "9999999999:SELECCIONAR";
    optionsjq.defaultValue = "9999999999";
    if (_parameters == undefined)
        _parameters = '{}';
    //_post = $.post(path + "util/combocontenedor", { "procedure": _proc, "parameters": '{}', "value": display.value, "display": display.display },
    _post = $.post(path + "util/combocontenedor", { "procedure": _proc, "parameters": _parameters, "value": display.value, "display": display.display },
        function (request) {
            
            $.each(request, function (i, columns) {
                //console.log(columns);
            var value = columns.value;
            var label = columns.display;
            optionsjq.value += ';' + value + ':' + label;
            });
            //console.log(optionsjq);
        }, 'json');
    
    return optionsjq;
    
}

function contenidocomboProcedure(selectId, _procedure, _paramters, _value, _display) {

    _post = $.post(path + "util/combocontenedor", { "procedure": _procedure, "parameters": _paramters, "value": _value, "display": _display },
        function(request) {
            $(selectId).combobox('destroy');
            $(selectId).html(contenidocombo(request));
            $(selectId).combobox();
        }, 'json');
}

function contenidocombo(data) {
    var options = '<option value="9999999999">SELECCIONAR</option>';
    $.each(data, function(i, columns) {
    //console.log(columns);
    var value = columns.value;
    var label = columns.display;
        options += '<option value="' + value + '">' + label + '</option>';
    });
    return options;
}

function deshabilitarComponente(id, sw) {
    id = "#" + id;

    if (sw == true || sw == 1) {
        $(id).removeAttr('disabled');
    } else if (sw == false || sw != 1) {
        $(id).attr('disabled', 'disabled');
    }
}
function deshabilitarComponente_name(name, sw) {
    id = "[name='" + name+"']";

    if (sw == true || sw == 1) {
        $(id).removeAttr('disabled');
    } else if (sw == false || sw != 1) {
        $(id).attr('disabled', 'disabled');
    }
}
function print() {
    $("#divPrincipal").jqprint();
}

function closeDialog(id) {
    $('#' + id).dialog('close');
}

var openDialogData = function(url, data, width, height, title, id, fnc, buttons) {
    var _post;
    if (url != undefined) {
        _post = $.post(path + url, data);
        _post.success(function(requestData) {
            $(id).html(requestData);

            themeTextBox();
            //themeComboBox();
            //$("input:submit, input:button, input:reset, button").button();
            
            if (width != undefined || width != null)
                $(id).dialog('option', 'width', width);
            if (title != undefined || title != null)
                $(id).dialog('option', 'title', title);
            if (height != undefined || height != null)
                $(id).dialog('option', 'height', height);
            if (buttons != undefined || buttons != null)
                $(id).dialog('option', 'buttons', buttons);
            $(id).dialog('open');
            if (fnc != undefined && fnc != null && fnc != false) {
                fnc();
            }
        });
    }
};

var openDialogDataExt = function (url, data, width, height, title, id, fnc, buttons) {
    var _post;
    if (url != undefined) {
        _post = $.post(url, data);
        _post.success(function (requestData) {
            $(id).html(requestData);

            themeTextBox();
            //themeComboBox();
            //$("input:submit, input:button, input:reset, button").button();

            if (width != undefined || width != null)
                $(id).dialog('option', 'width', width);
            if (title != undefined || title != null)
                $(id).dialog('option', 'title', title);
            if (height != undefined || height != null)
                $(id).dialog('option', 'height', height);
            if (buttons != undefined || buttons != null)
                $(id).dialog('option', 'buttons', buttons);
            $(id).dialog('open');
            if (fnc != undefined && fnc != null && fnc != false) {
                fnc();
            }
        });
    }
};

function openDialogDataFunction1(url, data, width, height, title, fnc, buttons) {
    openDialogData(url, data, width, height, title, '#jqDialog1', fnc, buttons);
}

function openDialogDataFunctionExt1(url, data, width, height, title, fnc, buttons) {
    openDialogDataExt(url, data, width, height, title, '#jqDialog1', fnc, buttons);
}

function openDialogDataFunction2(url, data, width, height, title, fnc, buttons) {
    openDialogData(url, data, width, height, title, '#jqDialog2', fnc, buttons);
}

function openDialogDataFunction3(url, data, width, height, title, fnc, buttons) {
    openDialogData(url, data, width, height, title, '#jqDialog3', fnc, buttons);
}

function openDialogData1(url, data, width, height, title) {
    openDialogData(url, data, width, height, title, '#jqDialog1', null, null);
}

function openDialogData2(url, data, width, height, title) {
    openDialogData(url, data, width, height, title, '#jqDialog2', null, null);
}

function openDialog1(url, width, height, title) {
    openDialogData(url, {}, width, height, title, '#jqDialog1', null, null);
}

function openDialog2(url, width, height, title) {
    openDialogData(url, {}, width, height, title, '#jqDialog2', null, null);
}

function openDialogConfirm1(contenido, width, buttons) {
    $('#jqConfirmacion1').html(contenido);
    if (width != undefined)
        $('#jqDialogConfirmacion1').dialog('option', 'width', width);
    if (buttons != undefined)
        $('#jqDialogConfirmacion1').dialog('option', 'buttons', buttons);
    $('#jqDialogConfirmacion1').dialog('open');
}

function openDialogConfirm2(contenido, width, buttons) {
    $('#jqConfirmacion2').html(contenido);
    if (width != undefined)
        $('#jqDialogConfirmacion2').dialog('option', 'width', width);
    if (buttons != undefined)
        $(id).dialog('option', 'buttons', buttons);
    $('#jqDialogConfirmacion2').dialog('open');
}

function openDialogError(contenido, width, height) {
    $('#jqError').html(contenido);
    if (width != undefined)
        $('#jqDialogError').dialog('option', 'width', width);
    $('#jqDialogError').dialog('open');
}

function openDialogWarning(contenido, width, height) {
    $('#jqWarning').html(contenido);
    if (width != undefined)
        $('#jqDialogWarning').dialog('option', 'width', width);
    $('#jqDialogWarning').dialog('open');
}

function openDialogInfo(contenido, width, height, buttons, close) {
    $('#jqInfo').html(contenido);
    if (width != undefined)
        $('#jqDialogInfo').dialog('option', 'width', width);
    if (buttons != undefined)
        $('#jqDialogInfo').dialog('option', 'buttons', buttons);
    if (close != undefined)
        $('#jqDialogInfo').dialog('option', 'close', close);
    $('#jqDialogInfo').dialog('open');
}

function mouseHover(idTable) {
    idTable = '#' + idTable + " tbody";

    $(idTable).delegate('tr', 'hover', function() {
        $(this).toggleClass("ui-state-highlight").next().stop(true, true);
    });
}

function DoNavrow(theUrl) {
    window.open(theUrl, '_self');
}

function themeTextBox(selector) {
    if (selector == undefined || selector == null) {
        selector = ".ui-text";
    }
    $(selector).on("blur", function() {
        if ($(this).hasClass("ui-text-highlight")) {
            $(this).removeClass("ui-text-highlight");
        }
    });
    $(selector).on("focus", function() {
        if (!$(this).hasClass("ui-text-highlight")) {
            $(this).addClass("ui-text-highlight");
        }
    });
}

function themeComboBox(selector) {
    if (selector == undefined || selector == null) {
        selector = 'select:not(".notcombobox")';
    }

    _selector = $(selector);
  _selector.combobox();
    _selector.each(function() {
        var id = $(this).attr("id").replace('cbo', '#txt');
        $(id).bind("focus", function() {
            if (!$(this).hasClass("ui-combobox-input-highlight")) {
                $(this).addClass("ui-combobox-input-highlight");
            }
        });
        $(id).bind("blur", function() {
            if (!$(this).hasClass("ui-combobox-input-highlight")) {
                $(this).addClass("ui-combobox-input-highlight");
            }
        });
    });
}

function themeRemoveComboBox(selector) {
    if (selector == undefined || selector == null) {
        selector = 'select:not(".notcombobox")';
    }

    _selector = $(selector);
//    _selector.combobox();
    _selector.each(function () {
        var id = $(this).attr("id").replace('cbo', '#txt');
      

        $(id).bind("focus", function () {
            if (!$(this).hasClass("ui-combobox-input-highlight")) {
                $(this).removeClass("ui-combobox-input-highlight");
            }
        });
        $(id).bind("blur", function () {
            if (!$(this).hasClass("ui-combobox-input-highlight")) {
                $(this).removeClass("ui-combobox-input-highlight");
            }
        });
       
    });
}

(function($) {
    $.fn.getCheckboxValues = function() {
        var values = [];
        var i = 0;
        this.each(function() {
            values[i++] = $(this).val();
        });
        return values;
    };
})(jQuery);


Number.prototype.decimal = function(num) {
    pot = Math.pow(10, num);
    return parseInt(this * pot) / pot;
};

function NumberFormat(num, numDec, decSep, thousandSep) {
    var arg;
    var Dec;
    Dec = Math.pow(10, numDec);
    if (typeof(num) == 'undefined')
        return;
    if (typeof(decSep) == 'undefined')
        decSep = ',';
    if (typeof(thousandSep) == 'undefined')
        thousandSep = '.';
    if (thousandSep == '.')
        arg = /./g;
    else
    if (thousandSep == ',')
        arg = /,/g;
    if (typeof(arg) != 'undefined')
        num = num.toString().replace(arg, '');
    num = num.toString().replace(/,/g, '.');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * Dec + 0.50000000001);
    cents = num % Dec;
    num = Math.floor(num / Dec).toString();
    if (cents < (Dec / 10))
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + thousandSep + num.substring(num.length - (4 * i + 3));
    if (Dec == 1)
        return (((sign) ? '' : '-') + num);
    else
        return (((sign) ? '' : '-') + num + decSep + cents);
}


$(function() {
    $("#itemMenu1").menuBar({
        content: $("#itemMenu1").next().html(),
        showSpeed: 1,
        flyOut: true
    });

    $("#itemMenu2").menuBar({
        content: $("#itemMenu2").next().html(),
        showSpeed: 1,
        flyOut: true
    });

    $("#itemMenu3").menuBar({
        content: $("#itemMenu3").next().html(),
        showSpeed: 1,
        flyOut: true
    });
    $("#itemMenu4").menuBar({
        content: $("#itemMenu4").next().html(),
        showSpeed: 1,
        flyOut: true
    });

    themeTextBox();
    themeComboBox();
    //$(function() {
        $("input:submit, input:button, input:reset, button").button();
    //});

    /*
     var brw = new Browser();
     console.log('fullName: ' + brw.fullName);
     console.log('name: ' + brw.name);
     console.log('fullVersion: ' + brw.fullVersion);
     console.log('version: ' + brw.version);
     console.log('platform: ' + brw.platform);
     console.log('mobile: ' + brw.mobile);
     console.log('resolution: ' + brw.width + 'x' + brw.height);
     console.log('availWidth: ' + screen.availWidth);
     console.log('width: ' + screen.width);
     console.log('availHeight: ' + screen.availHeight);
     console.log('height: ' + screen.height);
     */
    window.moveTo(screen.width - screen.availWidth, screen.height - screen.availHeight);
    window.resizeTo(screen.availWidth + screen.availWidth - screen.width, screen.availHeight + screen.availHeight - screen.height);

    // console.log("#west.height: " + $("#west").css("height"));
});


/*DV*/
function estadoText(cellvalue, options, rowObject) {
    if (cellvalue == '1')
        return 'Activo';
    else
        return 'Inactivo';
}
/*DV*/

// Changes XML to JSON

function xml2json(xml) {
    //try {
        var obj = {};

        if (xml.childNodes.length > 0) {
            for (var i = 0; i < xml.childNodes.length; i++) {

                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;

                if (nodeName == '#text') {
                    //console.log(item.textContent);
                    return item.textContent
                 }
                 
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = xml2json(item);
                } 
                else{
                
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    
                    obj[nodeName].push(xml2json(item));
                }
            }
        } else {
        
        obj = xml.textContent;
        }
        //console.log(obj);
        return obj;
   /* } catch (e) {
        console.log(e.message);
    }*/
}



function loadXMLString(txt) {
//    if (window.DOMParser) {
//        parser = new DOMParser();
//        xmlDoc = parser.parseFromString(txt, "text/xml");
//    }
//    else // Internet Explorer
//    {
//        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
//        xmlDoc.async = false;
//        xmlDoc.loadXML(txt);
//    }
    //    return xmlDoc;

    var xmlDoc = $.parseXML(txt);
    //console.log(xmlDoc.childNodes);
    return xmlDoc;    
}



//if (typeof window.DOMParser != "undefined") {
//    parseXml = function(xmlStr) {
//        return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
//    };
//} else if (typeof window.ActiveXObject != "undefined" &&
//       new window.ActiveXObject("Microsoft.XMLDOM")) {
//    parseXml = function(xmlStr) {
//        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
//        xmlDoc.async = "false";
//        xmlDoc.loadXML(xmlStr);
//        return xmlDoc;
//    };
//} else {
//    throw new Error("No XML parser found");
//}



//David
function ButtonsDisable() {
    var allRowsMenu = $("#tblTreeMenu").jqGrid('getRowData');
    var pathname = window.location.pathname.replace("/", "");
    //console.log(pathname);
    var ButtonsDisabled = [];
    $.each(allRowsMenu, function(i, rowDataMenu) {
        //if (pathname == rowDataMenu.accion) {
        if (pathname.indexOf(rowDataMenu.accion) != -1) {
            if (rowDataMenu.buttonsDisable != '') {
                //console.log(rowDataMenu);
                var xmlDoc = loadXMLString(rowDataMenu.buttonsDisable);
                //console.log(xmlDoc);
                var datajson = xml2json(xmlDoc);
                //console.log(datajson);
                //console.log("dave");
                ButtonsDisabled = datajson.buttondisablexml.buttons

                if (typeof (datajson.buttondisablexml.buttons.length) == "undefined") {
                    var old = ButtonsDisabled;
                    ButtonsDisabled = [];
                    ButtonsDisabled.push(old);
                }
            } else {
                //ButtonsDisabled.push([]);
            }
        }
    });

    //console.log(ButtonsDisabled);
    $.each(ButtonsDisabled, function(i, rowDataButtonsDisable) {
        //console.log('|' + rowDataButtonsDisable.cbutton + '|');
        $("#" + rowDataButtonsDisable.cbutton).button("disable");
    });
}

/*---------- Funcion para obtener la edad ------------*/
function calcular_edad(fecha) {
    var fechaActual = new Date()
    var diaActual = fechaActual.getDate();
    var mmActual = fechaActual.getMonth() + 1;
    var yyyyActual = fechaActual.getFullYear();
    FechaNac = fecha.split("/");
    var diaCumple = FechaNac[0];
    var mmCumple = FechaNac[1];
    var yyyyCumple = FechaNac[2];
    //retiramos el primer cero de la izquierda
    if (mmCumple.substr(0, 1) == 0) {
        mmCumple = mmCumple.substring(1, 2);
    }
    //retiramos el primer cero de la izquierda
    if (diaCumple.substr(0, 1) == 0) {
        diaCumple = diaCumple.substring(1, 2);
    }
    var edad = yyyyActual - yyyyCumple;

    //validamos si el mes de cumpleaños es menor al actual
    //o si el mes de cumpleaños es igual al actual
    //y el dia actual es menor al del nacimiento
    //De ser asi, se resta un año
    if ((mmActual < mmCumple) || (mmActual == mmCumple && diaActual < diaCumple)) {
        edad--;
    }
    return edad;
};


$.capital = function (str) {
    return str.replace(/^(.)|\s(.)/g, function ($1) {
        return $1.toUpperCase();
    });
};


/*---------- Funcion para convertir jqgrid a hmtl ------------*/
function jqGridToHtml(jqgrid, columname, columid) {

    var html = "<head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'/></head>";
    html += "<body><form><div>";
     html += "<table border='1' style='border-color: dfeffc;' >";

    html += "<tr>";
    for (var i = 0; i < columname.length; i++) {
        html += "<td style='background-color: #dfeffc; font-weight: bold;'>";
        html +=  columname[i] ;
        html += "</td>";
    }
    html += "</tr>";
   
    for (var i = 0; i < jqgrid.length; i++) {
        var row=jqgrid[i];
        html += "<tr>";
        
        for (var r in row) {            
                        
            if (columid.indexOf(r) >= 0) {
                html += "<td>";
                html += row[r];
                html += "</td>";
            }

        
        }
        html += "</tr>";
    }


    html += "</table>";
    html += "</form></div></body>";
    return html;

}