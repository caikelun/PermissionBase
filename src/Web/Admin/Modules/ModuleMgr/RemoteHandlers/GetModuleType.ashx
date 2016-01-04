<%@ WebHandler Language="C#" Class="GetModuleType" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public class GetModuleType : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(GetModuleType));
    
    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        
        string XmlString = null;
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("ModuleMgr", "rights_browse");

            string ModuleTypeId = context.Request.QueryString["id"];
            XmlString = GetModuleTypeInfoXML(ModuleTypeId);
        }
        catch (Exception ex)
        {
            XmlString = "<ModuleType><Succeed>-1</Succeed></ModuleType>";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/XML";
            context.Response.Write(XmlString);
            context.Response.End();
        }
    }

    private string GetModuleTypeInfoXML(string ModuleTypeId)
    {
        ModuleType mt = CommonSrv.LoadObjectById(typeof(ModuleType), ModuleTypeId) as ModuleType;

        XmlNode node = null;
        XmlDocument xmlDoc = new XmlDocument();
        XmlNode rootNode = xmlDoc.CreateNode(XmlNodeType.Element, "ModuleType", "");
        xmlDoc.AppendChild(rootNode);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Succeed", "");
        node.InnerText = "1";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Name", "");
        node.InnerText = mt.Name;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Remark", "");
        node.InnerText = mt.Remark;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "OrderId", "");
        node.InnerText = mt.OrderId.ToString();
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