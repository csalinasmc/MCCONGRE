Public Class Utilitarios
    Public Function GetPCUser() As String
        'ByVal page As System.Web.UI.Page
        'Try
        '    Return System.Net.Dns.GetHostByAddress(page.Request.UserHostAddress).HostName()
        'Catch ex As Exception

        Dim dip As String
        dip = System.Web.HttpContext.Current.Request.ServerVariables("HTTP_X_FORWARDED_FOR")
        If dip Is Nothing Then
            dip = System.Web.HttpContext.Current.Request.ServerVariables("REMOTE_ADDR")
        End If
        Return dip

        'End Try

    End Function

End Class
