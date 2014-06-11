var klass = require('klass')
    , _ = require('lodash')
    , obligator = klass({
        initialize: function() {
            this._params = {};
            this._collection = {};
        }
    })
    .methods({
        setCollection: function(collection) {
            
            if ( !collection )
                throw Error("collection is empty or missing!");
            
            var parameters = Object.getOwnPropertyNames(this)
                , i;

            for(i in parameters){
                if(typeof(this[parameters[i]]) != "object"){
                    this._params[parameters[i]] = this[parameters[i]];
                    delete this[parameters[i]];
                }
            }
            
            this._collection = _.isString(collection) ? JSON.parse(collection) : collection;
        },

        validate: function(){
            var params  = this._params
               , missingParams = []
                , property = "";

            for(property in params) {
                if( params[property] != false && (_.isUndefined(this._collection[property]))) {
                    missingParams.push(property);
                }
            }


            if( missingParams.length > 0) 
                throw Error("Missing Parameter(s): " + missingParams);
                
            return true;
        },

        reset: function() {
            this._collection = {};
            this._params = {};
        },

        count: function() {
            var count = 0;
            for (var p in this._params)
                ++count;

            return count;
        },
    });

exports.newFactoryInstance = function() {
    return new obligator;
}
