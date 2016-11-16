$(function () {
    var bgnum = parseInt(Math.random(0,1) * 9 + 1),
        bgimg = '/lib/images/bgs/bg' + bgnum + '.jpeg'
    $('body').css('background-image', 'url('+ bgimg +')');
});