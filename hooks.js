'use strict';

exports.token_enrich = function(req, res){
    console.log(req.body.data)

    var login = JSON.parse(req.body.data).context.session.login.split("@");
    //00unvpfiu10vrolDp0h7@multiorg-gs.oktapreview.com#

    var uuid = login[0]
    var userDomain = login[1]

    var structure = {}
    var commands = 'commands'
    structure[commands] = []

    if(login != null){ 
        //decompose subject and call the appropriate spoke for user data

        console.log("Need to lookup user " + uuid + " of tenant " + userDomain)

        var scps = JSON.parse(req.body.data).access.claims.scopes;
        if(scps.includes("profile")){
            var idCommand = {
                'type': 'com.okta.identity.patch',
                'value': [
                    {
                        'op': 'replace',
                        'path': '/claims/name',
                        'value': "Sensitive value"
                    }
                ]
            }
        }
        structure[commands].push(idCommand)
        var accessCommand = {
            'type': 'com.okta.access.patch',
            'value': [
                {
                    'op': 'add',
                    'path': '/claims/national_id_number',
                    'value': "12345"
                }
            ]
        }
        structure[commands].push(accessCommand)
    }
    res.json(structure);
};