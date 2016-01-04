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

public partial class Admin_Modules_DepartmentMgr_Move : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_DepartmentMgr_Move));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            LoadDepartmentTree(tvDepartments.Nodes[0], null);
        }
        catch (Exception ex)
        {
            ClientScript.RegisterClientScriptBlock(this.GetType(), "error", "<script type=\"text/javascript\">error=true;</script>");
            log.Error(null, ex);
        }
    }

    #region private void LoadDepartmentTree(Microsoft.Web.UI.WebControls.TreeNode currentNode, Department currentDepartment)
    private void LoadDepartmentTree(Microsoft.Web.UI.WebControls.TreeNode currentNode, Department currentDepartment)
    {
        IList subDepartments = null;
        if (currentDepartment != null)
            subDepartments = currentDepartment.SubDepartments;
        else
            subDepartments = DepartmentSrv.GetAllTopDepartment();

        foreach (Department d in subDepartments)
        {
            Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
            currentNode.Nodes.Add(node);
            node.Type = "department";
            node.Text = d.Name;
            node.PKId = d.Id;
            node.OrderId = d.OrderId.ToString();

            LoadDepartmentTree(node, d);

            node.Expanded = true;
        }

        currentNode.Expanded = true;
    }
    #endregion

}
