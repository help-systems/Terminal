using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TERMINAL.Models;

namespace TERMINAL.DataAccess
{
    public class DataAccessProducts
    {
        private SqlConnection _connnection;

        public DataAccessProducts()
        {
            _connnection = new SqlConnection(AppSettings.ConnectionString);
        }

        public List<ProductModel> GetProducts()
        {
            List<ProductModel> items = new List<ProductModel>();

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = "EXEC GetProducts";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int i = 0;
                            var item = new ProductModel();

                            item.Barcode = reader.GetString(i++).Trim();
                            item.Cost_Price = reader.GetDecimal(i++);
                            item.Selling_Price = reader.GetDecimal(i++);
                            item.Supplier_Name = reader.GetString(i++);
                            item.Product_name = reader.GetString(i++);
                            item.Category_Name = reader.GetString(i++);

                            item.Branch_name = reader.GetString(i++);
                            item.Count = reader.GetInt32(i++);

                            items.Add(item);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            finally
            {
                CloseConnection();
            }

            return items;
        }

        public string UpdateProduct(ProductModel product)
        {
            string Barcode = product.Barcode;
            int Count = product.Count;
            string Branch_name = product.Branch_name;

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = string.Format("EXEC PutProducts '{0}','{1}','{2}'", Barcode,Branch_name,Count);
                    
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            finally
            {
                CloseConnection();
            }

            return Barcode;
        }

        private void OpenConnection()
        {
            _connnection.Open();
        }

        private void CloseConnection()
        {
            _connnection.Close();
        }
    }
}
