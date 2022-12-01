using CsvHelper;
using CsvHelper.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;

namespace Microservice.FileManager
{
    /// <summary>
    /// Documentation object creation class
    /// </summary>
    public static class DocumentCreator
    {
        /// <summary>
        /// Method for creating csv file
        /// </summary>
        /// <param name="dataList">Creation object list</param>
        /// <returns>The name of the created file</returns>
        public static async Task<string> CreateCsvDocument<T>(List<T> dataList)
        {
            var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = false
            };
            var dirPath = Path.Combine("/", "root", "Project", "Files", "documents");
            if (!Directory.Exists(dirPath))
                Directory.CreateDirectory(dirPath);

            var fileName = $"{Guid.NewGuid()}.csv";
            var filePath = Path.Combine(dirPath, fileName);
            await using var streamWriter = File.CreateText(filePath);
            await using var csvWriter = new CsvWriter(streamWriter, csvConfig);
            {
                await csvWriter.WriteRecordsAsync(dataList);
            }
            return fileName;
        }
    }
}