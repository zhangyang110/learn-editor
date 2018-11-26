# Tvapi.SubjectSeriesApi

All URIs are relative to *https://localhost/api/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**subjectSeriesGet**](SubjectSeriesApi.md#subjectSeriesGet) | **GET** /subjectSeries | Returns all subjectSeries in the database.
[**subjectSeriesIdGet**](SubjectSeriesApi.md#subjectSeriesIdGet) | **GET** /subjectSeries/{id} | 
[**subjectSeriesIdPut**](SubjectSeriesApi.md#subjectSeriesIdPut) | **PUT** /subjectSeries/{id} | put subjectSeries
[**subjectSeriesPost**](SubjectSeriesApi.md#subjectSeriesPost) | **POST** /subjectSeries | create a subjectSeries


<a name="subjectSeriesGet"></a>
# **subjectSeriesGet**
> CommonResponse subjectSeriesGet(opts)

Returns all subjectSeries in the database.

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

let apiInstance = new Tvapi.SubjectSeriesApi();

let opts = { 
  'query': "query_example", // String | Filter. e.g. col1:v1,col2:v2 ...
  'fields': "fields_example", // String | Fields returned. e.g. col1,col2 ...
  'sortby': "sortby_example", // String | Sorted-by fields. e.g. col1,col2 ...
  'order': "order_example", // String | Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ...
  'limit': 789, // Number | Limit the size of result set. Must be an integer
  'offset': 789, // Number | Start position of result set. Must be an integer
  'model': "model_example" // String | 获取数据匹配规则 1.默认：匹配字段中包含且不区分大小写  2.accurate：精确匹配，字段完全相等  e.g. accurate
};
apiInstance.subjectSeriesGet(opts).then((data) => {
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

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="subjectSeriesIdGet"></a>
# **subjectSeriesIdGet**
> CommonResponse subjectSeriesIdGet(id, )



### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.SubjectSeriesApi();

let id = 789; // Number | 

apiInstance.subjectSeriesIdGet(id, ).then((data) => {
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

<a name="subjectSeriesIdPut"></a>
# **subjectSeriesIdPut**
> CommonResponse subjectSeriesIdPut(id, body)

put subjectSeries

put subjectSeries

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.SubjectSeriesApi();

let id = 789; // Number | 

let body = new Tvapi.SubjectSeries(); // SubjectSeries | 

apiInstance.subjectSeriesIdPut(id, body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **body** | [**SubjectSeries**](SubjectSeries.md)|  | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="subjectSeriesPost"></a>
# **subjectSeriesPost**
> CommonResponse subjectSeriesPost(body)

create a subjectSeries

create a subjectSeries

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.SubjectSeriesApi();

let body = new Tvapi.SubjectSeries(); // SubjectSeries | The subjectSeries subjectSeries to create

apiInstance.subjectSeriesPost(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SubjectSeries**](SubjectSeries.md)| The subjectSeries subjectSeries to create | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

