<%@ WebHandler Language="C#" Class="StaffUpdatePassword" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using System.Collections.Specialized;
using PermissionBase.Core.Service;

public class StaffUpdatePassword : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(StaffUpdatePassword));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("StaffMgr", "rights_edit");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            string LoginId = xmlDoc.SelectSingleNode("Staff/LoginId").InnerText;
            string Password = xmlDoc.SelectSingleNode("Staff/Password").InnerText;

            StaffSrv.UpdatePassword(LoginId, Password);
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