<%@ WebHandler Language="C#" Class="UpdateModuleType" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class UpdateModuleType : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(UpdateModuleType));
    
    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("ModuleMgr", "rights_edit");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            ModuleTypeDTO dto = new ModuleTypeDTO();
            dto.Name = xmlDoc.SelectSingleNode("ModuleType/Name").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("ModuleType/Remark").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("ModuleType/OrderId").InnerText);
            dto.Id = xmlDoc.SelectSingleNode("ModuleType/Id").InnerText;

            ModuleTypeSrv.UpdateModuleType(dto);
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