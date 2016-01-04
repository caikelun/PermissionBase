<%@ WebHandler Language="C#" Class="UpdateRole" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class UpdateRole : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(UpdateRole));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("RoleMgr", "rights_edit");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);
            
            RoleDTO dto = new RoleDTO();
            dto.Name = xmlDoc.SelectSingleNode("Role/Name").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("Role/Remark").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("Role/OrderId").InnerText);
            dto.Id = xmlDoc.SelectSingleNode("Role/Id").InnerText;

            RoleSrv.UpdateRole(dto);
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