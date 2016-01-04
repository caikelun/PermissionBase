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

public partial class Admin_Modules_RoleMgr_Move : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_RoleMgr_Move));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            if (Request.QueryString["moveWhat"] == "roletype")
            {
                divTitleMess.InnerText = "移动角色分类";
            }
            else if (Request.QueryString["moveWhat"] == "role")
            {
                divTitleMess.InnerText = "移动角色";
            }

            LoadRoleTree(tvRoles.Nodes[0], null);
        }
        catch (Exception ex)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "error", "<script type=\"text/javascript\">error=true;</script>");
            log.Error(null, ex);
        }
    }

    #region private void LoadRoleTree(Microsoft.Web.UI.WebControls.TreeNode currentNode, RoleType currentRoleType)
    private void LoadRoleTree(Microsoft.Web.UI.WebControls.TreeNode currentNode, RoleType currentRoleType)
    {
        IList subRoleType = null;
        if (currentRoleType != null)
            subRoleType = currentRoleType.SubRoleTypes;
        else
            subRoleType = RoleTypeSrv.GetAllTopRoleType();

        //增加角色分类。
        foreach (RoleType rt in subRoleType)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "roletype";
            node.Text = rt.Name;
            node.PKId = rt.Id;
            node.OrderId = rt.OrderId.ToString();

            LoadRoleTree(node, rt);

            node.Expanded = true;
        }

        currentNode.Expanded = true;
    }
    #endregion

}
