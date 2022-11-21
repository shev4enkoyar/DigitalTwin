using CsvHelper;
using CsvHelper.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;

namespace Microservice.FileManager
{
    public static class DocumentCreator
    {
        public static async Task<string> CreateCsvDocument<T>(List<T> dataList)
        {
            var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = false
            };
            var dirPath = Path.Combine("/", "root", "Project", "Files", "documents");
            if (!Directory.Exists(dirPath))
                Directory.CreateDirectory(dirPath);

            var filePath = Path.Combine(dirPath, $"{Guid.NewGuid()}.csv");
            await using var streamWriter = File.CreateText(filePath);
            await using var csvWriter = new CsvWriter(streamWriter, csvConfig);
            {
                await csvWriter.WriteRecordsAsync(dataList);
            }
            return filePath;
        }
    }
}