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
		
	});
})();