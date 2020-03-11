using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TERMINAL.Models;

namespace TERMINAL.DataAccess
{
    public class DataAccessUsers
    {
        private SqlConnection _connnection;

        public DataAccessUsers()
        {
            _connnection = new SqlConnection(AppSettings.ConnectionString);
        }

        public List<UserModel> GetUser()
        {
            List<UserModel> items = new List<UserModel>();

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = "EXEC LOGIN";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int i = 0;
                            var item = new UserModel();

                         //   item.Id = reader.GetInt32(i++);   
                         
                            item.Username = reader.GetString(i++);
                            item.Password = reader.GetString(i++);

                         //   item.email = reader.GetString(i++);

                            items.Add(item);
                        }
                    }
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
