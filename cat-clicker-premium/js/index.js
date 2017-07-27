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
    selectedCat: '',

    init: function() {
      this.catNames.forEach(function(catName) {
        this.cats.push(new Cat(catName));
      }, this);
      this.selectedCat = this.catNames[0];
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

    getCat: function(catName) {
      return model.cats.find(function(cat) {
        return catName === cat.name;
      });
    },

    getSelectedCat: function() {
      return this.getCat(model.selectedCat);
    },

    selectCat: function(catName) {
      model.selectedCat = catName;
    },

    addNumOfClick: function() {
      var cat = this.getSelectedCat();
      cat.numOfClick++;
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

        function catClicked(catName) {
          octopus.selectCat(catName);
          catView.render();
        }

        elemCatLink.addEventListener('click', catClicked.bind(null, cat.name), false);

        elemCat.appendChild(elemCatLink);
        var elemCatList = document.getElementById('cat-list');
        elemCatList.appendChild(elemCat);
      });
    }
  };

  var catView = {
    init: function() {
      this.update();

      var elemImage = document.getElementById('cat-image');
      elemImage.addEventListener('click', function(e) {
        octopus.addNumOfClick();
        catView.render();
      }, false);
    },

    render: function() {
      this.update();
    },

    update: function() {
      var cat = octopus.getSelectedCat();

      var elemName = document.getElementById('cat-name');
      elemName.innerText = cat.name;

      var elemImage = document.getElementById('cat-image');
      elemImage.setAttribute('alt', "Cat " + cat.name);

      this.showNumOfClick(cat);
    },

    showNumOfClick: function(cat) {
      var eNumOfClick = document.getElementById('num-of-click');
      eNumOfClick.innerHTML = cat.numOfClick + ' time' + (cat.numOfClick === 1? '' : 's') + ' clicked.';
    }
  };

  octopus.init();
})()