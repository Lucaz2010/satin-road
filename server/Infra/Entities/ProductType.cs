using LinqToDB.Mapping;

namespace Infra.Entities;

public class ProductType
{
 [PrimaryKey]
 public string ProductTypeId { get; set; }
 public string ProductTypeName { get; set; }
 public string? Description { get; set; }
 public bool IsActive { get; set; }
}