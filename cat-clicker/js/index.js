(function(){

  function cat(catName) {
    var self = this;
    self.name = catName;
    self.numOfClicked = 0;

    self.incrementNumOfClick = function() {
      self.numOfClicked++;
    };

    self.showNumOfClick = function() {
      var eNumOfClick = document.getElementsByClassName('num-of-click')[0];
      if (eNumOfClick !== null) {
        eNumOfClick.innerHTML = self.numOfClicked + ' time' + (self.numOfClicked === 1? '' : 's') + ' clicked.';
      }
    };

    self.show = function() {
      var elemName = document.createElement('h2');
      elemName.className = 'text-center cat-name';
      elemName.innerText = self.name;
      var elemImage = document.createElement('img');
      elemImage.className = 'img-responsive cursor-pointer cat-image';
      elemImage.setAttribute('src', 'http://placekitten.com/1500/400');
      elemImage.setAttribute('alt', "Cat " + self.name);
      elemImage.setAttribute('title', 'Click me to add the click count');
      var elemNumOfClick = document.createElement('h3');
      elemNumOfClick.className = 'text-center num-of-click';

      var container = document.getElementById('cat-show');
      container.innerHTML = '';
      container.appendChild(elemName);
      container.appendChild(elemImage);
      container.appendChild(elemNumOfClick);

      self.showNumOfClick();

      var eCatImage = container.getElementsByClassName('cat-image')[0];
      eCatImage.addEventListener('click', function(e) {
        self.incrementNumOfClick();
        self.showNumOfClick();
      }, false);
    }

    var elemCat = document.createElement('li');
    var elemCatLink = document.createElement('a');
    elemCatLink.className = 'cursor-pointer';
    elemCatLink.id = self.name;
    elemCatLink.setAttribute('atr', '#');
    elemCatLink.innerText = self.name;
    elemCatLink.addEventListener('click', function(e) {
      self.show();
    }, false);
    elemCat.appendChild(elemCatLink);
    var elemCatList = document.getElementById('cat-list');
    elemCatList.appendChild(elemCat);
  }

  var firstCat = new cat('Daenerys Targaryen');
  var secondCat = new cat('John Snow');
  var secondCat = new cat('Roberth Baratheon');
  var secondCat = new cat('Tyrion Lannister');
  var secondCat = new cat('Ned Stark');
})()