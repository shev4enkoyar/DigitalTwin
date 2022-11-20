using System;
using System.Collections.Generic;
using CsvHelper;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;

namespace Microservice.FileManager
{
    public static class DocumentCreator
    {
        private const string windowsPath = @"C:\ProgramData\document";

        //const string stlinuxPath = @"/root/Project/Files/documents";
        private static string DocumentPath { get; } = windowsPath;

        public static async Task<string> CreateCsvDocument<T>(List<T> dataList)
        {
            var filePath = Path.Combine(DocumentPath, $"{Guid.NewGuid()}.csv");
            await using var streamWriter = File.CreateText(filePath);
            await using var csvWriter = new CsvWriter(streamWriter, CultureInfo.CurrentCulture);
            {
                await csvWriter.WriteRecordsAsync(dataList);
            }
            return filePath;
        }
    }
}