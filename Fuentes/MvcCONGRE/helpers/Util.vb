Imports System.Web
Imports System.Web.UI.Page
Imports System.Configuration
Imports System.Data
Imports System.IO

Public Class Util
    Public Function getTitle() As String
        Return "Seguimiento Documentario"
    End Function
    'Inherits System.Web.HttpApplication
    'Inherits System.Web.UI.Page
    Public Function getPathFiles() As String
        Return ConfigurationManager.AppSettings("ServerHttpFiles")
    End Function
    Public Function getPath() As String

        'Dim url As New UrlHelper( )
        'Return HttpContext.Current.Request.Url.Authority & "/"


        Return HttpContext.Current.Request.Url.Scheme & HttpContext.Current.Request.Url.SchemeDelimiter & HttpContext.Current.Request.Url.Authority & HttpContext.Current.Request.ApplicationPath & IIf(HttpContext.Current.Request.ApplicationPath.EndsWith("/"), "", "/")

        'Return String.Format("http://{0}{1}", HttpContext.Current.Request.Url.Authority, HttpContext.Current.Request.ApplicationPath & IIf(HttpContext.Current.Request.ApplicationPath.EndsWith("/"), "", "/"))
        'Return HttpContext.Current.Request.Url.AbsoluteUri
        'Return HttpContext.Current.Request.ServerVariables("SERVER_NAME")
        'HttpContext.Current.Request.ServerVariables("SCRIPT_NAME")
        'HttpContext.Current.Request.ServerVariables("HTTP_USER_AGENT")
        'HttpContext.Current.Request.ServerVariables("REMOTE_ADDR")
        'HttpContext.Current.Request.ServerVariables("HTTP_REFERER")

    End Function

    Public Function getPhysicalPath() As String
        'Return HttpContext.Current.Request.PhysicalPath
        Return HttpContext.Current.Request.PhysicalApplicationPath
    End Function

    Public Function getImage(ByVal image As String) As String
        Return Me.getPath & "Content/img/" & image
    End Function

    Public Function getRutaReq(ByVal image As String) As String
        Return Me.getPath & "Content/img/" & image
    End Function

    Public Function getStyle() As String
        Dim files As ArrayList = readFile("content/css", True)
        Dim script As String = style(files)
        Return script
    End Function
    Private Function style(ByVal files As ArrayList) As String
        Dim script As String = vbCrLf
        For Each element In files
            Dim split2() As String = Split(element.ToString, ".")
            If split2(split2.Count - 1) = "css" Then
                script &= vbTab & "<link href='" & element.ToString & "' rel='stylesheet' type='text/css' />" & vbCrLf
            End If
        Next
        Return script
    End Function

    Private Function readFile(ByVal sourceDir As String, ByVal fRecursive As Boolean) As ArrayList

        'sourceDir = sourceDir.Replace("\", "/")

        Dim script As New ArrayList

        Dim i As Integer
        Dim posSep As Integer
        Dim sDir As String
        Dim aDirs() As String
        'Dim sFile As String
        'Dim aFiles() As String

        'If Not sourceDir.EndsWith(System.IO.Path.DirectorySeparatorChar.ToString()) Then
        If Not sourceDir.EndsWith("/") Then
            sourceDir &= "/" 'System.IO.Path.DirectorySeparatorChar
            'sourceDir &= System.IO.Path.DirectorySeparatorChar
        End If


        If fRecursive Then
            aDirs = System.IO.Directory.GetDirectories(Me.getPhysicalPath() & sourceDir)
            For i = 0 To aDirs.GetUpperBound(0)
                posSep = aDirs(i).LastIndexOf("/")
                sDir = aDirs(i).Substring((posSep + 1), aDirs(i).Length - (posSep + 1))
                'script.AddRange(readFile(aDirs(i), fRecursive))
                script.AddRange(readFile(sourceDir & sDir, fRecursive))
            Next
        End If

        Dim tFiles() As String
        tFiles = System.IO.Directory.GetFiles(Me.getPhysicalPath() & sourceDir)
        Dim j As Int32 = 0
        Dim n As Int32 = 0
        n = tFiles.Length - 1
        Try
            For j = 0 To n

                Dim afile As New System.IO.FileInfo(tFiles(j))
                'script.Add(New String() {"",""})
                'Dim x As Integer
                'x = tFiles(j).IndexOf("\")
                'script.Add(tFiles(j).Remove(0, x + 1))

                'script.Add(tFiles(j))
                script.Add(getPath() & sourceDir & afile.Name)
            Next
        Catch ex As Exception

        End Try
        script.Sort()
        Return script
    End Function

    Public Function getScript(ByVal pathJS As String)
        Dim files As ArrayList = readFile(pathJS, True)
        Dim script As String = vbCrLf
        For Each element In files
            script &= vbTab & "<script type='text/javascript' src='" & element.ToString & "'></script>" & vbCrLf
        Next
        Return script
    End Function

    Public Function registerScriptJSControllerAction(ByVal Controller_Request As ControllerContext) As String
        Dim controller As String = Controller_Request.RouteData.Values("Controller")
        Dim action As String = Controller_Request.RouteData.Values("Action")
        Dim script As String = vbTab & "<script type='text/javascript' src='" & getPath() & "Scripts/js/" & controller & "/" & action & ".js'/></script>" & vbCrLf
        HttpContext.Current.Session("scriptControllerAction") = script
        Return script
    End Function


    Public Function getScriptJSControllerAction() As String
        Dim script As String = ""
        'If Not String.IsNullOrEmpty(HttpContext.Current.Session("scriptControllerAction")) Then
        If Not HttpContext.Current.Session("scriptControllerAction") Is Nothing Then
            script = HttpContext.Current.Session("scriptControllerAction")
            HttpContext.Current.Session("scriptControllerAction") = ""
        End If
        Return script

    End Function


    Public Function getLink(ByVal url As String) As String
        Return getPath() & url
    End Function

    Public Function getCombo(ByVal _parameters As ArrayList, ByVal _procedure As String, ByVal _default As String, ByVal _columns() As String, ByVal _firtsitem As String) As String

        Dim Dadapt As New DataAdapterOracle
        Dim tblCombo As DataTable
        tblCombo = Dadapt.ReturnDataTable(_procedure, _parameters)
        Return ContenidoCombo(tblCombo, _default, _columns, _firtsitem)

    End Function



    Private Function ContenidoCombo(ByVal _tblCombo As DataTable, ByVal _default As String, ByVal _columns() As String, ByVal _firtsitem As String) As String
        Dim html As String = ""
        Dim _value As String
        Dim _display As String
        If _tblCombo.Rows.Count > 0 Then
            html &= "<option value='9999999999'>" + _firtsitem + "</option>"
            _value = _columns(0)
            _display = _columns(1)
            For Each dr As DataRow In _tblCombo.Rows
                If dr(_value).ToString = _default Then
                    html &= "<option value='" & dr(_value) & "' selected='selected'>" & dr(_display) & "</option>"
                Else
                    html &= "<option value='" & dr(_value) & "'>" & dr(_display) & "</option>"
                End If
            Next
        Else
            'html = "<option value='-1'>No existen datos</option>"
            html = "<option value='9999999999'>NO EXISTEN DATOS</option>"
        End If
        html = html
        Return html
    End Function

    Public Function getComboTree(ByVal _parameters As ArrayList, ByVal _procedure As String, ByVal _default As String, ByVal _columns() As String, ByVal _firtsitem As String) As String

        Dim Dadapt As New DataAdapterOracle
        Dim tblCombo As DataTable
        tblCombo = Dadapt.ReturnDataTable(_procedure, _parameters)
        Return ContenidoComboTree(tblCombo, _default, _columns, _firtsitem)

    End Function

    Private Function ContenidoComboTree(ByVal _tblCombo As DataTable, ByVal _default As String, ByVal _columns() As String, ByVal _firtsitem As String) As String
        Dim html As String = ""
        Dim _value As String
        Dim _display As String
        If _tblCombo.Rows.Count > 0 Then
            html &= "<ul>"
            _value = _columns(0)
            _display = _columns(1)
            For Each dr As DataRow In _tblCombo.Rows
                If dr(_value).ToString = _default Then
                    html &= "<li id='" & dr(_value) & ">" & dr(_display) & "</li>"
                Else
                    html &= "<li id='" & dr(_value) & ">" & dr(_display) & "</li>"
                End If
            Next
        Else
            'html = "<option value='-1'>No existen datos</option>"
            html = "<li>NO EXISTEN DATOS</li>"
        End If
        html &= "</ul>"
        Return html
    End Function
    Public Function periodo()
        Dim html As String = ""
        Dim anio_ini As Integer = 1980
        Dim anio_fin As Integer = Year(Now)
        html &= "<option value='9999999999'>SELECCIONE</option>"
        For i As Integer = anio_fin To anio_ini Step -1
            If i = anio_fin Then
                html &= "<option value='" & i & "' selected='selected'>" & i & "</option>"
            Else
                html &= "<option value='" & i & "'>" & i & "</option>"
            End If
        Next
        Return html


    End Function

    Public Function meses()
        Dim html As String = ""
        Html &= "<option value='9999999999'>SELECCIONE</option>"
        html &= "<option value='01'>ENERO</option>"
        html &= "<option value='02'>FEBRERO</option>"
        html &= "<option value='03'>MARZO</option>"
        html &= "<option value='04'>ABRIL</option>"
        html &= "<option value='05'>MAYO</option>"
        html &= "<option value='06'>JUNIO</option>"
        html &= "<option value='07'>JULIO</option>"
        html &= "<option value='08'>AGOSTO</option>"
        html &= "<option value='09'>SEPTIEMBRE</option>"
        html &= "<option value='10'>OCTUBRE</option>"
        html &= "<option value='11'>NOVIEMBRE</option>"
        html &= "<option value='12'>DICIEMBRE</option>"

        Return html


    End Function

    Public Function tableofcias(ByVal _array As String) As DataTable
        Dim dt As New DataTable
        dt.Columns.Add("id_reg", Type.GetType("System.Int32"))
        dt.Columns.Add("no_cia", Type.GetType("System.String"))
        Dim vector As String() = _array.Split(",")

        For i = 0 To vector.Count - 1
            dt.Rows.Add()
            dt(i)("id_reg") = i + 1
            dt(i)("no_cia") = vector(i)
        Next
        Return dt
    End Function

    Public Function LetraCapital(ByVal texto As String, ByVal exceptions As String)
        Dim result As String = ""
        Dim cadenas() As String = Split(texto, " ")

        For i = 0 To cadenas.Length - 1
            Dim newcad As String = cadenas(i)
            If Not newcad = exceptions Then
                For j = 0 To newcad.Length - 1
                    If (j = 0) Then
                        result += newcad.Substring(j, 1).ToUpper
                    Else
                        result += newcad.Substring(j, 1).ToLower
                    End If

                Next
            Else
                result += newcad
            End If
            
            result += " "

        Next


        Return Trim(result)
    End Function
End Class
