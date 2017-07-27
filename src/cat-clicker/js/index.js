(function(){

  var count = {
    numOfClicked: 0,
    incrementNumOfClick: function() {
      this.numOfClicked++;
    },
    showNumOfClick: function(elem) {
      if (elem !== null) {
        elem.innerHTML = this.numOfClicked + " time" + (this.numOfClicked === 1? "" : "s");
      }
    }
  }

  var elem = document.getElementById('num-of-click');
  count.showNumOfClick(elem);

  document.getElementById('cat-image').addEventListener('click', function(e) {
    count.incrementNumOfClick();
    count.showNumOfClick(elem);
  }, false);

})()