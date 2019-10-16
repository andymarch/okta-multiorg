'use strict';

const UserModel = require ('./usermodel')

exports.token_enrich = async function(req, res){
    console.log(req.body.data)

    var login = req.body.data.context.session.login.split("@");
    //00unvpfiu10vrolDp0h7@multiorg-gs.oktapreview.com#

    var uuid = login[0]
    var userDomain = login[1]

    var structure = {}
    var commands = 'commands'
    structure[commands] = []

    if(login != null){ 
        //decompose subject and call the appropriate spoke for user data

        console.log("Need to lookup user " + uuid + " of tenant " + userDomain)
        var apikey = process.env.userDomain

        var response = await axios.get(userDomain+'/api/v1/users/'+uuid,{
            headers:{
                Authorization: 'Bearer '+ apikey
            }
        })
        var user = new UserModel(response.data)
        

        var scps = req.body.data.access.scopes;
        if(scps.hasOwnProperty('profile')){
            structure[commands].push({
                'type': 'com.okta.identity.patch',
                'value': [
                    {
                        'op': 'replace',
                        'path': '/claims/name',
                        'value': user.getName()
                    }
                ]
            })

            structure[commands].push({
                'type': 'com.okta.identity.patch',
                'value': [
                    {
                        'op': 'add',
                        'path': '/claims/given_name',
                        'value': user.firstName
                    }
                ]
            })

            structure[commands].push({
                'type': 'com.okta.identity.patch',
                'value': [
                    {
                        'op': 'add',
                        'path': '/claims/family_name',
                        'value': user.secondName
                    }
                ]
            })

            if(user.email != null && user.email != ""){
                structure[commands].push({
                    'type': 'com.okta.identity.patch',
                    'value': [
                        {
                            'op': 'add',
                            'path': '/claims/email',
                            'value': user.email
                        }
                    ]
                })
            }

            if(user.nickName != null && user.nickName != ""){
                structure[commands].push({
                    'type': 'com.okta.identity.patch',
                    'value': [
                        {
                            'op': 'add',
                            'path': '/claims/nickName',
                            'value': user.nickName
                        }
                    ]
                })
            }

            if(user.profileUrl != null && user.profileUrl != ""){
                structure[commands].push({
                    'type': 'com.okta.identity.patch',
                    'value': [
                        {
                            'op': 'add',
                            'path': '/claims/profileUrl',
                            'value': user.profileUrl
                        }
                    ]
                })
            }

            if(user.locale != null && user.locale != ""){
                structure[commands].push({
                    'type': 'com.okta.identity.patch',
                    'value': [
                        {
                            'op': 'add',
                            'path': '/claims/locale',
                            'value': user.locale
                        }
                    ]
                })
            }
        }
    }
    res.json(structure);
};