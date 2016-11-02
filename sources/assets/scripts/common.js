// console 객체가 없을 경우
if (!window.console) {
	window.console = {
		log : function(){},
		dir : function(){}
	};
} else if (!window.console.dir){
	window.console.dir = function(){};
}


(function(){
	$(document).ready(function(){
		var agents = [/(opr|opera)/gim,/(chrome)/gim,/(firefox)/gim,/(safari)/gim,/(msie[\s]+[\d]+)/gim,/(trident).*rv:(\d+)/gim];
		var agent = navigator.userAgent.toLocaleLowerCase();
		for(var ag in agents){
			if(agent.match(agents[ag])){
				$(document.body).addClass(String(RegExp.$1+RegExp.$2).replace(/opr/,'opera').replace(/trident/,'msie').replace(/\s+/,''));
				break;
			}
		}
	});
})();


function resizeContents() {
	if( $('body').hasClass("admin") ) {
		var main = $('main').height();
		var title = 50;
		var content = $('article.contents').height();
		if( content < main ) {
			$('article.contents').height(main);
		}
	}
}

$(document).ready(function(e) {
	// icheck
	$('input.icheckbox').iCheck();
	$('input.iradio').iCheck();

	// select
	$('select.selectric').selectric({});


	// only admin - footer position
	resizeContents();
	$(window).on('resize', function() {
		resizeContents();
	});
});







