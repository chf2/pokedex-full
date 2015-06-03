Pokedex.Views = {};

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    'click li': 'selectPokemonFromList'
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
  },

  addPokemonToList: function (pokemon) {
    var content = JST['pokemonListItem']({ pokemon: pokemon });
    this.$el.append(content);
  },

  refreshPokemon: function (options) {
    this.collection.fetch({
      success: function () {
        if (options.successCallback) {
          options.successCallback();
        }
      }.bind(this)
    });
  },

  render: function () {
    this.$el.empty();
    this.collection.each( function (model) {
      this.addPokemonToList(model);
    }.bind(this));
    return this;
  },

  selectPokemonFromList: function (event) {
    var pokeId = $(event.currentTarget).data('id');
    var pokemon = this.collection.get(pokeId);
    $('.toy-detail').empty();
    Backbone.history.navigate('/pokemon/' + pokeId, { trigger: true });
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    'click .toys li': 'selectToyFromList'
  },

  refreshPokemon: function (options) {
    this.model.fetch({
      success: function () {
        this.render();
        if (options.successCallback) {
          options.successCallback();
        }
      }.bind(this)
    });
  },

  render: function () {
    var content = JST['pokemonDetail']({ pokemon: this.model });
    this.$el.html(content);
    this.model.toys().each( function (toy) {
      this.$el.find('.toys').append(JST['toyListItem']({ toy: toy }));
    }.bind(this));
    return this;
  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data('id');

    Backbone.history.navigate('/pokemon/' + this.model.id + '/toys/' + toyId,
                              { trigger: true });
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var content = JST['toyDetail']({ toy: this.model, pokes: [] });
    this.$el.html(content);
    return this;
  }
});
