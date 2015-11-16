function User(id, email, name, tel, state) {
    this._state = (!!state) ? state : ("");
    this._id = id
    this._email = email;
    this._pass = "";
    this._repeatPass = "";
    this._newPass = "";
    this._name = name;
    this._tel = tel;
    this.REGEX_EMAIL = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    this.validate = function () {
        var errors = [];
        if (!this._email)
            errors.push({
                field: "email",
                message: "Email is required!"
            });
        if ((this._state != "login") && !this._name)
            errors.push({
                field: "name",
                message: "Name is required!"
            });
        else if (!this.REGEX_EMAIL.test(this._email))
            errors.push({
                field: "email",
                message: "Wrong email format!"
            });

        if (!!this._pass && (this._pass.length < 6 || this._pass.length > 20))
            errors.push({
                field: "pass",
                message: "Password length should be 6 to 20 symbols..."
            });

        if (((this._state == "login") || (this._state == "registration")) && !this._pass)
            errors.push({
                field: "pass",
                message: "Password is required"
            });

        if (!!this._newPass && (this._newPass.length < 6 || this._newPass.length > 20))
            errors.push({
                field: "newPass",
                message: "Password length should be 5 to 20 symbols..."
            });
        if ((this._state != "login") && (this._state != "registration") && !!this._pass && !this._newPass)
            errors.push({
                field: "newPass",
                message: "Please, enter new password..."
            });
        if (!!this._newPass && !this._pass)
            errors.push({
                field: "pass",
                message: "Please, enter current password..."
            });
        if ((this._state != "login") && !!this._pass && (this._pass == this._newPass))
            errors.push({
                field: "newPass",
                message: "New password equals to current password!"
            });
        if ((this._state != "login") && !!this._newPass && !this._repeatPass)
            errors.push({
                field: "repeatPass",
                message: "Please, enter password twice..."
            });
        if ((this._state == "registration") && !!this._pass && !this._repeatPass)
            errors.push({
                field: "repeatPass",
                message: "Please, enter password twice..."
            });
        if ((this._state == "registration") && !!this._repeatPass && !!this._pass && (this._pass != this._repeatPass))
            errors.push({
                field: "repeatPass",
                message: "Wrong password confirmation..."
            });

        if ((this._state != "login") && (this._state != "registration") && !!this._repeatPass && !!this._newPass && (this._newPass != this._repeatPass))
            errors.push({
                field: "repeatPass",
                message: "Wrong password confirmation..."
            });
        return errors;
    };
}
User.prototype = {
    get id() {
        return this._id;
    },
    set id(id) {
        this._id = id;
    },
    get email() {
        return this._email;
    },
    set email(email) {
        this._email = email;
    },
    get pass() {
        return this._pass;
    },
    set pass(pass) {
        this._pass = pass;
    },
    get repeatPass() {
        return this._repeatPass;
    },
    set repeatPass(repeatPass) {
        this._repeatPass = repeatPass;
    },
    get newPass() {
        return this._newPass;
    },
    set newPass(newPass) {
        this._newPass = newPass;
    },
    get name() {
        return this._name;
    },
    set name(name) {
        this._name = name;
    },
    get state() {
        return this._state;
    },
    set state(state) {
        this._state = state;
    },
    get tel() {
        return this._tel;
    },
    set tel(tel) {
        this._tel = tel;
    },
    get errors() {
        return this.validate();
    },
    get isValid() {
        return (this.validate().length == 0);
    }
};

module.exports = User;
