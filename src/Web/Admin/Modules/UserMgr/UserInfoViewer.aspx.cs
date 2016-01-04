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

public partial class Admin_Modules_UserMgr_UserInfoViewer : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_UserMgr_UserInfoViewer));

    protected void Page_Load(object sender, EventArgs e)
    {
        
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            string id = Request.QueryString["id"];
            if (id != null)
            {
                User u = CommonSrv.LoadObjectById(typeof(User), id) as User;

                txtUserLoginId.Value = u.LoginId;
                txtUserName.Value = u.Name;
                txtUserDisabled.Value = ((u.Disabled == 1) ? "已禁用" : "未禁用");
                txtUserIdCard.Value = u.IdCard;
                if (u.Sex.HasValue)
                {
                    txtUserSex.Value = ((u.Sex.Value.ToString() == "0") ? "男" : "女");
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
                txtUserRegisterDate.Value = u.RegisterDate.ToString("yyyy-MM-dd HH:mm:ss");
            }
        }
        catch (Exception ex)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "error", "<script type=\"text/javascript\">window.returnValue = false;window.close();</script>");
            log.Error(null, ex);
        }
    }
}
