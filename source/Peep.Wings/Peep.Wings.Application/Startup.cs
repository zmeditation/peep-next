using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Peep.Wings.Infrastructure.Data;
using Peep.Wings.Infrastructure.IoC;
using Peep.Wings.Service.Services;

namespace Peep.Wings.Application;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000",
                                        "http://localhost:44364",
                                        "http://localhost:44327",
                                        "https://peep.vercel.app")
                            .AllowAnyHeader().AllowAnyMethod();
                });
        });

        services.AddControllers();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Peep.Wings.Application", Version = "v1" });
        });

        services
            .AddDefaultIdentity<ApplicationUser>(Infrastructure.IoC.ServiceCollectionExtensions.ConfigureIdentity)
            .AddRoles<ApplicationRole>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

        services.ConfigureServices(Configuration)
            .ConfigureAuthentication(Configuration);

        services.AddHttpClient<PeepParrotService>();
        services.AddHttpClient<PeepStorkService>();
        services.AddHttpClient<GoogleService>();

        services.AddOcelot(Configuration);
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Peep.Wings.Application v1"));
        }

        //await app.UseOcelot();

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseCors();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}

