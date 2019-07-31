/*eslint-env browser*/

var infoForCat;
var createElementOfCat = document.createElement("img");
createElementOfCat.onload = setInformationOfCat;
document.getElementById("loader").style.display = "none";

/**
* A function for get information of cat from server,request the information and handle it.
@function getInformationOfCat
* @namespace {requestInfo} this is variable for XMLHttpRequest.
* @namespace {infoForCat} this is variable for the information you got from server.
* @namespace {imageOfCat} this is variable for link of cat image.
* @namespace {createElementOfCat} this is variable for create Element of cat.
* @namespace {elementOfCat} this is variable to append image in continer.
*/
function getInformationOfCat() {
	var requestInfo = new XMLHttpRequest();
	requestInfo.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			infoForCat = JSON.parse(this.responseText);
			console.log("infoForCat", infoForCat);
			var imageOfCat = infoForCat[0].url;
			createElementOfCat.src = imageOfCat;
			var elementOfCat = document.getElementById("img-of-cat");
			elementOfCat.appendChild(createElementOfCat);
		}
	};
	requestInfo.open("GET", "https://api.thecatapi.com/v1/images/search", true);
	requestInfo.send();
}

/**
* A function for set information about the cat in the specific continer.
@function setInformationOfCat
* @namespace {breedOfCat} this is variable for XMLHttpRequest.
* @namespace {nameOfCat} this is variable to store name of cat.
* @namespace {originOfCat} this is variable to store origin of cat.
* @namespace {descriptionOfCat} this is variable to store description about cat.
* @namespace {childFriendly} this is a variable child friendly store for cats.
* @namespace {dogFriendly} this is a variable dog friendly store for cats.
*/
function setInformationOfCat() {
	document.getElementById("loader").style.display = "none";
	document.getElementById("img-of-cat").style.display = "block";
	var breedOfCat = infoForCat[0].breeds[0];
	console.log("breedOfCat !== undefined", breedOfCat !== undefined);
	if (breedOfCat !== undefined) {
		var nameOfCat = breedOfCat.name,
			originOfCat = breedOfCat.origin,
			descriptionOfCat = breedOfCat.description,
			childFriendly = "Child Friendly:" + breedOfCat.child_friendly,
			dogFriendly = "Dog Friendly:" + breedOfCat.dog_friendly;
		document.getElementById("name").innerHTML += nameOfCat;
		document.getElementById("origin").innerHTML = originOfCat;
		document.getElementById("description").innerHTML = descriptionOfCat;
		document.getElementById("child-friendly").innerHTML = "Child Friendly : " + childFriendly;
		document.getElementById("dog-friendly").innerHTML = "Dog Friendly : " + dogFriendly;
	} else {
		document.getElementById("name").innerHTML += "NO INFORMATION";
		document.getElementById("origin").innerHTML = "NO INFORMATION";
		document.getElementById("description").innerHTML = "NO INFORMATION";
		document.getElementById("child-friendly").innerHTML = "Child Friendly : " + "NO INFORMATION";
		document.getElementById("dog-friendly").innerHTML = "Dog Friendly : " + "NO INFORMATION";
	}
}

/**
* Afunction for clear continer to be ready for now information.
@deletePastInfo()
*/
function deletePastInfo() {
	document.getElementById("clickButton").style.display = "none";
    document.getElementById("name").innerHTML = "";
    document.getElementById("origin").innerHTML = "";
    document.getElementById("description").innerHTML = "";
    document.getElementById("child-friendly").innerHTML = "";
    document.getElementById("dog-friendly").innerHTML = "";
    document.getElementById("img-of-cat").innerHTML = "";
	document.getElementById("loader").style.display = "block";
	getInformationOfCat();
}
