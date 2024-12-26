<%@ Page Language="VB" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage(Of DocumentsCR.LogOnModel)" %>

<asp:Content ID="loginTitle" ContentPlaceHolderID="TitleContent" runat="server"> Iniciar sesión </asp:Content>

<asp:Content ID="loginContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Iniciar sesión</h2>
    <p>
        Escriba su nombre de usuario y contraseña. <%: Html.ActionLink("Regístrese", "Register") %> si no tiene una cuenta.
    </p>

    <% Using Html.BeginForm() %>
        <%: Html.ValidationSummary(True, "El inicio de sesión no se realizó correctamente. Corrija los errores y vuelva a intentarlo.")%>
        <div>
            <fieldset>
                <legend>Información de la cuenta</legend>
                
                <div class="editor-label">
                    <%: Html.LabelFor(Function(m) m.UserName) %>
                </div>
                <div class="editor-field">
                    <%: Html.TextBoxFor(Function(m) m.UserName) %>
                    <%: Html.ValidationMessageFor(Function(m) m.UserName) %>
                </div>
                
                <div class="editor-label">
                    <%: Html.LabelFor(Function(m) m.Password) %>
                </div>
                <div class="editor-field">
                    <%: Html.PasswordFor(Function(m) m.Password) %>
                    <%: Html.ValidationMessageFor(Function(m) m.Password) %>
                </div>
                
                <div class="editor-label">
                    <%: Html.CheckBoxFor(Function(m) m.RememberMe) %>
                    <%: Html.LabelFor(Function(m) m.RememberMe) %>
                </div>
                <p>
                    <input type="submit" value="Iniciar sesión" />
                </p>
            </fieldset>
        </div>
    <% End Using %>
</asp:Content>

