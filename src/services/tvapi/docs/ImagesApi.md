# Tvapi.ImagesApi

All URIs are relative to *https://localhost/api/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**imagesGet**](ImagesApi.md#imagesGet) | **GET** /images | Returns all the images
[**imagesIdContentPut**](ImagesApi.md#imagesIdContentPut) | **PUT** /images/{id}/content | put image
[**imagesIdTagPut**](ImagesApi.md#imagesIdTagPut) | **PUT** /images/{id}/tag | put image
[**imagesPost**](ImagesApi.md#imagesPost) | **POST** /images | upload image


<a name="imagesGet"></a>
# **imagesGet**
> CommonResponse imagesGet(tag, opts)

Returns all the images

Get all the images   

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.ImagesApi();

let tag = "tag_example"; // String | tag1,tag2 ...

let opts = { 
  'limit': 789, // Number | Limit the size of result set. Must be an integer
  'offset': 789 // Number | Start position of result set. Must be an integer
};
apiInstance.imagesGet(tag, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tag** | **String**| tag1,tag2 ... | 
 **limit** | **Number**| Limit the size of result set. Must be an integer | [optional] 
 **offset** | **Number**| Start position of result set. Must be an integer | [optional] 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="imagesIdContentPut"></a>
# **imagesIdContentPut**
> CommonResponse imagesIdContentPut(id, file)

put image

put image

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.ImagesApi();

let id = 789; // Number | 

let file = "/path/to/file.txt"; // File | The uploaded file data

apiInstance.imagesIdContentPut(id, file).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **file** | **File**| The uploaded file data | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

<a name="imagesIdTagPut"></a>
# **imagesIdTagPut**
> CommonResponse imagesIdTagPut(id, tag)

put image

put image

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.ImagesApi();

let id = 789; // Number | 

let tag = "tag_example"; // String | tag

apiInstance.imagesIdTagPut(id, tag).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **tag** | **String**| tag | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="imagesPost"></a>
# **imagesPost**
> CommonResponse imagesPost(file, tag)

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

let apiInstance = new Tvapi.ImagesApi();

let file = "/path/to/file.txt"; // File | The uploaded file data

let tag = "tag_example"; // String | The tag

apiInstance.imagesPost(file, tag).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **file** | **File**| The uploaded file data | 
 **tag** | **String**| The tag | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

