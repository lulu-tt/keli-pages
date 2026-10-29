jQuery(function($){
  //AOS.init();
  //gnb
  (function () {
    var header = $("#header");
    var wrap = $("#header .frm");
    var gnb = wrap.find("#gnb");
    var gnb_li = gnb.find(">li");
    var gnb_sub = gnb_li.find(">ul");
    function menu_On() {
      var t = $(this);
      if (!t.hasClass("on")) {
        gnb_li.removeClass("on");
        t.addClass("on");
        header.addClass("active");
      }
      wrap.stop().animate({ height: "520" }, 200);
    }
    function menu_Off() {
      gnb_li.removeClass("on");
      header.removeClass("active");
      wrap.stop().animate({ height: "90" }, 200);
    }
    gnb_li.mouseenter(menu_On).focusin(menu_On);
    wrap.mouseleave(menu_Off).focusout(menu_Off);
  })();

  header_scroll();
  function header_scroll() {
    if ($(this).scrollTop() > 0) {
      $("#header").addClass("fixed");
    } else {
      $("#header").removeClass("fixed");
    }
  }
  $(window).scroll(function () {
    header_scroll();
  });

  $(".nav_toggle").on("click", function () {
    $("#sidr").toggleClass("open");
  });
  $("#sidr .tog").on("click", function () {
    $("#sidr").removeClass("open");
  });

  //메인 배너 이미지맵
  if ($(".m_sd").length > 0) {
    $(".m_sd img[usemap]").rwdImageMaps();
  }
  //jquery ui datepicker
  $.datepicker.setDefaults({
    //dateFormat: 'yy-mm-dd',
    prevText: "이전 달",
    nextText: "다음 달",
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    showMonthAfterYear: true,
    yearSuffix: "년",
  });

  // notice
  if ($(".top_notice").length > 0) {
    $(".top_notice .sd").slick({
      vertical: true,
      dots: false,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      pauseOnHover: true,
      appendArrows: $(".top_notice .arrows"),
    });

    $(".top_notice .play").click(function () {
      var $sliderWrap = $(".top_notice .sd");
      if ($sliderWrap.attr("data-slick-autoplay-status") == "Y") {
        $sliderWrap.attr("data-slick-autoplay-status", "N");
        $sliderWrap.slick("slickPause");
        $(this).attr("title", "슬라이드 재생");
        $(this).removeClass("on");
      } else if ($sliderWrap.attr("data-slick-autoplay-status") == "N") {
        $sliderWrap.attr("data-slick-autoplay-status", "Y");
        $sliderWrap.slick("slickPlay");
        $(this).attr("title", "슬라이드 정지");
        $(this).addClass("on");
      }
    });

    $(".sd_btn .close").on("click", function () {
      $(".top_notice").hide();
      $(".ctm.main").addClass("n_nt");
      if ($(".top_notice").css("display") == "none") {
        $(".ctm.main").addClass("n_nt");
      } else {
        $(".ctm.main").removeClass("n_nt");
      }
    });
  }
  //notice show/hide

  if ($(".top_notice").css("display") == "none") {
    $(".ctm.main").addClass("n_nt");
  } else {
    $(".ctm.main").removeClass("n_nt");
  }

  //main slide
  $.fn.main_slide = function () {
    return this.each(function () {
      var total = $(this).find(".slick-slide").length;
      var total_slide_item = $(this).find(".slide_item").length;
      if (total < 2) {
        $(this).addClass("one");
      }
      $(this).slick({
        dots: true,
        fade: true,
        appendArrows: $(this).parents(".m_sd").find(".control"),
        customPaging: function (slider, i) {
          return (
            '<button class="tab">' +
            '<div class="line_fill"><span></span></div>' +
            '<div class="indicator">' +
            '<span class="num">' +
            (i + 1) +
            "/" +
            total_slide_item +
            "</span>" +
            ' <span class="lab">' +
            $(slider.$slides[i]).find(".slide_item").attr("data-dot-title") +
            "</span>" +
            "</div>" +
            "</button>"
          );
        },
      });
      $(".control .pause").click(function () {
        var $sliderWrap = $(this).parents(".m_sd");
        if ($sliderWrap.attr("data-slick-autoplay-status") == "Y") {
          $sliderWrap.attr("data-slick-autoplay-status", "N");
          $(this).attr("title", "슬라이드 재생");
          $(this).addClass("off");
        } else if ($sliderWrap.attr("data-slick-autoplay-status") == "N") {
          $sliderWrap.attr("data-slick-autoplay-status", "Y");
          $(this).attr("title", "슬라이드 정지");
          $(this).removeClass("off");
        }
      });

      setInterval(function () {
        $(".m_sd > .viewer").each(function (index, node) {
          var $slider = $(node);
          if ($slider.parent().attr("data-slick-autoplay-status") !== "N") {
            var width = $slider
              .find(".slick-dots .slick-active > button > .line_fill span")
              .css("width");
            var buttonWidth = $slider
              .find(".slick-dots .slick-active > button")
              .css("width");
            if (width == buttonWidth) {
              $slider.slick("slickNext");
            }
          }
        });
      }, 500);
    });
  };
  $(".m_sd .viewer").main_slide();

  //edu slide
  $.fn.edu_slide = function () {
    return this.each(function () {
      var $slider = $(this);
      var $sliderWrap = $slider.parents(".edu_sd");
      $(this).slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        dotsClass: $(this).parent().prev().find(".custom_page"),
        appendArrows: $(this).parent().prev().find(".arrows"),

        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },

          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
      var total = $slider.find(".slick-slide").length;
      var play = $slider.parent().prev().find(".play");
      if (total < 5) {
        play.hide();
      }
      play.on("click", function () {
        if ($sliderWrap.attr("data-slick-autoplay-status") == "N") {
          $sliderWrap.attr("data-slick-autoplay-status", "Y");
          $slider.slick("slickPlay");
          $(this).attr("title", "슬라이드 정지").addClass("on");
        } else if ($sliderWrap.attr("data-slick-autoplay-status") == "Y") {
          $sliderWrap.attr("data-slick-autoplay-status", "N");
          $slider.slick("slickPause");
          $(this).attr("title", "슬라이드 재생").removeClass("on");
        }
      });

      var status = $slider.parent().prev().find(".custom_page");
      $slider.on(
        "init reInit afterChange",
        function (event, slick, currentSlide, nextSlide) {
          //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
          var i = (currentSlide ? currentSlide : 0) / 4 + 1;
          var t = Math.ceil(slick.slideCount / 4);
          status.text(i + "/" + t);
        }
      );

      $slider.slick("refresh");
    });
  };
  $(".edu_li.sd").edu_slide();

  // edu_center
  if ($(".cn_li").length >= 1) {
    $(".cn_li").slick({
      dots: true,
      dotsClass: "cn_dots",
      appendDots: $(".dot_wrap"),
      customPaging: function (slide, i) {
        return;
      },
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },

        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
    $(document).on(
      "init reInit afterChange",
      ".cn_li",
      function (event, slick, currentSlide, nextSlide) {
        var status = $(".cn_btn .custom_page");
        var i = (currentSlide ? currentSlide : 0) / 3 + 1;
        var t = Math.ceil(slick.slideCount / 3);
        status.text(i + "/" + t);
      }
    );

    var play = $(".cn_btn .play");
    play.on("click", function () {
      if ($(".cn_li").attr("data-slick-autoplay-status") == "N") {
        $(".cn_li").attr("data-slick-autoplay-status", "Y");
        $(".cn_li").slick("slickPlay");
        $(this).attr("title", "슬라이드 정지").removeClass("on");
      } else if ($(".cn_li").attr("data-slick-autoplay-status") == "Y") {
        $(".cn_li").attr("data-slick-autoplay-status", "N");
        $(".cn_li").slick("slickPause");
        $(this).attr("title", "슬라이드 재생").addClass("on");
      }
    });

    $(".cn_li").slick("refresh");
  }

  if ($(".fac_img .sd").length >= 1) {
    $(".fac_img .sd").slick({
      dots: true,
      dotsClass: "cn_dots",
      appendDots: $(".dot_wrap"),
      customPaging: function (slide, i) {
        return;
      },
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    });
    $(document).on(
      "init reInit afterChange",
      ".fac_img .sd",
      function (event, slick, currentSlide, nextSlide) {
        var status = $(".cn_btn .custom_page");
        var i = (currentSlide ? currentSlide : 0) + 1;
        var t = Math.ceil(slick.slideCount);
        status.text(i + "/" + t);
      }
    );

    var play = $(".cn_btn .play");
    play.on("click", function () {
      if ($(".fac_img .sd").attr("data-slick-autoplay-status") == "N") {
        $(".fac_img .sd").attr("data-slick-autoplay-status", "Y");
        $(".fac_img .sd").slick("slickPlay");
        $(this).attr("title", "슬라이드 재생").addClass("on");
      } else if ($(".fac_img .sd").attr("data-slick-autoplay-status") == "Y") {
        $(".fac_img .sd").attr("data-slick-autoplay-status", "N");
        $(".fac_img .sd").slick("slickPause");
        $(this).attr("title", "슬라이드 정지").removeClass("on");
      }
    });

    $(".fac_img .sd").slick("refresh");
  }

  // m_sd
  if ($(".m_sd").length > 0) {
    $(".m_sd").slick({
      dots: true,
      appendDots: $(".m_sd_dot"),
      customPaging: function (slide, i) {
        return;
      },
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    });
    var play = $(".m_sd_play");
    play.on("click", function () {
      if ($(".m_sd").attr("data-slick-autoplay-status") == "N") {
        $(".m_sd").attr("data-slick-autoplay-status", "Y");
        $(".m_sd").slick("slickPlay");
        $(this).attr("title", "슬라이드 정지").removeClass("on");
      } else if ($(".m_sd").attr("data-slick-autoplay-status") == "Y") {
        $(".m_sd").attr("data-slick-autoplay-status", "N");
        $(".m_sd").slick("slickPause");
        $(this).attr("title", "슬라이드 재생").addClass("on");
      }
    });
  }

  if ($(".card_sd").length > 0) {
    $(".card_sd .sd").slick({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      asNavFor: ".slider_nav .sd",
    });

    $(".slider_nav .sd").slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: ".card_sd .sd",
      dots: false,
      arrows: true,
      focusOnSelect: true,
    });
  }

  // board_ban
  if ($(".board_ban").length > 0) {
    (function () {
      // IIFE로 scope 제한
      var $boardBan = $(".board_ban");
      var count = $boardBan.children("div").length;
	  var w = $(window).width();

      // 화면 크기별 최소 개수 체크
      if ((w >= 768 && count <= 3) || (w >= 576 && w < 768 && count <= 2)) {
        return; // 조건 만족 시 slick 적용 안 함
      }

      $boardBan.slick({
        dots: true,
        appendDots: $(".ban_dot"),
        customPaging: function (slide, i) {
          return;
        },
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        responsive: [
          { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
      });

      var $play = $(".ban_play", $boardBan.parent());
      var total = $boardBan.find(".slick-slide").length;

      if (total < 5) $play.hide();

      $play.on("click", function () {
        var isPlaying = $boardBan.attr("data-slick-autoplay-status") === "Y";
        if (isPlaying) {
          $boardBan.attr("data-slick-autoplay-status", "N");
          $boardBan.slick("slickPause");
          $(this).attr("title", "슬라이드 재생").addClass("on");
        } else {
          $boardBan.attr("data-slick-autoplay-status", "Y");
          $boardBan.slick("slickPlay");
          $(this).attr("title", "슬라이드 정지").removeClass("on");
        }
      });
    })(); // IIFE 끝
  }

  // main videoplay
  var video = $(".main_video").get(0);
  $(document).on("click", ".video_wrap", function () {
    if (video.paused) {
      video.play();
      $(".play_wrap").css("display", "none");
    } else {
      video.pause();
      $(".play_wrap").css("display", "block");
    }
  });

  //exam_slide
  $.fn.exam_slide = function () {
    return this.each(function () {
      var $slider = $(this);
      var $sliderWrap = $slider.parents(".card_exam");
      $(this).slick({
        dots: false,
        infinite: true,
        //fade:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendArrows: $(this).parents(".card_exam").find(".control"),
      });
      var total = $slider.find(".slick-slide").length;
      var play = $sliderWrap.find(".pause");
      if (total < 2) {
        play.hide();
      }
      $slider.slick("slickPlay");
      play.on("click", function () {
        if ($sliderWrap.attr("data-slick-autoplay-status") == "N") {
          $sliderWrap.attr("data-slick-autoplay-status", "Y");
          $slider.slick("slickPlay");
          $(this).attr("title", "슬라이드 정지").removeClass("off");
        } else if ($sliderWrap.attr("data-slick-autoplay-status") == "Y") {
          $sliderWrap.attr("data-slick-autoplay-status", "N");
          $slider.slick("slickPause");
          $(this).attr("title", "슬라이드 재생").addClass("off");
        }
      });
    });
  };
  $(".exam_sd").exam_slide();

  //popup banner
  $.fn.pop_slide = function () {
    return this.each(function () {
      var $slider = $(this),
        $sliderWrap = $slider.parents(".pop_ban"),
        $slider_title = $sliderWrap.find(".title");
      $slider.slick({
        arrows: false,
        dots: true,
        appendDots: $(".pop_dot"),
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
      });
      $slider.on("afterChange", function () {
        $slider_text = $slider
          .find(".slick-active .ban_item")
          .attr("data-pop-title");
        $slider_title.text($slider_text);
      });
      $sliderWrap.find(".head button").on("click", function () {
        $sliderWrap.hide();
      });
      var play = $(".pop_play");
      play.on("click", function () {
        if ($sliderWrap.attr("data-slick-autoplay-status") == "N") {
          $sliderWrap.attr("data-slick-autoplay-status", "Y");
          $slider.slick("slickPlay");
          $(this).attr("title", "슬라이드 정지").removeClass("on");
        } else if ($sliderWrap.attr("data-slick-autoplay-status") == "Y") {
          $sliderWrap.attr("data-slick-autoplay-status", "N");
          $slider.slick("slickPause");
          $(this).attr("title", "슬라이드 재생").addClass("on");
        }
      });
    });
  };
  $(".pop_sd .viewer").pop_slide();

  //ct_link
  $(".ct_link a").click(function (event) {
    event.preventDefault();
    var blank;
    var top_pos;
    if ($(window).width() > 1023) {
      blank = 95;
    } else {
      blank = 70;
    }
    top_pos = $(this.hash).offset().top - blank;
    $("html, body").animate({ scrollTop: top_pos }, 500);
  });
  //center popup
  $(".ct_dialog .p_close").on("click", function (e) {
    e.preventDefault();
    var popup = $(this).parents(".ct_dialog");
    if (popup.length > 0) {
      popup.fadeOut();
      //$('body').css('overflow', 'auto');
    }
  });
  //faq_menu
  $(document).on("click", ".faq_menu dt > a", function () {
    var tDL = $(this).parents("dl");
    var tDD = $(this).parent("dt").next();
    if (tDD.is(":hidden")) {
      tDL.addClass("on").find("dd").slideDown();
    } else {
      tDL.removeClass("on").find("dd").slideUp();
    }
    return false;
  });
  // sub_left
  $(".content_left li > a").on("click", function () {
    console.log($(this).parent().hasClass("on"));
    if ($(this).parent("li").hasClass("on") == true) {
      $(this).parent("li").removeClass("on");
      $(".left_sub").hide();
    } else {
      $(".content_left li").removeClass("on");
      $(this).parent("li").addClass("on");
      $(this).next(".left_sub").show();
    }
  });

  //tab
  $.fn.tabContainer = function () {
    return this.each(function () {
      if ($(this).hasClass("nojs")) {
        return false;
      }
      var tab_name = this.classList; //메인 교육과정
      var tabAnchor = $(this).find("> li");
      tabAnchor.each(function () {
        var menu = $(this);
        var target = $("#" + menu.find(">a").attr("href").split("#")[1]);
        var link = menu.find(">a");
        target.css("display", "none");
        if (menu.hasClass("on")) {
          target.css("display", "block");
        }
        link.click(function () {
          if (!$(this).parents("li").hasClass("on")) {
            tabAnchor.removeClass("on");
            tabAnchor.each(function () {
              $("#" + $(this).find(">a").attr("href").split("#")[1]).css(
                "display",
                "none"
              );
            });
            menu.addClass("on");
            target.css("display", "block");
          }
          if (tab_name == "cs_tab") {
            $(".course .edu_li.sd").slick("refresh");
          }
          return false;
        });
      });
      //tabAnchor.eq(0).trigger('click');
    });
  };
  $(".cs_head .cs_tab, .nav_tabs").tabContainer();
  //top button
  $(".btn_top").click(function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 });
  });
  //role_pop
  $("[href='#role_pop']").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("active").find(".role_pop").toggle();
  });
  //cr_manage
  $(".cr_manage .role .alert").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(".cr_manage .head .noti").toggle();
  });

  //preview
  //lnb
  $.fn.lnb = function () {
    return this.each(function () {
      var $menu = $(this);
      $menu.find("li").each(function () {
        var $sub = $(this).find("a + ul");
        $sub.addClass("sub");
        if ($sub.length > 0) {
          $(this).find("> a").addClass("opener");
        }
        if ($(this).hasClass("on")) {
          $(this).find(">ul").css("display", "block");
        }
      });
      var $menu_openers = $menu.find(".opener");
      $menu_openers.on("click", function (e) {
        e.preventDefault();
        var $Layer = $(this).next("ul");
        console.log($Layer);
        if ($Layer.is(":hidden")) {
          $Layer.stop().slideDown(function () {
            $(this).parent("li").addClass("on");
          });
        } else {
          $Layer.stop().slideUp(function () {
            $(this).parent("li").removeClass("on");
          });
        }
      });
    });
  };
  $("#sidr .nav").lnb();

  //jquery ui datepicker
  $.datepicker.setDefaults({
    showOn: "both",
    buttonText: "",
    dateFormat: "yy-mm-dd",
    changeYear: true,
    yearRange: "1900:+nn",
    prevText: "이전 달",
    nextText: "다음 달",
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    showMonthAfterYear: true,
    yearSuffix: "년",
  });

  $(".btn_detail.down").click(function () {
    if ($(this).hasClass("up")) {
      $(this).removeClass("up");
      $(this).siblings(".ag_con").slideUp();
    } else {
      $(this).addClass("up");
      $(this).siblings(".ag_con").slideDown();
    }
  });

  // search_wrap
  $(".btn_ds").click(function () {
    var search_wrap = $(".search_wrap");
    if (search_wrap.hasClass("on")) {
      search_wrap.removeClass("on");
      $(this).removeClass("blue");
    } else {
      search_wrap.addClass("on");
      $(this).addClass("blue");
    }
  });

  $(".align_li a").click(function () {
    $(".align_li li").removeClass("on");
    if ($(this).hasClass("grid")) {
      $(".sub_edu").removeClass("type_02");
      $(".grid").parent().addClass("on");
      $(".sub_edu_col").hide();
      $(".sub_edu").show();
    } else if ($(this).hasClass("list")) {
      $(".sub_edu").addClass("type_02");
      $(".list").parent().addClass("on");
      $(".sub_edu").hide();
      $(".sub_edu_col").show();
    }
  });
  // 답지 스크롤에 따라 좌표값 변경
  var currentPosition = parseInt($(".exam_view .side").css("top"));
  $(window).scroll(function () {
    var position = $(window).scrollTop();
    if (position <= 0) {
      $(".exam_view .side").removeAttr("style");
    } else {
      $(".exam_view .side")
        .stop()
        .css("top", position + currentPosition - 60 + "px");
    }
  });

  // 답지 모바일
  $(".cl_wrap .toggle").on("click", function () {
    $(".exam_view .side").addClass("on");
  });

  $(".exam_view .side .top .close").on("click", function () {
    $(".exam_view .side").removeClass("on");
  });

  //목차 자세히보기
  var $index = $(".idx_detail");
  var $tog = $(".tog");
  $tog.click(function () {
    $index.slideToggle();
  });
  $(".professor_detail_wrap .close").on("click", function () {
    $(".professor_detail_wrap").fadeOut();
  });

  // 설문
  // var b_more = $(".quiz_frame .top .b_more")
  // b_more.on('click',function(){
  // 	if(!b_more.hasClass("on")){
  // 		$(this).addClass("on")
  // 		$(this).parents().siblings(".sl_down").show();
  // 	} else{
  // 		b_more.removeClass("on")
  // 		$(".sl_down").hide();
  // 	}
  // });

  // var b_join = $(".quiz_li .lector_info .b_join")
  // b_join.click(function(){
  // 	if(!b_join.hasClass("on")){
  // 		$(this).addClass("on")
  // 		$(this).parents().siblings(".lc_ex").show();
  // 	} else{
  // 		b_join.removeClass("on")
  // 		$(".lc_ex").hide();
  // 	}
  // });

  // $(".b_complete").on('click',function(){
  // 	console.log($(this).parents())
  // 	$(this).parents(".con").addClass("complete")
  // 	$(this).parents(".lc_ex").hide();
  // 	console.log($(this).parents().siblings(".lector_info").children(".b_join"))
  // })

  //

  $(".b_sld").on("click", function () {
    var week = $(this).parent().siblings(".len_li");
    if (week.css("display") == "none") {
      week.slideDown();
      $(this).addClass("on");
    } else {
      week.slideUp();
      $(this).removeClass("on");
    }
  });

  //chatbot
  $(".b_chat_close").on("click", function () {
    $(this)
      .parents(".chatbot")
      .fadeOut(500, function () {
        $(this).remove();
      });
  });
});
function onInfoView(idNum){
	$("#" + idNum).fadeIn()
}

function openWindowPop(url, name, options){
	var options = options +', status=no, menubar=no, toolbar=no, resizable=no';
	window.open(url, name, options);

}
