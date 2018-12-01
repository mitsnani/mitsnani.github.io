// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"widgets/IncidentAnalysis/setting/FeaturelayerSource":function(){define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin jimu/dijit/Message dojo/text!./FeaturelayerSource.html dojo/_base/lang dojo/_base/array dojox/form/CheckedMultiSelect dojo/on dojo/Evented".split(" "),function(m,n,e,h,f,g,k,l,p,q,r){return m([n,e,h,r],{templateString:g,baseClass:"imt-featurelayer-source",postCreate:function(){this.inherited(arguments);this._initUI()},_initUI:function(){var e=
this.map.itemInfo.itemData.operationalLayers,h=[];0===e.length&&new f({message:this.nls.missingLayerInWebMap});this.weatherLayersSelect=(new p({name:"selectLayers",multiple:!0,style:"width:100%;"})).placeAt(this.selectLayers);for(var g=0;g<e.length;g++){var b=l.filter(h,function(a){return a.label===e[g].title});null!==b&&0!==b.length||this.weatherLayersSelect.addOption({label:e[g].title,value:e[g].title})}if(this.weatherTabAdditionalLayers){var h=this.weatherTabAdditionalLayers.split(","),d=[];l.forEach(h,
k.hitch(this,function(a){d.push(k.trim(a))}));this.weatherLayersSelect.set("value",d)}this.own(q(this.btnOk,"click",k.hitch(this,function(){var a=this._getSelectedLayers();this.emit("ok",a)})));this.own(q(this.btnCancel,"click",k.hitch(this,function(){this.emit("cancel")})))},_getSelectedLayers:function(){var e="";l.forEach(this.weatherLayersSelect.options,k.hitch(this,function(f){f.selected&&(0<e.length&&(e+=","),e+=f.value)}));return e}})})},"widgets/IncidentAnalysis/setting/FieldPicker":function(){define("dojo/_base/declare dijit/_WidgetsInTemplateMixin dijit/form/Select dojo/_base/array dojo/_base/lang dojo/_base/html dojo/dom-style dojo/on dojo/query jimu/BaseWidget jimu/dijit/Message esri/layers/FeatureLayer dojo/text!./FieldPicker.html dojo/Evented jimu/dijit/SimpleTable".split(" "),
function(m,n,e,h,f,g,k,l,p,q,r,t,u,v){return m([q,n,v],{templateString:u,baseClass:"jimu-widget-IMT-setting",advConfig:{},fieldsList:null,callerLayer:null,callerTab:null,callerOpLayers:null,layerList:null,constructor:function(b){this.map=b.map},postCreate:function(){this.inherited(arguments);this.startup()},startup:function(){this.operationsList=[{value:"sum",label:this.nls.sum},{value:"avg",label:this.nls.avg},{value:"min",label:this.nls.min},{value:"max",label:this.nls.max}];var b="";"summary"===
this.callerTab.type?(k.set(this.chk_summary,"display","block"),b="Type"):k.set(this.chk_summary,"display","none");var d=p("th",this.domNode);1<d.length&&(d[1].innerHTML=b);this.own(l(this.btnCancel,"click",f.hitch(this,function(){this.emit("cancel")})));this.own(l(this.btnOk,"click",f.hitch(this,function(){this.updateAdvConfig();this.emit("ok",this.advConfig)})));this.layerTables=[];this.summaryLayers=[];this.advConfig={};this._getAllValidLayers();this.own(l(this.btnAddField,"click",f.hitch(this,
this._addTabRow)))},_updateGeomOptions:function(b){b&&(this.chk_area.set("disabled","esriGeometryPolygon"!==b),this.chk_length.set("disabled","esriGeometryPolyline"!==b))},_getAllValidLayers:function(){h.forEach(this.callerOpLayers,f.hitch(this,function(b){0<b.newSubLayers.length?this._recurseOpLayers(b.newSubLayers):b.id===this.callerLayer&&(this.layerList=b)}));if(this.layerList.layerObject.empty){var b=new t(this.layerList.layerObject.url);l(b,"load",f.hitch(this,function(){this._completeMapLayers(b)}))}else this._completeMapLayers(this.layerList)},
_recurseOpLayers:function(b){h.forEach(b,f.hitch(this,function(b){0<b.newSubLayers.length?this._recurseOpLayers(b.newSubLayers):b.id===this.callerLayer&&(this.layerList=b)}))},_completeMapLayers:function(b){if(b){console.log(b);var d,a;"undefined"===typeof b.layerObject?(a=b.geometryType,this.objectIdField=b.objectIdField,d={url:b.url,fields:[]},b=f.clone(b.fields)):(a=b.layerObject.geometryType,this.objectIdField=b.layerObject.objectIdField,d={url:b.layerObject.url,fields:[]},b=f.clone(b.layerObject.fields));
this.advConfig=d;this._updateGeomOptions(a);this.advConfig.url&&(this._setFields(b),this.callerTab.advConfig&&this.callerTab.advConfig.fields&&0<this.callerTab.advConfig.fields.length&&h.forEach(this.callerTab.advConfig.fields,f.hitch(this,function(a){"count"===a.type?this.chk_count.set("value",!0):"area"===a.type?this.chk_area.set("value",!0):"length"===a.type?this.chk_length.set("value",!0):(console.log(a.type,a.expression),this._populateTabTableRow(a.type,a.expression))})))}},_setFields:function(b){var d=
["esriFieldTypeInteger","esriFieldTypeSmallInteger","esriFieldTypeDouble"];"summary"!==this.callerTab.type&&(d.push("esriFieldTypeString"),d.push("esriFieldTypeDate"));var a=[];h.forEach(b,f.hitch(this,function(c){-1<d.indexOf(c.type)&&a.push({label:c.alias,value:c.name})}));1>a.length&&k.set(this.btnAddField,"display","none");this.fieldsList=f.clone(a)},_populateTabTableRow:function(b,d){var a=this.fieldTable.addRow({});a.success&&a.tr&&(a=a.tr,this._addTabFields(a),this._addTabTypes(a),a.selectFields.set("value",
d),"summary"===this.callerTab.type&&a.selectTypes.set("value",b))},_addTabRow:function(){if("summary"!==this.callerTab.type&&3<=this.fieldTable.getRows().length)new r({message:this.nls.max_records});else{var b=this.fieldTable.addRow({});b.success&&b.tr&&(b=b.tr,this._addTabFields(b),this._addTabTypes(b))}},_addTabFields:function(b){var d=f.clone(this.fieldsList),a=p(".simple-table-cell",b)[0];a&&(g.setStyle(a,"verticalAlign","middle"),d=new e({style:{width:"100%",height:"30px"},options:d}),d.placeAt(a),
d.startup(),b.selectFields=d)},_addTabTypes:function(b){if("summary"===this.callerTab.type){var d=f.clone(this.operationsList),a=p(".simple-table-cell",b)[1];a&&(g.setStyle(a,"verticalAlign","middle"),d=new e({style:{width:"100%",height:"30px"},options:d}),d.placeAt(a),d.startup(),b.selectTypes=d)}},updateAdvConfig:function(){var b=this.fieldTable.getRows(),d=[];"summary"!==this.callerTab.type?h.forEach(b,function(a){d.push({value:0,type:"out",expression:a.selectFields.value,label:a.selectFields.textDirNode.innerText})}):
(this.chk_count.checked&&d.push({value:0,type:"count",expression:this.objectIdField,label:this.nls.count}),this.chk_area.checked&&d.push({value:0,type:"area",expression:this.objectIdField,label:this.nls.area}),this.chk_length.checked&&d.push({value:0,type:"length",expression:this.objectIdField,label:this.nls.length}),h.forEach(b,f.hitch(this,function(a){d.push({value:0,type:a.selectTypes.value,expression:a.selectFields.value,label:a.selectFields.textDirNode.innerText})})));0<d.length?this.advConfig.fields=
d:this.advConfig=null;console.log("ADVCONFIG",this.advConfig)},destroy:function(){this.advConfig=null}})})},"widgets/IncidentAnalysis/setting/_build-generate_module":function(){define(["dojo/text!./Setting.html","dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:widgets/IncidentAnalysis/setting/FeaturelayerSource.html":'\x3cdiv\x3e\r\n  \x3cdiv\x3e\r\n    \x3cspan class\x3d"label"\x3e${nls.selectLayers}: \x3c/span\x3e\r\n    \x3cdiv class\x3d"layerSelect" data-dojo-attach-point\x3d"selectLayers"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"footer"\x3e\r\n      \x3cdiv class\x3d"jimu-btn ok" data-dojo-attach-point\x3d"btnOk"\x3e${nls.ok}\x3c/div\x3e\r\n      \x3cdiv class\x3d"jimu-btn cancel" data-dojo-attach-point\x3d"btnCancel"\x3e${nls.cancel}\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:widgets/IncidentAnalysis/setting/FieldPicker.html":'\x3cdiv style\x3d"height:100%;width:100%;overflow:auto"\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"tableArea" class\x3d"tableArea"\x3e\r\n    \x3cdiv class\x3d"btn-add-section enable" data-dojo-attach-point\x3d"btnAddField"\x3e\r\n        \x3cspan class\x3d"btn-add-icon"\x3e\x3c/span\x3e\r\n        \x3cspan class\x3d"btn-add-label" id\x3d"divLayerTitle" data-dojo-attach-point\x3d"divLayerTitle"\x3e${nls.addField}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"fieldTable" data-dojo-type\x3d"jimu/dijit/SimpleTable" data-dojo-props\x3d\'fields:[{name:"layer",title:"Field","class":"label",type:"empty",width:"400px"},{name:"type",title:"Type","class":"sumlabel",type:"empty"},{name:"actions",title:"Actions","class":"actions",type:"actions",actions:["up","down","delete"],width:"150px"}]\'\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:20px" data-dojo-attach-point\x3d"chk_summary"\x3e\r\n    \x3cdiv class\x3d"col-1-3" data-dojo-attach-point\x3d"div_chkCount"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_count" title\x3d"${nls.count_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.count_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"col-1-3"  data-dojo-attach-point\x3d"div_chkArea"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_area" title\x3d"${nls.area_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.area_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"col-1-3"  data-dojo-attach-point\x3d"div_chkLength"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_length" title\x3d"${nls.length_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.length_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"footer"\x3e\r\n    \x3cdiv class\x3d"jimu-btn ok" data-dojo-attach-point\x3d"btnOk"\x3e${nls.ok}\x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-btn cancel" data-dojo-attach-point\x3d"btnCancel"\x3e${nls.cancel}\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:widgets/IncidentAnalysis/setting/Setting.html":'\x3cdiv style\x3d"width:100%;height:100%;"\x3e\r\n  \x3c!-- Tabs --\x3e\r\n  \x3cdiv class\x3d"jimu-r-row"\x3e\r\n    \x3cdiv class\x3d"jimu-r-row"\x3e\r\n      \x3cdiv class\x3d"label" style\x3d"font-weight: bold;"\x3e\r\n        ${nls.tabs_section_Label}\r\n      \x3c/div\x3e\r\n      \x3chr/\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-r-row"\x3e\r\n      \x3cdiv class\x3d"label"\x3e${nls.optional_lbl}\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:10px"\x3e\r\n      \x3cdiv class\x3d"col-1-2"\x3e\r\n          \x3cspan class\x3d"label"\x3e${nls.incident_lbl}: \x3c/span\x3e\r\n          \x3cinput data-dojo-type\x3d"dijit/form/TextBox" data-dojo-attach-point\x3d"incident_lbl" /\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-1-2"\x3e\r\n          \x3cspan class\x3d"label"\x3e${nls.locate_lbl}: \x3c/span\x3e\r\n          \x3cinput data-dojo-type\x3d"dijit/form/TextBox" data-dojo-attach-point\x3d"locate_lbl" /\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"btn-add-section enable" data-dojo-attach-point\x3d"btnAddTab"\x3e\r\n      \x3cspan class\x3d"btn-add-icon"\x3e\x3c/span\x3e\r\n      \x3cspan class\x3d"btn-add-label"\x3e${nls.addTab}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"tabTable" data-dojo-type\x3d"jimu/dijit/SimpleTable" data-dojo-props\x3d\'fields:[{name:"layer",title:"${nls.layerName}","class":"label",type:"empty",width:"400px"},{name:"type",title:"${nls.layerType}","class":"label",type:"empty"},{name:"label",title:"${nls.layerLabel}","class":"label",type:"empty"},{name:"actions",title:"${nls.actions}","class":"actions",type:"actions",actions:["up","down","edit","delete"],width:"100px"}]\'\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3c!-- General Settings: Distances --\x3e\r\n  \x3cdiv class\x3d"jimu-r-row"\x3e\r\n    \x3cdiv class\x3d"label" style\x3d"padding-top:15px;font-weight: bold;"\x3e\r\n      ${nls.general_setting_Label}\r\n    \x3c/div\x3e\r\n    \x3chr /\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:15px"\x3e\r\n      \x3cdiv class\x3d"col-1-4"\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.units_text_lbl}: \x3c/span\x3e\r\n        \x3cselect style\x3d"margin-left: 10px;" data-dojo-attach-point\x3d"selectUnits" data-dojo-type\x3d"dijit/form/Select"\x3e\r\n          \x3coption value\x3d"miles" selected\x3d"selected"\x3e${nls.miles}\x3c/option\x3e\r\n          \x3coption value\x3d"kilometers"\x3e${nls.kilometers}\x3c/option\x3e\r\n          \x3coption value\x3d"feet"\x3e${nls.feet}\x3c/option\x3e\r\n          \x3coption value\x3d"meters"\x3e${nls.meters}\x3c/option\x3e\r\n          \x3coption value\x3d"yards"\x3e${nls.yards}\x3c/option\x3e\r\n          \x3coption value\x3d"nauticalMiles"\x3e${nls.nauticalMiles}\x3c/option\x3e\r\n        \x3c/select\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-1-4"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_routing" title\x3d"${nls.routing_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.routing_checkBox}\x3c/span\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-2-4"\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.maximum_distance_lbl}: \x3c/span\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/NumberTextBox" style\x3d"width:60px" data-dojo-attach-point\x3d"txt_maximumDistance" title\x3d"${nls.maximum_distance_lbl}" /\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:15px"\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cspan class\x3d"label"\x3e${nls.buffer_text_lbl}: \x3c/span\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cspan class\x3d"label"\x3e${nls.buffer_min_lbl}: \x3c/span\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cspan class\x3d"label"\x3e${nls.buffer_max_lbl}: \x3c/span\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:0px"\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cinput data-dojo-type\x3d"dijit/form/TextBox" data-dojo-attach-point\x3d"buffer_lbl" /\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cinput data-dojo-type\x3d"dijit/form/NumberTextBox" data-dojo-attach-point\x3d"buffer_min" /\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cinput data-dojo-type\x3d"dijit/form/NumberTextBox" data-dojo-attach-point\x3d"buffer_max" /\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cbr/\x3e\r\n  \x3c!-- Weather Settings --\x3e\r\n  \x3cdiv class\x3d"jimu-r-row" data-dojo-attach-point\x3d"div_special_tab"\x3e\r\n    \x3cdiv class\x3d"label" style\x3d"padding-top:15px;font-weight: bold;"\x3e\r\n      ${nls.weather_Label}\r\n    \x3c/div\x3e\r\n    \x3chr /\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:15px"\x3e\r\n      \x3cdiv class\x3d"col-1-3"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_weather" title\x3d"${nls.weather_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.weather_checkBox}\x3c/span\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-1-3"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_celsius" title\x3d"${nls.weather_celsius}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.weather_celsius}\x3c/span\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-1-3"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"btnSource" data-dojo-attach-event\x3d"onclick:_onBtnSelectLayersClicked" class\x3d\'jimu-btn\'\x3e\r\n          ${nls.selectLayers}\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv style\x3d"padding-top:15px; padding-left:15px"\x3e\r\n      \x3cspan class\x3d"label"\x3e${nls.currentlySelectedLayer}:\x3c/span\x3e\r\n      \x3cspan class\x3d"label" data-dojo-attach-point\x3d"currentlySelectedLayer"\x3e\x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3c!-- Layer Visibility Settings --\x3e\r\n  \x3cdiv class\x3d"jimu-r-row"\x3e\r\n    \x3cdiv style\x3d"padding-top:15px; padding-bottom: 10px"\x3e\r\n      \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_disable" title\x3d"${nls.disable_checkBox}" /\x3e\r\n      \x3cspan class\x3d"label"\x3e${nls.disable_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:widgets/IncidentAnalysis/setting/css/style.css":'.jimu-widget-IMT-setting .btn-add-section {display: inline-block; overflow: hidden; height: 24px; margin-left: 1px; margin-bottom: 3px; cursor: pointer; font-size: 13px; color: #538ec8; margin-top: 8px;}.jimu-widget-IMT-setting .btn-add-section .btn-add-icon {height: 100%; width: 14px; background-repeat: no-repeat; background-position: center center; background-image: url(images/add.png); display: inline-block; vertical-align: top;}.jimu-widget-IMT-setting .btn-add-section .btn-add-label {height: 100%; line-height: 24px; vertical-align: middle; margin-left: 7px; text-decoration: underline; display: inline-block; vertical-align: top;}.claro .dojoxCheckedMultiSelect .dojoxCheckedMultiSelectWrapper {border: none !important; background-color: transparent !important;}.footer {text-align: right;}.removeButtonWithIcon {background-image: url("../images/filterdialog_icons.png"); background-repeat: no-repeat; background-position: -30px 0; width: 15px; height: 15px; margin: 0px 0px; display: block;}.upButton {background-image: url("../../../../jimu.js/css/images/up_enabled.png"); background-repeat: no-repeat; width: 15px; height: 15px; margin: 0px 0px; display: block;}.downButton {background-image: url("../../../../jimu.js/css/images/down_enabled.png"); background-repeat: no-repeat; width: 15px; height: 15px; margin: 0px 0px; display: block;}.colorButton {width: 15px; height: 15px; margin: 0px 0px; display: block; background-color: #00ff00;}.footer {padding-top: 5px; width: 100%; height: 30px;}.dojoxCheckedMultiSelect .dojoxCheckedMultiSelectWrapper {height: 400px;}.dojoxMultiSelectItem {padding-bottom: 5px; padding-top: 5px;}.dijitSelectLabel {text-align:left; text-overflow: ellipsis; overflow: hidden; max-width:300px;}',
"*now":function(m){m(['dojo/i18n!*preload*widgets/IncidentAnalysis/setting/nls/Setting*["ar","bs","ca","cs","da","de","en","el","es","et","fi","fr","he","hi","hr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sl","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});
define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/html dojo/dom-style dojo/on dojo/query dijit/form/Select dijit/form/ValidationTextBox dijit/_WidgetsInTemplateMixin ./FeaturelayerSource ./FieldPicker jimu/BaseWidgetSetting jimu/dijit/Message jimu/dijit/Popup jimu/LayerInfos/LayerInfos jimu/dijit/SimpleTable".split(" "),function(m,n,e,h,f,g,k,l,p,q,r,t,u,v,b,d){return m([u,q],{baseClass:"jimu-widget-IMT-setting",opLayers:[],curRow:null,postCreate:function(){this.inherited(arguments);
this._getAllLayers();this.own(g(this.btnAddTab,"click",e.hitch(this,this._addTabRow)));this.own(g(this.tabTable,"actions-edit",e.hitch(this,function(a){this._onEditLayerClicked(a)})))},startup:function(){this.inherited(arguments)},setConfig:function(a){this.config=a;this.config.distanceUnits&&this.selectUnits.set("value",this.config.distanceUnits);this.config.maxDistance&&this.txt_maximumDistance.set("value",this.config.maxDistance);this.config.enableRouting&&this.chk_routing.set("value",!0);this.config.incidentLabel&&
this.incident_lbl.set("value",this.config.incidentLabel);this.config.locateLabel&&this.locate_lbl.set("value",this.config.locateLabel);this.tabTable.clear();for(a=0;a<this.config.tabs.length;a++){var c=this.config.tabs[a];c.type===this.config.special_layer.value?(this.chk_weather.set("value",!0),this.weatherTabAdditionalLayers=c.layers,this.currentlySelectedLayer.innerHTML=this.weatherTabAdditionalLayers):this._populateTabTableRow(c)}this.config.celsius&&this.chk_celsius.set("value",!0);this.buffer_lbl.set("value",
this.config.bufferLabel?this.config.bufferLabel:this.nls.buffer_lbl);this.buffer_max.set("value",this.config.bufferRange.maximum);this.buffer_min.set("value",this.config.bufferRange.minimum);this.config.disableLayerManagement&&this.chk_disable.set("value",!0)},getConfig:function(){this.config.distanceUnits=this.selectUnits.value;this.txt_maximumDistance.value&&(this.config.maxDistance=this.txt_maximumDistance.value);this.config.enableRouting=this.chk_routing.checked?!0:!1;this.config.incidentLabel=
this.incident_lbl.value;this.config.locateLabel=this.locate_lbl.value;var a=[],c={};this.chk_weather.checked&&(c.label=this.config.special_layer.label,c.type=this.config.special_layer.value,c.layers=this.weatherTabAdditionalLayers,c.url=this.config.special_layer.url,a.push(c));this.config.celsius=this.chk_celsius.checked?!0:!1;var b=this.tabTable.getRows();n.forEach(b,e.hitch(this,function(b){var d=b.selectLayers,e=b.selectTypes,w=b.labelText;c={};c.label=w.value;c.type=e.value;c.layers=d.value;c.title=
d.attr("displayedValue");b.tabInfo&&b.tabInfo.advConfig&&(c.advConfig=b.tabInfo.advConfig);a.push(c)}));this.config.tabs=a;this.config.bufferLabel=this.buffer_lbl.value;this.config.bufferRange.maximum=this.buffer_max.value;this.config.bufferRange.minimum=this.buffer_min.value;this.config.disableLayerManagement=this.chk_disable.checked?!0:!1;return this.config},_getAllLayers:function(){this.map.itemId&&d.getInstance(this.map,this.map.itemInfo).then(e.hitch(this,function(a){this.opLayers=a;this._setLayers();
this._setTypes();this.setConfig(this.config)}))},_setLayers:function(){var a=[];n.forEach(this.opLayers._layerInfos,e.hitch(this,function(c){0<c.newSubLayers.length?this._recurseOpLayers(c.newSubLayers,a):this._validateLayer(c)&&a.push({label:c.title,value:c.id})}));0===a.length?(f.set(this.btnAddTab,"display","none"),new v({message:this.nls.missingLayerInWebMap})):this.layer_options=e.clone(a)},_recurseOpLayers:function(a,c){n.forEach(a,e.hitch(this,function(a){0<a.newSubLayers.length?this._recurseOpLayers(a.newSubLayers,
c):this._validateLayer(a)&&c.push({label:a.title,value:a.id})}))},_validateLayer:function(a){var c=null;a.layerObject&&a.layerObject.url&&(a=a.layerObject.url,-1<a.indexOf("MapServer")||-1<a.indexOf("FeatureServer"))&&(c=a);return c},_setTypes:function(){this.analysis_options=[{value:"closest",label:this.nls.closest},{value:"proximity",label:this.nls.proximity},{value:"summary",label:this.nls.summary}]},_populateTabTableRow:function(a){var c=this.tabTable.addRow({});c.success&&c.tr&&(c=c.tr,this._addTabLayers(c),
this._addTabTypes(c),this._addTabLabel(c),c.selectLayers.set("value",a.layers),c.selectTypes.set("value",a.type),c.labelText.set("value",a.label),c.tabInfo=a)},_addTabRow:function(){var a=this.tabTable.addRow({});a.success&&a.tr&&(a=a.tr,this._addTabLayers(a),this._addTabTypes(a),this._addTabLabel(a))},_addTabLayers:function(a){var c=e.clone(this.layer_options),b=k(".simple-table-cell",a)[0];b&&(h.setStyle(b,"verticalAlign","middle"),c=new l({style:{width:"100%",height:"30px"},options:c}),c.placeAt(b),
c.startup(),a.selectLayers=c)},_addTabTypes:function(a){var b=e.clone(this.analysis_options),d=k(".simple-table-cell",a)[1];d&&(h.setStyle(d,"verticalAlign","middle"),b=new l({style:{width:"100%",height:"30px"},options:b}),b.placeAt(d),b.startup(),a.selectTypes=b)},_addTabLabel:function(a){var b=k(".simple-table-cell",a)[2];h.setStyle(b,"verticalAlign","middle");var d=new p({style:{width:"100%",height:"30px"}});d.placeAt(b);d.startup();a.labelText=d},_onBtnSelectLayersClicked:function(){var a=new r({nls:this.nls,
map:this.map,config:this.config,weatherTabAdditionalLayers:this.weatherTabAdditionalLayers,appConfig:this.appConfig}),c=new b({width:830,height:560,content:a,titleLabel:this.nls.selectLayers});this.own(g(a,"ok",e.hitch(this,function(b){this.weatherTabAdditionalLayers=b;this.currentlySelectedLayer.innerHTML=this.weatherTabAdditionalLayers;a.destroy();a=null;c.close()})));this.own(g(a,"cancel",e.hitch(this,function(){a.destroy();a=null;c.close()})))},_onEditLayerClicked:function(a){this.curRow=a;var c=
a.tabInfo;c||(c={},c.label=a.labelText.value,c.type=a.selectTypes.value,c.layers=a.selectLayers.value,c.advConfig={},a.tabInfo=c);if(c.type!==a.selectTypes.value||c.layers!==a.selectLayers.value)c.type=a.selectTypes.value,c.layers=a.selectLayers.value,c.advConfig={};var d=new t({nls:this.nls,callerLayer:a.selectLayers.value,callerTab:c,callerOpLayers:this.opLayers._layerInfos}),f=new b({width:830,height:560,content:d,titleLabel:this.nls.selectFields+": "+a.selectLayers.value});this.own(g(d,"ok",e.hitch(this,
function(a){this.curRow.tabInfo.advConfig=a;this.curRow=null;d.destroy();d=null;f.close()})));this.own(g(d,"cancel",e.hitch(this,function(){this.curRow=null;d.destroy();d=null;f.close()})))}})});