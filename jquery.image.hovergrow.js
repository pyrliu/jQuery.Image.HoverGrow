// adds .naturalWidth() and .naturalHeight() methods to jQuery
// for retreaving a normalized naturalWidth and naturalHeight.
// Jack Moore - http://www.jacklmoore.com/notes/naturalwidth-and-naturalheight-in-ie
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


/*
jQuery.ImageHoverGrow animation. 
Pyry Liukas - https://github.com/pyrliu/jQuery.Image.HoverGrow

The MIT License (MIT)
Copyright (c) 2012 Pyry Liukas

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

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
