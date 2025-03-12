module.exports = class UserDto {
    email;
    id;
    isActivate;

    constructor (data) {
        this.email = data.email;
        this.id = data.id;
        this.isActivate = data.isactivate;
    }
}