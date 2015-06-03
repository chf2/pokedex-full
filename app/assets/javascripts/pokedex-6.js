Pokedex.Router = Backbone.Router.extend({
  routes: {
    "" : 'pokemonIndex',
    "pokemon/:pokemonId/toys/:toyId" : "toyDetail",
    "pokemon/:id": 'pokemonDetail'
  },

  pokemonDetail: function (id, callback) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
      return;
    }
    var pokemon = this._pokemonIndex.collection.get(id);
    this._pokemonDetail = new Pokedex.Views.PokemonDetail({ model: pokemon });
    $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el);
    this._pokemonDetail.refreshPokemon({
      successCallback: callback
    });
  },

  pokemonIndex: function (callback) {
    if (!this._pokemonIndex) {
      this._pokemonIndex = new Pokedex.Views.PokemonIndex({
        collection: new Pokedex.Collections.Pokemon()
      });
      this._pokemonIndex.refreshPokemon({
        successCallback: callback
        });
      $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
      this.pokemonForm();
    }
  },

  toyDetail: function (pokemonId, toyId) {
    if (!this._pokemonDetail) {
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
      return;
    }
    var toy = this._pokemonDetail.model.toys().get(toyId);
    var toyDetail = new Pokedex.Views.ToyDetail({ model: toy });
    $("#pokedex .toy-detail").html(toyDetail.$el);
    toyDetail.render();
  },

  pokemonForm: function () {
    var newPokemonForm = new Pokedex.Views.PokemonForm({
      model: new Pokedex.Models.Pokemon(),
      collection: this._pokemonIndex.collection
    });
    $('#pokedex .pokemon-form').html(newPokemonForm.render().$el);
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
