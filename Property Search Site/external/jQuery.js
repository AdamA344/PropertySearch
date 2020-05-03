$(function () {
	$("#spinner").spinner({
		min: 1, //sets the minimum input for the box for the least amount of bedrooms is wanted 
		max: 7, //sets the maximum input for the box for the least amount of bedrooms is wanted 
		spin: function (event, ui) { //whenever user changes the value it will be taken here 
			$(this).change();
		}
	});
});

$(function () {
	$("#spinner2").spinner({
		min: 1, //sets the minimum input for the box for the least amount of bedrooms is wanted 
		max: 7, //sets the maximum input for the box for the least amount of bedrooms is wanted 
		spin: function (event, ui) { //whenever user changes the value it will be taken here 
			$(this).change();
		}
	});
});

$(function () {
	$("#property").selectmenu(); //Allows the dropdown menu to be used through JQuery UI
});

$(function () {
	$("#time").selectmenu(); //Allows the dropdown menu to be used through JQuery UI
});


$(function () {
	$("#slide").slider({
		range: true,
		min: 299995, //minimum price on bar 
		max: 36000000, //maximum price on bar 
		values: [75, 300],
		slide: function (event, ui) {
			$("#amount").val("£" + ui.values[0] + " - £" + ui.values[1]); // will allow the values to be placed in the box  when chosen 
		}
	});

	$("#amount").val(" £" + $(" #slide").slider("values", 0) + " - £" + $("#slide").slider("values", 1)); // will set the amount to the minimum until the user interacts with the slider.
});


$(function () {
	$("#Search").on("click", function () {
		//retreiving info the user picked from each JQuery UI elements 
		var prop = $("#property").val();
		var maxBed = $("#spinner").val();
		var minBed = $("#spinner2").val();
		var date = $("#time").val();
		var minPrice = $("#slide").slider("option", "values")[0];
		var maxPrice = $("#slide").slider("option", "values")[1];
		// will give results based on the data
		var output = "<ul>";
		for (var i in data.properties) {
			if ((prop == data.properties[i].type) || (prop == "Both")) // if property type is the equal to the input type or if 'Any' property is picked, those properties will be displayed
				if ((minBed >= data.properties[i].bedrooms && maxBed <= data.properties[i].bedrooms)) // if the number of rooms is the is equal to the input entered it will display 
					if ((date == data.properties[i].added.month) || (date == "Anytime")) // if the month inputed matches the month of a property it will be diplayed 
						if ((data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice)) //if the price range inputed of the property it will be displayed
						{
							{
								{
									{
										// output result will display price, image and description of the propertythat matches the description of the input by the user
										output += "<h2><li>" + "£" + data.properties[i].price + "</li></h2>" + "<img src=" + data.properties[i].picture + ">" + "<p>" + data.properties[i].description + "</p>" + "<button><a href='" + data.properties[i].url + "'>Visit Page</a></button>"; //visit button will take user to a different page of property clicked, where there will be more information about the specific property.
									}
								}
							}
						}
		}
		output += "</ul>"; // closes the unordered list tag
		document.getElementById("results").innerHTML = output; // all the results will be placed inside here and displayed on the page. 
	});
});

$(function () {
	$("#tabs").tabs();
});

$(function () { //adds it to favourites 
	$(".add").on("click", function () {

		try {
			$(this).attr('disabled', true);

			var added = $(this).closest("p").attr("id"); // adds data from the these tags that appear first 

			var bookmarked = JSON.parse(localStorage.getItem("favourite")); // saves data and names it so it can be displayed 

			if (bookmarked == null) {
				bookmarked = [];
			}

			if (bookmarked != null) {
				for (var j = 0; j < bookmarked.length; j++) {

					if (added == bookmarked[j]) {

						alert("This property is in your favourites already");
						bookmarked = [];
					}
				}
			}

			bookmarked.push(added);

			localStorage.setItem("favourite", JSON.stringify(bookmarked)); // prevents button from being clicked again 

		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				console.log("Error: Local storage limit exceeds");
			} else {
				console.log("ERROR: Saving to local storge.");
			}
		}
	});
});




$(function () {
	$(".remove").on("click", function () {

		$(this).attr('disabled', true);

		var propIdToRemove = $(this).closest("p").attr("id");

		bookmarked = JSON.parse(localStorage.getItem("favourite")); // prevents button from being clicked again 


		if (bookmarked != null) {
			for (var j = 0; j < bookmarked.length; j++) {

				if (propIdToRemove == bookmarked[j]) {

					alert("Taken off favourites");

					delete bookmarked[j];

					localStorage.setItem("favourite", JSON.stringify(bookmarked));

					bookmarked[j] = [];
				}
			}
		}

		if (bookmarked == null) {
			alert("There are no properties added to your favourties");
		}
	});
});


$(function () { // displays favourites 
	$(".view").on("click", function () {

		console.log("Restoring array data from local storage");

		bookmarked = JSON.parse(localStorage.getItem("favourite")); //retrives data and presents it

		var output = "<ul>";

		if (bookmarked != null) {

			for (var i = 0; i < data.properties.length; i++) {
				for (j = 0; j < bookmarked.length; j++) {

					if (data.properties[i].id == bookmarked[j]) {
						// will display the price, images and a link to visit the page.
						output += "<h5><li>" + data.properties[i].bedrooms + " Bedroom" + " " + data.properties[i].type + "</li></h5>" +
							"<img src=" + data.properties[i].picture + ">" + "<li><button><a href=' " + data.properties[i].url + "'>Visit page</a></button></li>";
					}
				}
			}
		}
		output += "</ul>";

		document.getElementById("starred").innerHTML = output; //all data will be placed into div with this id

	});
});


$(function () {
	$(".clear").on("click", function () {

		$("#starred").remove();

		bookmarked = JSON.parse(localStorage.getItem("favourite")); //removes all saved data 

		localStorage.clear();

	});

});					
						