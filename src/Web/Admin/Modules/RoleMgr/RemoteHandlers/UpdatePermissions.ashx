<%@ WebHandler Language="C#" Class="UpdatePermissions" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using System.Collections.Specialized;
using PermissionBase.Core.Service;

public class UpdatePermissions : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(UpdatePermissions));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("RoleMgr", "rights_accredit");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            //角色ID。
            string RoleId = xmlDoc.SelectSingleNode("Permissions/RoleId").InnerText;

            //肯定授权。
            string sGrant = xmlDoc.SelectSingleNode("Permissions/Grant").InnerText;
            string[] arrGrant = null;
            if (sGrant.Length > 0)
                arrGrant = sGrant.Split('|');
            else
                arrGrant = new string[0];

            //否定授权。
            string sDeny = xmlDoc.SelectSingleNode("Permissions/Deny").InnerText;
            string[] arrDeny = null;
            if (sDeny.Length > 0)
                arrDeny = sDeny.Split('|');
            else
                arrDeny = new string[0];

            RoleSrv.UpdatePermissions(RoleId, arrGrant, arrDeny);
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