Imports System.Web.Script.Serialization

Public Class JqgridController
    Inherits System.Web.Mvc.Controller

    '
    ' GET: /Jqgrid/

    Function Index() As ActionResult
        Return View()
    End Function

    


    Public Function RegistrarOrcl() As ActionResult

        Dim name As String = Request("name")
        Dim procedure As String = Request("procedure")
        Dim parameters As String = Request("parameters")

        Dim jSon_ As New JavaScriptSerializer
        Dim Dadapt As New DataAdapterOracle
        Dim arrayPrmtr As New ArrayList

        'Dim Objparameter As System.Collections.Generic.Dictionary(Of String, Object)
        'Objparameter = jSon_.DeserializeObject(parameters)

        For Each paramtr As KeyValuePair(Of String, Object) In jSon_.DeserializeObject(parameters)
            arrayPrmtr.Add(New String() {paramtr.Key, paramtr.Value})
        Next

        Response.Clear()
        Response.ContentType = "application/json; charset=utf-8"

        Response.Write(Dadapt.ReturnData(procedure, arrayPrmtr))
        Response.End()

        If Request.IsAjaxRequest Then

        End If

        Return View()
    End Function


End Class

