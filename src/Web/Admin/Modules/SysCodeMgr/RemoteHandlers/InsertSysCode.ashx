<%@ WebHandler Language="C#" Class="InsertSysCode" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class InsertSysCode : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(InsertSysCode));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string newId = "-1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("SysCodeMgr", "rights_add");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            SysCodeDTO dto = new SysCodeDTO();
            dto.Tag = xmlDoc.SelectSingleNode("SysCode/Tag").InnerText;
            dto.Name = xmlDoc.SelectSingleNode("SysCode/Name").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("SysCode/Remark").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("SysCode/OrderId").InnerText);
            dto.SysCodeTypeId = xmlDoc.SelectSingleNode("SysCode/SysCodeTypeId").InnerText;

            newId = SysCodeSrv.InsertSysCode(dto);
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