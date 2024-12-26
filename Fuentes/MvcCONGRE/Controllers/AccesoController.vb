Imports MvcCONGRE.ServiceReference1
Imports System.Configuration
Namespace DocumentsCR
    Public Class AccesoController
        Inherits System.Web.Mvc.Controller

        '
        ' GET: /Acceso

        Function Index() As ActionResult
            Dim util As New Util
            util.registerScriptJSControllerAction(ControllerContext)
            Return View()
        End Function

        Function Validar() As ContentResult
            Try
                Dim user As String = Request("p_usuario")
                Dim clave As String = Request("p_password")

                Dim service As New SessionServiceClient
                Dim sesionTemp As New ServiceReference1.sesionTemp
                Dim strApp As String = ConfigurationManager.AppSettings("app").ToString
                Dim strVersion As String = ConfigurationManager.AppSettings("version").ToString
                sesionTemp = service.sesionIniciarWeb(user.ToUpper, clave, strApp, strVersion)

                For Each e In service.leerSesionPorNumero(sesionTemp.numeroSesion)

                    Dim objUser As New DataUser
                    objUser.NomPers = e.nombreUsuario & " " & e.paternoUsuario & " " & e.maternoUsuario
                    objUser.CodSesion = sesionTemp.numeroSesion
                    objUser.UserLogin = user
                    Session("DataUser") = objUser
                    Session("iduser") = e.codigoUsuario
                    Session("idperfil") = e.codigoPerfil

                Next





                If sesionTemp.numeroSesion > 0 Then
                    Return Content("1")

                Else
                    Return Content("0")



                End If
            Catch ex As Exception
                Return Content("0")
                Throw ex
            End Try
        End Function

        Function CambiarPassw() As ActionResult
          


            Return View()

        End Function

        Function SavePassword() As ContentResult
            Try
                Dim password1 As String = Request("p_password1")
                Dim password2 As String = Request("p_password2")
                Dim res As Integer
                If Not Session("DataUser") Is Nothing Then
                    Dim objUser As DataUser = DirectCast(Session("DataUser"), DataUser)
                    Dim service As New SessionServiceClient
                    res = service.cambiarContrasenaUsuario(objUser.UserLogin.ToString.ToUpper, password1, Convert.ToInt32(objUser.CodSesion))

                End If

                
                Return Content(res.ToString)


            Catch ex As Exception
                Return Content(ex.Message)
                Throw ex
            End Try
        End Function

    End Class
End Namespace