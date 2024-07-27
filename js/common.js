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
	                    // `trigger` contains the Trigger object that goes out
	                    // of the viewport
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
				// controlsContainer: '.hits.carouseled .block-header__nav', // внутри .block-header__nav должны быть 2 заранее отстилизованные кнопки
				// navContainer: "#customize-thumbnails",//конткйнер для навигации миниатюрами
				// navAsThumbnails: true, //включение навигации миниатюрами
				// nav: false, //отключение bullets
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

		// fab button
		var fabTimer,
			fab = document.querySelector('.fab'),
			fabFade = document.querySelector('[data-fab-fade]'),
			footer = document.querySelector('.footer');

		fabTimer = setInterval(function() {
			fab.classList.toggle('drive');
		}, 8000);

		window.onscroll = function(e) {		
			if(fabFade.getBoundingClientRect().bottom >= document.querySelector('.fab').getBoundingClientRect().top
				|| footer.getBoundingClientRect().top <= document.querySelector('.fab').getBoundingClientRect().bottom){
				fab.style.visibility = 'hidden';
			}else{
				fab.style.visibility = 'visible';
			}
		}
		// END fab button
		
	});
})();