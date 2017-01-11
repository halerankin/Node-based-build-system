var hrOne = hrOne || {}; 

hrOne.app = (function(){
	function myPrivates() {
		console.log('yo'); 
		return 'yo';
	}

	return {
		myPublic: function() {
			return myPrivates();
		}
	};

})();