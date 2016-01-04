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

public partial class Admin_Frameset_ShowHide : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Frameset_ShowHide));

    protected void Page_Load(object sender, EventArgs e)
    {
    }

    protected void btnLogout_ServerClick(object sender, EventArgs e)
    {
        try
        {
            SessionUtil.RemoveStaffSession();
            SessionUtil.RemoveGrantPermissions();

            FormsAuthentication.SignOut();

            ClientScript.RegisterClientScriptBlock(this.GetType(), "reload",
                "<script type=\"text/javascript\">parent.location='../Default.aspx';</script>");
        }
        catch (Exception ex)
        {
            log.Error(null, ex);
            throw;
        }
    }

}
