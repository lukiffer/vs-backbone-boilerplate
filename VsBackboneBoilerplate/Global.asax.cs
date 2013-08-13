using System;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using HandlebarsDotNet;

namespace VsBackboneBoilerplate
{
    public class Portal : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            RouteTable.Routes.MapHubs();
            RegisterWebApi(GlobalConfiguration.Configuration);
            RegisterRoutes(RouteTable.Routes);
            RegisterBundles(BundleTable.Bundles);
        }

        private static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = true;

            bundles.Add(new StyleBundle("~/bundle/css/").Include("~/assets/css/*.css"));

            bundles.Add(new Bundle("~/bundle/templates/",
                new HandlebarsBundleTransform("JST", true, "/app/templates/"))
                    .IncludeDirectory("~/app/templates/", "*.hbs", true));
        }

        private static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("bundle/{*pathInfo}");
            routes.IgnoreRoute("signalr/{*pathInfo}");

            routes.MapRoute("default", "{*url}", new { controller = "Default", action = "Index" });
        }

        private static void RegisterWebApi(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute("0", "api/{controller}/{id}", new { id = RouteParameter.Optional });

            //fuck xml.
            config.Formatters.Remove(config.Formatters.XmlFormatter);
        }
    }
}