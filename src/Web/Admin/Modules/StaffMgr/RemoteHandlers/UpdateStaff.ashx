<%@ WebHandler Language="C#" Class="UpdateStaff" %>

using System;
using System.Web;
using System.Xml;
using System.Web.SessionState;
using Nullables;
using PermissionBase.Core.Service;
using PermissionBase.Core.DTO;

public class UpdateStaff : IHttpHandler, IReadOnlySessionState
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(UpdateStaff));

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        string sSucceed = "1";
        try
        {
            //判断访问权限。
            PermissionUtil.CheckSecurity("StaffMgr", "rights_edit");

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(context.Request.InputStream);

            StaffDTO dto = new StaffDTO();
            dto.LoginId = xmlDoc.SelectSingleNode("Staff/LoginId").InnerText;
            dto.Name = xmlDoc.SelectSingleNode("Staff/Name").InnerText;
            dto.Disabled = int.Parse(xmlDoc.SelectSingleNode("Staff/Disabled").InnerText);
            dto.OrderId = int.Parse(xmlDoc.SelectSingleNode("Staff/OrderId").InnerText);
            dto.IdCard = xmlDoc.SelectSingleNode("Staff/IdCard").InnerText;
            dto.Code = xmlDoc.SelectSingleNode("Staff/Code").InnerText;
            dto.OfficePhone = xmlDoc.SelectSingleNode("Staff/OfficePhone").InnerText;
            dto.ExtNumber = xmlDoc.SelectSingleNode("Staff/ExtNumber").InnerText;
            dto.CellPhone = xmlDoc.SelectSingleNode("Staff/CellPhone").InnerText;
            dto.FamilyPhone = xmlDoc.SelectSingleNode("Staff/FamilyPhone").InnerText;
            dto.Email = xmlDoc.SelectSingleNode("Staff/Email").InnerText;
            dto.ZipCode = xmlDoc.SelectSingleNode("Staff/ZipCode").InnerText;
            dto.Remark = xmlDoc.SelectSingleNode("Staff/Remark").InnerText;
            dto.Address = xmlDoc.SelectSingleNode("Staff/Address").InnerText;

            string degree = xmlDoc.SelectSingleNode("Staff/Degree").InnerText;
            dto.DegreeTag = (degree == "-1" ? "" : degree);

            string sex = xmlDoc.SelectSingleNode("Staff/Sex").InnerText;
            dto.Sex = (sex == "-1" ? null : new NullableInt32(int.Parse(sex)));

            string political = xmlDoc.SelectSingleNode("Staff/Political").InnerText;
            dto.PoliticalAppearanceTag = (political == "-1" ? "" : political);

            string married = xmlDoc.SelectSingleNode("Staff/Married").InnerText;
            dto.Married = (married == "-1" ? null : new NullableInt32(int.Parse(married)));

            string birthday = xmlDoc.SelectSingleNode("Staff/Birthday").InnerText;
            dto.Birthday = (birthday.Length > 0 ? new NullableDateTime(DateTime.Parse(birthday)) : null);

            string country = xmlDoc.SelectSingleNode("Staff/Country").InnerText;
            dto.CountryTag = (country == "-1" ? "" : country);

            string entersDay = xmlDoc.SelectSingleNode("Staff/EntersDay").InnerText;
            dto.EntersDay = (entersDay.Length > 0 ? new NullableDateTime(DateTime.Parse(entersDay)) : null);

            string nation = xmlDoc.SelectSingleNode("Staff/Nation").InnerText;
            dto.NationTag = (nation == "-1" ? "" : nation);

            string leavesDay = xmlDoc.SelectSingleNode("Staff/LeavesDay").InnerText;
            dto.LeavesDay = (leavesDay.Length > 0 ? new NullableDateTime(DateTime.Parse(leavesDay)) : null);

            string position = xmlDoc.SelectSingleNode("Staff/Position").InnerText;
            dto.PositionTag = (position == "-1" ? "" : position);

            string title = xmlDoc.SelectSingleNode("Staff/Title").InnerText;
            dto.TitleTag = (title == "-1" ? "" : title);

            StaffSrv.UpdateStaff(dto);
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