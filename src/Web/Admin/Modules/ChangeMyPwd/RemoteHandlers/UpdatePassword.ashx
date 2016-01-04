<%@ WebHandler Language="C#" Class="UpdatePassword" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using System.Collections.Specialized;
using PermissionBase.Core.Service;

public class UpdatePassword : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(UpdatePassword));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "-1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("ChangeMyPwd", "rights_browse");

            //获取登录ID。
            StaffSession ss = SessionUtil.GetStaffSession();
            string loginId = ss.LoginId;

            //获取新旧密码。
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);
            string oldPassword = xmlDoc.SelectSingleNode("Staff/OldPassword").InnerText;
            string newPassword = xmlDoc.SelectSingleNode("Staff/NewPassword").InnerText;

            //修改密码。
            bool bSucceed = StaffSrv.UpdatePassword(loginId, oldPassword, newPassword);
            sSucceed = bSucceed ? "1" : "0";
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