//
// a custom projection for square tiles
//

function CustomProjection(tile_size){
	this._tile_size = tile_size;
}

CustomProjection.prototype.fromLatLngToPoint = function(latLng){
	var x = latLng.lng() * this._tile_size;
	var y = latLng.lat() * this._tile_size;
	return new google.maps.Point(x, y);
};

CustomProjection.prototype.fromPointToLatLng = function(point){
	var lng = point.x * (1.0 / this._tile_size);
	var lat = point.y * (1.0 / this._tile_size);
	return new google.maps.LatLng(lat, lng);
};


//
// now our custom map type
//

function CustomMapType(args){

	var numLevels = 0;
	for (var i in args.levels) numLevels++;

	var opts = {
		getTileUrl: function(tile, zoom){

			if (tile.x < 0 || tile.y < 0) return null;
			var z = 1 + ((numLevels-2) - zoom);

			if (args.levels[z][0] <= tile.x) return null;
			if (args.levels[z][1] <= tile.y) return null;

			var tx = ""+tile.x;
			var ty = ""+tile.y;
			while (tx.length < 2) tx = "0"+tx;
			while (ty.length < 2) ty = "0"+ty;

			var url = args.rootUrl+'z'+z+'_'+tx+'_'+ty+'.png';

			return url;
		},
		tileSize: new google.maps.Size(args.tileSize, args.tileSize),
		maxZoom:  numLevels-1,
		minZoom:  0,
		isPng:    false // not sure what that does
	};

	var map_type = new google.maps.ImageMapType(opts);
	map_type.name = args.name;
	map_type.alt = args.alt;
	map_type.projection = new CustomProjection(args.tileSize);

	return map_type;
}
