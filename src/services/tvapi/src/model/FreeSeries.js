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


import ApiClient from '../ApiClient';





/**
* The FreeSeries model module.
* @module model/FreeSeries
* @version 3.0
*/
export default class FreeSeries {
    /**
    * Constructs a new <code>FreeSeries</code>.
    * a freeSeries
    * @alias module:model/FreeSeries
    * @class
    * @param seriesId {Number} 剧集id
    * @param _date {String} 日期
    * @param type {String} 类型
    * @param app {String} 所属应用
    */

    constructor(seriesId, _date, type, app) {
        

        
        

        this['series_id'] = seriesId;this['date'] = _date;this['type'] = type;this['app'] = app;

        
    }

    /**
    * Constructs a <code>FreeSeries</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/FreeSeries} obj Optional instance to populate.
    * @return {module:model/FreeSeries} The populated <code>FreeSeries</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new FreeSeries();

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('series_id')) {
                obj['series_id'] = ApiClient.convertToType(data['series_id'], 'Number');
            }
            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('app')) {
                obj['app'] = ApiClient.convertToType(data['app'], 'String');
            }
        }
        return obj;
    }

    /**
    * id
    * @member {Number} id
    */
    id = undefined;
    /**
    * 剧集id
    * @member {Number} series_id
    */
    series_id = undefined;
    /**
    * 日期
    * @member {String} date
    */
    date = undefined;
    /**
    * 剧集名称
    * @member {String} name
    */
    name = undefined;
    /**
    * 类型
    * @member {String} type
    */
    type = undefined;
    /**
    * 所属应用
    * @member {String} app
    */
    app = undefined;








}


