import Vue from 'vue'

Vue.filter('PlayNum', function (value) {
    //播放量过滤
    let filerVal = ''
    if (value > 10000) {
        filerVal = parseFloat(value / 10000).toFixed(1);
    }
    return value > 10000 ? filerVal + '万' : value;
})


Vue.filter('secondsFormat', function (value) {
    //歌曲时长
    if (!value) return "00:00";
    let interval = Math.floor(value);
    let minute = Math.floor(interval / 60)
        .toString()
        .padStart(2, "0");
    let second = (interval % 60).toString().padStart(2, "0");
    return `${minute}:${second}`;
})

Vue.filter('imgURl', function (value) {
    //专辑封面
    return "https://y.gtimg.cn/music/photo_new/T002R300x300M000" + value + ".jpg";
})