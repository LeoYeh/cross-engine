//namespace
this.viewjs = this.viewjs || {};
(function () {

    /**
    * Button Like Class, can be used for various button Effect
    **/
    var CButton = function () {
    }

    // [--PRIVATE--]
    var listeners;

    //-------------------------------------------------------------------
    //[--PUBLIC--] Properties | Functions
    //-------------------------------------------------------------------
    var p = CButton.prototype = new viewjs.CDispatcher();

    viewjs.CButton = CButton;

}());
