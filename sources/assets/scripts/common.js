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

	GlobalMenu.init();
	WarningMessage.init();

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



/* GlobalMenu */
var GlobalMenu = (function ($) {
	var scope,
		$container,
		$selectLanguage,
		$selectCompany,
		$userInfo,
		$service,
		init = function() {
			$container = $('.global-menu');
			$selectLanguage = $('#language');
			$selectCompany = $('#company');
			$service = $('#service-shortcut');
			$userInfo = $('#user-info');


			initLayout();
			initEvent();
		};

	function initLayout() {
	}

	function initEvent() {
		$selectLanguage.popup({
			type: 'tooltip',
			vertical: 'topedge',
			offsettop: -16,
			horizontal: 'leftedge',
			transition: '0.3s all 0.1s'
		});
		$selectCompany.popup({
			type: 'tooltip',
			vertical: 'topedge',
			offsettop: -12,
			offsetleft: -12,
			horizontal: 'leftedge',
			transition: '0.3s all 0.1s'
		});
		$service.popup({
			type: 'tooltip',
			vertical: 'bottom',
			offsettop: 50,
			horizontal: 'center',
			transition: '0.3s all 0.1s'
		});
		$userInfo.popup({
			type: 'tooltip',
			vertical: 'bottom',
			offsettop: 70,
			horizontal: 'rightedge',
			transition: '0.3s all 0.1s'
		});
	}

	return {
		init: function() {
			init();
		}
	};
}(jQuery));



<<<<<<< HEAD
=======
/* Filter */
var Filter = (function ($) {
	var scope,
		$container,
		$btnToggleContainer,
		$btnToggleItems,
		$btnReset,
		$selectedLabels,
		$btnDone,
		init = function() {
			$container = $('.filter-container');
			$btnToggleContainer = $container.find('.btn-status');
			$btnToggleItems = $container.find('.btn-folding');
			$btnReset = $container.find('.btn-reset');
			$selectedLabels = $container.find('.results > .selected');
			$btnDone = $container.find('.done > .btn-normal');

			initLayout();
			initEvent();
		};

	function initLayout() {
		_updateSelectedLabels();
	}

	function initEvent() {
		// open / close
		$btnToggleContainer.on('click', function(e) {
			if( $container.hasClass('is-opened') ) {
				$container.removeClass('is-opened');
				$btnToggleContainer.text('Open Filters');
			} else {
				$container.addClass('is-opened');
				$btnToggleContainer.text('Close');
			}

			_updateSelectedLabels();
		});

		// item open / close
		$btnToggleItems.on('click', function(e) {
			var $this = $(e.target);
			$this.toggleClass('is-opened');
		});

		// reset
		$btnReset.on('click', function(e) {
			e.preventDefault();

			$('input.icheckbox').iCheck('uncheck');
			$('input.iradio').iCheck('uncheck');
		});

		// done
		$btnDone.on('click', function(e) {
			_updateSelectedLabels();
		});
	}

	function _updateSelectedLabels() {
		var checkedLabels = $container.find('input:checked').map(function() {
			return $(this).closest('label').text().trim();
		}).get();

		$selectedLabels.html(checkedLabels.join(", "));
	}

	return {
		init: function() {
			init();
		},
		updateSelectedLabels: function() {
			_updateSelectedLabels();
		}
	};
}(jQuery));
>>>>>>> 8d0b864ee1ea64d9dffd9bfb370dfbedd30d4f50



/* WarningMessage */
var WarningMessage = (function ($) {
	var scope,
		$container,
		$btnToggleContainer,
		init = function() {
			$container = $('.warning-container');
			$btnToggleContainer = $container.find('.btn-folding');

			initLayout();
			initEvent();
		};

	function initLayout() {
	}

	function initEvent() {
		// item open / close
		$btnToggleContainer.on('click', function(e) {
			e.preventDefault();
			
			$container.toggleClass('is-opened');
		});
	}

	return {
		init: function() {
			init();
		}
	};
}(jQuery));
