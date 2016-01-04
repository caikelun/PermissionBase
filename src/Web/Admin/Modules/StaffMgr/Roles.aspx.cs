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

public partial class Admin_Modules_StaffMgr_Roles : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_StaffMgr_Roles));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            string LoginId = Request.QueryString["id"];
            Staff s = CommonSrv.LoadObjectById(typeof(Staff), LoginId) as Staff;

            LoadRoleTree(s);
        }
        catch (Exception ex)
        {
            log.Error(null, ex);
            throw;
        }
    }

    #region private void LoadRoleTree(Staff s)
    private void LoadRoleTree(Staff s)
    {
        IList ilRoleType = RoleTypeSrv.GetAllTopRoleType();

        //增加角色分类
        foreach (RoleType rt in ilRoleType)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            tvRoles.Nodes.Add(node);
            node.Type = "roletype";
            node.Text = rt.Name;
            node.PKId = rt.Id;

            AddSubNodes(node, rt, s);

            node.Expanded = true;
        }

        tvRoles.Nodes[0].Expanded = true;
    }
    #endregion

    #region private void AddSubNodes(Microsoft.Web.UI.WebControls.TreeNode currentNode, RoleType currentRoleType, Staff s)
    private void AddSubNodes(Microsoft.Web.UI.WebControls.TreeNode currentNode, RoleType currentRoleType, Staff s)
    {
        //增加子角色分类
        foreach (RoleType rt in currentRoleType.SubRoleTypes)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "roletype";
            node.Text = rt.Name;
            node.PKId = rt.Id;

            AddSubNodes(node, rt, s);

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
            node.CheckBox = true;
            node.Checked = s.Roles.Contains(r);
        }
    }
    #endregion

}
