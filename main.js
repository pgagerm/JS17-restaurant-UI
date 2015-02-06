// ---------------------------------------
//		FOOD ITEM
// ---------------------------------------
var FoodItem = function (name, calories, vegan, glutenFree, citrusFree) {
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
};

FoodItem.prototype.toString = function() {
	var menuItem = ("Ingredient: " + this.name);
	var caloriesValue = ("Calories: " + this.calories);
	var isVegan = ("Vegan: " + this.vegan);
	var isGlutenFree = ("Gluten free: " + this.glutenFree);
	var isCitrusFree = ("Citrus free: " + this.citrusFree);
	return [menuItem, caloriesValue, isVegan, isGlutenFree,isCitrusFree].join("\n");
};

FoodItem.prototype.create = function() {
	this.$el = $("<div class='food-item'>");

	var nameDiv = $("<div class='name'>").text(this.name);
	var caloriesDiv = $("<div class='calories'>").text(this.calories);
	var veganDiv = $("<div class='vegan'>").text(this.vegan);
	var glutenDiv = $("<div class='gluten'>").text(this.glutenFree);
	var citrusDiv = $("<div class='citrus'>").text(this.citrusFree);

	this.$el.append([nameDiv, caloriesDiv, veganDiv, glutenDiv, citrusDiv]);
	return this.$el;
};

// ---------------------------------------
//		DRINK
// ---------------------------------------
var Drink = function(name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
};

Drink.prototype.toString = function() {
	var name = ("Drink: " + this.name);
	var description = ("Description: " + this.description);
	var price = ("Price: " + this.price);
	var ingredients = this.ingredients.map(function(ingredient) {
		return ingredient.toString();

	});
	ingredients = ingredients.join("\n");
	return [name, description, price, ingredients].join("\n");
};

Drink.prototype.isIt = function(dietProblem) {
	var ingredients = this.ingredients;
	for (var i = 0; i < ingredients.length; i++) {
		if (ingredients[i][dietProblem] === true) {
		} else {
			return false;
		}
	}
	return true;
};

Drink.prototype.create = function() {
	this.$el = $("<div class='drink'>");

	var name = ("Drink: " + this.name);
	var description = ("Description: " + this.description);
	var price = ("Price: " + this.price);
	this.$el.append([name, description, price].join("\n"));

	var that = this;

	this.ingredients.map(function(ingredient) {
		that.$el.append(ingredient.create());
	});

	this.$el.on("click", function() {
		if (confirm("Adding " + that.name + " to your order.")) {
			currentOrder.addSomething(that);
			currentOrder.create();
		}
	});


	var dietPrefs = currentCustomer.dietaryPreference.split(" ");
	var allOk = true;

	if (!(dietPrefs[0] === "")) {
		for (var i=0; i < dietPrefs.length; i++){
			if ( !that.isIt(dietPrefs[i]) ) {
				allOk = false;
				break;
			}
		}
	}

	if (allOk) { this.$el.addClass("highlighted"); }
	else { this.$el.removeClass("highlighted"); }

	return this.$el;	
};

// ---------------------------------------
//		PLATE
// ---------------------------------------
var Plate = function(name, description, price, ingredients) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
};

Plate.prototype.toString = function() {
	var name = ("Plate: " + this.name);
	var description = ("Description: " + this.description);
	var price = ("Price: " + this.price);
	var ingredients = this.ingredients.map(function(ingredient) {
		return ingredient.toString();

	});
	ingredients = ingredients.join("\n");
	return [name, description, price, ingredients].join("\n");
};

Plate.prototype.isVegan = function() {
	var ingredients = this.ingredients;
	for (var i = 0; i < ingredients.length; i++) {
		if (ingredients[i].vegan === true) {
		} else {
			return false;
		}
	}
	return true;
};

Plate.prototype.isGlutenFree = function() {
	var ingredients = this.ingredients;
	for (var i = 0; i < ingredients.length; i++) {
		if (ingredients[i].glutenFree === true) {
		} else {
			return false;
		}
	}
	return true;
};

Plate.prototype.isCitrusFree = function() {
	var ingredients = this.ingredients;
	for (var i = 0; i < ingredients.length; i++) {
		if (ingredients[i].citrusFree === true) {
		} else {
			return false;
		}
	}
	return true;
};

Plate.prototype.isIt = function(dietProblem) {
	var ingredients = this.ingredients;
	for (var i = 0; i < ingredients.length; i++) {
		if (ingredients[i][dietProblem] === true) {
		} else {
			return false;
		}
	}
	return true;
};

