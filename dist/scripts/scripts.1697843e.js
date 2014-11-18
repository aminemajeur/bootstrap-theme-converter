"use strict";angular.module("themeBuilderApp",["ngResource","ngRoute","ngSanitize"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("themeBuilderApp").controller("MainCtrl",["$scope","$timeout","bootstrapSettings",function(a,b,c){function d(a){a.stopPropagation(),a.preventDefault(),a.dataTransfer.dropEffect="copy"}function e(b){b.stopPropagation(),b.preventDefault();var c=b.dataTransfer.files[0];if(c){var d=new FileReader;d.readAsText(c,"UTF-8"),d.onload=function(b){var d={};if("json"===c.name.split(".").pop())d=angular.fromJson(b.target.result),a.lessVars=d.vars,a.$apply(),console.log(d.vars);else if("less"===c.name.split(".").pop()){var e=b.target.result.toString().split("\n");angular.forEach(e,function(a){if("@"===a[0]){var b=a.split(":")[0],c=a.split(":")[1];c=c.replace(/^\s+/,""),c=c.split(";")[0],d[b]=c}}),a.lessVars=d,a.$apply(),console.log(d)}a.refresh(),console.log(a.lessVars)},d.onerror=function(){a.lessVars="error reading file"}}}a.themeDetails={name:"My Theme",author:"Grumpy Cat",repository:{type:"git",url:"Repo Url"},copyright:"GNU GPL v3, AGPL v3, Commercial",license:"MIT",engines:{wakanda:">=11"},studio:{label:"Wakanda Corporate",mobile:"false"},version:"1.0.0",loadDependencies:[{id:"wakanda_corporate/wakanda_corporate.css",path:"THEMES_CUSTOM"}],hash:"91038c8630d0ca29ba43354e7b3a79322720d3d7"},a.loadBasicVars=function(){c.get().$promise.then(function(b){a.lessVars=b.vars,a.refresh()})},a.loadBasicVars(),a.refresh=function(){b(function(){less.modifyVars(a.lessVars)},1e3)};var f=document.getElementById("drop_zone");f.addEventListener("dragover",d,!1),f.addEventListener("drop",e,!1),a.generateTheme=function(){a.resultedCss=document.getElementById("less:styles-bootstrap-bootstrap").innerHTML}}]),angular.module("themeBuilderApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("themeBuilderApp").service("bootstrapSettings",["$resource",function(a){return a("styles/bootstrap/config.json")}]);