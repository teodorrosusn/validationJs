const Validation = (function() {     
    
    class Validation 
    {
        isEqual(values) {
            return this.repository('isEqual', values);
        }
        
        isNotEqual(values) {
            return this.repository('isNotEqual', values);
        }
        
        isUndefined(value) {
            return this.repository('isDataType', {
                data: value,
                type: 'undefined'
            });
        }
        
        isNumber(value) {
            return this.repository('isDataType', {
                data: value,
                type: 'number'
            });
        }
        
        isString(value) {
            return this.repository('isDataType', {
                data: value,
                type: 'string'
            });
        }
        
        isBoolean(value) {
            return this.repository('isDataType', {
                data: value,
                type: 'boolean'
            });
        }
        
        isObject(value) {
            return this.repository('isDataType', {
                data: value,
                type: 'object'
            });
        }
        
        isSymbol(value) {
            return this.repository('isDataType', {
                data: value,
                type: 'symbol'
            });
        }
        
        isFunction(value) {
            return this.repository('isDataType', {
                data: value,
                type: 'function'
            });
        }
        
        objectContainsKey(object, attribute) {
            return this.repository('objectContainsKey', {
                object:    object,
                attribute: attribute 
            });
        }
        
        objectContainsValue(object, attribute) {
            return this.repository('objectContainsValue', {
                object:    object,
                attribute: attribute 
            });
        }
        
        isEmail(email) {
            return this.repository('isEmail', email);
        }
        
        numberOfCharacters(data, type = 'any') {
            return this.repository('numberOfCharacters', {
                data: data,
                type: type
            })
        }
        
        objectMatch(expected, actual) {
            return this.repository('objectMatch', {
                expected: expected,
                actual: actual
            })
        }
        
        repository(repository, params) {
            var globalThis   = this;
            
            var repositories = {
                isEqual: function(data) {                    
                    if (globalThis.isObject(data) === true) {
                        var firstObjectValue = Object.values(data)[0];
                    
                        return Object.keys(data).every(function(objectKey) {
                            return data[objectKey] == firstObjectValue;
                        });   
                    }
                    
                    //Notify that the passed argument must be an object
                },
                
                isNotEqual: function(data) {
                    return !this.isEqual(data);
                },
                
                isDataType: function(params) {
                    if (typeof params.data === params.type) {
                        return true;
                    }

                    return false;
                },
                
                objectContainsKey: function(params) {
                    if (globalThis.isObject(params.object) === true) {
                        if (typeof(params.object[params.attribute]) !== 'undefined') {
                            return true;
                        }
                        
                        return false;
                    }
                    
                    //Notify that the passed argument must be an object
                },
                
                objectContainsValue: function(params) {
                    if (globalThis.isObject(params.object) === true) {
                        return Object.keys(params.object).some(function(key) {
                            return params.object[key] == params.attribute;
                        });
                    }
                    
                    //Notify that the passed argument must be an object
                },
                
                isEmail: function(email) {
                    let re = /^\S+@\S+[\.][0-9a-z]+$/;
                    
                    return re.test(String(email).toLowerCase());
                },
                
                numberOfCharacters: function(params) {
                    if (globalThis.isString(params.data) === true) {
                        let regularExpression;
                        
                        switch (params.type) {
                            case 'any':
                                return params.data.length;
                                break;
                            case 'numeric':
                                regularExpression = /\d+/g;        
                                break;
                            case 'alphabetic':
                                regularExpression = /[A-Za-z]+/g;
                                break;
                            case 'alphanumeric':
                                regularExpression = /[A-Za-z0-9]+/g;                                
                                break;
                            case 'special':
                                regularExpression = /[^A-Za-z0-9\s]+/g;
                                break;
                            case 'uppercase':
                                regularExpression = /[A-Z]+/g;
                                break;
                            case 'lowercase':
                                regularExpression = /[a-z]+/g;
                                break;
                        }
                        
                        let matchResult = params.data.match(regularExpression);
                          
                        if (matchResult != null) {
                            return matchResult.join('').length;   
                        }
                        
                        //Notify that the matchResult is null - no results found for the selected type
                    }
                    
                    //Notify that the passed argument must be a string
                },
                
                objectMatch: function(params) {
                    let result = true;
                    
                    let loopThroughObject = function(expected, actual) {
                        if (result === true) {
                            for (const key of Object.keys(expected)) {                        
                                if (globalThis.isObject(expected[key]) === true) {
                                    let expectedNew = expected[key];
                                    let actualNew   = actual[key];

                                    loopThroughObject(expectedNew, actualNew);
                                } else {
                                    if (key !== key || expected[key] !== actual[key]) {
                                        result = false;
                                        break;
                                    }
                                }
                            }      
                        }
                        
                        return result;
                    }
                    
                    if (globalThis.isObject(params.expected) === true && globalThis.isObject(params.actual) === true) {
                        return loopThroughObject(params.expected, params.actual);
                    } else {
                        //Notify that the passed argument must be an object
                    }
                }
            }

            return repositories[repository](params);
        }
    }
    
    return Validation; 
}());

var validation = new Validation();

let values = {
    wasd: 2,
    asdf: 2,
    xyz: 2
}

//console.log(validation.isEqual(values))
//console.log(validation.isNotEqual(values))
//console.log(validation.isObject(values))
//console.log(validation.isNumber(123))
//console.log(validation.isBoolean(true))
//var asd; console.log(validation.isUndefined(asd))
//console.log(validation.isString('wasd'))
//console.log(validation.objectContainsKey(values, 'wasd'))
//console.log(validation.objectContainsValue(values, 2))
//console.log(validation.isEmail('sKeletoN_SN@yahoo.com'))
//console.log(validation.numberOfCharacters('w/a53*sAd123as2d', 'any'));
//console.log(validation.numberOfCharacters('w/a53*sAd123as2d', 'numeric'));
//console.log(validation.numberOfCharacters('w/a53*sAd123as2d', 'alphabetic'));
//console.log(validation.numberOfCharacters('w/a53*sAd123as2d', 'alphanumeric'));
//console.log(validation.numberOfCharacters('w/a53*sAd123as2d', 'special'));
//console.log(validation.numberOfCharacters('w/a53*sAd123as2d', 'uppercase'));
//let expected = {
//    wasd: 2,
//    asdf: {
//        a: {
//            x: 1,
//            y: {
//                suka: 123
//            },
//            z: 3
//        },
//        b: 444
//    },
//    xyz: 5
//}
//
//let actual = {
//    wasd: 2,
//    asdf: {
//        a: {
//            x: 1,
//            y: {
//                suka: 123
//            },
//            z: 3
//        },
//        b: 444
//    },
//    xyz: 5
//}
//console.log(validation.objectMatch(expected, actual))
