using System;
using System.Linq;

namespace Microservice.ForecastManager.Calculations
{
    public static class InfluenceCalculation
    {
        private const int MinimalAvgDayliTemperature = 10;
        /// <summary>
        /// общее влияние на урожай. Чем ближе к 1, тем лучше
        /// </summary>
        /// <param name="dons">0 - работы не выполнены, 1 - выполнены </param>
        /// <param name="dots">0 - есть нарушение сроков работ, 1 - нет нарушения сроков работ</param>
        /// <param name="g">калибровочный коэффициент</param>
        /// <param name="gtcOptinal">оптимальный гтк для данной культуры</param>
        /// <param name="averageTemperature">средняя температура за последние 30 дней</param>
        /// <param name="maxAirTemperature">макс. температура воздуха</param>
        /// <param name="minAirTemperature">мин. температура воздуха</param>
        /// <param name="precipitationAmount">количество осадков в мм</param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static double GetOverallInfluence(int[] dons, int[] dots, double g, double gtcOptinal, double averageTemperature, double[] maxAirTemperature, double[] minAirTemperature, double[] precipitationAmount)
        {
            var result = GetSoilInfluence(); // первоначальное влияние почвы на культуру

            if (!dons.Length.Equals(dots.Length)
                || !(maxAirTemperature.Length.Equals(minAirTemperature.Length)
                    && minAirTemperature.Length.Equals(precipitationAmount.Length)))
                throw new Exception("days count not equal");

            for (int i = 0; i < dots.Length; i++)
            {
                result *= 1
                    + GetTaskInfluencePerDay(dons[i], dots[i])
                    - GetWeatherInfluence(g, averageTemperature, maxAirTemperature[0..i], minAirTemperature[0..i], precipitationAmount[0..i], gtcOptinal);
            }

            return result / Math.Pow(2, dots.Length);
        }


        /// <summary>
        /// первоначальное влияние почвы на культуру. Зависит от содержания почвы и насколько оно подходит для выбранной культуры. 1 - лучший вариант
        /// </summary>
        /// <returns></returns>
        private static double GetSoilInfluence()
        {
            return 1;
        }


        /// <summary>
        /// влияние погоды (осадков) на урожай. Чем ближе к нулю, тем лучше
        /// </summary>
        /// <param name="g">калибровочный коэффициент</param>
        /// <param name="gtc">текущий уровень гтк</param>
        /// <param name="gtcOptinal">оптимальный гтк для данной культуры</param>
        /// <returns></returns>
        public static double GetWeatherInfluence(double g, double averageTemperature, double[] maxAirTemperature, double[] minAirTemperature, double[] precipitationAmount, double gtcOptinal)
        {
            return g * (Math.Abs(GetHydrothermalCoefficiens(averageTemperature, maxAirTemperature, minAirTemperature, precipitationAmount) - gtcOptinal) / gtcOptinal);
        }

        // ГТК - отражает текущий уровень влагообеспечённости территории
        private static double GetHydrothermalCoefficiens(double averageTemperature, double[] maxAirTemperature, double[] minAirTemperature, double[] precipitationAmount)
        {
            if (averageTemperature < MinimalAvgDayliTemperature)
                return 0;
            if (!(maxAirTemperature.Length == minAirTemperature.Length && minAirTemperature.Length == precipitationAmount.Length))
                throw new Exception("days count not equal");

            var averageAirTemperature = GetAverageAirTempure(maxAirTemperature, minAirTemperature);

            if (averageAirTemperature == 0)
                return 0;

            return 10 * precipitationAmount.Sum() / averageAirTemperature;
        }

        private static double GetAverageAirTempure(double[] maxAirTemperature, double[] minAirTemperature)
        {
            double sum = 0;
            for (var i = 0; i < minAirTemperature.Length; i++)
            {
                sum += (maxAirTemperature[i] + minAirTemperature[i]) / 2;
            }

            return sum;
        }

        /// <summary>
        /// A method for obtaining the effect of a task on productivity
        /// </summary>
        /// <param name="dons"> 0 - работы не выполнены, 1 - выполнены </param>
        /// <param name="dots"> 0 - есть нарушение сроков работ, 1 - нет нарушения сроков работ </param>
        /// <returns>Task Influence</returns>
        /// <exception cref="Exception"></exception>
        public static double GetTaskInfluence(int[] dons, int[] dots)
        {
            if (dons.Length != dots.Length)
                throw new Exception("days count not equal");
            var sum = 0;

            for (var i = 0; i < dons.Length; i++)
            {
                sum += GetTaskInfluencePerDay(dons[i], dots[i]);
            }

            return sum / dons.Length;
        }

        /*/// <summary>
        /// 
        /// </summary>
        /// <param name="don"> 0 - работы не выполнены, 1 - выполнены </param>
        /// <param name="dot">  0 - есть нарушение сроков работ, 1 - нет нарушения сроков работ </param>
        /// <param name="e"> экспертная оценка влияния работ на урожай </param>
        /// <returns></returns>*/
        private static byte GetTaskInfluencePerDay(int don, int dot, byte e = 1)
        {
            return (byte)(e * don * dot);
        }
    }


}
