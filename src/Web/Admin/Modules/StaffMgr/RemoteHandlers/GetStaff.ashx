<%@ WebHandler Language="C#" Class="GetStaff" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public class GetStaff : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(GetStaff));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string XmlString = null;
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("StaffMgr", "rights_browse");

            string LoginId = context.Request.QueryString["id"];
            XmlString = GetStaffInfoXML(LoginId);
        }
        catch (Exception ex)
        {
            XmlString = "<Staff><Succeed>-1</Succeed></Staff>";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/XML";
            context.Response.Write(XmlString);
            context.Response.End();
        }
    }

    private string GetStaffInfoXML(string LoginId)
    {
        Staff s = CommonSrv.LoadObjectById(typeof(Staff), LoginId) as Staff;

        XmlNode node = null;
        XmlDocument xmlDoc = new XmlDocument();
        XmlNode rootNode = xmlDoc.CreateNode(XmlNodeType.Element, "Staff", "");
        xmlDoc.AppendChild(rootNode);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Succeed", "");
        node.InnerText = "1";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "LoginId", "");
        node.InnerText = s.LoginId;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Code", "");
        node.InnerText = s.Code;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Name", "");
        node.InnerText = s.Name;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Sex", "");
        if (s.Sex.HasValue)
            node.InnerText = (s.Sex.Value == 0 ? "男" : "女");
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Married", "");
        if (s.Married.HasValue)
            node.InnerText = (s.Married.Value == 1 ? "已婚" : "未婚");
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "IdCard", "");
        node.InnerText = s.IdCard;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Country", "");
        if(s.CountryTag != null && s.CountryTag.Length > 0)
            node.InnerText = SysCodeSrv.GetSysCodeByTag(s.CountryTag).Name;
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Nation", "");
        if (s.NationTag != null && s.NationTag.Length > 0)
            node.InnerText = SysCodeSrv.GetSysCodeByTag(s.NationTag).Name;
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Position", "");
        if (s.PositionTag != null && s.PositionTag.Length > 0)
            node.InnerText = SysCodeSrv.GetSysCodeByTag(s.PositionTag).Name;
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Title", "");
        if (s.TitleTag != null && s.TitleTag.Length > 0)
            node.InnerText = SysCodeSrv.GetSysCodeByTag(s.TitleTag).Name;
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Political", "");
        if (s.PoliticalAppearanceTag != null && s.PoliticalAppearanceTag.Length > 0)
            node.InnerText = SysCodeSrv.GetSysCodeByTag(s.PoliticalAppearanceTag).Name;
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Degree", "");
        if (s.DegreeTag != null && s.DegreeTag.Length > 0)
            node.InnerText = SysCodeSrv.GetSysCodeByTag(s.DegreeTag).Name;
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Birthday", "");
        if (s.Birthday.HasValue)
            node.InnerText = DateTime.Parse(s.Birthday.ToString()).ToString("yyyy-MM-dd");
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "EntersDay", "");
        if (s.EntersDay.HasValue)
            node.InnerText = DateTime.Parse(s.EntersDay.ToString()).ToString("yyyy-MM-dd");
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "LeavesDay", "");
        if(s.LeavesDay.HasValue)
            node.InnerText = DateTime.Parse(s.LeavesDay.ToString()).ToString("yyyy-MM-dd");
        else
            node.InnerText = "";
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "OfficePhone", "");
        node.InnerText = s.OfficePhone;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "ExtNumber", "");
        node.InnerText = s.ExtNumber;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "FamilyPhone", "");
        node.InnerText = s.FamilyPhone;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "CellPhone", "");
        node.InnerText = s.CellPhone;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Email", "");
        node.InnerText = s.Email;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Address", "");
        node.InnerText = s.Address;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "ZipCode", "");
        node.InnerText = s.ZipCode;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Remark", "");
        node.InnerText = s.Remark;
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "Disabled", "");
        node.InnerText = ((s.Disabled == 1) ? "是" : "否");
        rootNode.AppendChild(node);

        node = xmlDoc.CreateNode(XmlNodeType.Element, "OrderId", "");
        node.InnerText = s.OrderId.ToString();
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