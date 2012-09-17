//namespace
this.ui = this.ui || {};
(function () {

    /**
    * Button Like Class, can be used for various button Effect
    **/
    var CButton = function () {
    }

    //-------------------------------------------------------------------
    //[--PUBLIC--] Properties | Functions
    //-------------------------------------------------------------------
    var p = CButton.prototype = new viewjs.CDisplay();
    p.hoverCss;
    p.clickCss;

    p.asTextureButton = function (texture) {

    }

    p.asImageButton = function (imagePath, hasHover, hasClick, rowHeight) {
        //unbind the button first
        $(this.div).off('mousedown mouseup mouseenter mouseleave');
        $(this.div).css('background', 'url("' + imagePath + '") no-repeat 0px 0px');
        var hoverY = 0;
        var clickY = 0;
        if (hasHover) hoverY = -rowHeight;
        if (hasClick) clickY = hoverY - rowHeight;
        if (hasHover) {
            $(this.div).on("mouseenter", function () {
                $(this).css('background-position', '0px '+hoverY+'px');
            });
            $(this.div).on("mouseleave", function () {
                $(this).css('background-position', '0px 0px');
            });
        }
        if (hasClick) {
            $(this.div).on("mousedown", function () {
                $(this).css('background-position', '0px ' + clickY + 'px');
            });
            $(this.div).on("mouseup", function () {
                $(this).css('background-position', '0px ' + hoverY + 'px');
            });
        }
    }

    /**
    * 設定按鈕為位移背景圖片效果之image button
    * imagePath =>圖片路徑, hasHover=>, 是否有hover效果=>, hasClick=> 是否有click效果
    * gapSize=>按鈕state改變位移距離, clickPos=>點下後移到位置, direction=>位移方向上下或左右 [h,v], time=>tween時間
    */
    p.asTweenImageButton = function (imagePath, hasHover, hasClick, gapSize, clickPos, direction, time) {
        //unbind the button first
        $(this.div).off('mousedown mouseup mouseenter mouseleave');
        $(this.div).css('background', 'url("' + imagePath + '") no-repeat 0px 0px');
        var hoverGap = 0;
        if (hasHover) hoverGap = -gapSize;
        if (hasHover) {
            $(this.div).on("mouseenter", function () {
                if (direction == "h") {
                    TweenMax.to($(this), time, { css: { backgroundPosition: hoverGap +"px 0px" } });
                } else {
                    TweenMax.to($(this), time, { css: { backgroundPosition: "0px "+hoverGap+"px" } });
                }
            });
            $(this.div).on("mouseleave", function () {
                TweenMax.to($(this), time, { css: { backgroundPosition: "0px 0px" } });
            });
        }
        if (hasClick) {
            $(this.div).on("mousedown", function () {
                TweenMax.killTweensOf($(this));
                if (direction == "h") {
                    $(this).css({ backgroundPosition: clickPos + "px 0px" });
                } else {
                    $(this).css({ backgroundPosition: "0px " + clickPos + "px" });
                }
                
            });
            $(this.div).on("mouseup", function () {
                if (direction == "h") {
                    $(this).css({ backgroundPosition: hoverGap + "px 0px" });
                } else {
                    $(this).css({ backgroundPosition: "0px " + hoverGap + "px" });
                }
            });
        }
    }

    p.onClick = function (callBack) {
        $(this.div).on("click", function () {
            callBack();
        });
    }

    p.asCssButton = function (hoverCss, clickCss) {
        //unbind the button first
        $(this.div).off('mousedown mouseup mouseenter mouseleave');
        this.hoverCss = hoverCss;
        this.clickCss = clickCss;
        var self = this;
        if (hoverCss!=null) {
            $(this.div).on("mouseenter", function () {
                self.setHoverCss();
            });
            $(this.div).on("mouseleave", function () {
                self.setNormalCss();
            });
        };
        if (clickCss != null) {
            $(this.div).on("mousedown", function () {
                self.setClickCss();
            });
            $(this.div).on("mouseup", function () {
                $(this).removeClass(clickCss);
            });
        };
    }

    p.setNormalCss = function () {
        $(this.div).removeClass(this.hoverCss);
    }
    p.setHoverCss = function () {
        $(this.div).addClass(this.hoverCss);
    }
    p.setClickCss = function () {
        $(this.div).addClass(this.clickCss);
    }

    p.asTweenHoverButton = function (tweenTime, tweenHoverObj, tweenOutObj) {
        //unbind the button first
        $(this.div).off('mousedown mouseup mouseenter mouseleave');
        $(this.div).on("mouseenter", function () {
            TweenMax.to($(this), tweenTime, tweenHoverObj);
        });
        $(this.div).on("mouseleave", function () {
            TweenMax.to($(this), tweenTime, tweenOutObj);
        });
    }

    ui.CButton = CButton;

}());
