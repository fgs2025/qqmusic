import Vue from 'vue'

Vue.filter('PlayNum', function (value) {
    //播放量过滤
    if (value > 10000) {
        value = parseFloat(value / 10000).toFixed(1);
    }
    return value;
})


Vue.filter('secondsFormat', function (value) {
    //播放量过滤
    if (!value) return "00:00";
    let interval = Math.floor(value);
    let minute = Math.floor(interval / 60)
      .toString()
      .padStart(2, "0");
    let second = (interval % 60).toString().padStart(2, "0");
    return `${minute}:${second}`;
})