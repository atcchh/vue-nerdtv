function secondsFormat(duration) {
  var sec_num = parseInt(duration, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  hours = parseInt(hours).toString();
  if (minutes < 10) {minutes = "0" + minutes;}
  if (seconds < 10) {seconds = "0" + seconds;}

  var time = hours + ':' + minutes + ':' + seconds;

  if (hours === "0") {
    time = parseInt(minutes).toString() + ':' + seconds;
    if (minutes === "0") {
      time = seconds;
    }
  }

  return time;
}

export default secondsFormat;
