using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace TERMINAL
{
    public static class AppSettings
    {
        private static IConfigurationRoot configuration;

        static AppSettings()
        {
            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            configuration = builder.Build();
        }

        public static string ConnectionString
        {
            get { return configuration.GetConnectionString("AdonetCrud"); }
        }

    }
}
