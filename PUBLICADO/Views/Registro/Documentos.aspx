<%@ Page Title="" Language="VB" MasterPageFile="~/Views/Shared/vmpDocuments.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server" >


  
            <fieldset style="padding:10px;padding-top:0px;margin-bottom:10px ">
                <legend style="font-weight: bold">SELECCIONE EL PERIODO</legend>

                        AÑO:
                        <select id="cboanio" >                        
                        <% 
                            Dim lista As String = ""
                            For index = System.DateTime.Now.Year - 10 To System.DateTime.Now.Year
                                
                                If System.DateTime.Now.Year = index Then
                                    lista += "<option value=" + index.ToString + " selected>" + index.ToString + "</option>"
                                Else
                                    lista += "<option value=" + index.ToString + ">" + index.ToString + "</option>"
                                End If

                                
                            Next
                            Response.Write(lista)
                            %>
                        </select>
                        <span style="margin-left: 50px">MES:</span>
                        <select id="cbomes">
                       
                       <option value="00">--TODOS--</option>
                        <% 
                            Dim meses As String = ""
                            For index = 1 To 12
                                
                                If System.DateTime.Now.Month = index Then
                                    meses += "<option value=" + index.ToString.PadLeft(2, "0") + " selected>" + MonthName(index).ToUpper + "</option>"
                                Else
                                    meses += "<option value=" + index.ToString.PadLeft(2, "0") + ">" + MonthName(index).ToUpper + "</option>"
                                End If

                                
                            Next
                            Response.Write(meses)
                            %>
                        </select>
                         <button id="btnFiltrar" style="margin-left: 50px">Buscar</button>
                       
                        <span style="margin-left: 50px">SISTEMA:</span>
                        <select id="cbosistema">
                       <option value="MCCONGRE">SITD</option>
                       <option value="IDOSGD">SGD</option>
                       
                        </select>
                </fieldset>

  <div id="panelResult" style="font-size:8pt;width:100%">
        <table id="tblResult" >
        </table>
        <div id="ptblResult">
            </div>
        <input type="hidden" id="ctblResult" name="ctblResult" value="" />
    </div>    
    <input type="hidden" id="idperfil" value="<%= ViewData("idperfil") %>"  />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
