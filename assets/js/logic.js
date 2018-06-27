$(document).ready(function(){

//Initial array of food
var foodArr = ["pizza", "avocado", "cake", "waffle", "pasta", "doughnut", "bacon", "burger", "tacos", "sushi"];

	
//Function for displaying buttons with values from the food array
function renderButtons() {
	//Deleting the food prior to adding new food
	$("#foodButtons").empty();

	//dynamically generate buttons for each food in the array
	for (var i=0; i<foodArr.length; i++) {
		var b = $("<button class='w3-btn w3-border w3-border-blue-grey w3-text-blue-grey w3-round w3-margin'>");
		b.addClass("foodBtn");
		b.attr("data-name",foodArr[i]);
		b.text(foodArr[i]);
		$("#foodButtons").append(b);
	}
}


//Function handles events where a food button is clicked
$("#addFood").on("click", function(event) {
	//prevent default event of submitting form
	event.preventDefault();

	var food = $("#foodInput").val().trim();
	foodArr.push(food);

	renderButtons();

    $("#foodInput").val("");

});


//Function that handles whether current state of image is still or animated; if still, animate the image when user clicks; if animated, make the image still when user clicks
$("#foodDiv").on('click','img', function() {
	var state = $(this).attr("state");
    if (state === "still") {
      $(this).attr("state", "animate");
      $(this).attr("src",$(this).attr("animate"));
    }else{
      (state === "animate");
      $(this).attr("state", "still");
      $(this).attr("src",$(this).attr("still"));
    }
});


//Function that reads each value in the food array and concatenates that value with the giphy API URL in order to do a query search of the food gif to be displayed within the food div of the page
$("#foodButtons").on("click", 'button', function() {
	var myFood = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + myFood + "&api_key=dnxkPUxOa1usAjdexJlE3x3stA1g4n3v&limit=10";
	$.ajax({
		url:queryURL,
		method:"GET"
	}).then(function(response) {
		var foodDiv = $("#foodDiv");
		var foodGif = response.data;

		for (var i=0; i<foodGif.length; i++) {
			foodImg = $("<img>");
			foodImg.attr("src",foodGif[i].images.fixed_height_still.url);
		    foodImg.attr("state", "still");
		    foodImg.attr("still",foodGif[i].images.fixed_height_still.url);
		    foodImg.attr("animate",foodGif[i].images.fixed_height.url);
		     var rating = foodGif[0].rating;
		     var p = $("<p>").html("Rating: " + rating);
		     foodDiv.append(foodImg, p)
   		}
 	})
});

//Call function that displays food buttons with values from the food array
renderButtons();
});