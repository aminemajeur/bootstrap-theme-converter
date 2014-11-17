'use strict';

/**
 * @ngdoc function
 * @name themeBuilderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the themeBuilderApp
 */
angular.module('themeBuilderApp')
	.controller('MainCtrl', function ($scope) {



		$scope.lessVars = '';

		$scope.refresh = function(){
			less.modifyVars( $scope.lessVars );
		};


		// ------------------------------------------------------------------------------
		// > DRAG & DROP CONFIG FILE
		// ------------------------------------------------------------------------------
		
		// Setup the dnd listeners.
		var dropZone = document.getElementById('drop_zone');
	
		// On drag over	
		function handleDragOver(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
		}

		// On file drop
		function handleFileSelect(evt) {
			evt.stopPropagation();
			evt.preventDefault();

			var file = evt.dataTransfer.files[0]; // FileList object.

			if (file) {
				var reader = new FileReader();
				reader.readAsText(file, 'UTF-8');
				reader.onload = function (evt) {
					
					var lessVars = {};
					
					// if config.json
					if( file.name.split('.').pop() === 'json'){
						
						lessVars = angular.fromJson( evt.target.result );

						$scope.lessVars = lessVars.vars;
						$scope.$apply();
						console.log(lessVars.vars);
					}

					// if variables.less
					else if(file.name.split('.').pop() === 'less'){
						
						// get each line in an array
						var content = evt.target.result.toString().split('\n');

						// for each line
						angular.forEach(content, function(newVal){

							// if begin with an @ create json tree
							if(newVal[0] === '@'){

								// var name
								var lessVar = newVal.split(':')[0];
								// var var value
								var lessVarValue = newVal.split(':')[1].replace(/^\s+/, '').replace(';', '');

								lessVars[lessVar] = lessVarValue;
								// less.modifyVars( {lessVar: lessVarValue} );
							}
						});

						$scope.lessVars = lessVars;
						$scope.$apply();
						console.log( lessVars );
					}

					// Modify vars and apply changes
					less.modifyVars( $scope.lessVars );

					console.log($scope.lessVars);
				};
				reader.onerror = function () {
					$scope.lessVars = 'error reading file';
				};
			}
		}


		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('drop', handleFileSelect, false);


	});
