var scope = {
    token: function () {
        return (Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)).substring(0, 20);
    }
};

module.exports = scope;
