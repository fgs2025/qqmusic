import Vue from 'vue'

Vue.filter('PlayNum', function (value) {
    //播放量过滤
    if (value > 10000) {
        value = parseFloat(value / 10000).toFixed(1);
    }
    return value;
})