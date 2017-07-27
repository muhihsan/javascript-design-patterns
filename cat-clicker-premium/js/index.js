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
    },

    render: function() {
    }
  };

  var catView = {
    init: function() {
      var cat = octopus.getSelectedCat();

      var elemName = document.createElement('h2');
      elemName.className = 'text-center';
      elemName.id = 'cat-name';
      elemName.innerText = cat.name;

      var elemImage = document.createElement('img');
      elemImage.className = 'img-responsive cursor-pointer';
      elemImage.id = 'cat-image';
      elemImage.setAttribute('src', 'http://placekitten.com/1500/400');
      elemImage.setAttribute('alt', "Cat " + cat.name);
      elemImage.setAttribute('title', 'Click me to add the click count');
      elemImage.addEventListener('click', function(e) {
        octopus.addNumOfClick();
        catView.render();
      }, false);

      var elemNumOfClick = document.createElement('h3');
      elemNumOfClick.className = 'text-center';
      elemNumOfClick.id = 'num-of-click';

      var container = document.getElementById('cat-show');
      container.innerHTML = '';
      container.appendChild(elemName);
      container.appendChild(elemImage);
      container.appendChild(elemNumOfClick);

      this.showNumOfClick(cat);
    },

    render: function() {
      var cat = octopus.getSelectedCat();

      var elemName = document.getElementById('cat-name');
      elemName.innerText = cat.name;

      this.showNumOfClick(cat);
    },

    showNumOfClick: function(cat) {
      var eNumOfClick = document.getElementById('num-of-click');
      eNumOfClick.innerHTML = cat.numOfClick + ' time' + (cat.numOfClick === 1? '' : 's') + ' clicked.';
    }
  };

  octopus.init();
})()