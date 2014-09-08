(function(){
  var activePlayer = null,
      STROKE_WIDTH = 9,
      STROKE_CONTAINER_COLOR = '#ffffff',
      STROKE_PROGRESS_COLOR = '#f92835',
      CONTAINER_COLOR = '#ececec';

  function _audio_onClick(evt) {
    // If an instance is current playing, turn it off.
    // It does not matter which one it was and where it came from.
    if(activePlayer) {
      activePlayer.find(".progress-pct").hide().html("");
      activePlayer.find(".play-btn").show();
      activePlayer.find("canvas").hide();

      try {
        var audioRef = activePlayer.find("audio").get(0);
        audioRef.pause();
        audioRef.currentTime = 0;
      }
      catch(e) {
        console.log("The audio file was never loaded.");
      }

      if(activePlayer.is(this)) {
        activePlayer = null;
        return;
      }
    }

    var ref = $(this);

    activePlayer = ref;
    ref.find(".progress-pct").show().html("0");
    ref.find(".play-btn").hide();
    ref.find("audio").get(0).play();
    ref.find("canvas").show();
  }

  function _audio_onProgress(evt) {
    var ref = $(this),
      audioRef = ref.find("audio").get(0),
      pct = audioRef.currentTime / audioRef.duration * 100;

    if(audioRef.currentTime > 0) {
      ref.find(".progress-pct").html(parseInt(pct, 10));
      _canvas_onProgress(pct, ref.find("canvas").get(0));
    }

    // the following should be streamlined elsewhere, but when the end
    // is reached, reset the player
    if(pct === 100) {
      audioRef.pause();
      audioRef.currentTime = 0;
      activePlayer.find(".progress-pct").hide().html("");
      activePlayer.find("canvas").hide();
      activePlayer.find(".play-btn").show();
      activePlayer = null;
    }
  }

  function _canvas_onProgress(pct, canvas) {
      // Draw the canvas rings
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = centerX - (STROKE_WIDTH / 2);

      // Fill container, including hollow bit
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = CONTAINER_COLOR;
      context.fill();
      context.lineWidth = STROKE_WIDTH;
      context.strokeStyle = STROKE_CONTAINER_COLOR;
      context.stroke();

      // Progress container, empty fill with a stroke
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, (pct * 0.02) * Math.PI, false);
      context.lineWidth = 9;
      context.strokeStyle = STROKE_PROGRESS_COLOR;
      context.stroke();
  }


  window.SimpleRoundPlayer = {
    init : function(config) {
      if(config) {
        if(config.containerColor) {
          CONTAINER_COLOR = config.containerColor;
        }

        if(config.ringColor) {
          STROKE_CONTAINER_COLOR = config.ringColor;
        }

        if(config.ringProgressColor) {
          STROKE_PROGRESS_COLOR = config.ringProgressColor;
        }
      }

      $("audio[data-srp]").each(function(){
        // Ensure this only runs once.
        if($(this).data("simple-round-player") !== true) {
          $(this).wrap(
           '<div class="simple-round-player">'
          +'       <canvas></canvas>'
          +'       <div class="play-btn"><i class="fa fa-play"></i></div>'
          +'       <div class="progress-pct"></div>'
          +'    </div>');
        }
      });

      $(".simple-round-player").each(function(){

        $(this).find("audio").bind('timeupdate', _audio_onProgress.bind(this));
        $(this).find("audio").data("simple-round-player", true);

        $(this).find(".play-btn, .progress-pct").bind('click', _audio_onClick.bind(this));

        var $canvas = $(this).find('canvas'),
            canvas = $canvas.get(0);

        canvas.height = $canvas.height();
        canvas.width = $canvas.width();
      });
    }
  };

})();
