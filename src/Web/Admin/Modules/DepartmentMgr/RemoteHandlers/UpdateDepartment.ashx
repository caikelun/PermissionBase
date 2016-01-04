<%@ WebHandler Language="C#" Class="UpdateDepartment" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class UpdateDepartment : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(UpdateDepartment));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("DepartmentMgr", "rights_edit");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            DepartmentDTO dto = new DepartmentDTO();
            dto.Name = xmlDoc.SelectSingleNode("Department/Name").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("Department/OrderId").InnerText);
            dto.Phone = xmlDoc.SelectSingleNode("Department/Phone").InnerText;
            dto.ExtNumber = xmlDoc.SelectSingleNode("Department/ExtNumber").InnerText;
            dto.Fax = xmlDoc.SelectSingleNode("Department/Fax").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("Department/Remark").InnerText;
            dto.Id = xmlDoc.SelectSingleNode("Department/Id").InnerText;

            DepartmentSrv.UpdateDepartment(dto);
        }
        catch (Exception ex)
        {
            sSucceed = "-1";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write(sSucceed);
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