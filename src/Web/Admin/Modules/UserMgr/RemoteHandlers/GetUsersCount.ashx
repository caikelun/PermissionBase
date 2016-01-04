<%@ WebHandler Language="C#" Class="GetUsersCount" %>

using System;
using System.Web;
using System.Web.SessionState;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public class GetUsersCount : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(GetUsersCount));

    public void ProcessRequest (HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sCount = "-1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("UserMgr", "rights_browse");

            int iCount = UserSrv.GetUsersCount();
            sCount = iCount.ToString();
        }
        catch (Exception ex)
        {
            sCount = "-1";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write(sCount);
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