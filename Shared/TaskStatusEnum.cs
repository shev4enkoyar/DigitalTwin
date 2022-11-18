namespace Shared
{
    public static class TaskStatusEnum
    {
        /// <summary>
        /// Выполнен
        /// </summary>
        public static string Done { get; } = "done";

        /// <summary>
        /// Выполнен с опозданием
        /// </summary>
        public static string Late { get; } = "late";

        /// <summary>
        /// Не выполнен
        /// </summary>
        public static string Undone { get; } = "undone";

        /// <summary>
        /// Доступный для выбора день, без статуса
        /// </summary>
        public static string Active { get; } = "active";

        /// <summary>
        /// Не доступный день, без статуса
        /// </summary>
        public static string Passive { get; } = "passive";
    }
}
