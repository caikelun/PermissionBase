<%@ WebHandler Language="C#" Class="GetModule" %>

using System;
using System.Web;
using System.Xml;
using System.Collections;
using System.Web.SessionState;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public class GetModule : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(GetModule));
    
    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string XmlString = null;
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("ModuleMgr", "rights_browse");

            string ModuleId = context.Request.QueryString["id"];
            XmlString = GetModuleInfoXML(ModuleId);
        }
        catch (Exception ex)
        {
            XmlString = "<Module><Succeed>-1</Succeed></Module>";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/XML";
            context.Response.Write(XmlString);
            context.Response.End();
        }
    }
    
    private string GetModuleInfoXML(string ModuleId)
    {
        Module m = CommonSrv.LoadObjectById(typeof(Module), ModuleId) as Module;
        
        XmlNode node = null;
        XmlDocument xmlDoc = new XmlDocument();
        XmlNode rootNode = xmlDoc.CreateNode(XmlNodeType.Element, "Module", "");
        xmlDoc.AppendChild(rootNode);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Succeed", "");
        node.InnerText = "1";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Tag", "");
        node.InnerText = m.Tag;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Name", "");
        node.InnerText = m.Name;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Remark", "");
        node.InnerText = m.Remark;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "OrderId", "");
        node.InnerText = m.OrderId.ToString();
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "ModuleUrl", "");
        node.InnerText = m.ModuleUrl;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Disabled", "");
        node.InnerText = m.Disabled.ToString();
        rootNode.AppendChild(node);

        ArrayList al = new ArrayList(m.ModuleRights.Keys);
        string sModuleRightList = string.Join("|", (string[])al.ToArray(typeof(string)));
        node = xmlDoc.CreateNode(XmlNodeType.Element, "ModuleRightList", "");
        node.InnerText = sModuleRightList;
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