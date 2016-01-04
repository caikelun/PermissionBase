<%@ WebHandler Language="C#" Class="GetUsers" %>

using System;
using System.Web;
using System.Xml;
using System.Collections;
using System.Web.SessionState;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public class GetUsers : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(GetUsers));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string XmlString = null;
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("UserMgr", "rights_browse");

            string firstResult = context.Request.QueryString["firstResult"];
            string maxResults = context.Request.QueryString["maxResults"];
            XmlString = GetUsersXML(int.Parse(firstResult), int.Parse(maxResults));
        }
        catch (Exception ex)
        {
            XmlString = "<Users></Users>";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/XML";
            context.Response.Write(XmlString);
            context.Response.End();
        }
    }

    private string GetUsersXML(int firstResult, int maxResults)
    {
        IList list = UserSrv.GetUsers(firstResult, maxResults);

        XmlNode userNode = null;
        XmlNode node = null;
        
        XmlDocument xmlDoc = new XmlDocument();
        XmlNode rootNode = xmlDoc.CreateNode(XmlNodeType.Element, "Users", "");
        xmlDoc.AppendChild(rootNode);
        
        foreach(User user in list)
        {
            userNode = xmlDoc.CreateNode(XmlNodeType.Element, "User", "");
            rootNode.AppendChild(userNode);

            node = xmlDoc.CreateNode(XmlNodeType.Element, "LoginId", "");
            node.InnerText = user.LoginId;
            userNode.AppendChild(node);

            node = xmlDoc.CreateNode(XmlNodeType.Element, "Name", "");
            node.InnerText = user.Name;
            userNode.AppendChild(node);

            node = xmlDoc.CreateNode(XmlNodeType.Element, "Email", "");
            node.InnerText = user.Email;
            userNode.AppendChild(node);

            node = xmlDoc.CreateNode(XmlNodeType.Element, "RegisterDate", "");
            node.InnerText = user.RegisterDate.ToString("yyyy-MM-dd HH:mm:ss");
            userNode.AppendChild(node);

            node = xmlDoc.CreateNode(XmlNodeType.Element, "Disabled", "");
            node.InnerText = (user.Disabled == 1) ? "已禁用" : "未禁用";
            userNode.AppendChild(node);
        }

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