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


$(document).ready(function(e) {
	// icheck
	$('input.icheckbox').iCheck();
	$('input.iradio').iCheck();

	// select
	$('select').selectric({});

	$('.btn-toggle').on('click', function(e) {
		var $btnToggle = $(this);
		var target = $btnToggle.val();
		$(target).slideToggle(function() {
			if( $(this).is(":visible") ) {
				$btnToggle.text("hide graph");
			} else {
				$btnToggle.text("show graph");
			}
		});
	});
});







