<%@ WebHandler Language="C#" Class="UpdateSysCode" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class UpdateSysCode : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(UpdateSysCode));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("SysCodeMgr", "rights_edit");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            SysCodeDTO dto = new SysCodeDTO();
            dto.Tag = xmlDoc.SelectSingleNode("SysCode/Tag").InnerText;
            dto.Name = xmlDoc.SelectSingleNode("SysCode/Name").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("SysCode/Remark").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("SysCode/OrderId").InnerText);
            dto.Id = xmlDoc.SelectSingleNode("SysCode/Id").InnerText;

            sSucceed = SysCodeSrv.UpdateSysCode(dto);
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