function BagViewModel(n,t,i,r,u,f,e,o,s){var h=this;h.orderSummary=ko.observable(n);h.items=ko.observable(t);h.promotion=ko.observable(i);h.taxableItemSubtotal=ko.observable(n.TaxableItemSubtotal);h.shippingCountry=ko.observable(r);h.totalOrderDiscount=ko.observable(n.TotalOrderDiscount);h.chatLink=u;h.isLoginNotCompleted=f;h.allowFinalSale=e;h.errorMessage=o;h.skipCount=s;h.bagQuantity=ko.computed(function(){for(var t=0,n=0;n<h.items().length;n++)t+=h.items()[n].Quantity;return t});h.isBagNotEmpty=ko.computed(function(){return h.items().length>0});h.update=function(){$.ajax({type:"GET",url:"api/order",success:function(n){h.orderSummary(n.Pricing);h.items(n.Items);h.promotion(n.Promotion);h.taxableItemSubtotal(n.Pricing.TaxableItemSubtotal);h.shippingCountry(n.Shipping.Address.Country);h.totalOrderDiscount(n.Pricing.TotalOrderDiscount);window.OrderItems=h.items();setBagCount(h.bagQuantity())}})}}function bagInit(n,t,i,r,u,f,e,o,s){var h=new BagViewModel(n,t,i,r,u,f,e,o,s);ko.applyBindings(h,document.getElementById("main"))}ko.components.register("bag-items-list",{viewModel:bagItemsListViewModel,template:{fromUrl:"/partials/bag-items-list.html",maxCacheAge:25}});ko.components.register("order-summary",{viewModel:orderSummaryViewModel,template:{fromUrl:"/partials/order-summary.html",maxCacheAge:25}});ko.components.register("promotions-input",{viewModel:promotionsInputViewModel,template:{fromUrl:"/partials/promotions-input.html",maxCacheAge:25}});ko.components.register("promotions-summary",{viewModel:promotionsSummaryViewModel,template:{fromUrl:"/partials/promotions-summary.html",maxCacheAge:25}});ko.components.register("live-chat",{viewModel:liveChatViewModel,template:{fromUrl:"/partials/live-chat.html",maxCacheAge:25}})