using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TERMINAL.DataAccess;
using TERMINAL.Models;

namespace TERMINAL.Controllers
{
    [ApiController]
    [Route("[controller]/[Action]")]
    [EnableCors("AllowAllHeaders")]
    public class TerminalController : ControllerBase
    {
        //[HttpGet]
        //public IActionResult GetProducts()
        //{
        //    try
        //    {
        //        var temp = new DataAccessProducts();

        //        var result = temp.GetProducts();

        //        if (result == null)
        //            return NotFound();

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}


        [HttpGet("{barcode}")]
        public IActionResult GetProducts(string barcode)    // Get By Barcode
        {
            try
            {
                var temp = new DataAccessProducts();

                var result = temp.GetProducts().Where(x => x.Barcode == barcode).ToList();

                if (result.Count == 0)
                    return Ok(false);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPost("{product}")]
        public IActionResult Update(string product)
        {
            try
            {
                var temp = new DataAccessProducts();

                var obj = JsonConvert.DeserializeObject<ProductModel>(product);

                //var res = temp.GetProducts().Where(x => x.Barcode == obj.Barcode).ToList();

                //if (res.Count() == 0)
                //    return Ok(false);

                var result = temp.UpdateProduct(obj);

                if (result == null)
                    return NotFound();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet]
        public IActionResult GetTransactions()
        {
            try
            {
                var temp = new DataAccessTransactions();

                var result = temp.GetTransactions();
                if (result == null)
                    return NotFound();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[HttpGet("{id}")]
        //public IActionResult GetTransactions(int id)    // Get By Id
        //{
        //    try
        //    {
        //        var temp = new DataAccessTransactions();

        //        var result = temp.GetTransactions().Where(x => x.Id == id);
        //        if (result == null)
        //            return NotFound();

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}


        //[HttpPost("{transaction}")]
        //public IActionResult PostTransactions(List<TransactionModel> transaction)
        //{
        //    try
        //    {
        //        var temp = new DataAccessTransactions();

        //        var res = JsonConvert.DeserializeObject<TransactionModel>(transaction);

        //        TransactionModel r = new TransactionModel();

        //        var result = temp.CreateTransaction(transaction.First());

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}


        [HttpPost("{transaction}")]
        public IActionResult PostTransactions(string transaction)
        {
            try
            {
                var temp = new DataAccessTransactions();
                
                var res = JsonConvert.DeserializeObject<TransactionModel>(transaction);

                var result = temp.CreateTransaction(res);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[HttpPut("{transaction}")]
        //public IActionResult PutTransactions(TransactionModel transaction)
        //{
        //    try
        //    {
        //        var temp = new DataAccessTransactions();

        //        var result = temp.UpdateTransaction(transaction);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}


        //[HttpDelete("{id}")]
        //public IActionResult DeleteTransactions(int id)
        //{
        //    try
        //    {
        //        var temp = new DataAccessTransactions();

        //        var result = temp.DeleteTransaction(id);

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}


        //[HttpGet]
        //public IActionResult GetUsers()
        //{
        //    try
        //    {
        //        var temp = new DataAccessUsers();

        //        var result = temp.GetUser();
        //        if (result == null)
        //            return NotFound();

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}


        [HttpGet("{username}")]
        public IActionResult GetCashier (string username)
        {
            try
            {
                var temp = new DataAccessCashiers();

                var result = temp.GetCashier(username).ToList();
                
                if (result.Count() == 0)
                    return NotFound();

                return Ok(result.First());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpGet]
        public IActionResult GetBranches()
        {
            try
            {
                var temp = new DataAccessBranches();

                var result = temp.GetBranches().ToList();

                if (result.Count() == 0)
                    return NotFound();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        [HttpPost("{user}")]
        public IActionResult Login(string user)      // Login Request
        {
            try
            {   
                var temp = new DataAccessUsers();
                UserModel res = new UserModel();

                res = JsonConvert.DeserializeObject<UserModel>(user);

                var username = res.Username;
                var result = temp.GetUser().Where(x => x.Username == username).ToList();


                if (result.Count !=0 && res.Password == result.Last().Password)
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
