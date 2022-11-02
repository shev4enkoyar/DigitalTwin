using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text.Json;
using System.Text.Json.Serialization;
using static Microservice.MapManager.Scripts.rosreestr2coord.Util.CadasterResponse;

namespace TestReestr.Scripts.rosreestr2coord
{
    public static class Rosreestr
    {
        private static string ScriptPath { get; } = "/usr/local/bin/rosreestr2coord";
        /*
         * Denchick: "C:/Python310/python.exe"
         * Nastya: "C:/Users/Nastya/AppData/Local/Programs/Python/Python310/python.exe"
         */
        /// <summary>
        /// The method allows you to get the coordinates of the cadastral object by cadastral number
        /// </summary>
        /// <param name="cadastre">Cadastral number of the object</param>
        /// <returns>The method returns the coordinates separated by commas, returns null on errors</returns>
        public static string GetCoordinatesByCadastre(string cadastre)
        {
            return ParseResult(cadastre);
        }

        private static string RunPython(string args)
        {
            ProcessStartInfo start = new ProcessStartInfo();
            start.FileName = ScriptPath;
            start.Arguments = args;
            start.UseShellExecute = false;// Do not use OS shell
            start.CreateNoWindow = true; // We don't need new window
            start.RedirectStandardOutput = true;// Any output, generated by application will be redirected back
            start.RedirectStandardError = true; // Any error in standard output will be redirected back (for example exceptions)
            using (Process process = Process.Start(start))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    string stderr = process.StandardError.ReadToEnd(); // Here are the exceptions from our Python script
                    string result = reader.ReadToEnd(); // Here is the result of StdOut(for example: print "test")
                    return result;
                }
            }
            
        }

        private static string ParseResult(string cadastre)
        {
            if (RunPython($"-c {cadastre}").Contains("geojson"))
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "output", "geojson", $"{cadastre.Replace(":", "_")}.geojson");
                Root cadastreObject;
                using (StreamReader r = new StreamReader(path))
                {
                    string json = r.ReadToEnd();
                    cadastreObject = JsonSerializer.Deserialize<Root>(json);
                }
                List<Coordinate> coordinates = new List<Coordinate>();
                if (cadastreObject.Geometry.Coordinates.Count == 1)
                {
                    foreach (var secondLevel in cadastreObject.Geometry.Coordinates[0])
                        foreach (var item in secondLevel)
                            coordinates.Add(new Coordinate() { X = item[0].ToString().Replace(",", "."), Y = item[1].ToString().Replace(',', '.') });
                }

                TryDeleteFile(path);

                return CoordinatesToString(coordinates);
            }
            else
                return null;
        }

        private static bool TryDeleteFile(string path)
        {
            try
            {
                File.Delete(path);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private static string CoordinatesToString(List<Coordinate> coordinates)
        {
            try
            {
                return string.Join(",", coordinates.Select(x => x.GetCoordinate()).ToArray());
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
