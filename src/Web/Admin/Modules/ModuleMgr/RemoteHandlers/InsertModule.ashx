<%@ WebHandler Language="C#" Class="InsertModule" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using System.Collections.Specialized;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class InsertModule : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(InsertModule));
    
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

            ModuleDTO dto = new ModuleDTO();
            dto.Tag = xmlDoc.SelectSingleNode("Module/Tag").InnerText;
            dto.Name = xmlDoc.SelectSingleNode("Module/Name").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("Module/Remark").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("Module/OrderId").InnerText);
            dto.ModuleUrl = xmlDoc.SelectSingleNode("Module/ModuleUrl").InnerText;
            dto.Disabled = int.Parse(xmlDoc.SelectSingleNode("Module/Disabled").InnerText);
            dto.ModuleTypeId = xmlDoc.SelectSingleNode("Module/ModuleTypeId").InnerText;
            
            //模块权限信息。
            string sModuleRight = xmlDoc.SelectSingleNode("Module/ModuleRight").InnerText;
            if (sModuleRight.Length > 0)
            {
                string[] arrModuleRight = sModuleRight.Split('|');
                for (int i = 0; i < arrModuleRight.Length; i++)
                {
                    dto.ModuleRights.Add(arrModuleRight[i]); 
                }
            }
            
            newId = ModuleSrv.InsertModule(dto);
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