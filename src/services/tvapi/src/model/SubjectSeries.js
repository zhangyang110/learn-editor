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
* The SubjectSeries model module.
* @module model/SubjectSeries
* @version 3.0
*/
export default class SubjectSeries {
    /**
    * Constructs a new <code>SubjectSeries</code>.
    * a subjectSeries
    * @alias module:model/SubjectSeries
    * @class
    * @param subjectId {Number} 专题id
    * @param seriesId {Number} 剧集id
    * @param coverUrl {String} 图片
    */

    constructor(subjectId, seriesId, coverUrl) {
        

        
        

        this['subject_id'] = subjectId;this['series_id'] = seriesId;this['cover_url'] = coverUrl;

        
    }

    /**
    * Constructs a <code>SubjectSeries</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/SubjectSeries} obj Optional instance to populate.
    * @return {module:model/SubjectSeries} The populated <code>SubjectSeries</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SubjectSeries();

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('subject_id')) {
                obj['subject_id'] = ApiClient.convertToType(data['subject_id'], 'Number');
            }
            if (data.hasOwnProperty('series_id')) {
                obj['series_id'] = ApiClient.convertToType(data['series_id'], 'Number');
            }
            if (data.hasOwnProperty('cover_url')) {
                obj['cover_url'] = ApiClient.convertToType(data['cover_url'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
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
    * 专题id
    * @member {Number} subject_id
    */
    subject_id = undefined;
    /**
    * 剧集id
    * @member {Number} series_id
    */
    series_id = undefined;
    /**
    * 图片
    * @member {String} cover_url
    */
    cover_url = undefined;
    /**
    * 剧集名称
    * @member {String} name
    */
    name = undefined;








}


