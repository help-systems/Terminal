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
    public class ProductsController : ControllerBase
    {
        private readonly DataAccessProducts Data = new DataAccessProducts();

        [HttpGet]
        public IActionResult Get (string barcode)    // Get By Barcode
        {
            try
            {
                var result = Data.GetProducts().Where(x => x.Barcode == barcode).ToList();

                if (result.Count == 0)
                    return Ok(false);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        public IActionResult Put (ProductModel product)
        {
            try
            {          
                var result = Data.UpdateProduct(product);

                if (result == null)
                    return NotFound();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}