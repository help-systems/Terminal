using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TERMINAL.Models;

namespace TERMINAL.DataAccess
{
    public class DataAccessCashiers
    {
        private SqlConnection _connnection;

        public DataAccessCashiers()
        {
            _connnection = new SqlConnection(AppSettings.ConnectionString);
        }

        public List<CashierModel> GetCashier(string username)
        {
            List<CashierModel> items = new List<CashierModel>();

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = string.Format("EXEC GetCashier '{0}'",username);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int i = 0;
                            var item = new CashierModel();

                            item.Id = reader.GetInt32(i++);
                            item.Cashier_Name = reader.GetString(i++);
                            item.Cashier_Rank = reader.GetString(i++);
                            item.Email = reader.GetString(i++); 

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
