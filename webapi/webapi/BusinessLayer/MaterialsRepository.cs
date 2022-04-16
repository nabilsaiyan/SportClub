using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.DataLayer;
using webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace webapi.BusinessLayer
{
    public class MaterialsRepository : IMaterialsRepository
    {
        private readonly AppDbContext appDbContext;

        public MaterialsRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<Material> AddMaterial(Material material)
        {
            var result = await appDbContext.Materials.AddAsync(material);
            await appDbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task DeleteMaterial(int materialId)
        {
            var result = await appDbContext.Materials
                .FirstOrDefaultAsync(e => e.MaterialId == materialId);

            if (result != null)
            {
                appDbContext.Materials.Remove(result);
                await appDbContext.SaveChangesAsync();
            }
        }

        public async Task<Material> GetMaterial(int materialId)
        {
            return await appDbContext.Materials.FirstOrDefaultAsync(e => e.MaterialId == materialId);
        }

        public async Task<IEnumerable<Material>> GetMaterials()
        {
            return await appDbContext.Materials.ToListAsync();
        }

        public async Task<IEnumerable<Material>> Search(string name, Status? status)
        {
            IQueryable<Material> query = appDbContext.Materials;

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(e => e.Name.Contains(name));
            }

            if (status != null)
            {
                query = query.Where(e => e.Status == status);
            }

            return await query.ToListAsync();
        }

        public async Task<Material> UpdateMaterial(Material material)
        {
            var result = await appDbContext.Materials
                .FirstOrDefaultAsync(e => e.MaterialId == material.MaterialId);

            if (result != null)
            {
                result.Name = material.Name;
                result.Description = material.Description;
                result.Status = material.Status;

                await appDbContext.SaveChangesAsync();

                return result;
            }

            return null;
        }
    }
}
