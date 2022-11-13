using System;

namespace Microservice.ForecastManager.Calculations
{
    public static class ForecastCalculation
    {
        /// <summary>
        /// Method for obtaining the evaporation of the soil moisture
        /// </summary>
        /// <param name="rn">Чистая радиация на поверхности урожая? Net radiation at the crop surfacce</param> Да, рил. Я ж говорил, что формула ебнутая.
        /// <param name="g">Плотность теплового потока почвы?</param>
        /// <param name="p">Атмосферное давление</param>
        /// <param name="t">Среднесуточная температура воздуха на высоте 2 м</param>
        /// <param name="u">Скорость ветра на высоте 2 м</param>
        /// <param name="es">Давление пара насыщения</param>
        /// <param name="ea">Фактическое давление пара</param>
        /// <param name="svpk">Наклон кривой давления пара</param>
        /// <param name="ra">Поверхностное сопротивление</param>
        /// <param name="rs">Атмосферное сопротивление</param>
        /// <returns></returns>
        public static double GetEvapotranspiration(double rn, double g, double p, double t, double u, double es, double ea, double svpk, double ra, double rs)
        {
            return (0.408 * (rn - g) + GetPsychrometricConstant(p) * (900 / (t + 273)) * u * (es - ea)) / (svpk + GetPsychrometricConstant(p) * (1 + ra / rs));
        }

        /// <summary>
        /// Психрометрическая константа
        /// </summary>
        /// <param name="p">Атмосферное давление</param>
        /// <returns></returns>
        private static double GetPsychrometricConstant(double p)
        {
            return 6.65 * Math.Pow(10, -4) * p;
        }

    }
}
