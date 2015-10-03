angular.module('starter.services',[])

    .factory('$localstorage', ['$window', function($window) {
      return {
        set: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        remove: function(key) {
          return $window.localStorage.removeItem(key);
        },
        setObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }
      }
    }])

    .factory('Auth', function ($localstorage,$http) {
      var user = $localstorage.get('user');
      var password = $localstorage.get('password');
      var setUser = function (username,password) {
        user = username;
        password = password;
        $localstorage.set('user', username);
        $localstorage.set('password', password);
      };

      return {
        setUser : setUser,
        isLoggedIn: function () {
          return user ? true : false;
        },
        getUser: function () {
          return user;
        },
        getPassword: function () {
          return password;
        },
        logout: function () {
          $localstorage.remove("user");
          $localstorage.remove("password");
          user = null;
        }
      }
    });