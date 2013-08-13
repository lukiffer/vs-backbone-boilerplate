using System;
using Microsoft.AspNet.SignalR;

namespace VsBackboneBoilerplate.Hubs
{
    public class ExampleHub : Hub
    {
        public void Example()
        {
            Clients.Caller.process("Success at " + DateTime.Now);
        }
    }
}