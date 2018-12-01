// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define(["dojo/_base/lang","dojo/_base/array","dojo/_base/Color","dojo/_base/html"],function(m,l,g,f){var b={defaultColor:"#dadada",handlerPosition:{top:null,bottom:null,left:null,right:null},_isNewAddedLayer:function(a,b){b=b.getLayerInfoArrayOfWebmap();for(var c=0,d=b.length;c<d;c++)if(b[c].id===a.id)return!1;return!0},zoomToCurrentLayer:function(a){var b=a.config.isZoom,c=a.layerInfosObj;a=a.getSelection();var h;a&&a[0]&&(h=a[0]);b&&h&&(b=c.getLayerInfoById(h))&&b.zoomTo&&b.zoomTo()},shouldHideInfoWindow:function(a,
b){if(!b.map.infoWindow.isShowing)return!1;var c=b.map.infoWindow.getSelectedFeature();return a&&l.some(a,function(a){var d=c&&c.getLayer&&c.getLayer(),e=b.layerInfosObj.getLayerInfoById(a.id),e=d&&e&&e.traversal(function(a){return a.id===d.id});return d===a||e},b)},getVisibleLayerInfos:function(a,b){a=a.getLayerInfoArray();if(b){for(var c=[],d=0,f=a.length;d<f;d++){var e=a[d];if(e.isShowInMap())c.push(e);else for(var k=0,g=b.length;k<g;k++)b[k]===e.id&&c.push(e)}return c}return l.filter(a,function(a){return a.isShowInMap()})},
isTherePreconfiguredLayer:function(a,b){if(b)return!0;if(a&&a.layerState){a=a.layerState;for(var c in a)if(a.hasOwnProperty(c)&&!0===a[c].selected)return!0}return!1},processColor:function(a){return a?new g(a):new g(b.defaultColor)},getScreenMiddle:function(a){var b=0,c=0;a&&(a.root?(a=f.getMarginBox(a.root),b=a.w/2,c=a.h/2):a.width&&a.height&&(b=a.width/2,c=a.height/2));return{left:b,top:c}},hideSelectorPopup:function(a){f.addClass(a,"hide")},showSelectorPopup:function(a){f.removeClass(a,"hide")},
hackToRefreshSwipe:function(a){setTimeout(m.hitch(a,function(){a.swipeDijit.swipe&&a.swipeDijit.swipe()}),200)},cleanHandlerPosition:function(){b.handlerPosition={top:null,bottom:null,left:null,right:null}},isCacheHandlerPosition:function(){return(b.handlerPosition.top||b.handlerPosition.bottom)&&(b.handlerPosition.left||b.handlerPosition.right)?!0:!1},saveHandlerPosition:function(a){a&&(b.handlerPosition.top=a.top,b.handlerPosition.bottom=a.bottom,b.handlerPosition.left=a.left,b.handlerPosition.right=
a.right)},setHandlerPosition:function(a,d,c){d.style&&"scope"===d.style?(b.handlerPosition.top&&(a.top=b.handlerPosition.top-9),b.handlerPosition.bottom&&(a.bottom=b.handlerPosition.bottom),b.handlerPosition.left&&(a.left=b.handlerPosition.left-9),b.handlerPosition.right&&(a.right=b.handlerPosition.right)):(b.handlerPosition.bottom&&(a.top=b.handlerPosition.bottom),b.handlerPosition.top&&(a.bottom=b.handlerPosition.top),b.handlerPosition.right&&(a.left=b.handlerPosition.right),b.handlerPosition.left&&
(a.right=b.handlerPosition.left));0>a.top&&(a.top=0);a.top>c.height&&(a.top=c.height);0>a.left&&(a.left=0);a.left>c.width&&(a.left=c.width)},getLayerNode:function(a){return a._heatmapManager&&a._heatmapManager.imageLayer&&a._heatmapManager.imageLayer._div||a._div}};return b});