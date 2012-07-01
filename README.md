# Use a custom tile-set with Google Maps

To view the demo, <a href="http://iamcal.github.com/gmaps-custom/">click here</a>.

After creating your map object, you can create a custom tile set layer like this:

    map.mapTypes.set('CustomType', CustomMapType({
        name		: 'CustomTiles',
        alt		: 'My Custom Tile Set',
        tileSize	: 256,
        rootUrl		: 'img/',
        levels		: { 1: [1,1], 0: [2,2] }		
    }));

    map.setMapTypeId('CustomType');

This sets up a new tile layer, consisting of 256 x 256 images.
This tileset has two zoom levels - they must always be numbered from
zero, with zero being the most zoomed-in (this might be backwards, 
in which case I need to fix it). Each level needs to include its 
dimensions in numebr of tiles - in the code above, there are 2x2 tiles
when zoomed in (level 0) and 1x1 tiles when zoomed out (level 1).

URLs to tile images are constructed using this pseudo-code:

    {args.rootUrl}z{zoom}_{xx}_{yy}.png

The `x` and `y` values are zero-padded when less than 10. An example 
tile URL, using the demo code above:

    img/z0_01_01.png

The `x` and `y` values are zero-based. That is, level 1 in the example
will have a single image called `z1_00_00.png`.

