<%@ Control Language="VB" Inherits="System.Web.Mvc.ViewUserControl" %>

<%
    Dim util As New DocumentsCR.Util
 %>

<div id="jqDialogCargando" style="display:none;text-align:center;">
    <table style="padding: 5px;">
        <tr>
            <td align="right" valign="middle"><img src="<%=util.getImage("loading.gif")%>" /></td>
            <td align="left" valign="middle" style="font-weight: bold;">&nbsp;Procesando ...</td>
        </tr>
    </table>
</div>
<%--<?php 
    echo $this->dialog()->scriptConfig("jqDialogCargando", "", "{}", "100", "250", "hide-title-bar", "false", "false", "false", "true", "#");
?>--%>
<%
    Dim Dialog As New DocumentsCR.Dialog
    Response.Write(Dialog.scriptConfig("jqDialogCargando", "", "{}", "100", "250", "hide-title-bar", "false", "false", "false", "true", "#"))
    
    %>   
    <script type="text/javascript">

        $(document).ready(function () {
            
            $(document).ajaxStart(function() {
                $('#jqDialogCargando').dialog('open');
            });

            $(document).ajaxStop(function() {
                $('#jqDialogCargando').dialog('close');
                ButtonsDisable();
            });
        });
         </script>