namespace Moviq.Domain.Products.Tests
{
    using Grain.DataAccess.Sql;
    using System;
    using System.Collections.Generic;

    public class MockSqlDbInstance : ISqlDbInstance
    {
        public MockSqlDbInstance(object mockOutput, IEnumerable<object> mockEnumerableOutput) 
        {
            this.mockOutput = mockOutput;
            this.mockEnumerableOutput = mockEnumerableOutput;
        }

        object mockOutput;
        IEnumerable<object> mockEnumerableOutput;
        
        public IEnumerable<T> ExecuteAs<T>(System.Data.SqlClient.SqlCommand command, Func<System.Data.IDataRecord, T> modelBinder, System.Data.CommandBehavior commandBehavior = System.Data.CommandBehavior.CloseConnection)
        {
            return (IEnumerable<T>)mockEnumerableOutput;
        }

        public T ExecuteAsSingle<T>(System.Data.SqlClient.SqlCommand command, Func<System.Data.IDataRecord, T> modelBinder, System.Data.CommandBehavior commandBehavior = System.Data.CommandBehavior.CloseConnection)
        {
            return (T)mockOutput;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public int Execute(System.Data.SqlClient.SqlCommand command)
        {
            throw new NotImplementedException();
        }

        public void ExecuteAs<T1, T2, T3, T4, T5, T6>(System.Data.SqlClient.SqlCommand command, Func<System.Data.IDataRecord, T1> modelBinder1 = null, List<T1> output1 = null, Func<System.Data.IDataRecord, T2> modelBinder2 = null, List<T2> output2 = null, Func<System.Data.IDataRecord, T3> modelBinder3 = null, List<T3> output3 = null, Func<System.Data.IDataRecord, T4> modelBinder4 = null, List<T4> output4 = null, Func<System.Data.IDataRecord, T5> modelBinder5 = null, List<T5> output5 = null, Func<System.Data.IDataRecord, T6> modelBinder6 = null, List<T6> output6 = null, System.Data.CommandBehavior commandBehavior = System.Data.CommandBehavior.CloseConnection)
        {
            throw new NotImplementedException();
        }

        public void ExecuteAs<T1, T2, T3, T4, T5>(System.Data.SqlClient.SqlCommand command, Func<System.Data.IDataRecord, T1> modelBinder1, List<T1> output1, Func<System.Data.IDataRecord, T2> modelBinder2, List<T2> output2, Func<System.Data.IDataRecord, T3> modelBinder3, List<T3> output3, Func<System.Data.IDataRecord, T4> modelBinder4, List<T4> output4, Func<System.Data.IDataRecord, T5> modelBinder5, List<T5> output5, System.Data.CommandBehavior commandBehavior = System.Data.CommandBehavior.CloseConnection)
        {
            throw new NotImplementedException();
        }

        public void ExecuteAs<T1, T2, T3, T4>(System.Data.SqlClient.SqlCommand command, Func<System.Data.IDataRecord, T1> modelBinder1, List<T1> output1, Func<System.Data.IDataRecord, T2> modelBinder2, List<T2> output2, Func<System.Data.IDataRecord, T3> modelBinder3, List<T3> output3, Func<System.Data.IDataRecord, T4> modelBinder4, List<T4> output4, System.Data.CommandBehavior commandBehavior = System.Data.CommandBehavior.CloseConnection)
        {
            throw new NotImplementedException();
        }

        public void ExecuteAs<T1, T2, T3>(System.Data.SqlClient.SqlCommand command, Func<System.Data.IDataRecord, T1> modelBinder1, List<T1> output1, Func<System.Data.IDataRecord, T2> modelBinder2, List<T2> output2, Func<System.Data.IDataRecord, T3> modelBinder3, List<T3> output3, System.Data.CommandBehavior commandBehavior = System.Data.CommandBehavior.CloseConnection)
        {
            throw new NotImplementedException();
        }

        public void ExecuteAs<T1, T2>(System.Data.SqlClient.SqlCommand command, Func<System.Data.IDataRecord, T1> modelBinder1, List<T1> output1, Func<System.Data.IDataRecord, T2> modelBinder2, List<T2> output2, System.Data.CommandBehavior commandBehavior = System.Data.CommandBehavior.CloseConnection)
        {
            throw new NotImplementedException();
        }

        public System.Data.SqlClient.SqlConnection SqlConnection
        {
            get { throw new NotImplementedException(); }
        }
    }
}
