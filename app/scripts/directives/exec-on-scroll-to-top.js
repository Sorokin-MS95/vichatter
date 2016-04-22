/**
 * Created by kated on 4/17/2016.
 */
var app = angular.module('viChatter');
app.directive('execOnScrollToTop', function () {

    return {

        restrict: 'EA',
        scope: {
            'callbackOnTopScroll': '&',
            'scrollBottom': "="
        },
        link: function (scope, element, attrs) {


            element.on('scroll', function (e) {

                if (!e.target.scrollTop) {
                    console.log("scrolled to top...");
                    scope.callbackOnTopScroll();
                }

            });

            scope.$watchCollection('scrollBottom', function (newValue) {
                if (newValue) {
                    $(element).animate({ scrollTop: $(element)[0].scrollHeight }, "slow");
                }
            });
        }

    };

});
