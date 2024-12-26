Public Class Dialog

    Public Function scriptConfig(ByVal id As String _
            , ByVal title As String _
            , ByVal buttons As String _
            , ByVal height As String _
            , ByVal width As String _
            , ByVal dialogClass As String _
            , ByVal resizable As String _
            , ByVal autoOpen As String _
            , ByVal closeOnEscape As String _
            , ByVal modal As String _
            , ByVal href As String) As String

        Dim script As String
        script = vbTab & "<script type='text/javascript'>"
        script &= vbTab & vbCrLf & "$(document).ready(function () {"
        script &= vbTab & vbCrLf & "var options_" & id & " = {};"
        script &= vbTab & vbCrLf & "options_" & id & ".title = '" & title & "';"
        script &= vbTab & vbCrLf & "options_" & id & ".buttons = " & buttons & ";"
        script &= vbTab & vbCrLf & "options_" & id & ".minHeight = 'auto';"
        script &= vbTab & vbCrLf & "options_" & id & ".width = " & width & ";"
        script &= vbTab & vbCrLf & "options_" & id & ".position = ['center', 'center'];"
        If dialogClass.Length > 0 Then
            script &= vbTab & vbCrLf & "options_" & id & ".dialogClass = '" & dialogClass & "';"
        End If
        script &= vbTab & vbCrLf & "options_" & id & ".resizable = " & resizable & ";"
        script &= vbTab & vbCrLf & "options_" & id & ".autoOpen = " & autoOpen & ";"
        script &= vbTab & vbCrLf & "options_" & id & ".closeOnEscape = " & closeOnEscape & ";"
        script &= vbTab & vbCrLf & "options_" & id & ".modal = " & modal & ";"
        script &= vbTab & vbCrLf & "options_" & id & ".jqueryaction = 'dialog';"
        script &= vbTab & vbCrLf & "options_" & id & ".id = '" & id & "';"
        script &= vbTab & vbCrLf & "options_" & id & ".href = '" & href & "';"
        script &= vbTab & vbCrLf & "$('#" & id & "').dialog(options_" & id & ");"
        script &= vbTab & vbCrLf & "});"
        script &= vbTab & vbCrLf & "</script>"
        Return script


    End Function

End Class

