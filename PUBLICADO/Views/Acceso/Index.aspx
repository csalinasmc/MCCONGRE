<%@ Page Title="" Language="VB" MasterPageFile="~/Views/Shared/vmpInicio.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<%
    Session("DataUser") = Nothing
    
    %>

    <div align="center" style="margin: 10px">

   <div align="center" class="ui-widget ui-widget-content ui-corner-all " 
            style="width:400px; height:230px; font-weight: bold;" >
                    <div class="ui-widget ui-state-default ui-corner-top ui-title" style="font-weight: bold">
                            <label>INICIAR SESION</label>                            
                        </div>
                        
            <table width="100%" style="padding: 20px; text-align: left">
            <tr>
            <td>
                Usuario:</td>
            <td>
                <input id="txtusuario" type="text" name="p_usuario" 
                    style="text-transform: uppercase" /></td>
            </tr>

            <tr>
            <td>
                &nbsp;</td>
            <td>
                &nbsp;</td>
            </tr>

            <tr>
            <td>
                &nbsp;</td>
            <td>
                &nbsp;</td>
            </tr>

            <tr>
            <td>
                Clave:</td>
            <td>
                <input id="txtpaswword" type="password" name="p_password" /></td>
            </tr>

            <tr>
            <td>
                &nbsp;</td>
            <td>
                &nbsp;</td>
            </tr>

            <tr>
            <td>
                &nbsp;</td>
            <td>
                &nbsp;</td>
            </tr>

            <tr>
            <td colspan="2" style="text-align: center">
                <button id="btnnext"  style="width:100px; font-weight:bold;" >Siguiente</button>
                <%--<input type="submit" id="btnnext" value="Siguiente" />--%>
                <table class="style5">
                    <tr>
                        <td>
                            &nbsp;</td>
                        <td>
                            &nbsp;</td>
                    </tr>
                </table>
                </td>
            </tr>

            <tr>
            <td>
                &nbsp;</td>
            <td>
               
               </td>
            </tr>

            </table>
           
               
                   
                    
                
                    
                
                
        </div>
</div>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
