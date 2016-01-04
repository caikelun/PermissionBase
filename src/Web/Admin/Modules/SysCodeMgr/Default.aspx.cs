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
using Microsoft.Web.UI.WebControls;
using PermissionBase.Core.Domain;
using PermissionBase.Core.Service;

public partial class Admin_Modules_SysCodeMgr_Default : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_SysCodeMgr_Default));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            SessionUtil.SavaModuleTag("SysCodeMgr");
            if (SessionUtil.GetStaffSession().IsInnerUser == 0)
            {
                PermissionUtil.SaveGrantPermissionsToSession();
                if (!PermissionUtil.HasGrantPermission("rights_browse")) throw new ModuleSecurityException("无权限访问此模块。");
                if (!PermissionUtil.HasGrantPermission("rights_add")) btnNew.Style.Add("display", "none");
                if (!PermissionUtil.HasGrantPermission("rights_edit")) btnEdit.Style.Add("display", "none");
                if (!PermissionUtil.HasGrantPermission("rights_delete")) btnDelete.Style.Add("display", "none");
            }

            LoadSysCodeTree();
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

    #region private void LoadSysCodeTree()
    private void LoadSysCodeTree()
    {
        IList ilSysCodeType = SysCodeTypeSrv.GetAllSysCodeType();

        foreach (SysCodeType sct in ilSysCodeType)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            tvSysCodes.Nodes[0].Nodes.Add(node);
            node.Type = "syscodetype";
            node.Text = sct.Name;
            node.PKId = sct.Id;
            node.OrderId = sct.OrderId.ToString();

            foreach (SysCode sc in sct.SysCodes)
            {
                Microsoft.Web.UI.WebControls.TreeNode node2 = new Microsoft.Web.UI.WebControls.TreeNode();
                node.Nodes.Add(node2);
                node2.Type = "syscode";
                node2.Text = sc.Name;
                node2.PKId = sc.Id;
                node2.OrderId = sc.OrderId.ToString();
            }
        }

        tvSysCodes.Nodes[0].Expanded = true;
    }
    #endregion
}
