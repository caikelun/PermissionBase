<%@ WebHandler Language="C#" Class="GetSysCodeType" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public class GetSysCodeType : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(GetSysCodeType));
    
    public void ProcessRequest (HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string XmlString = null;
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("SysCodeMgr", "rights_browse");

            string Id = context.Request.QueryString["id"];
            XmlString = GetSysCodeTypeInfoXML(Id);
        }
        catch (Exception ex)
        {
            XmlString = "<SysCodeType><Succeed>-1</Succeed></SysCodeType>";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/XML";
            context.Response.Write(XmlString);
            context.Response.End();
        }
    }

    private string GetSysCodeTypeInfoXML(string Id)
    {
        SysCodeType sct = CommonSrv.LoadObjectById(typeof(SysCodeType), Id) as SysCodeType;

        XmlNode node = null;
        XmlDocument xmlDoc = new XmlDocument();
        XmlNode rootNode = xmlDoc.CreateNode(XmlNodeType.Element, "SysCodeType", "");
        xmlDoc.AppendChild(rootNode);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Succeed", "");
        node.InnerText = "1";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Tag", "");
        node.InnerText = sct.Tag;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Name", "");
        node.InnerText = sct.Name;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Remark", "");
        node.InnerText = sct.Remark;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "OrderId", "");
        node.InnerText = sct.OrderId.ToString();
        rootNode.AppendChild(node);

        return xmlDoc.OuterXml;
    }
 
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}