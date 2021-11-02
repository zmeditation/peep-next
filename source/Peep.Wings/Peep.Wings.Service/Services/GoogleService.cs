﻿namespace Peep.Wings.Service.Services;

public class GoogleService : IOAuthService<GoogleUserInfo>
{
    private readonly HttpClient _httpClient;
    private const string Url = "https://www.googleapis.com/oauth2/v3";
 
    public GoogleService(HttpClient httpClient)
    {
        this._httpClient = httpClient;
    }

    public Task<GoogleUserInfo> RetrieveLoggedUserInformation(string userIdentifier)
    {
        throw new NotImplementedException();
    }
}

