<%@ WebHandler Language="C#" Class="StaffGetDepartment" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public class StaffGetDepartment : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(StaffGetDepartment));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string XmlString = null;
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("StaffMgr", "rights_browse");

            string DepartmentId = context.Request.QueryString["id"];
            XmlString = GetDepartmentInfoXML(DepartmentId);
        }
        catch (Exception ex)
        {
            XmlString = "<Department><Succeed>-1</Succeed></Department>";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/XML";
            context.Response.Write(XmlString);
            context.Response.End();
        }
    }

    private string GetDepartmentInfoXML(string DepartmentId)
    {
        Department d = CommonSrv.LoadObjectById(typeof(Department), DepartmentId) as Department;

        XmlNode node = null;
        XmlDocument xmlDoc = new XmlDocument();
        XmlNode rootNode = xmlDoc.CreateNode(XmlNodeType.Element, "Department", "");
        xmlDoc.AppendChild(rootNode);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Succeed", "");
        node.InnerText = "1";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Name", "");
        node.InnerText = d.Name;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Phone", "");
        node.InnerText = d.Phone;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "ExtNumber", "");
        node.InnerText = d.ExtNumber;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Fax", "");
        node.InnerText = d.Fax;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Remark", "");
        node.InnerText = d.Remark;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "OrderId", "");
        node.InnerText = d.OrderId.ToString();
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