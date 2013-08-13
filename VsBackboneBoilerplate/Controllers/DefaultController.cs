using System.Web.Mvc;

namespace VsBackboneBoilerplate.Controllers
{
    public class DefaultController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
