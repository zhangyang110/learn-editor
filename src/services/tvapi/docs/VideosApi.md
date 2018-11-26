# Tvapi.VideosApi

All URIs are relative to *https://localhost/api/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**videosGet**](VideosApi.md#videosGet) | **GET** /videos | Returns all video in the database.
[**videosIdGet**](VideosApi.md#videosIdGet) | **GET** /videos/{id} | 
[**videosIdPut**](VideosApi.md#videosIdPut) | **PUT** /videos/{id} | put video
[**videosPost**](VideosApi.md#videosPost) | **POST** /videos | create a video
[**videosUpdateShowNamesPost**](VideosApi.md#videosUpdateShowNamesPost) | **POST** /videos/update_showNames | update showname by name
[**videosVideoNamePost**](VideosApi.md#videosVideoNamePost) | **POST** /videos/video_name | get the latest name.


<a name="videosGet"></a>
# **videosGet**
> CommonResponse videosGet(opts)

Returns all video in the database.

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

let apiInstance = new Tvapi.VideosApi();

let opts = { 
  'query': "query_example", // String | Filter. e.g. col1:v1,col2:v2 ...
  'fields': "fields_example", // String | Fields returned. e.g. col1,col2 ...
  'sortby': "sortby_example", // String | Sorted-by fields. e.g. col1,col2 ...
  'order': "order_example", // String | Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ...
  'limit': 789, // Number | Limit the size of result set. Must be an integer
  'offset': 789, // Number | Start position of result set. Must be an integer
  'model': "model_example" // String | 获取数据匹配规则 1.默认：匹配字段中包含且不区分大小写  2.accurate：精确匹配，字段完全相等  e.g. accurate
};
apiInstance.videosGet(opts).then((data) => {
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

<a name="videosIdGet"></a>
# **videosIdGet**
> CommonResponse videosIdGet(id, )



### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.VideosApi();

let id = 789; // Number | 

apiInstance.videosIdGet(id, ).then((data) => {
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

<a name="videosIdPut"></a>
# **videosIdPut**
> CommonResponse videosIdPut(id, body)

put video

put video

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.VideosApi();

let id = 789; // Number | 

let body = new Tvapi.Video(); // Video | 

apiInstance.videosIdPut(id, body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **body** | [**Video**](Video.md)|  | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="videosPost"></a>
# **videosPost**
> CommonResponse videosPost(body)

create a video

create a video

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.VideosApi();

let body = new Tvapi.Video(); // Video | The video video to create

apiInstance.videosPost(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Video**](Video.md)| The video video to create | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="videosUpdateShowNamesPost"></a>
# **videosUpdateShowNamesPost**
> InlineResponse2006 videosUpdateShowNamesPost(body)

update showname by name

update showname by name

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.VideosApi();

let body = new Tvapi.VideoShowNames(); // VideoShowNames | The video update showname

apiInstance.videosUpdateShowNamesPost(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**VideoShowNames**](VideoShowNames.md)| The video update showname | 

### Return type

[**InlineResponse2006**](InlineResponse2006.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="videosVideoNamePost"></a>
# **videosVideoNamePost**
> InlineResponse2006 videosVideoNamePost(body)

get the latest name.

get the latest name.

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.VideosApi();

let body = new Tvapi.VideoNames(); // VideoNames | The video get video by name

apiInstance.videosVideoNamePost(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**VideoNames**](VideoNames.md)| The video get video by name | 

### Return type

[**InlineResponse2006**](InlineResponse2006.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

