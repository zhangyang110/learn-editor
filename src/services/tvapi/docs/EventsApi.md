# Tvapi.EventsApi

All URIs are relative to *https://localhost/api/v3*

Method | HTTP request | Description
------------- | ------------- | -------------
[**eventsEventIdGet**](EventsApi.md#eventsEventIdGet) | **GET** /events/{eventId} | 
[**eventsExtraParameterDetailGet**](EventsApi.md#eventsExtraParameterDetailGet) | **GET** /events/extra_parameter_detail | get event extra_parameter_detail.
[**eventsExtraParameterKeyGet**](EventsApi.md#eventsExtraParameterKeyGet) | **GET** /events/extra_parameter_key | get event extra_parameter_key.
[**eventsGet**](EventsApi.md#eventsGet) | **GET** /events | get event statistics detail.
[**eventsPost**](EventsApi.md#eventsPost) | **POST** /events | create a events


<a name="eventsEventIdGet"></a>
# **eventsEventIdGet**
> InlineResponse2003 eventsEventIdGet(eventId, startTime, endTime, )



### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.EventsApi();

let eventId = "eventId_example"; // String | 

let startTime = "startTime_example"; // String | 

let endTime = "endTime_example"; // String | 

apiInstance.eventsEventIdGet(eventId, startTime, endTime, ).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **eventId** | **String**|  | 
 **startTime** | **String**|  | 
 **endTime** | **String**|  | 

### Return type

[**InlineResponse2003**](InlineResponse2003.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="eventsExtraParameterDetailGet"></a>
# **eventsExtraParameterDetailGet**
> InlineResponse2005 eventsExtraParameterDetailGet(startTime, endTime, eventId, parameter)

get event extra_parameter_detail.

get event extra_parameter_detail.

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.EventsApi();

let startTime = "startTime_example"; // String | 

let endTime = "endTime_example"; // String | 

let eventId = "eventId_example"; // String | 

let parameter = "parameter_example"; // String | 

apiInstance.eventsExtraParameterDetailGet(startTime, endTime, eventId, parameter).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **startTime** | **String**|  | 
 **endTime** | **String**|  | 
 **eventId** | **String**|  | 
 **parameter** | **String**|  | 

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="eventsExtraParameterKeyGet"></a>
# **eventsExtraParameterKeyGet**
> InlineResponse2004 eventsExtraParameterKeyGet(eventId)

get event extra_parameter_key.

get event extra_parameter_key.

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.EventsApi();

let eventId = "eventId_example"; // String | 

apiInstance.eventsExtraParameterKeyGet(eventId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **eventId** | **String**|  | 

### Return type

[**InlineResponse2004**](InlineResponse2004.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="eventsGet"></a>
# **eventsGet**
> InlineResponse2002 eventsGet()

get event statistics detail.

get event statistics detail.

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.EventsApi();
apiInstance.eventsGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="eventsPost"></a>
# **eventsPost**
> CommonResponse eventsPost(body)

create a events

create a events

### Example
```javascript
import Tvapi from 'tvapi';
let defaultClient = Tvapi.ApiClient.instance;

// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new Tvapi.EventsApi();

let body = new Tvapi.Event(); // Event | create a events

apiInstance.eventsPost(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Event**](Event.md)| create a events | 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

