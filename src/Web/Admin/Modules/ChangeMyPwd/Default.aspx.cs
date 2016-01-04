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

public partial class Admin_Modules_ChangeMyPwd_Default : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_ChangeMyPwd_Default));

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            SessionUtil.SavaModuleTag("ChangeMyPwd");
            if(SessionUtil.GetStaffSession().IsInnerUser == 0)
            {
                PermissionUtil.SaveGrantPermissionsToSession();
                if(!PermissionUtil.HasGrantPermission("rights_browse")) throw new ModuleSecurityException("无权限访问此模块。");
            }
        }
        catch(MissSessionException)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "reload",
                "<script type=\"text/javascript\">parent.location='../../Default.aspx';</script>");
        }
        catch(ModuleSecurityException)
        {
            Response.Redirect("../../Frameset/Welcome.aspx");
        }
        catch (Exception ex)
        {
            log.Error(null, ex);
            throw;
        }
    }
}
