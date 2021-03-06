/**
 * tvapi
 * The TV Backend api v3.0
 *
 * OpenAPI spec version: 3.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import CommonResponse from '../model/CommonResponse';
import Error from '../model/Error';
import InlineResponse200 from '../model/InlineResponse200';
import Template from '../model/Template';

/**
* Templates service.
* @module api/TemplatesApi
* @version 3.0
*/
export default class TemplatesApi {

    /**
    * Constructs a new TemplatesApi. 
    * @alias module:api/TemplatesApi
    * @class
    * @param {module:ApiClient} apiClient Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * Returns all template in the database.
     * Only the \&quot;admin\&quot; account can access this.
     * @param {Object} opts Optional parameters
     * @param {String} opts.query Filter. e.g. col1:v1,col2:v2 ...
     * @param {String} opts.fields Fields returned. e.g. col1,col2 ...
     * @param {String} opts.sortby Sorted-by fields. e.g. col1,col2 ...
     * @param {String} opts.order Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ...
     * @param {Number} opts.limit Limit the size of result set. Must be an integer
     * @param {Number} opts.offset Start position of result set. Must be an integer
     * @param {String} opts.model 获取数据匹配规则 1.默认：匹配字段中包含且不区分大小写  2.accurate：精确匹配，字段完全相等  e.g. accurate
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CommonResponse} and HTTP response
     */
    templatesGetWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;


      let pathParams = {
      };
      let queryParams = {
        'query': opts['query'],
        'fields': opts['fields'],
        'sortby': opts['sortby'],
        'order': opts['order'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'model': opts['model']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CommonResponse;

      return this.apiClient.callApi(
        '/templates', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Returns all template in the database.
     * Only the \&quot;admin\&quot; account can access this.
     * @param {Object} opts Optional parameters
     * @param {String} opts.query Filter. e.g. col1:v1,col2:v2 ...
     * @param {String} opts.fields Fields returned. e.g. col1,col2 ...
     * @param {String} opts.sortby Sorted-by fields. e.g. col1,col2 ...
     * @param {String} opts.order Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ...
     * @param {Number} opts.limit Limit the size of result set. Must be an integer
     * @param {Number} opts.offset Start position of result set. Must be an integer
     * @param {String} opts.model 获取数据匹配规则 1.默认：匹配字段中包含且不区分大小写  2.accurate：精确匹配，字段完全相等  e.g. accurate
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CommonResponse}
     */
    templatesGet(opts) {
      return this.templatesGetWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Retrieves a template
     * accounts can only retrieve their own template, not other accounts&#39;. Except for the \&quot;admin\&quot; account, who can retrieve anyone. 
     * @param {Number} id 
     * @param {module:model/Template} body The account template to create
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CommonResponse} and HTTP response
     */
    templatesIdContentPutWithHttpInfo(id, body) {
      let postBody = body;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling templatesIdContentPut");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling templatesIdContentPut");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CommonResponse;

      return this.apiClient.callApi(
        '/templates/{id}/content', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Retrieves a template
     * accounts can only retrieve their own template, not other accounts&#39;. Except for the \&quot;admin\&quot; account, who can retrieve anyone. 
     * @param {Number} id 
     * @param {module:model/Template} body The account template to create
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CommonResponse}
     */
    templatesIdContentPut(id, body) {
      return this.templatesIdContentPutWithHttpInfo(id, body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Retrieves a account
     * accounts can only retrieve their own template, not other accounts&#39;. Except for the \&quot;admin\&quot; account, who can retrieve anyone. 
     * @param {Number} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CommonResponse} and HTTP response
     */
    templatesIdGetWithHttpInfo(id) {
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling templatesIdGet");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CommonResponse;

      return this.apiClient.callApi(
        '/templates/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Retrieves a account
     * accounts can only retrieve their own template, not other accounts&#39;. Except for the \&quot;admin\&quot; account, who can retrieve anyone. 
     * @param {Number} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CommonResponse}
     */
    templatesIdGet(id) {
      return this.templatesIdGetWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Retrieves a account
     * accounts can only retrieve their own template, not other accounts&#39;. Except for the \&quot;admin\&quot; account, who can retrieve anyone. 
     * @param {Number} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CommonResponse} and HTTP response
     */
    templatesIdPublishPutWithHttpInfo(id) {
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling templatesIdPublishPut");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CommonResponse;

      return this.apiClient.callApi(
        '/templates/{id}/publish', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Retrieves a account
     * accounts can only retrieve their own template, not other accounts&#39;. Except for the \&quot;admin\&quot; account, who can retrieve anyone. 
     * @param {Number} id 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CommonResponse}
     */
    templatesIdPublishPut(id) {
      return this.templatesIdPublishPutWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get template by ids.
     * get template by ids.
     * @param {Object} opts Optional parameters
     * @param {String} opts.ids ids returned. e.g. id1,id2 ...
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/InlineResponse200} and HTTP response
     */
    templatesIdsGetWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;


      let pathParams = {
      };
      let queryParams = {
        'ids': opts['ids']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse200;

      return this.apiClient.callApi(
        '/templates/ids', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get template by ids.
     * get template by ids.
     * @param {Object} opts Optional parameters
     * @param {String} opts.ids ids returned. e.g. id1,id2 ...
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/InlineResponse200}
     */
    templatesIdsGet(opts) {
      return this.templatesIdsGetWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Creates a new template
     * Only the \&quot;admin\&quot; account can create accounts.
     * @param {module:model/Template} body The account template to create
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CommonResponse} and HTTP response
     */
    templatesPostWithHttpInfo(body) {
      let postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling templatesPost");
      }


      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CommonResponse;

      return this.apiClient.callApi(
        '/templates', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Creates a new template
     * Only the \&quot;admin\&quot; account can create accounts.
     * @param {module:model/Template} body The account template to create
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CommonResponse}
     */
    templatesPost(body) {
      return this.templatesPostWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
