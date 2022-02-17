const timer = function() {
    // TIMER

    function setTimer(endtime, elem) {
        const timer = document.querySelector(elem),
          daysWrap = timer.querySelector('#days'),
          hoursWrap = timer.querySelector('#hours'),
          minutesWrap = timer.querySelector('#minutes'),
          secondsWrap = timer.querySelector('#seconds');
    
        updateClock();
    
        function calculateTime() {
          let timeHandler = setInterval(updateClock, 1000);
          let delta = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(delta / (24 * 60 * 60 * 1000)),
            hours = Math.floor((delta / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((delta / (1000 * 60)) % 60),
            seconds = Math.floor((delta / 1000) % 60);
    
          if (delta <= 0) {
            clearInterval(timeHandler);
          }
    
          return {
            days: days,
            hours: hours,
            miutes: minutes,
            seconds: seconds,
          };
        }
    
        function updateClock() {
          daysWrap.innerHTML = format(calculateTime().days);
          hoursWrap.innerHTML = format(calculateTime().hours);
          minutesWrap.innerHTML = format(calculateTime().miutes);
          secondsWrap.innerHTML = format(calculateTime().seconds);
        }
    
        function format(t) {
          if (t >= 0 && t < 10) {
            return `0${t}`;
          } else {
            return t;
          }
        }
      }
    
      setTimer('2022-02-30 20:19', '.timer');
};

export default timer;