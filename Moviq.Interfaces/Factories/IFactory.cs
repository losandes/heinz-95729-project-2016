namespace Moviq.Interfaces.Factories
{
    public interface IFactory<T>
    {
        T GetInstance();
    }
}