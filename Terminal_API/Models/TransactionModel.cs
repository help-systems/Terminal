using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TERMINAL.Models
{
    public class TransactionModel
    {
        public long Id { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public string Payment_Type { get; set; }
        public string Branch_name { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;
        public List<ProductModel> ProductList { get; set; }

        public int Delivery_Id { get; set; }
    }
}
