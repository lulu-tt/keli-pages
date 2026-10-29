jQuery(function($){
	$.datepicker.setDefaults({
		//dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년'
	});
	if ($('.side_nav').length > 0){
		$(".side_nav .scroll").mCustomScrollbar({theme:"minimal-dark"});
	}
	//lnb
	$.fn.lnb = function(){
		return this.each(function(){
			var $menu = $(this);
			var index = $(this).find('.active');
			$menu.find('>li').each(function(){
				var $sub = $(this).find('ul');
				$sub.addClass('sub');
				if ($sub.length > 0) {
					$(this).find('> a').addClass('opener');
				}
				if ($(this).hasClass('on')) {
					$(this).find('>ul').css('display', 'block');
				};
				index.parents('li').addClass('on').find('>ul').css('display', 'block');
			});
			var $menu_openers = $menu.find('.opener');
			$menu_openers.on('click', function(e){
				event.preventDefault();
				var $Layer = $(this).next('ul');
				if ($Layer.is(':hidden')){
					$(this).parent('li').addClass('on');
					$Layer.stop().slideDown();
				} else {
					$(this).parent('li').removeClass('on');
					$Layer.stop().slideUp();
				}
			});
		});
	};
	$('.side_nav .nav').lnb();
	//tab
	$.fn.tabContainer = function(){
		return this.each(function(){
			if ($(this).hasClass('nojs')){
				return false;
			}
			var tabAnchor = $(this).find('> li');
			tabAnchor.each(function(){
				var menu = $(this);
				var target = $('#' + menu.find('>a').attr('href').split('#')[1]);
				var link = menu.find('>a');
				target.css('display', 'none');
				if (menu.hasClass('on')) {
					target.css('display', 'block');
				};
				link.click(function(){
					if (!$(this).parents('li').hasClass('on')) {
						tabAnchor.removeClass('on');
						tabAnchor.each(function(){
							$('#' + $(this).find('>a').attr('href').split('#')[1]).css('display', 'none');
						});
					menu.addClass('on');
					target.css('display', 'block');
					};
					return false;
				});
			});
			//tabAnchor.eq(0).trigger('click');
		});
	};
	$('.nav_tabs').tabContainer();
	//center popup
	$('.ct_dialog .p_close').on('click', function(e){
		e.preventDefault();
		var popup = $(this).parents('.ct_dialog');
		if(popup.length > 0){
			popup.fadeOut();
			$('body').css('overflow', 'auto');
		}
	});
});
