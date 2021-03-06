$(function() {
  $.Isotope.prototype._getCenteredMasonryColumns = function() {
  this.width = this.element.width();
  var parentWidth = this.element.parent().width();
             // i.e. options.masonry && options.masonry.columnWidth
  var colW = this.options.masonry && this.options.masonry.columnWidth ||
             // or use the size of the first item
             this.$filteredAtoms.outerWidth(true) ||
             // if there is no items, use size of container
             parentWidth;

  var cols = Math.floor( parentWidth / colW );
  cols = Math.max( cols, 1 );

  // i.e. this.masonry.cols = ....
  this.masonry.cols = cols;
  // i.e. this.masonry.columnWidth = ...
  this.masonry.columnWidth = colW;
};

$.Isotope.prototype._masonryReset = function() {
  // layout-specific props
  this.masonry = {};
  // FIXME should not have to call this again
  this._getCenteredMasonryColumns();
  var i = this.masonry.cols;
  this.masonry.colYs = [];
  while (i--) {
    this.masonry.colYs.push( 0 );
  }
};

$.Isotope.prototype._masonryResizeChanged = function() {
  var prevColCount = this.masonry.cols;
  // get updated colCount
  this._getCenteredMasonryColumns();
  return ( this.masonry.cols !== prevColCount );
};

$.Isotope.prototype._masonryGetContainerSize = function() {
  var unusedCols = 0,
      i = this.masonry.cols;
  // count unused columns
  while ( --i ) {
    if ( this.masonry.colYs[i] !== 0 ) {
      break;
    }
    unusedCols++;
  }

  return {
        height : Math.max.apply( Math, this.masonry.colYs ),
        // fit container to columns that have been used;
        width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
      };
};

var $container = $('#slideshow-container');

$container.isotope({
  // options
  itemSelector : '.item',
  masonry: {
       columnWidth: 135
     }

});

// filter items when filter link is clicked
$('#filters a').click(function(){
  var selector = $(this).attr('data-filter');
  $container.isotope({ filter: selector }, function(){
    if(selector == "*"){
      $container.find("a").attr("rel", "prettyPhoto[]");
    } else { 
      $(selector).find("a[rel^='prettyPhoto']").attr("rel", selector+"[]");
    }
  });
  return false;
});

$("a[rel^='prettyPhoto']").prettyPhoto();

});