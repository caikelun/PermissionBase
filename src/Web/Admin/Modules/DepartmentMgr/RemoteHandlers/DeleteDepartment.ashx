<%@ WebHandler Language="C#" Class="DeleteDepartment" %>

using System;
using System.Web;
using System.Web.SessionState;
using PermissionBase.Core.Service;

public class DeleteDepartment : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(DeleteDepartment));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "-1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("DepartmentMgr", "rights_delete");

            sSucceed = DepartmentSrv.DeleteDepartment(context.Request.QueryString["id"]);
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