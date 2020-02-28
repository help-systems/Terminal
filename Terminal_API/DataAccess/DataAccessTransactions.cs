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


         public TransactionModel CreateTransaction(TransactionModel transaction)    // For Post Request
         {
            int NewTransactId;

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
                    cmd.CommandText = string.Format("insert into Transactions (Amount, Status, Payment_Type, Branch_name) " +
                        "values ('{0}', '{1}', '{2}', '{3}')", Amount, Status, Payment_Type, Branch_name);

                    cmd.ExecuteNonQuery();

                    cmd.CommandText = "SELECT SCOPE_IDENTITY()";
                    NewTransactId = Convert.ToInt32(cmd.ExecuteScalar());
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
                    cmd.CommandText = "select * from Transactions";

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
                    cmd.CommandText = string.Format("update Transactions set " +
                        "Amount = '{0}', Status = '{1}', Payment_Type = '{2}', Branch_name = '{3}' " +
                            "where Id = '{4}'", Amount, Status, Payment_Type, Branch_name, Id);

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


        public int DeleteTransaction(int id)        // For Delete Request
        {
            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = string.Format("delete from Transactions where Id = {0}", id);

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
            return id;
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