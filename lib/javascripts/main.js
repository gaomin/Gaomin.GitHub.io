$(function () {
    var bgnum = parseInt(Math.random(0,1) * 2 + 1),
        bgimg = '/lib/images/bgs/bg' + bgnum + '.jpeg'
    $('body').css('background-image', 'url('+ bgimg +')');
});