function AddressSuggestions(n){var i=n.line1Id,r=n.line2Id,u=n.cityId,f=n.stateId,e=n.provinceId,o=n.regionId,s=n.postcodeId,t=n.countryId,l=n.keyValue,a=n.loqateLibraryUrl,h=n.elementToFocus,v=getCountriesConfigFromSettings(n),c=function(n,t){var i=null;n&&(i=JSON.stringify(n,Object.getOwnPropertyNames(n)));$.ajax({url:"/api/logging",type:"POST",data:JSON.stringify({Data:i,Message:t}),contentType:"application/json; charset=utf-8"})},y=function(n){$("#"+t).val(n);$("#"+t).trigger("change")},p=function(){$("#"+i).trigger("change");$("#"+r).trigger("change");$("#"+u).trigger("change");$("#"+f).trigger("change");$("#"+e).trigger("change");$("#"+o).trigger("change");$("#"+s).trigger("change")};this.init=function(){var w;try{var b=[{element:i,field:"{StreetAddress}",mode:pca.fieldMode.POPULATE|pca.fieldMode.SEARCH},{element:r,field:"SubBuilding",mode:pca.fieldMode.POPULATE},{element:u,field:"City",mode:pca.fieldMode.POPULATE},{element:f,field:"Province",mode:pca.fieldMode.POPULATE},{element:e,field:"Province",mode:pca.fieldMode.POPULATE},{element:o,field:"Province",mode:pca.fieldMode.POPULATE},{element:s,field:"PostalCode",mode:pca.fieldMode.POPULATE},{element:t,field:"CountryIso2",mode:pca.fieldMode.POPULATE}],k={key:l,countries:{codesList:v},autoSearch:!0,suppressAutocomplete:!1},n=new pca.Address(b,k);n.listen("error",function(t){n.destroy();c(null,t)});n.listen("prepopulate",function(n){y(n.CountryIso2)});n.listen("populate",function(){p();h&&$("#"+h).focus()})}catch(d){w="Failed to initialize Loqate. Loqate URL in web.config: '"+a+".'";c(d,w)}};this.init()}function getCountriesConfigFromSettings(n){return n.countriesList||(n.countriesList=[USAIsoCode,CanadaIsoCode,AustraliaIsoCode]),n.countriesList.join(",")}const USAIsoCode="USA",CanadaIsoCode="CAN",AustraliaIsoCode="AUS"