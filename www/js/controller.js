app.controller('mainCtrl', function($scope, $q, $timeout, Location) {

    $scope.selectedCity = '';
    $scope.selectedZone = '';
    $scope.selectedlocation = '';

    $scope.options = {
        selectedCity: '',
        selectedZone: '',
        selectedLocation: ''
    };

    // Compulsory Function Before Operating On The Scope
    function isUpdated() {
        return $timeout(function() {
            return $scope.options;
        });
    }   

    // Initializes Cities Array In The First Run
    Location.selectCity().then(function(response) {
        $scope.cities = response;
    });

    // Select Zones List According To The City Id
    $scope.selectZone = function() {
        $scope.options.selectedZone = '';
        $scope.options.selectedLocation = '';
        isUpdated().then(function(response) {
            console.log(response);
            // Fix For Location Clean Up When City Is Changed
            $scope.locations = [];
            Location.selectZoneByCity(response.selectedCity).then(function(response) {
                $scope.zones = response;
                console.log($scope.zones);
            });
            // Direct Selection Of Location List Based On City Id
            if( $scope.options.selectedZone == null ||
                $scope.options.selectedZone == undefined ||
                $scope.options.selectedZone == ''   ) {
                Location.selectLocationByCity(response.selectedCity).then(function(response) {
                    $scope.locations = response;
                    console.log(response);
                });
            }
        });
    };

    $scope.selectLocationByZone = function(cid, zid) {
        $scope.options.selectedLocation = '';
        isUpdated().then(function(response) {
            console.log(response);
            // console.log($scope.options.selectedZone);
            Location.selectLocationByZone(response.selectedCity, response.selectedZone).then(function(response) {
                $scope.locations = response;
                console.log($scope.locations);
            });
        })
    };

    $scope.selectLocation = function() {
        isUpdated().then(function(response) {
            console.log(response);
        });
    }

    // Unattended Service To Select Location Directly By City Id
    // $scope.selectLocationByCity = function(cid) {
    //     Location.selectLocationByCity(cid).then(function(response) {
    //         $scope.locations = response;
    //         console.log(response);
    //     });
    // }
});