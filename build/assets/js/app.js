var hrOne = hrOne || {}; 

hrOne.app = (function(){
	function myPrivates() {
		return 'yo';
	}

	return {
		myPublic: function() {
			return myPrivates();
		}
	};
})();