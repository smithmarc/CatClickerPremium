/* -- MODEL -- */

var model = {
  currentCat = null,
  cats: [
    {
      clickCount : 0,
      name : 'Tabby',
      imgSrc : 'http://placehold.it/450x300',
      imgAttribution : 'http://placehold.it'
    },
    {
      clickCount : 0,
      name : 'Tiger',
      imgSrc : 'http://placehold.it/450x300',
      imgAttribution : 'http://placehold.it'
    },
    {
      clickCount : 0,
      name : 'Maya',
      imgSrc : 'http://placehold.it/450x300',
      imgAttribution : 'http://placehold.it'
    },
    {
      clickCount : 0,
      name : 'Pepe',
      imgSrc : 'http://placehold.it/450x300',
      imgAttribution : 'http://placehold.it'
    },
    {
      clickCount : 0,
      name : 'Jag',
      imgSrc : 'http://placehold.it/450x300',
      imgAttribution : 'http://placehold.it'
    }
  ]
};

/* -- OCTOPUS -- */

var octopus {
  init: function() {
    // set our current cat to the first one in the list
    model.currentCat = model.cats[0];

    // tell our views to initialise
    catListView.init();
    catView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  // set the currently-selected cat to the object passed in
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  // increments the counter for the currently-selected cat
  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
  }
};

/* -- VIEW -- */

var catView = {
  init: function() {
    // store pointers to our DOM elements for easy access later
    this.catElem = document.getElementById('cat');
    this.catNameElem = document.getElementById('cat-name');
    this.catImageElem = document.getElementById('cat-img');
    this.countElem = document.getElementById('cat-count');

    // on click, increment the current cats counter
    this.catImageElem.addEventListener('click', function(e){
      octopus.incrementCounter();
    });

    // render this view (update the DOM elements with the right variable)
    this.render();
  },

  render: function() {
    // update the DOM elements with values from the current cat
    var currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
  }
};

var catListView = {
  init: function() {
    // store the  DOM element for easy access later
    this.catListElem = document.getElementById('cat-list');

    // render this view (update the DOM elements with the right variable)
    this.render();
  },

  render: function() {
    // get the cats we'll be rendering from the octopus
    var cats = octopus.getCats();

    // empty the cat list
    this.catListElem.innerHTML = '';

    // loop over the cats
    for (var i = 0; i < cats.length; i++) {
      // this is the cat we're currently looping over
      var cat = cats[i];

      // make a new cat list item and set its text
      var elem = document.createElement('li');
      elem.textContent = cat.name;

      elem.addEventListener('click', function(cat) {
        return function() {
          octopus.setCurrentCat(cat);
          catView.render();
        };
      })(cat));

      this.catListElem.appendChild(elem);
    };
  }
};

// This is where we make things happen!
octopus.init();
