function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  // 这里秒钟也取整
  var second = parseInt(time)

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatDistance(num) {

  if (num < 1000) {

    return num.toFixed(0)+'m';

  } else if (num > 1000) {

    return (num / 1000).toFixed(1)+'km';

  }

}

function ohShitfadeOut(that){
  setTimeout(function(){
    that.setData({
      popErrorMsg: ''
    }); 
  },3000);
}

module.exports = {
  formatTime: formatTime,
  formatDistance: formatDistance,
  ohShitfadeOut: ohShitfadeOut
}