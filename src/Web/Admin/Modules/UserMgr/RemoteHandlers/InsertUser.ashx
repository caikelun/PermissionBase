<%@ WebHandler Language="C#" Class="InsertUser" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using Nullables;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class InsertUser : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(InsertUser));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string tag = "-1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("UserMgr", "rights_add");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            UserDTO dto = new UserDTO();
            dto.LoginId = xmlDoc.SelectSingleNode("User/LoginId").InnerText;
            dto.Password = xmlDoc.SelectSingleNode("User/Password").InnerText;
            dto.Name = xmlDoc.SelectSingleNode("User/Name").InnerText;
            dto.Disabled = int.Parse(xmlDoc.SelectSingleNode("User/Disabled").InnerText);
            dto.IdCard = xmlDoc.SelectSingleNode("User/IdCard").InnerText;
            dto.OfficePhone = xmlDoc.SelectSingleNode("User/OfficePhone").InnerText;
            dto.CellPhone = xmlDoc.SelectSingleNode("User/CellPhone").InnerText;
            dto.FamilyPhone = xmlDoc.SelectSingleNode("User/FamilyPhone").InnerText;
            dto.Email = xmlDoc.SelectSingleNode("User/Email").InnerText;
            dto.ZipCode = xmlDoc.SelectSingleNode("User/ZipCode").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("User/Remark").InnerText;
            dto.Address = xmlDoc.SelectSingleNode("User/Address").InnerText;

            string sex = xmlDoc.SelectSingleNode("User/Sex").InnerText;
            dto.Sex = (sex == "-1" ? null : new NullableInt32(int.Parse(sex)));

            string birthday = xmlDoc.SelectSingleNode("User/Birthday").InnerText;
            dto.Birthday = (birthday.Length > 0 ? new NullableDateTime(DateTime.Parse(birthday)) : null);

            tag = UserSrv.InsertUser(dto);
        }
        catch (Exception ex)
        {
            tag = "-1";
            log.Error(null, ex);
        }
        finally
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write(tag);
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