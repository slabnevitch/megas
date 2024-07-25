(function() {
	// ibg class
	// if('objectFit' in document.documentElement.style === false){
	//   Array.prototype.forEach.call(document.querySelectorAll('._fit'), function(el){

	//     var image = el.querySelector('img');
	//     el.style.backgroundImage = 'url("'+image.src+'")';
	//     el.classList.add('ibg');
	//     el.classList.remove('_fit');
	// 	 });
	// }
	// End ibg class

	document.addEventListener('DOMContentLoaded', function() {
		console.log('DOMContentLoaded!');

		document.querySelector('.toggle-mnu').onclick = function(e) {
			this.classList.toggle('on');
			document.documentElement.classList.toggle('menu-opened');
			document.documentElement.classList.toggle('lock');
		}

		document.onclick = function(e) {
			var targ = e.target;
			console.log(targ)
			if(targ.className === 'header__search-button' || targ.closest('.header__search-button') !== null){
				document.documentElement.classList.toggle('search-open');
			}else if (targ.closest('.header__serch-area') == null){
				document.documentElement.classList.remove('search-open');
			}
		}

		var trigger = new ScrollTrigger.default( {
			trigger: {
				once: false,
				toggle: {
	            // The class(es) that should be toggled
				class: {
	                in: 'visible', // Either a string, or an array of strings
	                out: ['invisible']
	            },
	            callback: {
	                // A callback when the element is going in the viewport, you can
	                // return a Promise here, the trigger will not be called until
	                // the promise resolves.
	            	in: (trigger) => {
	            		// console.log('in!');
	            		// console.log(trigger);
	            	},
	                // A callback when the element is visible on screen, keeps
	                // on triggering for as long as 'sustain' is set
	            	visible: null,
	                // A callback when the element is going out of the viewport.
	                // You can also return a promise here, like in the 'in' callback.
	                //
	                // Here an example where all triggers take 10ms to trigger
	                // the 'out' class.
	            	out: (trigger) => {
	            		console.log('out!');
	            		console.log(trigger);
	                    // `trigger` contains the Trigger object that goes out
	                    // of the viewport
	            		return new Promise((resolve, reject) => {
	            			setTimeout(resolve, 10)
	            		})
	            	}
	           	 }
	        	}

			},
			scroll: {
		        // The amount of ms the scroll loop should keep triggering after the
		        // scrolling has stopped. This is sometimes nice for canvas
		        // animations.
		        sustain: 200,
		        // Window|HTMLDocument|HTMLElement to check for scroll events
		        element: window,
		        // Add a callback when the user has scrolled, keeps on triggering for
		        // as long as the sustain is set to do
		        callback: function() {
		        	// console.log(this);
		        },
		        // Callback when the user started scrolling
		        start: () => {},
		        // Callback when the user stopped scrolling
		        stop: () => {},
		        // Callback when the user changes direction in scrolling
		        directionChange: () => {}
		    }
        }); // When not using npm, create a new instance with 'new ScrollTrigger.default()'
				// Add all html elements with attribute data-trigger
		trigger.add('[data-trigger]');
		
	});
})();