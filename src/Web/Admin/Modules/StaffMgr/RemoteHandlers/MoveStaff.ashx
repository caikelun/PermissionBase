<%@ WebHandler Language="C#" Class="MoveStaff" %>

using System;
using System.Web;
using System.Web.SessionState;
using PermissionBase.Core.Service;

public class MoveStaff : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(MoveStaff));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("StaffMgr", "rights_move");

            string id = context.Request.QueryString["id"];
            string newDepartmentPKId = context.Request.QueryString["newDepartmentPKId"];

            StaffSrv.MoveStaff(id, newDepartmentPKId);
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