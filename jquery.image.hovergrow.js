// adds .naturalWidth() and .naturalHeight() methods to jQuery
// for retreaving a normalized naturalWidth and naturalHeight.
(function($){
  var
  props = ['Width', 'Height'],
  prop;

  while (prop = props.pop()) {
    (function (natural, prop) {
      $.fn[natural] = (natural in new Image()) ? 
      function () {
        return this[0][natural];
      } : 
      function () {
        var 
        node = this[0],
        image,
        value;

        if (node.tagName.toLowerCase() === 'img') {
          image = new Image();
          image.src = node.src,
          value = image[prop];
        }
        return value;
      };
    }('natural' + prop, prop.toLowerCase()));
  }
}(jQuery));

(function( $ ) {

  $.fn.imageHoverGrow = function( config ) {
  
  	if ( typeof config.duration == 'undefined' ) config.duration = 1000;
	
	this.each(function (index, img){
	
		var $img = $(img);
		
		if ( img.tagName.toLowerCase() === 'img' ) {
		
			$img.mouseenter(function(ev){
			
				var $img = $(this);
				
				if ( ( $img.naturalWidth() > img.clientWidth || $img.naturalHeight() > img.clientHeight ) ) {
					
					var imgEl = $img[0];
					var $parent = $img.parent();
					var $clone = $img.clone();
					var animStyles = { 
						width: $img.naturalWidth(), 
						height: $img.naturalHeight()
					};
					
					var ioff = $img.offset();
					var dwid = $(document).width();
					
					if (  ioff.left > (dwid/2)  ) {
						animStyles["margin-left"] = animStyles.width*(-1)+imgEl.clientWidth+'px';
					}
					
					$clone.addClass('big-hover-image');
					$clone.css({
						display: 'block',
						position: 'absolute',
						margin: 0,
						top: ioff.top,
						left: ioff.left
					});
					$clone.mouseleave(function(ev){
						animStyles.width = imgEl.clientWidth;
						animStyles.height = imgEl.clientHeight;
						if (  ioff.left > (dwid/2)  ) {
							animStyles["margin-left"] = 0;
						}
						$(this).animate(animStyles, {
							duration: config.duration,
							complete: function( ev ){
								$(this).remove();
							}
						});
					});
					
					$clone.prependTo($parent);
					$clone.animate(animStyles, config.duration);
					
				} 
				
			});
		}
	}) ;
	
  };
})( jQuery );
