﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TERMINAL.Models;

namespace TERMINAL.DataAccess
{
    public class DataAccessTransactions
    {
        private const string _coneectionString
            = @"Data Source=DESKTOP-6NUHAOM\DROSQL;Initial Catalog=Supermarket_DB;Integrated Security=True";

        private SqlConnection _connnection;

        public DataAccessTransactions()
        {
            _connnection = new SqlConnection(_coneectionString);
        }


        public TransactionModel Test (TransactionModel tran)
        {
            SqlTransaction transaction = null;

            long Id = tran.Id;
            decimal Amount = tran.Amount;
            string Status = tran.Status;
            string Payment_Type = tran.Payment_Type;
            string Branch_name = tran.Branch_name;
            List<ProductModel> ProductList = tran.ProductList;

            string SQL = $"EXEC PostTransaction '{Amount}','{Status}','{Payment_Type}','{Branch_name}'";

            try
            {
                _connnection.Open();
                transaction = _connnection.BeginTransaction();

                using (SqlCommand cmd = new SqlCommand(SQL, _connnection, transaction)) 
                {
                    //cmd.ExecuteNonQuery();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            //int i = 0;
                            
                            Id = (Int64)reader.GetDecimal(0);
                        }
                    }
                }

                foreach (var l in ProductList)
                {
                    using (SqlCommand cmd = new SqlCommand(string.Format("EXEC PutProducts '{0}','{1}','{2}'",
                        l.Barcode, l.Branch_name, l.Count), _connnection, transaction)) { cmd.ExecuteNonQuery(); }

                    using (SqlCommand cmd = new SqlCommand(string.Format("EXEC PostProductInTransaction '{0}','{1}',{2}",
                        Id, l.Barcode, l.Count), _connnection, transaction)) { cmd.ExecuteNonQuery(); }
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


        public List<TransactionModel> GetTransactions()     // For Get Request
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


        public long UpdateTransaction(TransactionModel transaction)     // For Put Request
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

                    cmd.CommandText = $"EXEC PutTransaction {Id},{Amount},'{Status}','{Payment_Type}','{Branch_name}'";
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
