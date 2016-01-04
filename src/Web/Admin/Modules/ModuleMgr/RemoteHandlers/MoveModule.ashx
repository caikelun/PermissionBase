<%@ WebHandler Language="C#" Class="MoveModule" %>

using System;
using System.Web;
using System.Web.SessionState;
using PermissionBase.Core.Service;

public class MoveModule : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(MoveModule));
    
    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        
        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("ModuleMgr", "rights_move");

            string id = context.Request.QueryString["id"];
            string newParentPKId = context.Request.QueryString["newParentPKId"];
            
            ModuleSrv.MoveModule(id, newParentPKId);
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