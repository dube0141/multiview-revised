var app = angular.module("toDoApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'list1.html',
			controller: 'ListController'
		})
		.when('/List-1', {
			templateUrl: 'list1.html',
			controller: 'ListController'
		})
		.when('/List-2', {
			templateUrl: 'list2.html',
			controller: 'ListController'
		})
		.when('/List-3', {
			templateUrl: 'list3.html',
			controller: 'ListController'
		});
});

app.controller('ListController', function ($scope) {
	var hash = window.location.hash;

	if (hash === "#/") {
		hash = 1;
	} else {
		hash = hash.charAt(hash.length - 1);
	}

	document.querySelector(".active").setAttribute("class", "control-item");
	document.querySelector("a[href='#/List-" + hash + "']").setAttribute("class", "control-item active");

	if (localStorage.getItem("multiview-list-" + hash + "")) {
		this.items = JSON.parse(localStorage.getItem("multiview-list-" + hash + ""));
	} else {
		this.items = [
			{
				task: "List number " + hash,
				status: "icon-check"
			}
		];
		localStorage.setItem("multiview-list-" + hash + "", JSON.stringify(this.items));
	}

	this.addItem = function (item) {
		var newItem = {
			task: item,
			status: "icon-close"
		};

		delete this.input;
		this.items.push(newItem);
		localStorage.setItem("multiview-list-" + hash + "", JSON.stringify(this.items));
	}

	this.removeItem = function (e) {
		this.items.splice(e, 1);
		localStorage.setItem("multiview-list-" + hash + "", JSON.stringify(this.items));
	}

	this.toggle = function (e) {
		if (this.items[e].status === "icon-close") {
			this.items[e].status = "icon-check";
		} else {
			this.items[e].status = "icon-close";
		}
		localStorage.setItem("multiview-list-" + hash + "", JSON.stringify(this.items));
	}
});