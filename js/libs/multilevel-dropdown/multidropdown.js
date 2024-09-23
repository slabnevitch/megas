// Необходимо подключить mobileDetect.js + siblings.js либо all-functions.js
(function() {
	if(isMobile.any()){

		document.body.classList.add('touch');
		var arrows = document.querySelectorAll('[data-dropdown-icon]');

			for(var i=0; i < arrows.length; i++){
				arrows[i].addEventListener('click', function(e) {
					var parent = this.closest('[data-dropdowned]'),
							mainParent = this.closest('[data-dropdowned-parent]');

					parent.classList.toggle('active');
					document.documentElement.classList.toggle('submenu-open');
					
					Array.prototype.slice.call(parent.querySelectorAll('[data-dropdowned]'))
						.forEach(function(item) {
							item.classList.remove('active');
							// document.documentElement.classList.remove('submenu-open');
						})

					siblings(mainParent).forEach(function(item) {
						// document.documentElement.classList.remove('submenu-open');
						item.classList.remove('active');
					})

				});
			}

			document.addEventListener('click', function(e) {
				var targ = e.target;

				if (!targ.closest('[data-dropdowned]')){
					Array.prototype.slice.call(document.querySelector('.mulilevel-nav').querySelectorAll('[data-dropdowned]')).forEach(function(item) {
						item.classList.remove('active');
						document.documentElement.classList.remove('submenu-open');
					});
				}
			});
	}else{
		document.body.classList.add('mouse');
	}
})();