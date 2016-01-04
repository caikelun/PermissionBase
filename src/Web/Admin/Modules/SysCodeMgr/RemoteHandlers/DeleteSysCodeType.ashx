<%@ WebHandler Language="C#" Class="DeleteSysCodeType" %>

using System;
using System.Web;
using System.Web.SessionState;
using PermissionBase.Core.Service;

public class DeleteSysCodeType : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(DeleteSysCodeType));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("SysCodeMgr", "rights_delete");

            SysCodeTypeSrv.DeleteSysCodeType(context.Request.QueryString["id"]);
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