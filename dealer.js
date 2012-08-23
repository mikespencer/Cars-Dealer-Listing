var wpAd = window.wpAd || {};
wpAd.cars_listings = wpAd.cars_listings || {};

wpAd.cars_listings.init = function(){
  var s = document.createElement('script');
  s.type='text/javascript';
  s.src = 'http://ads.washingtonpost.com/cars/parseJSON.php?dealer='+ encodeURIComponent(wpAd.cars_listings.vars.dealer_name) +'&callback=wpAd.cars_listings.exec';
  document.getElementsByTagName('head')[0].appendChild(s);
}

wpAd.cars_listings.exec = function(data){
  if(data){
    wpAd.cars_listings.data = data;
    wpAd.cars_listings.addAddress(data[0]);
    wpAd.cars_listings.addListings(data[1]);
    if(data[0][5] !== ''){
      $('a.cars_hp_dealer_ct').attr({ href : wpAd.cars_listings.vars.c + 'http://www.cars.com/go/dealersearch/logDealerLead.jsp' + data[0][5] })
    }
    $("#cars_hp_content img").lazyload({
      placeholder : "http://media.washingtonpost.com/wp-adv/test/mstest/cars_dealer_test/images/grey.gif",
      container: $("#cars_hp_content")
    });
    $('#cars_hp_content').jScrollPane({
      verticalGutter: 1,
            verticalDragMaxHeight: 10
    }).bind('jsp-scroll-y',function(){
      $(this).trigger('scroll');
    });
  } else {
    $('#cars_hp_loading').html('Content could not be loaded.')
  }
}

wpAd.cars_listings.addAddress = function(data){
  $('#cars_hp_address').html('\
    <div>'+ data[0] +'</div>\
    <div>'+ data[1] +', '+ data[2] +' '+ data[3] +'</div>\
    <div>'+ data[4].slice(0,3) + '-' + data[4].slice(3,6) + '-' + data[4].slice(6,10) +'</div>\
  ');
}

wpAd.cars_listings.addListings = function(data){
  var l = data.length, rv = '', i;
  for(i = 0; i < l; i++){
    rv += wpAd.cars_listings.addSingleListing(data[i]);
  }
  $('#cars_hp_content').html(rv).find('img').error(function(i){
    $(this).replaceWith('<div class="badURL"></div>')
  });
}

wpAd.cars_listings.addSingleListing = function(data){
  return '\
    <a target="_blank" href="'+ wpAd.cars_listings.vars.c +'http://www.cars.com/go/search/detail.jsp?tracktype=usedcc&listingId='+ data[6] +'&aff=wpost" class="vehicle">\
      <img src="http://images.cars.com/preview'+ data[5] +'.jpg" width="100" height="75" alt="'+ data[2] +' '+ data[0] +' '+ data[1] +'" />\
      <div class="vehicle-big">'+ data[2] +' '+ data[0] +' '+ data[1] +'</div>\
      <div class="vehicle-big">'+ (data[3] !== '' && data[3]!== '0' ? wpAd.cars_listings.formatNumber(data[3], 0, '$') : '') +'</div>\
      <div class="vehicle-big" style="margin-bottom:3px;">'+ (data[7] !== '' ? (wpAd.cars_listings.formatNumber(data[7], 0, '') +'mi.') : '')+'</div>\
      <div>'+ (data[4].replace(/\,/g,', ')).replace(/\,\s\,/g, ',').replace(/^\,\s/,'') +'</div>\
      <div class="clear"></div>\
    </a>\
  ';
}

wpAd.cars_listings.formatNumber = function(num, dec, pre){
  var i = parseInt(num = Math.abs(+num || 0).toFixed(dec)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
  return pre+(j ? i.substr(0, j) + ',' : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ',') + (dec ? '.' + Math.abs(num - i).toFixed(dec).slice(2) : "");
}

//loading spinner:
wpAd.cars_listings.spinner = new Spinner({
  lines: 13,
  length: 7,
  width: 4,
  radius: 10,
  corners: 1,
  rotate: 0,
  color: '#333',
  speed: 1,
  trail: 60,
  shadow: false,
  hwaccel: false,
  className: 'spinner',
  top: 'auto',
  left: 'auto'
}).spin(document.getElementById('loading_spinner'));

$(wpAd.cars_listings.init);