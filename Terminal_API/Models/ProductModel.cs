using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TERMINAL.Models
{
    public class ProductModel
    {
        public string Barcode { get; set; }
        public decimal Cost_Price { get; set; }
        public decimal Selling_Price { get; set; }
        public string Supplier_Name { get; set; }
        public string Product_name { get; set; }
        public string Category_Name { get; set; }

        public string Branch_name { get; set; }
        public int Count { get; set; }
    }

}
