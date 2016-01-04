<%@ WebHandler Language="C#" Class="InsertDepartment" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class InsertDepartment : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(InsertDepartment));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string newId = "-1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("DepartmentMgr", "rights_add");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            DepartmentDTO dto = new DepartmentDTO();
            dto.Name = xmlDoc.SelectSingleNode("Department/Name").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("Department/OrderId").InnerText);
            dto.Phone = xmlDoc.SelectSingleNode("Department/Phone").InnerText;
            dto.ExtNumber = xmlDoc.SelectSingleNode("Department/ExtNumber").InnerText;
            dto.Fax = xmlDoc.SelectSingleNode("Department/Fax").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("Department/Remark").InnerText;
            dto.ParentDepartmentId = xmlDoc.SelectSingleNode("Department/ParentDepartmentId").InnerText;

            newId = DepartmentSrv.InsertDepartment(dto);
        }
        catch (Exception ex)
        {
            newId = "-1";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write(newId);
            context.Response.End();
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}