Plate.prototype.create = function() {
	if (this.$el === undefined) { this.$el = $("<div class='plate'>"); }
	else { this.$el.text(""); }

	var name = ("Plate: " + this.name);
	var description = ("Description: " + this.description);
	var price = ("Price: " + this.price);
	this.$el.append([name, description, price].join("\n"));

	var that = this;

	this.ingredients.map(function(ingredient) {
		that.$el.append(ingredient.create());
	});


	var dietPrefs = currentCustomer.dietaryPreference.split(" ");
	var allOk = true;

	if (!(dietPrefs[0] === "")) {
		for (var i=0; i < dietPrefs.length; i++){
			if ( !that.isIt(dietPrefs[i]) ) {
				allOk = false;
				break;
			}
		}
	}

	if (allOk) { this.$el.addClass("highlighted"); }
	else { this.$el.removeClass("highlighted"); }
// ----------
// EVENT
// ----------
	this.$el.on("click", function() {
		if (confirm("Adding " + that.name + " to your order.")) {
			currentOrder.addSomething(that);
			currentOrder.create();
		}
	});

	return this.$el;
};

// ---------------------------------------
//		MENU
// ---------------------------------------
var Menu = function(plates) {
	this.plates = plates;
};

Menu.prototype.toString = function() {
	var wholeMenu = this.plates;
	var allPlates = [];
	for (var i = 0; i < wholeMenu.length; i++) {
		var currentItem = wholeMenu[i].toString();
		allPlates.push(currentItem);
	}
	return allPlates.join("\n");
};

Menu.prototype.create = function() {
	return $("<div class='menu'>").text(this.toString());
};

Menu.prototype.create = function() {
	if (this.$el === undefined) { this.$el = $("<div class='menu'>"); }
	else {this.$el.text("");}

	var that = this;
	this.plates.map(function(plate) {
		that.$el.append(plate.create());
	});

	return this.$el;
};

// ---------------------------------------
//		RESTAURANT
// ---------------------------------------
var Restaurant = function(name, description, menus) {
	this.name = name;
	this.description = description;
	this.menus = menus;
};

Restaurant.prototype.toString = function() {
	var name = ("Restaurant: " + this.name);
	var description = ("Description: " + this.description);
	var menu = this.menu.toString();
	return [name, description, menu].join("\n");
};

Restaurant.prototype.create = function() {
	this.$el = $("<div class='restaurant'>");

	var name = ("Restaurant: " + this.name);
	var description = ("Description: " + this.description);
	this.$el.append([name, description].join("\n"));

	var that = this;
	this.menus.map(function(menu) {
		that.$el.append(menu.create());
	});

	return this.$el;
};
// ---------------------------------------
//		CUSTOMER
// ---------------------------------------
var Customer = function(dietaryPreference) {
	this.dietaryPreference = dietaryPreference;
};

Customer.prototype.toString = function() {
	return this.dietaryPreference;
};

// ---------------------------------------
//		ORDER
// ---------------------------------------
var Order = function(plates) {
	this.plates = plates || [];
};

Order.prototype.toString = function() {
	var wholeOrder = this.plates;
	var allPlates = [];
	for (var i = 0; i < wholeOrder.length; i++) {
		var currentItem = wholeOrder[i].toString();
		allPlates.push(currentItem);
	}
	return allPlates.join("\n");
};

Order.prototype.addSomething = function(drinkOrPlate){
	this.plates.push(drinkOrPlate);
};

Order.prototype.create = function() {
	if (this.$el === undefined) { this.$el = $("<div class='order'>"); }
	else {this.$el.text("");}

	this.$el.append("ORDER\n");

	var that=this;
	var orderTotalPrice = 0;

	this.plates.map(function(plate) {
		var newItem = $("<div class='order-item'>").text(plate.name + " - " + plate.price);
		that.$el.append(newItem);
		orderTotalPrice += plate.price;
	});

	this.$el.append("TOTAL: " + orderTotalPrice);

	return this.$el;
};
// -------------------------------------------------------------------------
//		OBJECTS
// -------------------------------------------------------------------------

var meat = new FoodItem("meat", 500, false, true, true);
var tortilla = new FoodItem("tortilla", 100, true, false, true);
var burritoPlate = new Plate("Burrito Plate", "Burrito", 10.00, [meat, tortilla]);
var avocado = new FoodItem("avocado", 200, true, true, true);
var lime = new FoodItem("lime", 50, true, true, false);
var guacamole = new Plate("Guac Plate", "Guacamole dip", 8.00, [avocado, lime]);
var tequila = new FoodItem("Tequila", 200, true, true, true);
var margaritaMix = new FoodItem("Margarita Mix", 200, true, true, false);
var margarita = new Drink("Margarita", "Alcoholic Drink", 7.00, [tequila, margaritaMix, lime]);
var ourMenu = new Menu([burritoPlate, guacamole, margarita]);
var ourRestaurant = new Restaurant("Miguel y Ramon", "mexican food", [ourMenu]);

var currentOrder = new Order();
var currentCustomer = new Customer("");

$(document).on('ready', function() {
	$("#restaurant-container").append(ourRestaurant.create());

	$("#order-container").append(currentOrder.create());
	// $("#restaurant-container").on("click", ".plate, .drink", function() {
	// 	console.log(this);
	// });
});