Public Class Log

    Public Sub WriteLog(ByVal _log As String)
        Dim ut As New Util

        Dim rutalog = ut.getPhysicalPath & "Log"
        System.IO.Directory.CreateDirectory(rutalog)
        Dim _date = DateTime.Now.ToString("yyyy-MM-dd")
        Dim logFilePath = My.Computer.FileSystem.CombinePath(rutalog, "log_ " & _date.Replace("-", "") & ".txt")

        Dim _time = TimeOfDay
        Dim logText As String = "[Logged: " & _date & " " & _time & "] " & _log & vbCrLf
        My.Computer.FileSystem.WriteAllText(logFilePath, logText, append:=True)


    End Sub
End Class
