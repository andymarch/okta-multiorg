
class UserModel {
    constructor(profileJson) {
        if(profileJson){
            try {
                this.id = profileJson.id
                this.prefix = profileJson.profile.honorificPrefix
                this.suffix = profileJson.profile.honorificSuffix
                this.title = profileJson.profile.title
                this.firstName = profileJson.profile.firstName
                this.secondName = profileJson.profile.lastName
                this.email = profileJson.profile.email
                this.nickName = profileJson.profile.nickName
                this.organization = profileJson.profile.organization
                this.profileUrl = profileJson.profile.profileUrl
                this.local = profileJson.profile.locale

                this.status = profileJson.status
                this.lastLogin = profileJson.lastLogin
                this.lastUpdate = profileJson.lastUpdated
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    getName(){
        var namestring = ""
        if(this.title != null){
            namestring = namestring + this.title + " "
        }
        if(this.prefix != null){
            namesstring = namestring + this.prefix + " "
        }
        namestring = namestring + this.firstName + " " + this.secondName
        if(this.suffix != null){
            namestring = namestring + " " + this.suffix
        }
        return namestring
    }
}

module.exports = UserModel