Imports System.Net
Imports System.IO
Imports Proyecto.UTL


Namespace DocumentsCR
    Public Class RegistroController
        Inherits System.Web.Mvc.Controller

        '
        ' GET: /Registro

        Function Index() As ActionResult
            Return View()
        End Function

        Function Documentos() As ActionResult

            Dim util As New Util
            util.registerScriptJSControllerAction(ControllerContext)
            ViewData("iduser") = Session("iduser")
            ViewData("idperfil") = Session("idperfil")
            Return View()
        End Function

        Function Movimientos() As ActionResult
            Dim util As New Util
            Response.Write(util.registerScriptJSControllerAction(ControllerContext))

            Dim Dadapt As New DataAdapterOracle

            Dim arrayPrmtr1 As New ArrayList
            arrayPrmtr1.Add(New String() {"P_nu_emi", Request("P_NU_EMI")})
            arrayPrmtr1.Add(New String() {"P_nu_ann", Request("P_NU_ANN")})
            arrayPrmtr1.Add(New String() {"P_ORIGENSISTEMA", Request("P_ORIGENSISTEMA")})
            arrayPrmtr1.Add(New String() {"P_COD_TRAMITE", Request("P_COD_TRAMITE_EXT")})

            Dim tblcab As DataTable
            tblcab = Dadapt.ReturnDataTable(Request("P_SISTEMA") + ".pkg_documentscr.SP_SCABECERA", arrayPrmtr1)

            Dim arrayPrmtr2 As New ArrayList
            arrayPrmtr2.Add(New String() {"P_nu_emi", Request("P_NU_EMI")})
            arrayPrmtr2.Add(New String() {"P_nu_ann", Request("P_NU_ANN")})
            arrayPrmtr2.Add(New String() {"P_ORIGENSISTEMA", Request("P_ORIGENSISTEMA")})
            arrayPrmtr2.Add(New String() {"P_COD_TRAMITE", Request("P_COD_TRAMITE_INT")})

            Dim tbldet As DataTable
            tbldet = Dadapt.ReturnDataTable(Request("P_SISTEMA") + ".pkg_documentscr.sp_smovimientos_internos", arrayPrmtr2)

            ViewData("NU_EMI_") = Request("P_NU_EMI")
            ViewData("NU_ANN_") = Request("P_NU_ANN")
            ViewData("ORIGENSISTEMA_") = Request("P_ORIGENSISTEMA")
            ViewData("COD_TRAMITE_INT") = Request("P_COD_TRAMITE_INT")

            ViewData("COD_TRAMITE_EXT") = Request("P_COD_TRAMITE_EXT")

            ViewData("NUMERO_EXPEDIENTE") = tblcab(0)("COD_TRAMITE_ANIO").ToString + "-" + tblcab(0)("ANIO").ToString
            ViewData("PRIORIDAD") = tblcab(0)("PRIORIDAD").ToString
            ViewData("OBS") = tblcab(0)("OBSERVACION").ToString
            ViewData("FECHA_INGRESO") = tblcab(0)("FECHA_ING").ToString


            If Request("P_ORIGENSISTEMA") = "SITD" Then
                ViewData("ESTADO") = tblcab(0)("desestado").ToString
            Else
                ViewData("ESTADO") = IIf(tblcab(0)("ESTADO").ToString = "1", "En proceso", "Finalizado")
            End If




            ViewData("ENTIDAD_ORIGEN") = tblcab(0)("DESC_ENTIDAD").ToString
            ViewData("ASUNTO") = tblcab(0)("ASUNTO").ToString
            ViewData("DOCUMENTO") = tblcab(0)("DOCUMENTO").ToString




            Return View()
        End Function

        Function saveProyectoLey() As ContentResult
            Dim Dadapt As New DataAdapterOracle
            Dim arrayPrmtr As New ArrayList
            arrayPrmtr.Add(New String() {"P_SNUMEROPROYECTOLEY", Request("P_SNUMEROPROYECTOLEY")})
            arrayPrmtr.Add(New String() {"P_SESTADOPROYECTOLEY", Request("P_SESTADOPROYECTOLEY")})
            arrayPrmtr.Add(New String() {"P_COD_TRAMITE_INT", Request("P_COD_TRAMITE_INT")})

            arrayPrmtr.Add(New String() {"P_nu_emi", Request("nu_emi")})
            arrayPrmtr.Add(New String() {"P_nu_ann", Request("nu_ann")})
            arrayPrmtr.Add(New String() {"P_nu_cor_emi", Request("nu_cor_emi")})
            arrayPrmtr.Add(New String() {"P_nu_ann_resp", Request("nu_ann_resp")})
            arrayPrmtr.Add(New String() {"P_nu_emi_resp", Request("nu_emi_resp")})
            arrayPrmtr.Add(New String() {"P_ORIGENSISTEMA", Request("ORIGENSISTEMA")})

            Return Content(Dadapt.ExecProcedure("MCCONGRE.pkg_documentscr.sp_updnroproyectoley", arrayPrmtr), "aplcation/json")
        End Function


        Function getMenu() As ContentResult


            Dim Dadapt As New DataAdapterOracle

            Dim arrayPrmtr1 As New ArrayList
            arrayPrmtr1.Add(New String() {"P_NCODIGOPERFIL", Request("NCODIGOPERFIL")})


            Dim tblcab As DataTable
            tblcab = Dadapt.ReturnDataTable("MCCONGRE.pkg_documentscr.SP_GETMENU", arrayPrmtr1)

            Dim Covrttbl As New MyDataTableConverter
            Return Content(Covrttbl.GetJson(tblcab), "application/json")

        End Function


        Public Function Upload() As ContentResult
            'Dim Files As Stream
            'Files = Request.InputStream
            Dim COD_TRAMITE_INT As String = Request("cod_tramite")
            Dim COD_TRAMITE_EXT As String = Request("cod_tramite_ref")
            Dim FileName As String = Request("filename")

            Dim fileContent As System.IO.Stream = Request.InputStream
            Dim r = ConfigurationManager.AppSettings("ServerFiles") & FileName
            Dim fileStream As System.IO.FileStream = System.IO.File.Create(r)
            fileContent.Seek(0, System.IO.SeekOrigin.Begin)
            'Copying file's content to FileStream
            fileContent.CopyTo(fileStream)
            fileStream.Dispose()

            Dim Dadapt As New DataAdapterOracle
            Dim arrayPrmtr As New ArrayList
            arrayPrmtr.Add(New String() {"P_SNOMBREFILE", FileName})
            arrayPrmtr.Add(New String() {"P_COD_TRAMITE_INT", COD_TRAMITE_INT})
            arrayPrmtr.Add(New String() {"P_COD_TRAMITE_EXT", COD_TRAMITE_EXT})
            arrayPrmtr.Add(New String() {"P_ANIO", Request("ANIO")})
            arrayPrmtr.Add(New String() {"P_MES", Request("MES")})
            arrayPrmtr.Add(New String() {"P_CODIGOENTIDAD", Request("CODIGOENTIDAD")})
            arrayPrmtr.Add(New String() {"P_CODIGOUSUARIO", Request("CODIGOUSUARIO")})

            Dim ds As DataSet
            ds = Dadapt.ReturnDataSet("MCCONGRE.pkg_documentscr.sp_updfile", arrayPrmtr)

            Dim Covrttbl As New MyDataTableConverter
            Return Content(Covrttbl.GetJson_ofDataset(ds), "application/json")
        End Function




    End Class

  
End Namespace
