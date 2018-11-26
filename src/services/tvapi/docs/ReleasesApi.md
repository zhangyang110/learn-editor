# Tvapi.ReleasesApi

All URIs are relative to *https://localhost/api/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**releasesGet**](ReleasesApi.md#releasesGet) | **GET** /releases | Returns all app in the database.
[**releasesPost**](ReleasesApi.md#releasesPost) | **POST** /releases | upload image
[**releasesUpgradeGet**](ReleasesApi.md#releasesUpgradeGet) | **GET** /releases/upgrade | get the latest version.


<a name="releasesGet"></a>
# **releasesGet**
> CommonResponse releasesGet(opts)

Returns all app in the database.

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

let apiInstance = new Tvapi.ReleasesApi();

let opts = { 
  'query': "query_example", // String | Filter. e.g. col1:v1,col2:v2 ...
  'fields': "fields_example", // String | Fields returned. e.g. col1,col2 ...
  'sortby': "sortby_example", // String | Sorted-by fields. e.g. col1,col2 ...
  'order': "order_example", // String | Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ...
  'limit': 789, // Number | Limit the size of result set. Must be an integer
  'offset': 789, // Number | Start position of result set. Must be an integer
  'model': "model_example" // String | 获取数据匹配规则 1.默认：匹配字段中包含且不区分大小写  2.accurate：精确匹配，字段完全相等  e.g. accurate
};
apiInstance.releasesGet(opts).then((data) => {
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

<a name="releasesPost"></a>
# **releasesPost**
> CommonResponse releasesPost(name, file, versionCode, versionName, channel, changeLog, force, md5)

upload image

upload image

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.ReleasesApi();

let name = "name_example"; // String | the name of app

let file = "/path/to/file.txt"; // File | The uploaded file data

let versionCode = 789; // Number | version code

let versionName = "versionName_example"; // String | version name

let channel = "channel_example"; // String | app channel

let changeLog = "changeLog_example"; // String | change log

let force = true; // Boolean | is force

let md5 = "md5_example"; // String | md5

apiInstance.releasesPost(name, file, versionCode, versionName, channel, changeLog, force, md5).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| the name of app | 
 **file** | **File**| The uploaded file data | 
 **versionCode** | **Number**| version code | 
 **versionName** | **String**| version name | 
 **channel** | **String**| app channel | 
 **changeLog** | **String**| change log | 
 **force** | **Boolean**| is force | 
 **md5** | **String**| md5 | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

<a name="releasesUpgradeGet"></a>
# **releasesUpgradeGet**
> InlineResponse2001 releasesUpgradeGet(name, version, channel)

get the latest version.

get the latest version.

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.ReleasesApi();

let name = "name_example"; // String | 

let version = 789; // Number | The name of the version

let channel = "channel_example"; // String | The channel of   app

apiInstance.releasesUpgradeGet(name, version, channel).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**|  | 
 **version** | **Number**| The name of the version | 
 **channel** | **String**| The channel of   app | 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

