'use strict';

exports.token_enrich = function(req, res){
    console.log(req.body.data)

    var subject = JSON.parse(req.body.data).identity.sub;

    var structure = {}
    var commands = 'commands'
    structure[commands] = []

    if(subject != null){ 
        //decompose subject and call the appropriate spoke for user data
        
        /*var idCommand = {
            'type': 'com.okta.identity.patch',
            'value': [
                {
                    'op': 'add',
                    'path': '/claims/marketingIdentifier',
                    'value': "mkt"+new Date() + getMilliseconds()
                }
            ]
        }
        structure[commands].push(idCommand)
        var accessCommand = {
            'type': 'com.okta.access.patch',
            'value': [
                {
                    'op': 'add',
                    'path': '/claims/marketingPreferenceService',
                    'value': "enable"
                }
            ]
        }
        structure[commands].push(accessCommand)*/
    }
    res.json(structure);
};