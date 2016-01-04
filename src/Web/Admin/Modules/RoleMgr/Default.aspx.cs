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

public partial class Admin_Modules_RoleMgr_Default : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_RoleMgr_Default));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            SessionUtil.SavaModuleTag("RoleMgr");
            if (SessionUtil.GetStaffSession().IsInnerUser == 0)
            {
                PermissionUtil.SaveGrantPermissionsToSession();
                if (!PermissionUtil.HasGrantPermission("rights_browse")) throw new ModuleSecurityException("无权限访问此模块。");
                if (!PermissionUtil.HasGrantPermission("rights_add"))
                {
                    btnNewRoleType.Style.Add("display", "none");
                    btnNewRole.Style.Add("display", "none");
                }
                if (!PermissionUtil.HasGrantPermission("rights_edit")) btnEdit.Style.Add("display", "none");
                if (!PermissionUtil.HasGrantPermission("rights_move")) btnMove.Style.Add("display", "none");
                if (!PermissionUtil.HasGrantPermission("rights_accredit")) btnPermission.Style.Add("display", "none");
                if (!PermissionUtil.HasGrantPermission("rights_delete")) btnDelete.Style.Add("display", "none");
            }

            LoadRoleTree();
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

    #region private void LoadRoleTree()
    private void LoadRoleTree()
    {
        IList ilRoleType = RoleTypeSrv.GetAllTopRoleType();

        //增加角色分类
        foreach (RoleType rt in ilRoleType)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            tvRoles.Nodes[0].Nodes.Add(node);
            node.Type = "roletype";
            node.Text = rt.Name;
            node.PKId = rt.Id;
            node.OrderId = rt.OrderId.ToString();

            AddSubNodes(node, rt);

            node.Expanded = true;
        }

        tvRoles.Nodes[0].Expanded = true;
    }
    #endregion

    #region private void AddSubNodes(Microsoft.Web.UI.WebControls.TreeNode currentNode, RoleType currentRoleType)
    private void AddSubNodes(Microsoft.Web.UI.WebControls.TreeNode currentNode, RoleType currentRoleType)
    {
        //增加子角色分类
        foreach (RoleType rt in currentRoleType.SubRoleTypes)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "roletype";
            node.Text = rt.Name;
            node.PKId = rt.Id;
            node.OrderId = rt.OrderId.ToString();

            AddSubNodes(node, rt);

            node.Expanded = true;
        }

        //增加角色
        foreach (Role r in currentRoleType.Roles)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "role";
            node.Text = r.Name;
            node.PKId = r.Id;
            node.OrderId = r.OrderId.ToString();
        }
    }
    #endregion

}
