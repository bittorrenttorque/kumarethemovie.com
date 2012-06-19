jQuery(function() {
	var btapp = new Btapp;
	btapp.connect();

	var url = 'http://featuredcontent.utorrent.com/torrents/Kumare-BitTorrent.torrent';
	btapp.on('add', function() {
		btapp.get('add').torrent(url);
	});

	// Lets display the main video in the torrent
	var hash = '4CB4A0336A3C01836536111F44D8A252FDFB0898';
	var name = escape('Kumare - Exclusive Movie Clip_(mkv h.264 720p).mkv');
	btapp.live(
		'torrent ' + hash + ' file ' + name + ' properties streaming_url', 
		function(src) {
			_V_("kumare_video").ready(function(){
				this.src(src);
				this.play();
			});
		}
	);

	// Lets display the images in the torrent
	btapp.live(
		'torrent ' + hash + ' file * properties',
		function(properties) {
			var name = properties.get('name');
			var src = properties.get('streaming_url');
			if(name.indexOf('jpg', name.length - 3) !== -1) {
				var img = $('<img src="' + src + '" />');
				$('#kumare_images').append(img);
			}
		}
	);
});