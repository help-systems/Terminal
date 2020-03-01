using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TERMINAL.DataAccess;
using TERMINAL.Models;

namespace TERMINAL.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAllHeaders")]
    public class CashiersController : ControllerBase
    {
        private readonly DataAccessCashiers Data = new DataAccessCashiers();

        [HttpGet]
        public IActionResult Get (string username)
        {
            try
            {
                var result = Data.GetCashier(username).ToList();

                if (result.Count() == 0)
                    return NotFound();

                return Ok(result.First());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}