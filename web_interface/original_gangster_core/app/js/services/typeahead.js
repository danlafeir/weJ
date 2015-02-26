var stripdata = function(data){
	var local = [];
	_.each(data.tracks.items, function(song){
		local.push({
			'val'           : song.name + " / " + song.artists[0].name,
			'uri' 			: song.uri,
			'duration_ms'   : song.duration_ms
		});
	});
	return local;
}

var datasource = new Bloodhound({
	datumTokenizer: function(d) {
		return Bloodhound.tokenizers.whitespace(d.val);
	},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		limit: 50,
		remote: {
			url: "%QUERY",
			transport: function(url, options, onSuccess, onError) { 
				$.get('https://api.spotify.com/v1/search?q='+$('.tt-input').val()+'&type=track&market=US&limit=50', function(data){
					onSuccess(stripdata(data));
				});
			}
		}
});

datasource.initialize();

$('.typeahead').typeahead({
		highlight: true,
		minLength: 3
	},
	{
		name: "local",
		displayKey: "val",
		source: datasource.ttAdapter()
});
