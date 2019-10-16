
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
        return this.title + " " + this.prefix + " " + this.firstName + " " + this.lastName+ " " + this.suffix
    }
}

module.exports = UserModel