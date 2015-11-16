function Item(id, created_at, title, price, image, user) {
    this._id = id
    this._created_at = created_at;
    this._title = title;
    this._price = price;
    this._image = image;
    this._user = user;

    this.validate = function () {
        var errors = [];
        if (!parseInt(this._price)) errors.push({
            field: "price",
            message: "Price should be higher than 0!"
        });
        if (!this._title) errors.push({
            field: "title",
            message: "Title is required!"
        });
        if (!!this._title && this._title.length < 3) errors.push({
            field: "title",
            message: "Title should contain at least 3 characters!"
        });

        return errors;
    }
}

Item.prototype = {
    get id() {
        return this._id;
    },
    set id(id) {
        this._id = id;
    },
    get created_at() {
        return this._created_at;
    },
    set created_at(created_at) {
        this._created_at = created_at;
    },
    get title() {
        return this._title;
    },
    set title(title) {
        this._title = title;
    },
    get price() {
        return this._price;
    },
    set price(price) {
        this._price = price;
    },
    get image() {
        return this._image;
    },
    set image(image) {
        this._image = image;
    },
    get user() {
        return this._user;
    },
    set user(user) {
        this._user = user;
    },
    get errors() {
        return this.validate();
    },
    get isValid() {
        return (this.validate() == false);
    }
}

module.exports = Item;
