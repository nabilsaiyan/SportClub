using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.BusinessLayer
{
    public interface IMaterialsRepository
    {
        Task<IEnumerable<Material>> Search(string name, Status? status);
        Task<IEnumerable<Material>> GetMaterials();
        Task<Material> GetMaterial(int materialId);
        Task<Material> AddMaterial(Material material);
        Task<Material> UpdateMaterial(Material material);
        Task DeleteMaterial(int materialId);

    }
}
