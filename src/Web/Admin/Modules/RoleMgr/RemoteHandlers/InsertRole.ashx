<%@ WebHandler Language="C#" Class="InsertRole" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class InsertRole : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(InsertRole));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string newId = "-1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("RoleMgr", "rights_add");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            RoleDTO dto = new RoleDTO();
            dto.Name = xmlDoc.SelectSingleNode("Role/Name").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("Role/Remark").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("Role/OrderId").InnerText);
            dto.RoleTypeId = xmlDoc.SelectSingleNode("Role/RoleTypeId").InnerText;

            newId = RoleSrv.InsertRole(dto);
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