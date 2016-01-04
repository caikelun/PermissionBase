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

public partial class Admin_Modules_StaffMgr_Default : System.Web.UI.Page
{
    private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(Admin_Modules_StaffMgr_Default));

    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);

        try
        {
            SessionUtil.SavaModuleTag("StaffMgr");
            if (SessionUtil.GetStaffSession().IsInnerUser == 0)
            {
                PermissionUtil.SaveGrantPermissionsToSession();
                if (!PermissionUtil.HasGrantPermission("rights_browse")) throw new ModuleSecurityException("无权限访问此模块。");
                if (!PermissionUtil.HasGrantPermission("rights_add")) btnNew.Style.Add("display", "none");
                if (!PermissionUtil.HasGrantPermission("rights_edit"))
                {
                    btnEdit.Style.Add("display", "none");
                    btnEditPassword.Style.Add("display", "none");
                }
                if (!PermissionUtil.HasGrantPermission("rights_move")) btnMove.Style.Add("display", "none");
                if (!PermissionUtil.HasGrantPermission("rights_accredit"))
                {
                    btnRole.Style.Add("display", "none");
                    btnPermission.Style.Add("display", "none");
                }
                if (!PermissionUtil.HasGrantPermission("rights_delete")) btnDelete.Style.Add("display", "none");
            }

            LoadDepartmentTree(tvDepartments.Nodes[0], null);
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

    #region private void LoadDepartmentTree(Microsoft.Web.UI.WebControls.TreeNode currentNode, Department currentDepartment)
    private void LoadDepartmentTree(Microsoft.Web.UI.WebControls.TreeNode currentNode, Department currentDepartment)
    {
        IList subDepartments = null;
        if (currentDepartment != null)
            subDepartments = currentDepartment.SubDepartments;
        else
            subDepartments = DepartmentSrv.GetAllTopDepartment();

        //增加子部门。
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

        //增加职员。
        if (currentDepartment != null)
        {
            foreach (Staff s in currentDepartment.Staff)
            {
                if (s.IsInnerUser == 0)
                {
                    Microsoft.Web.UI.WebControls.TreeNode node = new Microsoft.Web.UI.WebControls.TreeNode();
                    currentNode.Nodes.Add(node);
                    node.Text = s.Name;
                    node.PKId = s.LoginId;
                    node.OrderId = s.OrderId.ToString();
                    if (s.Disabled == 1)
                        node.Type = "staffdisabled";
                    else
                        node.Type = "staff";
                }
            }
        }

        currentNode.Expanded = true;
    }
    #endregion

}
