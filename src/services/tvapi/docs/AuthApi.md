# Tvapi.AuthApi

All URIs are relative to *https://localhost/api/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authLoginPost**](AuthApi.md#authLoginPost) | **POST** /auth/login | login with name and password
[**authLogoutPost**](AuthApi.md#authLogoutPost) | **POST** /auth/logout | logout


<a name="authLoginPost"></a>
# **authLoginPost**
> CommonResponse authLoginPost(body)

login with name and password

Try logging in with accountname \&quot;admin\&quot; and password \&quot;admin\&quot;. 

### Example
```javascript
import Tvapi from 'tvapi';

let apiInstance = new Tvapi.AuthApi();

let body = new Tvapi.Login(); // Login | The login credentials

apiInstance.authLoginPost(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Login**](Login.md)| The login credentials | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="authLogoutPost"></a>
# **authLogoutPost**
> CommonResponse authLogoutPost()

logout

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.AuthApi();
apiInstance.authLogoutPost().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters
This endpoint does not need any parameter.

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

