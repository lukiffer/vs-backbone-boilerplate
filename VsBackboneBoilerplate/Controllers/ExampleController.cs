using System.Web.Http;

namespace VsBackboneBoilerplate.Controllers
{
    public class ExampleController : ApiController
    {
        // GET /api/example
        public dynamic Get()
        {
            return new
                       {
                           id = 0,
                           first_name = "foo",
                           last_name = "bar"
                       };
        }

        // POST /api/example
        public dynamic Post([FromBody]dynamic group)
        {
            return new { success = true };
        }

        // PUT /api/example/{id}
        public dynamic Put([FromUri]string id, [FromBody]dynamic group)
        {
            return new { success = true };
        }

        // DELETE /api/example/{id}
        public dynamic Delete(string id)
        {
            return new { success = true };
        }
    }
}