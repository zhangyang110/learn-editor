# Tvapi.PlayHistorysApi

All URIs are relative to *https://localhost/api/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**playHistorysTopListGet**](PlayHistorysApi.md#playHistorysTopListGet) | **GET** /playHistorys/top_list | get playHistorys top_list.


<a name="playHistorysTopListGet"></a>
# **playHistorysTopListGet**
> CommonResponse playHistorysTopListGet(app, type, limit)

get playHistorys top_list.

get playHistorys top_list.

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.PlayHistorysApi();

let app = "app_example"; // String | 

let type = 789; // Number | 

let limit = 789; // Number | 

apiInstance.playHistorysTopListGet(app, type, limit).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **app** | **String**|  | 
 **type** | **Number**|  | 
 **limit** | **Number**|  | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

