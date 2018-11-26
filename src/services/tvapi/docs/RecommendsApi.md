# Tvapi.RecommendsApi

All URIs are relative to *https://localhost/api/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**recommendsGet**](RecommendsApi.md#recommendsGet) | **GET** /recommends | Returns all recommend in the database.
[**recommendsIdGet**](RecommendsApi.md#recommendsIdGet) | **GET** /recommends/{id} | 
[**recommendsIdPut**](RecommendsApi.md#recommendsIdPut) | **PUT** /recommends/{id} | put recommend
[**recommendsPost**](RecommendsApi.md#recommendsPost) | **POST** /recommends | create a recommend


<a name="recommendsGet"></a>
# **recommendsGet**
> CommonResponse recommendsGet(opts)

Returns all recommend in the database.

Only the \&quot;admin\&quot; account can access this.

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.RecommendsApi();

let opts = { 
  'query': "query_example", // String | Filter. e.g. col1:v1,col2:v2 ...
  'fields': "fields_example", // String | Fields returned. e.g. col1,col2 ...
  'sortby': "sortby_example", // String | Sorted-by fields. e.g. col1,col2 ...
  'order': "order_example", // String | Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ...
  'limit': 789, // Number | Limit the size of result set. Must be an integer
  'offset': 789, // Number | Start position of result set. Must be an integer
  'model': "model_example" // String | 获取数据匹配规则 1.默认：匹配字段中包含且不区分大小写  2.accurate：精确匹配，字段完全相等  e.g. accurate
  'num': 789 // Number | 传递此参数后limit和offect参数失效，此参数代表返回位置position=1到num的最新推荐位数据。
};
apiInstance.recommendsGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **query** | **String**| Filter. e.g. col1:v1,col2:v2 ... | [optional] 
 **fields** | **String**| Fields returned. e.g. col1,col2 ... | [optional] 
 **sortby** | **String**| Sorted-by fields. e.g. col1,col2 ... | [optional] 
 **order** | **String**| Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ... | [optional] 
 **limit** | **Number**| Limit the size of result set. Must be an integer | [optional] 
 **offset** | **Number**| Start position of result set. Must be an integer | [optional] 
 **model** | **String**| 获取数据匹配规则 1.默认：匹配字段中包含且不区分大小写  2.accurate：精确匹配，字段完全相等  e.g. accurate | [optional] 
 **num** | **Number**| 传递此参数后limit和offect参数失效，此参数代表返回位置position&#x3D;1到num的最新推荐位数据。 | [optional] 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="recommendsIdGet"></a>
# **recommendsIdGet**
> CommonResponse recommendsIdGet(id, )



### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.RecommendsApi();

let id = 789; // Number | 

apiInstance.recommendsIdGet(id, ).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="recommendsIdPut"></a>
# **recommendsIdPut**
> CommonResponse recommendsIdPut(id, body)

put recommend

put recommend

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.RecommendsApi();

let id = 789; // Number | 

let body = new Tvapi.Recommend(); // Recommend | 

apiInstance.recommendsIdPut(id, body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **body** | [**Recommend**](Recommend.md)|  | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="recommendsPost"></a>
# **recommendsPost**
> CommonResponse recommendsPost(body)

create a recommend

create a recommend

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.RecommendsApi();

let body = new Tvapi.Recommend(); // Recommend | The recommend recommend to create

apiInstance.recommendsPost(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Recommend**](Recommend.md)| The recommend recommend to create | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

