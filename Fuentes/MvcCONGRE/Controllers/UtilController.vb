Imports System.Web.Script.Serialization
Imports System.Net.Mail
Imports System.Net.Mime

Public Class UtilController
    Inherits System.Web.Mvc.Controller

    '
    ' GET: /Util/

    Function Index() As ActionResult
        Return View()
    End Function

    Function Combocontenedor() As ContentResult


        Dim procedure As String = Request("procedure")
        Dim parameters As String = Request("parameters")
        Dim value As String = Request("value")
        Dim display As String = Request("display")

        Dim jSon_ As New JavaScriptSerializer
        Dim Dadapt As New DataAdapterOracle
        Dim arrayPrmtr As New ArrayList

        Dim Objparameter As System.Collections.Generic.Dictionary(Of String, Object)
        Objparameter = jSon_.DeserializeObject(parameters)

        For Each paramtr As KeyValuePair(Of String, Object) In jSon_.DeserializeObject(parameters)
            arrayPrmtr.Add(New String() {"@" & paramtr.Key, paramtr.Value})
        Next

        Dim tblresult As DataTable
        tblresult = Dadapt.ReturnDataTable(procedure, arrayPrmtr)

        Dim tbljson As New DataTable
        tbljson.Columns.Add("value")
        tbljson.Columns.Add("display")

        For Each dr As DataRow In tblresult.Rows
            Dim drw As DataRow
            drw = tbljson.NewRow
            drw("value") = dr(value)
            drw("display") = dr(display)
            tbljson.Rows.Add(drw)
        Next
        Dim Covrttbl As New MyDataTableConverter
        Return Content(Covrttbl.GetJson(tbljson), "application/json")

    End Function


    Function Jsonarray() As ContentResult


        Dim procedure As String = Request("procedure")
        Dim parameters As String = Request("parameters")

        Dim jSon_ As New JavaScriptSerializer
        Dim Dadapt As New DataAdapterOracle
        Dim arrayPrmtr As New ArrayList

        Dim Objparameter As System.Collections.Generic.Dictionary(Of String, Object)
        Objparameter = jSon_.DeserializeObject(parameters)

        For Each paramtr As KeyValuePair(Of String, Object) In jSon_.DeserializeObject(parameters)
            arrayPrmtr.Add(New String() {"@" & paramtr.Key, paramtr.Value})
        Next

        Dim tblresult As DataTable
        tblresult = Dadapt.ReturnDataTable(procedure, arrayPrmtr)

        Dim Covrttbl As New MyDataTableConverter
        Return Content(Covrttbl.GetJson(tblresult), "application/json")

    End Function


    Function Buspersona() As ActionResult

        Return View()
    End Function


  

    Public Function SendEmail() As String

        Try
            Dim head As String = "<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Strict//EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"">"
            Dim strBody As String = head + HttpUtility.UrlDecode(Request("strBody"))
            Dim strMailto As String = Request("strMailto")
            Dim strSubject As String = Request("strSubject")


            Dim smtp As SmtpClient
            Dim mensaje As MailMessage
            smtp = New SmtpClient("correo.overall.com.pe")
            smtp.UseDefaultCredentials = True
            mensaje = New MailMessage("ralcarraz@overall.com.pe", strMailto)
            mensaje.Subject = strSubject
            mensaje.Priority = MailPriority.High



            'mensaje.Attachments.Add(New Attachment(""))

            Dim av1 As AlternateView = AlternateView.CreateAlternateViewFromString(strBody, Nothing, MediaTypeNames.Text.Html)
            mensaje.AlternateViews.Add(av1)
            mensaje.IsBodyHtml = True
            mensaje.Body = strBody
            smtp.Send(mensaje)

        Catch ex As Exception

            Return "0"

        End Try
        Return "1"
    End Function

End Class

