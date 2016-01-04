<%@ WebHandler Language="C#" Class="UpdateSysCodeType" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class UpdateSysCodeType : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(UpdateSysCodeType));

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

            SysCodeTypeDTO dto = new SysCodeTypeDTO();
            dto.Tag = xmlDoc.SelectSingleNode("SysCodeType/Tag").InnerText;
            dto.Name = xmlDoc.SelectSingleNode("SysCodeType/Name").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("SysCodeType/Remark").InnerText;
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("SysCodeType/OrderId").InnerText);
            dto.Id = xmlDoc.SelectSingleNode("SysCodeType/Id").InnerText;

            sSucceed = SysCodeTypeSrv.UpdateSysCodeType(dto);
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