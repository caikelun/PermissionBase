<%@ WebHandler Language="C#" Class="InsertModuleType" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class InsertModuleType : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(InsertModuleType));
    
    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        
        string newId = "-1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("ModuleMgr", "rights_add");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            ModuleTypeDTO dto = new ModuleTypeDTO();
            dto.Name = xmlDoc.SelectSingleNode("ModuleType/Name").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("ModuleType/Remark").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("ModuleType/OrderId").InnerText);
            dto.ParentModuleTypeId = xmlDoc.SelectSingleNode("ModuleType/ParentModuleTypeId").InnerText;

            newId = ModuleTypeSrv.InsertModuleType(dto);
        }
        catch (Exception ex)
        {
            newId = "-1";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write(newId);
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