namespace Shared
{
    /// <summary>
    /// Enumeration of possible task types
    /// </summary>
    public static class TaskTypesEnum
    {
        /// <summary>
        /// Task type "Sowing"
        /// </summary>
        /// <example>Засев</example>
        public static string Sowing { get; } = "Засев";

        /// <summary>
        /// Task type "Treatment"
        /// </summary>
        /// <example>Обработка</example>
        public static string Treatment { get; } = "Обработка";

        /// <summary>
        /// Task type "Harvesting"
        /// </summary>
        /// <example>Сбор</example>
        public static string Harvesting { get; } = "Сбор";
    }
}