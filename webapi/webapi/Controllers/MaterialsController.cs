using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.BusinessLayer;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize(Roles = "admin")]
    public class MaterialsController : ControllerBase
    {
        private readonly IMaterialsRepository materialsRepository;

        public MaterialsController(IMaterialsRepository materialsRepository)
        {
            this.materialsRepository = materialsRepository;
        }

        [HttpGet("{search}")]
        public async Task<ActionResult<IEnumerable<Material>>> Search(string name, Status? status)
        {
            try
            {
                var result = await materialsRepository.Search(name, status);

                if (result.Any())
                {
                    return Ok(result);
                }

                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetMaterials()
        {
            try
            {
                return Ok(await materialsRepository.GetMaterials());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Material>> GetMaterial(int id)
        {
            try
            {
                var result = await materialsRepository.GetMaterial(id);

                if (result == null)
                {
                    return NotFound();
                }

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Material>> CreateMaterial(Material material)
        {
            try
            {
                if (material == null)
                    return BadRequest();

                var createdMaterial = await materialsRepository.AddMaterial(material);

                return CreatedAtAction(nameof(GetMaterials),
                    new { id = createdMaterial.MaterialId }, createdMaterial);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new material record");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteMaterial(int id)
        {
            try
            {
                var materialToDelete = await materialsRepository.GetMaterial(id);

                if (materialToDelete == null)
                {
                    return NotFound($"Material with Id = {id} not found");
                }

                await materialsRepository.DeleteMaterial(id);

                return Ok($"Material with Id = {id} deleted");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting material record");
            }
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Material>> UpdateMaterial(int id, Material material)
        {
            try
            {
                if (id != material.MaterialId)
                    return BadRequest("Material ID mismatch");

                var materialToUpdate = await materialsRepository.GetMaterial(id);

                if (materialToUpdate == null)
                {
                    return NotFound($"Material with Id = {id} not found");
                }

                return await materialsRepository.UpdateMaterial(material);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating material record");
            }
        }
    }
}
