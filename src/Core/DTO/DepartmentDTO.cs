using System;

namespace PermissionBase.Core.DTO
{
	/// <summary>
	/// 部门。
	/// </summary>
	public class DepartmentDTO
	{
        public string Id;
        public string Name;
        public string Phone;
        public string ExtNumber;
        public string Fax;
        public string Remark;
        public int OrderId;
        public string ParentDepartmentId;
	}
}
