namespace Moviq.Interfaces.Factories
{
    public interface IFactory<T>
    {
        T Make<T>();
    }
}