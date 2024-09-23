(function() {
	// ibg class Для замены object-fit: cover;
	if('objectFit' in document.documentElement.style === false){
	  Array.prototype.forEach.call(document.querySelectorAll('._fit'), function(el){

	    var image = el.querySelector('img');
	    el.style.backgroundImage = 'url("'+image.src+'")';
	    el.classList.add('ibg');
	    el.classList.remove('_fit');
		 });
	}
	// End ibg class Для замены object-fit: cover;

	document.addEventListener('DOMContentLoaded', function() {

		// venoBox modal Модальные окна с картинками на about.html и why.html
		if (document.querySelector('.image-modal') !== null){
			var certifsCloseTimer;
			var certifsBox = new VenoBox({
			    selector: '.image-modal',
			    spinner: 'rotating-plane',
			     onPreOpen: function(obj){
		    		document.querySelector('#wrapper-for-scroll-fix').classList.add('modal-open');
			    },
			    onPostOpen: function(obj, gallIndex, thenext, theprev){
			    	document.querySelector('.vbox-child').addEventListener('click', sertifBoxClick);
			    	certifsCloseTimer = setTimeout(function() {
			    		certifsBox.close();
			    	}, 9000);
			    },
			    onPreClose: function(obj, gallIndex, thenext, theprev){
			       document.querySelector('.vbox-child').removeEventListener('click', sertifBoxClick);
			       clearTimeout(certifsCloseTimer);
			       document.querySelector('#wrapper-for-scroll-fix').classList.remove('modal-open');
			    }
			});
			
			function sertifBoxClick() {
				clearTimeout(certifsCloseTimer);
				certifsBox.close();
			}

		}
		// END venoBox modal

		// submenu hover
		if(document.querySelector('[data-dropdowned]') !== null && !isMobile.any()){
			Array.prototype.slice.call(document.querySelectorAll('[data-dropdowned]'))
				.forEach(function(item) {
					item.addEventListener('mouseover', function(e) {
						document.documentElement.classList.add('submenu-open');
						e.target.closest('[data-dropdowned]').classList.add('active');
					});
					item.addEventListener('mouseout', function(e) {
						document.documentElement.classList.remove('submenu-open');
						e.target.closest('[data-dropdowned]').classList.remove('active');
					});
				});
		}
		// END submenu hover

		document.onclick = function(e) {
			var targ = e.target;
			
			// открытие/закрытие мобильного меню
			if(targ.closest('.toggle-mnu') !== null){
				document.querySelector('.toggle-mnu').classList.toggle('on');
				if(!document.documentElement.classList.contains('search-open')){
					console.log('rererer!!!')
					document.documentElement.classList.toggle('lock');
				}
				document.documentElement.classList.remove('search-open');
				document.documentElement.classList.toggle('menu-opened');
			}
			//КОНЕЦ открытие/закрытие мобильного меню

			//открытие/закрытие окна поиска
			if(targ.className === 'header__search-button' || targ.closest('.header__search-button') !== null){
				document.documentElement.classList.toggle('search-open');
				document.documentElement.classList.toggle('lock');
				document.documentElement.classList.remove('fab-open');
				document.querySelector('.fab').classList.remove('fab--active');
			}else if (targ.closest('.header__serch-area') == null  && targ.closest('.toggle-mnu') == null && targ.closest('.menu-header__body') == null){
				console.log('fuccl!!!')
				document.documentElement.classList.remove('search-open');
				document.documentElement.classList.remove('lock');
			}
			//КОНЕЦ открытие/закрытие окна поиска

			//закрытие моб. меню при переходе по якорным ссылкам подменю на devices.html
			if(targ.closest('.submenu-list__link') !== null){
				document.documentElement.classList.remove('menu-opened');
				document.documentElement.classList.remove('lock');
				document.documentElement.classList.remove('submenu-open');
				Array.prototype.slice.call(document.querySelectorAll('[data-dropdowned]')).forEach(function(item) {
					item.classList.remove('active');
				});
			}
			//КОНЕЦ закрытие моб. меню при переходе по якорным ссылкам подменю на devices.html
		}

		//добавление анимации при появлении элементов на экране в блоках ".organize" и ".self-service"
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
		}
		//КОНЕЦ добавление анимации при появлении элементов на экране в блоках ".organize" и ".self-service"


		if(document.querySelector('.school-scroll') !== null && document.querySelector('.school-hero') !== null){
			console.log('if!!!')
			window.addEventListener('scroll',  function(e) {		
				console.log(document.querySelector('.school-scroll').getBoundingClientRect().top);
	        	var schoolScroll = document.querySelector('.school-scroll');
	        	if(schoolScroll.getBoundingClientRect().top + schoolScroll.offsetHeight <= 0){
	        		document.querySelector('.school-hero').classList.add('school-hero--hidden');
	        	}else{
	        		document.querySelector('.school-hero').classList.remove('school-hero--hidden');

	        	}
			});
		}

		// main-slider слайдер внизу главной страницы
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
		// END main-slider слайдер внизу главной страницы

		// cacao-carousel слайдер "Вариант оформления какао-зоны для отдыха учащихся" на shcool.html
		// и " кофе-поинты и уличные кофейни" на devices.html
		if(document.querySelector('.carousel-ordinary .tiny-sldr') !== null){
			var tnsCarousels = document.querySelectorAll('.carousel-ordinary');
				for(var i = 0; i < tnsCarousels.length; i++) {

					var slider = tns({
						container: tnsCarousels[i].querySelector('.tiny-sldr'),
						mode: 'carousel', //'gallery' - для фэйд-анимации отдельных слайдов
						items: 1,
						speed: 1000,
						// loop: false,
						slideBy: 1, // кол-во слайдов, перематывающихся за 1 клик. Не работает с mode: 'gallery'
						// center: true,
						controlsContainer: tnsCarousels[i].querySelector('.tiny-carousel__nav'),
						navPosition: 'bottom',//положение bullets
						mouseDrag: true
					});
				}
		}
		// END cacao-carousel слайдер "Вариант оформления какао-зоны для отдыха учащихся" на shcool.html
		// и " кофе-поинты и уличные кофейни" на devices.html

		// fab button управление состоянием кнопки .fab
		var fabTimer,
			fab = document.querySelector('.fab'),
			fabFade = document.querySelector('[data-fab-fade]'),
			footer = document.querySelector('.footer');

		if(fab !== null){

			fab.onclick = function(e){
				document.documentElement.classList.toggle('fab-open');
				this.classList.toggle('fab--active');
				this.classList.remove('drive');
			}
			fabTimer = setInterval(function() {
				fab.classList.toggle('drive');
			}, 8000);

			fabButtonCheck();
			window.onscroll = function(e) {		
				fabButtonCheck()
			}
			function fabButtonCheck() {
				if(fabFade){
					if(fabFade.getBoundingClientRect().bottom >= document.querySelector('.fab').getBoundingClientRect().top
						|| footer.getBoundingClientRect().top <= document.querySelector('.fab').getBoundingClientRect().bottom){
						fab.classList.add('fab--hidden');
					}else{
						fab.classList.remove('fab--hidden');

					}	
				}else{
					if(footer.getBoundingClientRect().top <= document.querySelector('.fab').getBoundingClientRect().bottom){
						fab.classList.add('fab--hidden');
					}else{
						fab.classList.remove('fab--hidden');
					}	
				}

			}
		}
		// END fab button управление состоянием кнопки .fab

		// benefit-tiles toggling переключение вида карточек на benefit.html
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
		// END benefit-tiles toggling переключение вида карточек на benefit.html

		// traffic toggling переключение вида картинки в блоке smart на benefit.html
		if(document.querySelector('.traffic__features') !== null){
			var togglers = document.querySelectorAll('[data-traffic-toggler]'),
				trafficTimer;
			
			Array.prototype.forEach.call(togglers, function(item, i) {

				item.addEventListener('click', function(e) {
					var parent = e.target.closest('.traffic');

					if(!parent.classList.contains('traffic--open')){
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
		// END traffic toggling переключение вида картинки в блоке smart на benefit.html
		
	});
})();