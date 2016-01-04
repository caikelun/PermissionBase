<%@ WebHandler Language="C#" Class="GetSysCode" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public class GetSysCode : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(GetSysCode));
    
    public void ProcessRequest (HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string XmlString = null;
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("SysCodeMgr", "rights_browse");

            string Id = context.Request.QueryString["id"];
            XmlString = GetSysCodeInfoXML(Id);
        }
        catch (Exception ex)
        {
            XmlString = "<SysCode><Succeed>-1</Succeed></SysCode>";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/XML";
            context.Response.Write(XmlString);
            context.Response.End();
        }
    }

    private string GetSysCodeInfoXML(string Id)
    {
        SysCode sc = CommonSrv.LoadObjectById(typeof(SysCode), Id) as SysCode;

        XmlNode node = null;
        XmlDocument xmlDoc = new XmlDocument();
        XmlNode rootNode = xmlDoc.CreateNode(XmlNodeType.Element, "SysCode", "");
        xmlDoc.AppendChild(rootNode);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Succeed", "");
        node.InnerText = "1";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Tag", "");
        node.InnerText = sc.Tag;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Name", "");
        node.InnerText = sc.Name;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Remark", "");
        node.InnerText = sc.Remark;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "OrderId", "");
        node.InnerText = sc.OrderId.ToString();
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