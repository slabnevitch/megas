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

		// document.querySelector('.toggle-mnu').onclick = function(e) {
		// 	this.classList.toggle('on');
		// 	document.documentElement.classList.toggle('menu-opened');
		// 	document.documentElement.classList.toggle('lock');
		// }

		// venoBox modal
		var certifsCloseTimer;
		var certifsBox = new VenoBox({
		    selector: '.certifs__item',
		    spinner: 'rotating-plane',
		     onPreOpen: function(obj){
		       console.log('PRE OPEN');
		       console.log(obj);
	    		document.querySelector('#wrapper-for-scroll-fix').classList.add('modal-open');
		    },
		    onPostOpen: function(obj, gallIndex, thenext, theprev){
		    	console.log('post open')
		    	document.querySelector('.vbox-child').addEventListener('click', sertifBoxClick);
		    	certifsCloseTimer = setTimeout(function() {
		    		certifsBox.close();
		    	}, 9000);
		    },
		    onPreClose: function(obj, gallIndex, thenext, theprev){
		       document.querySelector('.vbox-child').removeEventListener('click', sertifBoxClick);
		       clearTimeout(certifsCloseTimer);
		        // setTimeout(function() {
					document.querySelector('#wrapper-for-scroll-fix').classList.remove('modal-open');

		        // }, 1000);

		    },
		});
		function sertifBoxClick() {
			clearTimeout(certifsCloseTimer);
			certifsBox.close();
		}
		// END venoBox modal

		document.onclick = function(e) {
			var targ = e.target;
			console.log(targ);

			// if(targ.closest('.toggle-mnu') !== null){
			// 	document.querySelector('.toggle-mnu').classList.toggle('on');
			// 	if(!document.documentElement.classList.contains('search-open')){
			// 		document.documentElement.classList.toggle('lock');
			// 	}
			// 	document.documentElement.classList.remove('search-open');
			// 	document.documentElement.classList.toggle('menu-opened');
			// }

			if(targ.className === 'header__search-button' || targ.closest('.header__search-button') !== null){
				document.documentElement.classList.toggle('search-open');
				document.documentElement.classList.toggle('lock');
			}else if (targ.closest('.header__serch-area') == null  && targ.closest('.toggle-mnu') == null){
				document.documentElement.classList.remove('search-open');
				document.documentElement.classList.remove('lock');
			}
		}

		if(document.querySelector('[data-trigger]')){
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
		            		console.log('in!');
		            		console.log(trigger);
		            		if(trigger.element.classList.contains('pizda')){
		            			// document.querySelector('.school-hero').style="position: static";
		            			// document.querySelector('.school-scroll').classList.add('inv')
		            		}
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
		                    // `trigger` contains the Trigger object that goes out
		                    // of the viewport
		                    console.log('out!')
		                    console.log(trigger);
		                    if(trigger.element.classList.contains('pizda')){
		            			// document.querySelector('.school-hero').style="position: sticky";
		            			// document.querySelector('.school-scroll').classList.remove('inv');
		            		}
		                     // rellax.refresh();
		            		return new Promise((resolve, reject) => {
		            			setTimeout(resolve, 10)
		            		})
		            	}
		           	 }
		        	}

				}
	        }); // When not using npm, create a new instance with 'new ScrollTrigger.default()'
					// Add all html elements with attribute data-trigger
			trigger.add('[data-trigger]');

		}


	

		// main-slider
		// usage: http://ganlanyuan.github.io/tiny-slider/#usage
		if(document.querySelector('.main-slider__carousel .tiny-sldr') !== null){
			var slider = tns({
				container: '.main-slider__carousel .tiny-sldr',
				mode: 'carousel', //'gallery' - для фэйд-анимации отдельных слайдов
				items: 1,
				speed: 1000,
				// loop: false,
				slideBy: 1, // кол-во слайдов, перематывающихся за 1 клик. Не работает с mode: 'gallery'
				autoplay: true,
				// center: true,
				controls: false, // отключение кнопок "вперед/назад"
				navPosition: 'bottom',//положение bullets
				mouseDrag: true,
				gutter: 20, //добавляет padding, а не margin! Нужна обертка вокруг содержимого каждого слайда!
				responsive: { // mobile first!
					320: {

				      items: 1
					},
					640: {
				      // edgePadding: 20,
				      // gutter: 20,
				      // items: 2
					},
					768: {
				      // items: 2.5
						edgePadding: 240 
					},
					1025: {
				      items: 3,
				      edgePadding: 0

					}
				}
			});
		}

		// END main-slider

		// cacao-carousel
		if(document.querySelector('.carousel-ordinary .tiny-sldr') !== null){
			var slider = tns({
				container: '.carousel-ordinary .tiny-sldr',
				mode: 'carousel', //'gallery' - для фэйд-анимации отдельных слайдов
				items: 1,
				speed: 1000,
				// loop: false,
				slideBy: 1, // кол-во слайдов, перематывающихся за 1 клик. Не работает с mode: 'gallery'
				// center: true,
				controlsContainer: '.carousel-ordinary .tiny-carousel__nav',
				navPosition: 'bottom',//положение bullets
				mouseDrag: true
			});
		}
		// END cacao-carousel

		// fab button
		var fabTimer,
			fab = document.querySelector('.fab'),
			fabFade = document.querySelector('[data-fab-fade]'),
			footer = document.querySelector('.footer');

		if(fab !== null){

			fabTimer = setInterval(function() {
				fab.classList.toggle('drive');
			}, 8000);

			fabButtonCheck();
			window.onscroll = function(e) {		
				fabButtonCheck()
			}
			function fabButtonCheck() {
				if(fabFade){
					console.log('if!')
					if(fabFade.getBoundingClientRect().bottom >= document.querySelector('.fab').getBoundingClientRect().top
						|| footer.getBoundingClientRect().top <= document.querySelector('.fab').getBoundingClientRect().bottom){
						fab.style.visibility = 'hidden';
					}else{
						fab.style.visibility = 'visible';
					}	
				}else{
					console.log('else!')
					if(footer.getBoundingClientRect().top <= document.querySelector('.fab').getBoundingClientRect().bottom){
						fab.style.visibility = 'hidden';
					}else{
						fab.style.visibility = 'visible';
					}	
				}

			}
		}
		// END fab button

		// benefit-tiles toggling
		if(document.querySelector('.benefit-tile') !== null){
			var tiles = document.querySelectorAll('.benefit-tile'),
				tilesTimer;
			
			Array.prototype.forEach.call(tiles, function(item, i) {
				item.addEventListener('click', benfitTileClick);
			});

			function benfitTileClick(e) {
				var tile = e.target.closest('.benefit-tile');

				if(!tile.classList.contains('benefit-tile--active')){
					tilesTimer = setTimeout(function() {
						tile.classList.remove('benefit-tile--active');
					}, 10000);
				}
				
				tile.classList.toggle('benefit-tile--active');

				siblings(tile).forEach(function(item, i) {
					item.classList.remove('benefit-tile--active');
				});

				document.querySelector('.traffic').classList.remove('traffic--open');
			}
		}
		// END benefit-tiles toggling

		// traffic toggling
		if(document.querySelector('.traffic__features') !== null){
			var togglers = document.querySelectorAll('[data-traffic-toggler]'),
				trafficTimer;
			
			Array.prototype.forEach.call(togglers, function(item, i) {

				item.addEventListener('click', function(e) {
					var parent = e.target.closest('.traffic');

					if(!parent.classList.contains('traffic--open')){
						console.log('true!')
						trafficTimer = setTimeout(function() {
							parent.classList.remove('traffic--open');
						}, 10000);
					}else{
						clearTimeout(trafficTimer);
					}
					parent.classList.toggle('traffic--open');

					Array.prototype.forEach.call(document.querySelectorAll('.benefit-tile'), function(item, i) {
						item.classList.remove('benefit-tile--active');
					});
				});
			});
		}
		// END traffic toggling
		
	});
})();