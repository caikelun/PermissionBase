using System;

namespace PermissionBase.Core.DTO
{
    /// <summary>
    ///	角色分类。
    /// </summary>
    public class RoleTypeDTO
    {
        public string Id;
        public string Name;
        public string Remark;
        public int OrderId;
        public string ParentRoleTypeId;
    }
}
