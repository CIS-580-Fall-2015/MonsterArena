module.exports = (function() {

  function Door(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.open = false;
    this.avaliable = false;
  }

  return Door;

}());
