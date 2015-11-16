module.exports = {
    isTokenOld: function (tokenTime) {
        Date.prototype.addHours = function (h) {
            this.setHours(this.getHours() + h);
            return this;
        }

        var t = tokenTime.split(/[- :]/);
        var tokenTimeDate = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        var date = new Date();
        if (tokenTimeDate.addHours(4) < date) return true;
        return false;
    },
    getTimeString: function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
            month = '0' + month;
        }
        if (day.toString().length == 1) {
            day = '0' + day;
        }
        if (hour.toString().length == 1) {
            hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            second = '0' + second;
        }
        var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return dateTime;
    }
};
