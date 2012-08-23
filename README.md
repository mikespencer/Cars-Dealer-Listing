#Description:
Ad template prototype for the dynamic "Cars Dealer Listings" unit.

#Features:
* Built with HTML/CSS/JavaScript/PHP
* Dynamic content pulled directly from the specified car dealerships feed. 
* Lazy loading of images on scroll to optimise performance.

#Useage:
    var wpAd = window.wpAd || {};
    wpAd.cars_listings = wpAd.cars_listings || {};
    wpAd.cars_listings.vars = {
      dealer_name : 'DEALER_NAME',
      c : 'CLICK_TRACKER', 
      u : 'CLICKTHRU_URL'
    }
    
##dealer_name:
The name of the dealer. (EG: 'A Plus Motors LLC', 'Ferrari Maserati Lamborghini of Washington', '1st Choice Auto')

##c:
Prepended click tracking URL (generated in DoubleClick by the %c macro). Leave as empty string if it not needed/available.

##u:
The main clickthrough URL where the top and bottom parts of the unit will click through to (generated in DoubleClick with the %u macro).