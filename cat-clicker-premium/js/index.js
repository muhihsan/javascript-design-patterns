(function(){

  var Cat = function(catName) {
    var self = this;
    self.name = catName;
    self.numOfClick = 0;
  };

  var model = {
    catNames: ['Daenerys Targaryen', 'John Snow', 'Robert Baratheon',
              'Tyrion Lannister', 'Ned Stark'],
    cats: [],
    selectedCat: null,

    init: function() {
      this.catNames.forEach(function(catName) {
        this.cats.push(new Cat(catName));
      }, this);
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

      this.showNumOfClick(cat);
    },

    showNumOfClick: function(cat) {
      this.elemNumOfClick.innerHTML = cat.numOfClick + ' time' + (cat.numOfClick === 1? '' : 's') + ' clicked.';
    }
  };

  octopus.init();
})()