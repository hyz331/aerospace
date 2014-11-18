// This is the view object for creating data table visualization
google.load("earth", "1", {"other_params":"sensor=true_or_false"});
// All the JS placed under didInsertElement will be called when /dataTable is loaded
Search.TableView = Ember.View.extend({
	didInsertElement: function() {
		console.log("Render data table");
		// Format fetched data for dataTable	
		var dataToDisplay = [];
		for (var i=0; i<Search.Satcat.length; i++) {
			var sat = Search.Satcat[i];
			var row = [sat.SATNAME, sat.COUNTRY, sat.OBJECT_TYPE,
				   sat.LAUNCH, sat.DECAY];
			dataToDisplay.push(row);
		}

		// Construct dataTable	
		$("#dataTable").dataTable({
			searching: false,
			paging: false,
			data: dataToDisplay,
			columns: [
				{title: "Name"},
				{title: "Country"},
				{title: "Type"},
				{title: "Launch Date"},
				{title: "Decay Date"},
			]
		});
	},
});

// View object to google map
// Code for render google map are placed here
Search.MapView = Ember.ContainerView.extend({
	id: 'map-canvas',
	tagName: 'div',
	attributeBindings: ['style'],
	style:"height: 400px; ",
	map:null,

	didInsertElement: function() {
		

	var mapOptions = {
		center: new google.maps.LatLng(28.405765,77.049479),
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(this.$().get(0),mapOptions);
	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

	this.set("map",map);
  }
});


Search.EarthView = Ember.ContainerView.extend({

	init: function(){
		google.load("earth", "1", {"other_params":"sensor=true_or_false"});	
	},
	//hide the old map3d to prevent cloning is called earlier than didInsertElement
	willInsertElement: function(){
		hide();
			
	},
	
	didInsertElement: function() {
		//google.setOnLoadCallback(init);
		init();

	  }	
	
});
	//function to hide the div to prevent cloning
	 function hide(){
	 	var hidden=document.getElementById('map3d');
	 	  if(hidden!=null){hidden.parentNode.removeChild(hidden);}
	 }
	 //init function to create the google earth instance
	function init() {
			google.earth.createInstance('map3d', initCB, failureCB);
    }
    //success function if init works properly
    //insert google earth modifying code.
    function initCB(instance) {
		
      ge = instance;
      ge.getWindow().setVisibility(true);
    }

	//failure function if the init fails.
	function failureCB(errorCode) {
		console.log(errorCode);
    }
    