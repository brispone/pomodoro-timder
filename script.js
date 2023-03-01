var sessionTime = 25;
var breakTime = 5;
var inProgress = false;

function startTimer(duration, display) {
  var timer = duration,
    minutes, seconds, barpercentage;
  window.tm = setInterval(function() {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);
    barpercentage = (timer / duration) * 100;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    $(display).html(minutes + ":" + seconds);
    $(display).css("width", barpercentage + "%")

    if (--timer < 0) {
      timer = duration;
      clearInterval(tm);
      if (display === "#work") {
        breakStart();
      } else {
        window.inProgress = false;
        sessionStart();
      }
    }
  }, 1000);
}

function sessionUp() {
  if (window.inProgress != true) {
    if (window.sessionTime < 50) {
      window.sessionTime++;
      $("#work").html(window.sessionTime + ":00");
    }
  }
}

function sessionDown() {
  if (window.inProgress != true) {
    if (window.sessionTime > 1) {
      window.sessionTime--;
      $("#work").html(window.sessionTime + ":00");
    }
  }
}

function breakUp() {
  if (window.inProgress != true) {
    if (window.breakTime < 50) {
      window.breakTime++;
      $("#break").html(window.breakTime + ":00");
    }
  }
}

function breakDown() {
  if (window.inProgress != true) {
    if (window.breakTime > 1) {
      window.breakTime--;
      $("#break").html(window.breakTime + ":00");
    }
  }
}

function sessionStart() {
  if (window.inProgress != true) {
    var duration = window.sessionTime * 60;
    startTimer(duration, "#work");
    $("#work").html(window.sessionTime + ":00");
    $("#work").css("width", "100%");
    $("#break").html(window.breakTime + ":00");
    $("#break").css("width", "100%");
    $("#command").html("Start working.");
    $("#startbutton").css("background-color", "#CCA49C");
    window.inProgress = true;
  }
}

function breakStart() {
  var duration = window.breakTime * 60;
  startTimer(duration, "#break");
  $("#command").html("Take a break.");
}

function resetTimers() {
  clearInterval(window.tm);
  $("#work").html(window.sessionTime + ":00");
  $("#work").css("width", "100%");
  $("#break").html(window.breakTime + ":00");
  $("#break").css("width", "100%");
  $("#command").html("");
  $("#startbutton").css("background-color", "white");
  window.inProgress = false;
}