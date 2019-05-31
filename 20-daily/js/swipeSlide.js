/**
 * swipeSlide
 * http://ons.me/500.html
 * ����
 * 3.4.4(160909)
 */
;(function(win,$){
    'use strict';
    
    // �ж�IE
    var browser = {
        ie10 : win.navigator.msPointerEnabled,
        ie11 : win.navigator.pointerEnabled
    };
    // �����¼�
    var events = ['touchstart','touchmove','touchend'];
    // ���
    var support = {
        // ����
        touch : (win.Modernizr && Modernizr.touch === true) || (function () {
            return !!(('ontouchstart' in win) || win.DocumentTouch && document instanceof DocumentTouch);
        })()
    };

    // �ж������
    if (browser.ie10) events = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
    if (browser.ie11) events = ['pointerdown', 'pointermove', 'pointerup'];

    // ������ֵ
    var touchEvents = {
        touchStart : events[0],
        touchMove : events[1],
        touchEnd : events[2]
    };

    // ��swipeSlide
    $.fn.swipeSlide = function(options){
        var list = [];
        this.each(function(i, me){
            list.push(new sS(me, options));
        });
        return list;
    };
    var sS = function(element, options){
        var me = this;
        me.$el = $(element);
        me._distance = 50;
        me.allowSlideClick = true;
        me.init(options);
    };

    // ��ʼ��
    sS.prototype.init = function(options){
        var me = this;
        me.opts = $.extend({}, {
            ul : me.$el.children('ul'),             // ��dom
            li : me.$el.children().children('li'),  // ��dom
            index : 0,                              // �ֲ���ʼֵ
            continuousScroll : false,               // ��������
            autoSwipe : true,                       // �Զ��л�
            speed : 4000,                           // �л��ٶ�
            axisX : true,                           // X��
            transitionType : 'ease',                // ��������
            lazyLoad : false,                       // ͼƬ������
            firstCallback : function(){},           // ҳ����ػص�
            callback : function(){}                 // ÿ�ι����ص�
        }, options);
        me._index = me.opts.index;
        // �ֲ�����
        me._liLength = me.opts.li.length;
        me.isScrolling;

        // �ص�
        me.opts.firstCallback(me._index,me._liLength,me.$el);

        // ����ֲ�С�ڵ���1��������
        if(me._liLength <= 1){
            if(me.opts.lazyLoad) fnLazyLoad(me, 0);
            return false;
        }

        // ��������������dom
        if(me.opts.continuousScroll) me.opts.ul.prepend(me.opts.li.last().clone()).append(me.opts.li.first().clone());

        // ������ͼƬ
        if(me.opts.lazyLoad){
            fnLazyLoad(me, me._index);
            if(me.opts.continuousScroll){
                fnLazyLoad(me, me._index+1);
                fnLazyLoad(me, me._index+2);
                // ����ǵ�һ��
                if(me._index == 0){
                    fnLazyLoad(me, me._liLength);
                // ��������һ��
                }else if(me._index+1 == me._liLength){
                    fnLazyLoad(me, 1);
                }
            }else{
                // �������������
                if(me._index == 0){
                    fnLazyLoad(me, me._index+1);
                }else if(me._index+1 == me._liLength){
                    fnLazyLoad(me, me._index-1);
                }else{
                    fnLazyLoad(me, me._index+1);
                    fnLazyLoad(me, me._index-1);
                }
            }
        }

        // �ֲ��Ŀ��
        fnGetSlideDistance();

        if(browser.ie10 || browser.ie11){
            // IE����
            var action = '';
            if(me.opts.axisX){
                action = 'pan-y';
            }else{
                action = 'none';
            }
            me.$el.css({'-ms-touch-action':action,'touch-action':action});

            // ���IE��������click
            me.$el.on('click',function(){
                return me.allowSlideClick;
            });
        }

        // �����ֲ�
        fnAutoSlide(me);

        // �󶨴���
        me.$el.on(touchEvents.touchStart,function(e){
            fnTouches(e);
            fnTouchstart(e, me);
        });
        me.$el.on(touchEvents.touchMove,function(e){
            fnTouches(e);
            fnTouchmove(e, me);
        });
        me.$el.on(touchEvents.touchEnd,function(){
            fnTouchend(me);
        });
        me.opts.ul.on('webkitTransitionEnd MSTransitionEnd transitionend',function(){
            fnAutoSlide(me);
        });

        // �����������ڵ���
        $(win).on('onorientationchange' in win ? 'orientationchange' : 'resize',function(){
            clearTimeout(me.timer);
            me.timer = setTimeout(fnGetSlideDistance,150);
        });
        
        // ��ȡ�ֲ����
        function fnGetSlideDistance(){
            var $li = me.opts.ul.children();
            me._slideDistance = me.opts.axisX ? me.opts.ul.width() : me.opts.ul.height();
            // ��λ
            fnTransition(me, me.opts.ul, 0);
            fnTranslate(me, me.opts.ul, -me._slideDistance*me._index);
            fnTransition(me, $li, 0);
            var num = me.opts.continuousScroll ? -1 : 0;
            $li.each(function(i){
                fnTranslate(me, $(this), me._slideDistance*(i+num));
            });
        }
    };

    // css����
    function fnTransition(me, dom, num){
        dom.css({
            '-webkit-transition':'all '+num+'s '+me.opts.transitionType,
            'transition':'all '+num+'s '+me.opts.transitionType
        });
    }

    // cssλ��
    function fnTranslate(me, dom, distance){
        var result = me.opts.axisX ? distance+'px,0,0' : '0,'+distance+'px,0';
        dom.css({
            '-webkit-transform':'translate3d('+result+')',
            'transform':'translate3d('+result+')'
        });
    }

    // ������ͼƬ
    function fnLazyLoad(me, index){
        var $li = me.opts.ul.children();
        var $thisImg = $li.eq(index).find('[data-src]');
        if($thisImg){
            $thisImg.each(function(i){
                var $this = $(this);
                if($this.is('img')){
                    $this.attr('src',$this.data('src'));
                    $this.removeAttr('data-src');
                }else{
                    $this.css({'background-image':'url('+$this.data('src')+')'});
                    $this.removeAttr('data-src');
                }
            });
        }
    }

    // touches
    function fnTouches(e){
        if(support.touch && !e.touches){
            e.touches = e.originalEvent.touches;
        }
    }

    // touchstart
    function fnTouchstart(e, me){
        me.isScrolling = undefined;
        me._moveDistance = me._moveDistanceIE = 0;
        // ����ʱ������
        me._startX = support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
        me._startY = support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
    }

    // touchmove
    function fnTouchmove(e, me){
        // ����Զ��л���move��ʱ�����autoSlide�Զ��ֲ�����
        if(me.opts.autoSwipe) fnStopSlide(me);
        me.allowSlideClick = false;
        // ����ʱ������
        me._curX = support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
        me._curY = support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
        // ����ʱ�ľ���
        me._moveX = me._curX - me._startX;
        me._moveY = me._curY - me._startY;
        // �Ż�������ֹ�¼�
        if(typeof me.isScrolling == 'undefined'){
            if(me.opts.axisX){
                me.isScrolling = !!(Math.abs(me._moveX) >= Math.abs(me._moveY));
            }else{
                me.isScrolling = !!(Math.abs(me._moveY) >= Math.abs(me._moveX));
            }
        }
        
        // ����
        if(me.isScrolling){
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            // ����ʱ����
            fnTransition(me, me.opts.ul, 0);
            me._moveDistance = me._moveDistanceIE = me.opts.axisX ? me._moveX : me._moveY;
        }
        if(!me.opts.continuousScroll){
            // ����ǵ�һ�����������¹������Ͳ��ù��� || ��������һ�����������Ϲ������Ͳ��ù���
            if(me._index == 0 && me._moveDistance > 0 || (me._index + 1) >= me._liLength && me._moveDistance < 0){
                me._moveDistance = 0;
            }
        }
        // ����ʱ���ֹ���
        fnTranslate(me, me.opts.ul, -(me._slideDistance * me._index - me._moveDistance));
    }

    // touchend
    function fnTouchend(me){
        if(me.opts.autoSwipe){
            fnAutoSlide(me);
        }

        // ���IE��������click
        if(browser.ie10 || browser.ie11){
            if(Math.abs(me._moveDistanceIE) < 5){
                me.allowSlideClick = true;
            }
            setTimeout(function(){
                me.allowSlideClick = true;
            },100);
        }

        // ����С
        if(Math.abs(me._moveDistance) <= me._distance){
            fnSlide(me, '', '.3');
        // �����
        }else{
            // ��ָ������һ������
            if(me._moveDistance > me._distance){
                fnSlide(me, 'prev', '.3');
            // ��ָ������һ������
            }else if(Math.abs(me._moveDistance) > me._distance){
                fnSlide(me, 'next', '.3');
            }
        }
        me._moveDistance = me._moveDistanceIE = 0;
    }

    // �Զ��ֲ�
    function fnAutoSlide(me){
        if(me.opts.autoSwipe){
            fnStopSlide(me);
            me.autoSlide = setInterval(function(){
                fnSlide(me, 'next', '.3');
            },me.opts.speed);
        }
    }

    // ֹͣ�ֲ�
    function fnStopSlide(me){
        clearInterval(me.autoSlide);
    }

    // ָ���ֲ�
    sS.prototype.goTo = function(i){
        var me = this;
        fnSlide(me, i, '.3');
    };

    // �ֲ�����
    function fnSlide(me, go, num){
        // �жϷ���
        if(typeof go === 'number'){
            me._index = go;
            // ���ص�ǰ����ǰһ������һ��
            if(me.opts.lazyLoad){
                // ��Ϊ��������������dom������Ҫ���1
                if(me.opts.continuousScroll){
                    fnLazyLoad(me, me._index);
                    fnLazyLoad(me, me._index+1);
                    fnLazyLoad(me, me._index+2);
                }else{
                    fnLazyLoad(me, me._index-1);
                    fnLazyLoad(me, me._index);
                    fnLazyLoad(me, me._index+1);
                }
            }
        }else if(go == 'next'){
            me._index++;
            if(me.opts.lazyLoad){
                if(me.opts.continuousScroll){
                    fnLazyLoad(me, me._index+2);
                    // �������һ��
                    if(me._index+1 == me._liLength){
                        fnLazyLoad(me, 1);
                    // ���һ�����������󻬶�
                    }else if(me._index == me._liLength){
                        fnLazyLoad(me, 0);
                        fnLazyLoad(me, 2);
                    }
                }else{
                    fnLazyLoad(me, me._index+1);
                }
            }
        }else if(go == 'prev'){
            me._index--;
            if(me.opts.lazyLoad){
                if(me.opts.continuousScroll){
                    fnLazyLoad(me, me._index);
                    // ������һ��
                    if(me._index == 0){
                        fnLazyLoad(me, me._liLength);
                    
                    // ��һ����������ǰ����
                    }else if(me._index < 0){
                        fnLazyLoad(me, me._liLength-1);
                    }
                }else{
                    fnLazyLoad(me, me._index-1);
                }
            }
        }
        // �������������
        if(me.opts.continuousScroll){
            if(me._index >= me._liLength){
                fnScroll(me, num);
                me._index = 0;
                setTimeout(function(){
                    fnScroll(me, 0);
                    return;
                },300);
            }else if(me._index < 0){
                fnScroll(me, num);
                me._index = me._liLength-1;
                setTimeout(function(){
                    fnScroll(me, 0);
                    return;
                },300);
            }else{
                fnScroll(me, num);
            }
        }else{
            if(me._index >= me._liLength){
                me._index = 0;
            }else if(me._index < 0){
                me._index = me._liLength-1;
            }
            fnScroll(me, num);
        }
        // ����ڶ�������Ϊ�գ��Ͳ��ص�
        if(arguments[1] !== ''){
            me.opts.callback(me._index,me._liLength,me.$el);
        }
    }

    // �ֲ�����
    function fnScroll(me, num){
        fnTransition(me, me.opts.ul, num);
        fnTranslate(me, me.opts.ul, -me._index*me._slideDistance);
    }

})(window, window.Zepto || window.jQuery);