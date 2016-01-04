<%@ WebHandler Language="C#" Class="UpdateRoles" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using System.Collections.Specialized;
using PermissionBase.Core.Service;

public class UpdateRoles : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(UpdateRoles));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("StaffMgr", "rights_accredit");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            //职员ID。
            string StaffId = xmlDoc.SelectSingleNode("Staff/StaffId").InnerText;

            //角色。
            string sRoleIds = xmlDoc.SelectSingleNode("Staff/Roles").InnerText;
            string[] arrRoleIds = null;
            if (sRoleIds.Length > 0)
                arrRoleIds = sRoleIds.Split('|');
            else
                arrRoleIds = new string[0];

            StaffSrv.UpdateRoles(StaffId, arrRoleIds);
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