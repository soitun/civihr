angular.module('templates-main', ['directives/datepickerPopup.html', 'directives/day.html']);

angular.module("directives/datepickerPopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/datepickerPopup.html",
    "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\">\n" +
    "	<li ng-transclude></li>\n" +
    "</ul>");
}]);

angular.module("directives/day.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/day.html",
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "        <th>\n" +
    "            <style>\n" +
    "                .text-muted{\n" +
    "                    color: #666666;\n" +
    "                }\n" +
    "            </style>\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i\n" +
    "                    class=\"glyphicon glyphicon-chevron-left\"></i></button>\n" +
    "        </th>\n" +
    "        <th colspan=\"{{5 + showWeeks}}\">\n" +
    "            <button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\"\n" +
    "                    class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong>\n" +
    "            </button>\n" +
    "        </th>\n" +
    "        <th>\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i\n" +
    "                    class=\"glyphicon glyphicon-chevron-right\"></i></button>\n" +
    "        </th>\n" +
    "    </tr>\n" +
    "\n" +
    "    <tr>\n" +
    "        <th ng-show=\"showWeeks\" class=\"text-center\"></th>\n" +
    "        <th ng-repeat=\"label in labels track by $index\" class=\"text-center\">\n" +
    "            <small aria-label=\"{{label.full}}\">{{label.abbr}}</small>\n" +
    "        </th>\n" +
    "    </tr>\n" +
    "\n" +
    "    </thead>\n" +
    "\n" +
    "    <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "        <td ng-show=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    "        <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\"\n" +
    "            aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "            <button type=\"button\"\n" +
    "                    style=\"width:100%;\"\n" +
    "                    class=\"btn btn-default btn-sm\"\n" +
    "                    ng-class=\"{\n" +
    "                        'btn-info': dt.selected,\n" +
    "                        active: isActive(dt)\n" +
    "                    }\"\n" +
    "                    ng-click=\"select(dt.date)\"\n" +
    "                    ng-disabled=\"dt.disabled\"\n" +
    "                    tabindex=\"-1\">\n" +
    "\n" +
    "                <span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span>\n" +
    "            </button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "");
}]);