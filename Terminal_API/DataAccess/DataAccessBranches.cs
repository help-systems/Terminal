using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TERMINAL.Models;

namespace TERMINAL.DataAccess
{
    public class DataAccessBranches
    {
        private SqlConnection _connnection;

        public DataAccessBranches()
        {
            _connnection = new SqlConnection(AppSettings.ConnectionString);
        }

        public List<BranchModel> GetBranches ()
        {
            List<BranchModel> items = new List<BranchModel>();

            try
            {
                OpenConnection();

                using (SqlCommand cmd = new SqlCommand())
                {
                    cmd.Connection = _connnection;
                    cmd.CommandText = string.Format("EXEC GetBranches");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int i = 0;
                            var item = new BranchModel();

                            item.Branch_Name = reader.GetString(i++);
                        
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
