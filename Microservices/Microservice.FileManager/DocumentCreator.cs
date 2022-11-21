using System;
using System.Collections.Generic;
using CsvHelper;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;
using CsvHelper.Configuration;

namespace Microservice.FileManager
{
    public static class DocumentCreator
    {
        const string linuxPath = @"/root/Project/Files/documents";
        private static string DocumentPath { get; } = linuxPath;

        public static async Task<string> CreateCsvDocument<T>(List<T> dataList)
        {
            var csvConfig = new CsvConfiguration(new CultureInfo("ru-RU")) { HasHeaderRecord = false };
            var filePath = Path.Combine(DocumentPath, $"{Guid.NewGuid()}.csv");
            await using var streamWriter = File.CreateText($"{DocumentPath}/{Guid.NewGuid()}.csv");
            await using var csvWriter = new CsvWriter(streamWriter, csvConfig);
            {
                await csvWriter.WriteRecordsAsync(dataList);
            }
            return filePath;
        }
    }
}