using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TERMINAL.Models;

namespace TERMINAL.DataAccess
{
    public class DataAccessTransactions
    {
        private SqlConnection _connnection;

        public DataAccessTransactions()
        {
            _connnection = new SqlConnection(AppSettings.ConnectionString);
        }

        
        public static List<ProductModel> Merge(List<ProductModel> list)
        {
            try
            {
                var temp = new List<ProductModel>();

                foreach(var l in list)
                {
                    bool b = false;

                    foreach(var t in temp)
                    {
                        if (l.Barcode == t.Barcode)
                        {
                            t.Count += l.Count;
                            b = true;
                            break;
                        }
                    }

                    if (!b)
                    {
                        temp.Add(l);
                    }
                }
                return temp;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        public List<TransactionModel> GetTransactions()
        {
            List<TransactionModel> items = new List<TransactionModel>();

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = "EXEC GetTransactions";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int i = 0;
                            var item = new TransactionModel();

                            item.Id = reader.GetInt64(i++);
                            item.Amount = reader.GetDecimal(i++);
                            item.Status = reader.GetString(i++);
                            item.Payment_Type = reader.GetString(i++);
                            item.Branch_name = reader.GetString(i++);

                            items.Add(item);
                        }
                    }
                }

                return items;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            finally
            {
                CloseConnection();
            }
        }


        public TransactionModel MultiRequest (TransactionModel tran)
        {
            SqlTransaction transaction = null;

            long Id = tran.Id;
            decimal Amount = tran.Amount;
            string Status = tran.Status;
            string Payment_Type = tran.Payment_Type;
            string Branch_name = tran.Branch_name;
            List<ProductModel> ProductList = Merge(tran.ProductList);

            string SQL = $"EXEC PostTransaction '{Amount}','{Status}','{Payment_Type}','{Branch_name}'";

            try
            {
                _connnection.Open();
                transaction = _connnection.BeginTransaction();

                using (SqlCommand cmd = new SqlCommand(SQL, _connnection, transaction)) 
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {                            
                            Id = (Int64)reader.GetDecimal(0);
                        }
                    }
                }

                if(ProductList != null)
                {
                    foreach (var l in ProductList)
                    {
                        using (SqlCommand cmd = new SqlCommand(string.Format("EXEC PutProducts '{0}','{1}','{2}'",
                            l.Barcode, l.Branch_name, l.Count), _connnection, transaction)) { cmd.ExecuteNonQuery(); }

                        using (SqlCommand cmd = new SqlCommand(string.Format("EXEC PostProductInTransaction '{0}','{1}',{2}",
                            Id, l.Barcode, l.Count), _connnection, transaction)) { cmd.ExecuteNonQuery(); }
                    }
                }

                transaction.Commit();

                return tran;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw (ex);
            }

            finally
            {
                CloseConnection();
            }                   
        }

         public TransactionModel CreateTransaction(TransactionModel transaction)    // For Post Request
         {
            long Id = transaction.Id;
            decimal Amount = transaction.Amount;
            string Status = transaction.Status;
            string Payment_Type = transaction.Payment_Type;
            string Branch_name = transaction.Branch_name;

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;

                    cmd.CommandText = $"EXEC PostTransaction '{Amount}','{Status}','{Payment_Type}','{Branch_name}'";
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw(ex);
            }
            finally
            {
                CloseConnection();
            }

            return transaction;
        }





        public long UpdateTransaction(TransactionModel transaction)     // For Put Request
        {
            long Id = transaction.Id;
            decimal Amount = transaction.Amount;
            string Status = transaction.Status;
            string Payment_Type = transaction.Payment_Type;
            string Branch_name = transaction.Branch_name;
            DateTime Date = transaction.Date;

            List<ProductModel> productList = transaction.ProductList;
            int Delivery_Id = transaction.Delivery_Id;

            try
            {
                OpenConnection();

                string sql = string.Format("EXEC PutTransaction '{0}','{1}','{2}','{3}','{4}','{5}'",
                    Id, Amount, Status, Payment_Type, Branch_name, Date);
                
                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;

                    //cmd.CommandText = $"EXEC PutTransaction {Id},{Amount},'{Status}','{Payment_Type}','{Branch_name}'";

                    cmd.CommandText = sql;
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

            return Id;
        }


        public int DeleteTransaction(int Id)        // For Delete Request
        {
            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;

                    cmd.CommandText = $"EXEC DeleteTransaction {Id}";
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
            return Id;
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
