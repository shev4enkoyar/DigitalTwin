namespace UserManager.Microservice.Logic
{
    public interface IPasswordOperation
    {
        string GetHash(string password);
        bool IsStrong(string password);
        
    }
}
