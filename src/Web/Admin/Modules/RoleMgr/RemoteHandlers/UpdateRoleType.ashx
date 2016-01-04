<%@ WebHandler Language="C#" Class="UpdateRoleType" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class UpdateRoleType : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(UpdateRoleType));

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

            RoleTypeDTO dto = new RoleTypeDTO();
            dto.Name = xmlDoc.SelectSingleNode("RoleType/Name").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("RoleType/Remark").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("RoleType/OrderId").InnerText);
            dto.Id = xmlDoc.SelectSingleNode("RoleType/Id").InnerText;

            RoleTypeSrv.UpdateRoleType(dto);
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