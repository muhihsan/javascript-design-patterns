(function(){

  function cat(id, catName) {
    var self = this;
    self.element = document.getElementById(id);
    self.catName = catName;
    self.numOfClicked = 0;

    self.incrementNumOfClick = function() {
      self.numOfClicked++;
    };

    self.showNumOfClick = function() {
      var eNumOfClick = self.element.getElementsByClassName('num-of-click')[0];
      if (eNumOfClick !== null) {
        eNumOfClick.innerHTML = self.numOfClicked + ' time' + (self.numOfClicked === 1? '' : 's') + ' clicked.';
      }
    };

    self.element.getElementsByClassName('cat-name')[0].innerHTML = self.catName;
    self.showNumOfClick();

    var eCatImage = self.element.getElementsByClassName('cat-image')[0];

    eCatImage.addEventListener('click', function(e) {
      self.incrementNumOfClick();
      self.showNumOfClick();
    }, false);
  }

  var firstCat = new cat('first-cat', 'Daenerys Targaryen');
  var secondCat = new cat('second-cat', 'John Snow');

})()