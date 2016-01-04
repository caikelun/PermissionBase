<%@ WebHandler Language="C#" Class="InsertSysCodeType" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class InsertSysCodeType : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(InsertSysCodeType));
    
    public void ProcessRequest (HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string newId = "-1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("SysCodeMgr", "rights_add");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            SysCodeTypeDTO dto = new SysCodeTypeDTO();
            dto.Tag = xmlDoc.SelectSingleNode("SysCodeType/Tag").InnerText;
            dto.Name = xmlDoc.SelectSingleNode("SysCodeType/Name").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("SysCodeType/Remark").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("SysCodeType/OrderId").InnerText);

            newId = SysCodeTypeSrv.InsertSysCodeType(dto);
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