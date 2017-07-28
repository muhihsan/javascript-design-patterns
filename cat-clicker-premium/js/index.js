(function(){

  var Cat = function(catName, url, numOfClick) {
    var self = this;
    self.name = catName;
    self.url = url;
    self.numOfClick = numOfClick;
  };

  var catModel = {
    cats: [],
    selectedCat: null,

    init: function() {
      var self = this;
      self.cats.push(new Cat('Daenerys Targryen', 'https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg', 0));
      self.cats.push(new Cat('John Snow', 'https://static.pexels.com/photos/33537/cat-animal-cat-portrait-mackerel.jpg', 0));
      self.cats.push(new Cat('Robert Baratheon', 'https://static.pexels.com/photos/511041/pexels-photo-511041.jpeg', 0));
      self.cats.push(new Cat('Tyrion Lannister', 'https://static.pexels.com/photos/156934/pexels-photo-156934.jpeg', 0));
      self.cats.push(new Cat('Ned Stark', 'https://static.pexels.com/photos/86243/pexels-photo-86243.jpeg', 0));
      self.selectedCat = self.cats[0];
    }
  };

  var octopus = {
    init: function() {
      catModel.init();
      catListView.init();
      catView.init();
      adminView.init();
    },

    getAllCats: function() {
      return catModel.cats;
    },

    getSelectedCat: function() {
      return catModel.selectedCat;
    },

    selectCat: function(cat) {
      catModel.selectedCat = cat;
    },

    addNumOfClick: function() {
      catModel.selectedCat.numOfClick++;
    },

    saveCat: function(updatedCat) {
      var selectedCat = this.getSelectedCat();
      selectedCat.name = updatedCat.name;
      selectedCat.url = updatedCat.url;
      selectedCat.numOfClick = updatedCat.numOfClick;
    }
  };

  var catListView = {
    init: function() {
      this.render();
    },

    render: function() {
      var elemCatList = document.getElementById('cat-list');
      elemCatList.innerHTML = '';
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
        elemCatList.appendChild(elemCat);
      });
    }
  };

  var catView = {
    init: function() {
      var self = this;
      self.elemName = document.getElementById('cat-name');
      self.elemImage = document.getElementById('cat-image');
      self.elemNumOfClick = document.getElementById('num-of-click');

      self.elemImage.addEventListener('click', function(e) {
        octopus.addNumOfClick();
        catView.render();
      }, false);

      self.render();
    },

    render: function() {
      var self = this;
      var cat = octopus.getSelectedCat();

      self.elemName.innerText = cat.name;
      self.elemImage.setAttribute('alt', "Cat " + cat.name);
      self.elemImage.setAttribute('src', cat.url);
      self.elemNumOfClick.innerHTML = cat.numOfClick + ' time' + (cat.numOfClick === 1? '' : 's') + ' clicked.';
    }
  };

  var adminView = {
    init: function() {
      var self = this;
      self.elemAdminAccessButton = document.getElementById('admin-access');
      self.elemAdminActionForm = document.getElementById('admin-action');
      self.elemNameForm = document.getElementById('cat-name-form');
      self.elemUrlForm = document.getElementById('cat-image-url-form');
      self.elemNumOfClickForm = document.getElementById('cat-num-of-click-form');
      self.elemSaveEditButton = document.getElementById('save-edit');
      self.elemCancelEditButton = document.getElementById('cancel-edit');

      self.elemAdminAccessButton.addEventListener('click', function() {
        self.show();
      }, false);

      self.elemCancelEditButton.addEventListener('click', function() {
        self.hide();
      }, false);

      self.elemSaveEditButton.addEventListener('click', function() {
        self.save();
      }, false);
    },

    render: function() {
      var self = this;
      var cat = octopus.getSelectedCat();
      self.elemNameForm.value = cat.name;
      self.elemUrlForm.value = cat.url;
      self.elemNumOfClickForm.value = cat.numOfClick;
    },

    show: function() {
      var self = this;
      self.render();
      self.elemAdminActionForm.className = '';
      self.elemAdminAccessButton.className = self.elemAdminAccessButton.className + ' disabled';
    },

    hide: function() {
      var self = this;
      self.elemAdminActionForm.className = 'hidden';
      self.elemAdminAccessButton.className = self.elemAdminAccessButton.className.replace(' disabled', '');
    },

    save: function() {
      var self = this;
      var name = self.elemNameForm.value;
      var url = self.elemUrlForm.value;
      var numOfClick = self.elemNumOfClickForm.value;
      var updatedCat = new Cat(name, url, numOfClick);
      octopus.saveCat(updatedCat);
      catListView.render();
      catView.render();
      self.hide();
    }
  }

  octopus.init();
})()