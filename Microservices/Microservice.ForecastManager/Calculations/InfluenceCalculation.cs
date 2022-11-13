using System;
using System.Linq;

namespace Microservice.ForecastManager.Calculations
{
    public static class InfluenceCalculation
    {
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
        public static double GetOverallInfluence(int[] dons, int[] dots, double g, double gtcOptinal, int averageTemperature, int[] maxAirTemperature, int[] minAirTemperature, int[] precipitationAmount)
        {
            double result = GetSoilInfluence(); // первоначальное влияние почвы на культуру

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

            return result;
        }


        /// <summary>
        /// первоначальное влияние почвы на культуру. Зависит от содержания почвы и насколько оно подходит для выбранной культуры. 1 - это круто
        /// </summary>
        /// <returns></returns>
        private static double GetSoilInfluence()
        {
            return 1;
        }


        /// <summary>
        /// влияние погоды (осадков) на урожай (видимо, всегда влияет плохо, потому с минусом). Чем ближе к нулю, тем лучше
        /// </summary>
        /// <param name="g">калибровочный коэффициент</param>
        /// <param name="gtc">текущий уровень гтк</param>
        /// <param name="gtcOptinal">оптимальный гтк для данной культуры</param>
        /// <returns></returns>
        public static double GetWeatherInfluence(double g, int averageTemperature, int[] maxAirTemperature, int[] minAirTemperature, int[] precipitationAmount, double gtcOptinal)
        {
            return g * (Math.Abs(GetHydrothermalCoefficiens(averageTemperature, maxAirTemperature, minAirTemperature, precipitationAmount) - gtcOptinal) / gtcOptinal);
        }

        // ГТК - отражает текущий уровень влагообеспечённости территории
        private static double GetHydrothermalCoefficiens(int averageTemperature, int[] maxAirTemperature, int[] minAirTemperature, int[] precipitationAmount)
        {
            //TODO Что такое 10. Нужно занести в переменную
            if (averageTemperature < 10)
                return 0;
            if (!(maxAirTemperature.Length == minAirTemperature.Length && minAirTemperature.Length == precipitationAmount.Length))
                throw new Exception("days count not equal");

            double averageAirTemperature = GetAverageAirTempure(maxAirTemperature, minAirTemperature);

            if (averageAirTemperature == 0)
                return 0;

            return 10 * precipitationAmount.Sum() / averageAirTemperature;
        }

        private static double GetAverageAirTempure(int[] maxAirTemperature, int[] minAirTemperature)
        {
            double sum = 0;
            for (int i = 0; i < minAirTemperature.Length; i++)
            {
                sum += (maxAirTemperature[i] + minAirTemperature[i]) / 2;
            }

            return sum;
        }

        /// <summary>
        /// влияние на урожай по факту выполнения работ, где 1 - максимум
        /// </summary>
        /// <param name="dons"> 0 - работы не выполнены, 1 - выполнены </param>
        /// <param name="dots"> 0 - есть нарушение сроков работ, 1 - нет нарушения сроков работ </param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static double GetTaskInfluence(int[] dons, int[] dots)
        {
            if (dons.Length != dots.Length)
                throw new Exception("days count not equal");
            int sum = 0;

            for (int i = 0; i < dons.Length; i++)
            {
                sum += GetTaskInfluencePerDay(dons[i], dots[i]);
            }

            return sum / dons.Length;
        }




        /// <summary>
        /// 
        /// </summary>
        /// <param name="don"> 0 - работы не выполнены, 1 - выполнены </param>
        /// <param name="dot">  0 - есть нарушение сроков работ, 1 - нет нарушения сроков работ </param>
        /// <param name="e"> экспертная оценка влияния работ на урожай </param>
        /// <returns></returns>
        private static byte GetTaskInfluencePerDay(int don, int dot, byte e = 1)
        {
            return (byte)(e * don * dot);
        }
    }


}
