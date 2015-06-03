Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    'submit form' : 'savePokemon'
  },

  render: function () {
    this.$el.html(JST['pokemonForm']);
    return this;
  },

  savePokemon: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON();
    this.model.set(attrs['pokemon']);
    this.model.save( {}, {
      success: function () {
        this.collection.add(this.model);
        var url = '/pokemon/' + this.model.id;
        Backbone.history.navigate(url, { trigger: true });
      }.bind(this)
    });
  }
});
