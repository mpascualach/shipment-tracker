var geocoder;
var map;
var markersArray = [];

function initialize() {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(40.397, 0.644);
	
	var myOptions = {
		zoom: 2,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

function getport()
{
	id_from = $('#port_id_from').val();

	$.ajax({
		'url': '/distances/newway/port_id/'+id_from, 
		'type':'post', 
		'dataType':'html',

		'success':function(html){ 
			$("#co").html(html); 
		} ,

		'cache': false
	});
}

function clearOverlays() {
	for (var i = 0; i < markersArray.length; i++ ) {
		markersArray[i].setMap(null);
	}
	markersArray = [];
}

function getPortIds()
{
	id_from = $('#port_id_from').val();
	id_to = $('#port_id_to').val() ;
	if(id_from == null)
	{
		alert('Please, select port of loading');
		return;
	}
	
	if(id_to == null)
	{
		alert('Please, select port of discharging');
		return;
	}
		
	if(id_from==id_to)
	{
		alert('Ports should be different');
		return;
	}
	
	$('#res').hide();
	clearOverlays();
	
	speed = $('#speed').val();
	$.ajax({
		'url': '/distances/ports/id_from/'+id_from+'/id_to/'+id_to+'/speed/'+speed, 
		'type':'post', 
		'dataType':'html',
			
		'success':function(html){ 
			$("#cont").html(html);
			renderChannels();
		} ,
			
		'cache': false
	});
	//return false;
	//alert($('#country_id_from').data('dfg'));  
		
	
	to_lat = $('#port_id_to option:selected').data('lat');
	to_long = $('#port_id_to option:selected').data('long');
	from_lat = $('#port_id_from option:selected').data('lat') ;
	from_long = $('#port_id_from option:selected').data('long');
	mid_lat = (to_lat+from_lat)/2;
	mid_long = (to_long + from_long)/2;

	var myLatlngFrom = new google.maps.LatLng(from_lat,from_long);
	var myLatlngTo = new google.maps.LatLng(to_lat,to_long);
	var middle_point = new google.maps.LatLng(mid_lat,mid_long);

	
	var marker1 = new google.maps.Marker({
		position: myLatlngFrom,
		map: map
	})



	markersArray.push(marker1);
	var marker2 = new google.maps.Marker({
		position: myLatlngTo,
		map: map
	})
	var markerImage = new google.maps.MarkerImage(
    'images/anchor.png'
);
  marker1.setIcon(markerImage);
  marker2.setIcon(markerImage);
  

	map.setCenter(middle_point)
	 var contentString = $('#country_id_from option:selected').text() + ', ' + $('#port_id_from option:selected').text();
	 var contentString2 = $('#country_id_to option:selected').text() + ', ' + $('#port_id_to option:selected').text();
	// var mag_info_cont = "Magellan";
          var infowindow = new google.maps.InfoWindow({
            content: contentString

          }); 
	var infowindow2 = new google.maps.InfoWindow({
		content: contentString2
	}); 

	google.maps.event.addListener(marker1, 'click', function() {

		infowindow.open(map,marker1);
	});
	google.maps.event.addListener(marker2, 'click', function() {
		infowindow2.open(map,marker2);
	});



	
//	markersArray.push(goodh_marker);
//	markersArray.push(capeh_marker);
	
	markersArray.push(marker2);

	return false;
}

function renderChannels(){
	var gibraltar = new google.maps.LatLng(35.99823980000001, -5.687873599999989);
	var good_hope = new google.maps.LatLng(-34.3569444, 18.47388890000002);
	var magellan = new google.maps.LatLng(-53.480833, -70.783333);
	var suez = new google.maps.LatLng(30.840842, 32.326340399999935);
	var panama = new google.maps.LatLng(9.2970306, -79.91996979999999);
	var cape_horn = new google.maps.LatLng(-55.98333330000001, -67.26666670000003);
	setTimeout( function()
	{
		channels =[];
		$("span[id^=channel_]").each(function(){
			channels.push($(this).text());
		});
		for(i=0;i<channels.length;i++){
			if(channels[i]=='Strait of Gibraltar'){
				var gibr_marker = new google.maps.Marker({
					position: gibraltar,
					map: map
				})
				markersArray.push(gibr_marker);
			}
			if(channels[i]=='Cape of Good Hope'){
				var goodh_marker = new google.maps.Marker({
					position: good_hope,
					map: map
				})
				markersArray.push(goodh_marker);
			}
			if(channels[i]=='Cape Horn'){
				var capeh_marker = new google.maps.Marker({
					position: cape_horn,
					map: map
				})
				markersArray.push(capeh_marker);
			}
			if(channels[i]=='Strait of Magellan'){
				var mag_marker = new google.maps.Marker({
					position: magellan,
					map: map
				})
				markersArray.push(mag_marker);
			}
			if(channels[i]=='Suez Canal'){
				var suez_marker = new google.maps.Marker({
					position: suez,
					map: map
				})
				markersArray.push(suez_marker);
			}
			if(channels[i]=='Panama Canal'){
				var panama_marker = new google.maps.Marker({
					position: panama,
					map: map
				})
				markersArray.push(panama_marker);
			}
		}
			if(mag_marker){
				var mag_info_content = 'Strait of Magellan';
				var mag_info = new google.maps.InfoWindow({
					content: mag_info_content
				});
			
				google.maps.event.addListener(mag_marker, 'click', function() {
					mag_info.open(map,mag_marker);
				});
			}
			if(panama_marker){
				var pan_info_content = 'Panama Canal';
				var panama_info = new google.maps.InfoWindow({
					content: pan_info_content
				});
				google.maps.event.addListener(panama_marker, 'click', function() {
					panama_info.open(map,panama_marker);
				});
			}
			if(suez_marker){
				var suez_info = new google.maps.InfoWindow({
					content: 'Suez Canal'
				});
				google.maps.event.addListener(suez_marker, 'click', function() {
					suez_info.open(map,suez_marker);
				});
			}
			if(capeh_marker){
				var cape_info = new google.maps.InfoWindow({
					content: 'Cape Horn'
				});
				google.maps.event.addListener(capeh_marker, 'click', function() {
					cape_info.open(map,capeh_marker);
				});
			}
			if(goodh_marker){
				var goodh_info = new google.maps.InfoWindow({
					content: 'Cape of Good Hope'
				});
				google.maps.event.addListener(goodh_marker, 'click', function() {
					goodh_info.open(map,goodh_marker);
				});
			}
			if(gibr_marker){
				var gibr_info = new google.maps.InfoWindow({
					content: 'Strait of Gibraltar'
				});
				google.maps.event.addListener(gibr_marker, 'click', function() {
					gibr_info.open(map,gibr_marker);
				});
			}
		}, 0);

}
function showNewWay() {
	
  	$.ajax({
		'url':'/distances/addroutepoint/', 
		'type':'post', 
		'dataType':'html',
		'success':function(data){
			//loading(false);
			setTimeout(function() {
			$('#dlgCreateWay').html(data);
			},10);
			$('#dlgCreateWay').dialog("open");
			
		},
		'error': function(data) {
			//   loading(false);
			alert("data");
		},
		'cache': false
	});
	return false;

}

function showUpdateWay(id) {
  	$.ajax({
		'url':'/distances/update/id/'+id, 
		'type':'post', 
		'dataType':'html',
		'success':function(data){
			//loading(false);
			setTimeout(function() {
			$('#dlgUpdateWay').html(data);
			},10);
			$('#dlgUpdateWay').dialog("open");
		},
		'cache': false
	});
	return false;
}