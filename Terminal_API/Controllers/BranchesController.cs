using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TERMINAL.DataAccess;

namespace TERMINAL.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAllHeaders")]
    public class BranchesController : ControllerBase
    {
        private readonly DataAccessBranches Data = new DataAccessBranches();

        [HttpGet]
        public IActionResult Get ()
        {
            try
            {
                var result = Data.GetBranches().ToList();

                if (result.Count() == 0)
                    return NotFound();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}