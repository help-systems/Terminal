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
    public class TransactionsController : ControllerBase
    {
        private readonly DataAccessTransactions Data = new DataAccessTransactions();

        [HttpGet]
        public IActionResult GetTransactions()
        {
            try
            {
                var result = Data.GetTransactions();

                if (result == null)
                    return NotFound();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public IActionResult Post (TransactionModel transaction)
        {
            try
            {
                var result = Data.Test(transaction);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}