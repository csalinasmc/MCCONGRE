<%@ Control Language="VB" Inherits="System.Web.Mvc.ViewUserControl" %>

<div id="jqDialogConfirmacion1" style="display:none;vertical-align: middle;">
    <table style="width: 100%;height: 100%;">
        <tr>
            <td style="width: 26px;text-align: center;"><span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 7px 0;"></span></td>
            <td><span id="jqConfirmacion1" style="text-align: justify;"></span></td>
        </tr>
    </table>
</div>
<div id="jqDialogConfirmacion2" style="display:none;vertical-align: middle;">
    <table style="width: 100%;height: 100%;">
        <tr>
            <td style="width: 26px;text-align: center;"><span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 7px 0;"></span></td>
            <td><span id="jqConfirmacion2" style="text-align: justify;"></span></td>
        </tr>
    </table>
</div>
<div id="jqDialogInfo" style="display:none;vertical-align: middle;">
    <table style="width: 100%;height: 100%;">
        <tr>
            <td style="width: 26px;text-align: center;"><span class="ui-icon ui-icon-comment" style="float:left; margin:0 7px 7px 0;"></span></td>
            <td><span id="jqInfo" style="text-align: justify;"></span></td>
        </tr>
    </table>
</div>
<div id="jqDialogWarning" style="display:none;vertical-align: middle;">
    <table style="width: 100%;height: 100%;">
        <tr>
            <td style="width: 26px;text-align: center;"><span class="ui-icon ui-icon-info" style="float:left; margin:0 7px 7px 0;"></span></td>
            <td><span id="jqWarning" style="text-align: justify;"></span></td>
        </tr>
    </table>
</div>
<div id="jqDialogError" style="display:none;vertical-align: middle;">
    <table style="width: 100%;height: 100%;">
        <tr>
            <td style="width: 26px;text-align: center;"><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 7px 0;"></span></td>
            <td><span id="jqError" style="text-align: justify;"></span></td>
        </tr>
    </table>
</div>
<div id="jqDialog1" style="display:none;vertical-align: middle;"></div>
<div id="jqDialog2" style="display:none;vertical-align: middle;"></div>
<div id="jqDialog3" style="display:none;vertical-align: middle;"></div>

    <!-- Buscador de Personas  -->
<div id="jqDialogBusPerson" style="display:none;vertical-align: middle;"></div>
<%  
    Dim Dialog As New DocumentsCR.Dialog
    Dim Util As New DocumentsCR.Util
    
    Response.Write(Dialog.scriptConfig( _
        "jqDialogConfirmacion1" _
        , Util.getTitle _
        , "{'Aceptar':function(){okConfirmacion1();}, 'Cancelar':function(){cancelConfirmacion1();} }" _
        , "172" _
        , "370" _
        , "" _
        , "false" _
        , "false" _
        , "true" _
        , "true" _
        , "#" _
    ))

    Response.Write(Dialog.scriptConfig( _
        "jqDialogConfirmacion2" _
        , Util.getTitle _
        , "{'Aceptar':function(){okConfirmacion2();}, 'Cancelar':function(){cancelConfirmacion1();} }" _
        , "172" _
        , "370" _
        , "" _
        , "false" _
        , "false" _
        , "true" _
        , "true" _
        , "#" _
    ))

    Response.Write(Dialog.scriptConfig( _
        "jqDialogInfo" _
        , Util.getTitle _
        , "{'Aceptar':function(){closeDialog('jqDialogInfo');} }" _
        , "172" _
        , "370" _
        , "" _
        , "false" _
        , "false" _
        , "true" _
        , "true" _
        , "#" _
    ))

    Response.Write(Dialog.scriptConfig( _
        "jqDialogWarning" _
        , Util.getTitle _
        , "{'Aceptar':function(){closeDialog('jqDialogWarning');} }" _
        , "172" _
        , "370" _
        , "" _
        , "false" _
        , "false" _
        , "true" _
        , "true" _
        , "#" _
    ))

    Response.Write(Dialog.scriptConfig( _
        "jqDialogError" _
        , Util.getTitle _
        , "{'Aceptar':function(){closeDialog('jqDialogError');} }" _
        , "172" _
        , "370" _
        , "" _
        , "false" _
        , "false" _
        , "true" _
        , "true" _
        , "#" _
    ))

    Response.Write(Dialog.scriptConfig( _
      "jqDialog1" _
      , Util.getTitle _
      , "{}" _
      , "172" _
      , "370" _
      , "" _
      , "false" _
      , "false" _
      , "true" _
      , "true" _
      , "#" _
    ))

    Response.Write(Dialog.scriptConfig( _
      "jqDialog2" _
      , Util.getTitle _
      , "{}" _
      , "172" _
      , "370" _
      , "" _
      , "false" _
      , "false" _
      , "true" _
      , "true" _
      , "#" _
    ))
    
    Response.Write(Dialog.scriptConfig( _
    "jqDialog3" _
    , Util.getTitle _
    , "{}" _
    , "172" _
    , "370" _
    , "" _
    , "false" _
    , "false" _
    , "true" _
    , "true" _
    , "#" _
  ))
    
    Response.Write(Dialog.scriptConfig( _
        "jqDialogBusPerson" _
        , "Buscador de Personas" _
        , "{}" _
        , "172" _
        , "370" _
        , "" _
        , "false" _
        , "false" _
        , "true" _
        , "true" _
        , "#" _
      ))
%>