(function(){

  var Cat = function(catName, url) {
    var self = this;
    self.name = catName;
    self.url = url;
    self.numOfClick = 0;
  };

  var model = {
    cats: [],
    selectedCat: null,

    init: function() {
      this.cats.push(new Cat('Daenerys Targryen', 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg'));
      this.cats.push(new Cat('John Snow', 'https://static.pexels.com/photos/33537/cat-animal-cat-portrait-mackerel.jpg'));
      this.cats.push(new Cat('Robert Baratheon', 'https://static.pexels.com/photos/511041/pexels-photo-511041.jpeg'));
      this.cats.push(new Cat('Tyrion Lannister', 'https://static.pexels.com/photos/156934/pexels-photo-156934.jpeg'));
      this.cats.push(new Cat('Ned Stark', 'https://static.pexels.com/photos/86243/pexels-photo-86243.jpeg'));
      this.selectedCat = this.cats[0];
    }
  };

  var octopus = {
    init: function() {
      model.init();
      catListView.init();
      catView.init();
    },

    getAllCats: function() {
      return model.cats;
    },

    getSelectedCat: function() {
      return model.selectedCat;
    },

    selectCat: function(cat) {
      model.selectedCat = cat;
    },

    addNumOfClick: function() {
      model.selectedCat.numOfClick++;
    }
  };

  var catListView = {
    init: function() {
      octopus.getAllCats().forEach(function(cat) {
        var elemCat = document.createElement('li');
        var elemCatLink = document.createElement('a');
        elemCatLink.className = 'cursor-pointer';
        elemCatLink.id = cat.name;
        elemCatLink.setAttribute('atr', '#');
        elemCatLink.innerText = cat.name;

        elemCatLink.addEventListener('click', (function catClicked(cat) {
          return function() {
            octopus.selectCat(cat);
            catView.render();
          };
        })(cat), false);

        elemCat.appendChild(elemCatLink);
        var elemCatList = document.getElementById('cat-list');
        elemCatList.appendChild(elemCat);
      });
    }
  };

  var catView = {
    init: function() {
      this.elemName = document.getElementById('cat-name');
      this.elemImage = document.getElementById('cat-image');
      this.elemNumOfClick = document.getElementById('num-of-click');

      this.elemImage.addEventListener('click', function(e) {
        octopus.addNumOfClick();
        catView.render();
      }, false);

      this.render();
    },

    render: function() {
      var cat = octopus.getSelectedCat();

      this.elemName.innerText = cat.name;
      this.elemImage.setAttribute('alt', "Cat " + cat.name);
      this.elemImage.setAttribute('src', cat.url);
      this.elemNumOfClick.innerHTML = cat.numOfClick + ' time' + (cat.numOfClick === 1? '' : 's') + ' clicked.';
    }
  };

  octopus.init();
})()