using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using TERMINAL.DataAccess;
using TERMINAL.Models;

namespace TERMINAL.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("AllowAllHeaders")]
    public class UsersController : ControllerBase
    {
        private readonly DataAccessUsers Data = new DataAccessUsers();

        [HttpPost]
        public IActionResult Post (UserModel user)      // Login Request
        {
            try
            {
                var username = user.Username;
                var result = Data.GetUser().Where(x => x.Username == username).ToList();


                if (result.Count != 0 && user.Password == result.Last().Password)
                {
                    return Ok(true);
                }
                else return Ok(false);
                
   
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}