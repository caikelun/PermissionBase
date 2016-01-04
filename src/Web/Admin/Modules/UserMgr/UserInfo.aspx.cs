using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public partial class Admin_Modules_UserMgr_UserInfo : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_UserMgr_UserInfo));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            selectUserSex.Items.Add(new ListItem("", "-1"));
            selectUserSex.Items.Add(new ListItem("男", "0"));
            selectUserSex.Items.Add(new ListItem("女", "1"));

            if (Request.QueryString["mode"] == "new")
            {
                divTitleMess.InnerText = "新增用户";
            }
            else if (Request.QueryString["mode"] == "edit")
            {
                divTitleMess.InnerText = "编辑用户";
                
                string id = Request.QueryString["id"];
                if (id != null)
                {
                    User u = CommonSrv.LoadObjectById(typeof(User), id) as User;

                    txtUserLoginId.Value = u.LoginId;
                    txtUserName.Value = u.Name;
                    cbUserDisabled.Checked = (u.Disabled == 1);
                    txtUserIdCard.Value = u.IdCard;
                    if (u.Sex.HasValue)
                    {
                        ListItem liSex = selectUserSex.Items.FindByValue(u.Sex.Value.ToString());
                        if (liSex != null) liSex.Selected = true;
                    }
                    if (u.Birthday.HasValue)
                    {
                        txtUserBirthday.Value = u.Birthday.Value.ToString("yyyy-MM-dd");
                    }
                    txtUserOfficePhone.Value = u.OfficePhone;
                    txtUserCellPhone.Value = u.CellPhone;
                    txtUserFamilyPhone.Value = u.FamilyPhone;
                    txtUserEmail.Value = u.Email;
                    txtUserZipCode.Value = u.ZipCode;
                    txtaUserRemark.Value = u.Remark;
                    txtaUserAddress.Value = u.Address;
                }
            }
        }
        catch (Exception ex)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "error", "<script type=\"text/javascript\">error=true;</script>");
            log.Error(null, ex);
        }
    }
}
