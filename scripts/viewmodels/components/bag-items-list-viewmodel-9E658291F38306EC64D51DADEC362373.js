function showModal(n,t){var i=getBranch(n.DepartmentHierarchy,0),r=getBranch(n.DepartmentHierarchy,1),u=getBranch(n.DepartmentHierarchy,2),f={displayID:n.DisplayId,listingType:CurrentListingType,isClearance:CurrentIsClearance,priceTest:CurrentIsPriceTest,siteVersion:CurrentSiteVersion,storeID:CurrentStoreID,departmentID:r,parentDepartmentID:i,subDepartmentID:u,cartID:cartID,currentSizeID:"",selectedColorID:n.ColorID(),selectedSizedID:n.FirstSizeID()&&n.SecondSizeID()?"":n.ProductSizeId(),selectedFirstSize:n.FirstSizeID()||"",selectedSecondSize:n.SecondSizeID()||"",shopperID:""};return $.ajax({type:"POST",url:"services/ProductService.asmx/GetDisplayForViewProduct",data:JSON.stringify(f),contentType:"application/json; charset=utf-8",dataType:"JSON",success:function(i){window.loadQuickViewModal(i,n,t)},error:function(n){console.log(n)}}),!1}var PlusSizePrefix="PLUS:",BagTileTemplate=$("#hidBagTilePreset").val(),bagItemsListViewModel=function(n){var t=this;t.disallowUndoAction=ko.observable(!1);t.notify=n.notify;t.isLoginNotCompleted=n.isLoginNotCompleted;t.allowFinalSale=n.allowFinalSale;t.errorMessage=n.errorMessage;t.skipCount=n.skipCount;t.isRegisteredShopperLoggedIn=n.isRegisteredShopperLoggedIn;t.HasErrorMessage=ko.computed(function(){return t.errorMessage?t.errorMessage!=="":!1});t.Products=ko.observableArray();t.setProducts=ko.computed(function(){t.Products(ko.utils.arrayMap(n.items(),function(n){return new ShoppingBagItem(n,t)}));t.undoItem&&t.Products.splice(t.undoItem.index,0,t.undoItem.item)});t.ProductsCount=ko.computed(function(){for(var i=0,n=0;n<t.Products().length;n++)t.Products()[n].UndoType()==="None"&&(i+=t.Products()[n].Quantity());return i});t.ShoppingBagHeaderText=ko.computed(function(){return"Shopping Bag ("+t.ProductsCount()+")"});t.ShoppingBagHeaderScreenReaderAudio=ko.computed(function(){return"You have "+t.ProductsCount()+" items in your shopping bag."});t.RemoveItem=function(n,i){var r;i.preventDefault();t.disallowUndoAction(!1);t.undoItem!=null&&(r=t.Products().indexOf(t.undoItem.item),t.Products.splice(r,1));$.ajax({type:"DELETE",url:"api/BagItem/"+n.ShoppingBagItemId,contentType:"application/json; charset=utf-8",success:function(){n.UndoType("Remove");var i=t.Products().indexOf(n);t.undoItem={index:i,item:n};t.SendBagItemChangedNotification();t.TriggerFiringRemoveItemEventTag(n)}})};t.MoveToWishList=function(n,i){if(i.preventDefault(),!t.isRegisteredShopperLoggedIn){window.location.href="secure/login.aspx?source=/bag.aspx";return}t.disallowUndoAction(!1);var r={Id:n.ShoppingBagItemId,Quantity:n.Quantity(),DisplayId:n.DisplayId,Price:n.Price(),DepartmentHierarchy:n.DepartmentHierarchy,ProductOptionId:n.ProductOptionId(),ProductStyle:n.ProductStyle(),ProductSku:n.ProductSku(),ProductName:n.Name,ProductSizeId:n.ProductSizeId(),DisplaySize:n.DisplaySize(),ProductColorId:n.ColorID(),ProductColorName:n.ColorName(),ShopperId:shopperID,GiftCardFlag:n.GiftCardFlag,GiftCardFrom:n.GiftCardFrom,GiftCardTo:n.GiftCardTo,GiftCardMessage:n.GiftCardMessage,TaxCategoryCode:n.TaxCategoryCode};$.ajax({type:"POST",url:"api/shoppingbag/add-to-wish-list",data:JSON.stringify(r),contentType:"application/json; charset=utf-8",success:function(){n.UndoType("WishList");var i=t.Products().indexOf(n);t.undoItem={index:i,item:n};t.SendBagItemChangedNotification();t.TriggerFiringMoveItemToWishListEventTag(n)}})};t.UndoDelete=function(n,i){var r,u,f;if(i.preventDefault(),r="api/shoppingbag/",t.disallowUndoAction())return!1;t.disallowUndoAction(!0);u={Id:n.ShoppingBagItemId,Quantity:n.Quantity(),DisplayId:n.DisplayId,Price:n.Price(),DepartmentHierarchy:n.DepartmentHierarchy,ProductOptionId:n.ProductOptionId(),ProductStyle:n.ProductStyle(),ProductSku:n.ProductSku(),ProductName:n.Name,ProductSizeId:n.ProductSizeId(),DisplaySize:n.DisplaySize(),ProductColorId:n.ColorID(),ProductColorName:n.ColorName(),ShopperId:shopperID,GiftCardFlag:n.GiftCardFlag,GiftCardFrom:n.GiftCardFrom,GiftCardTo:n.GiftCardTo,GiftCardMessage:n.GiftCardMessage,TaxCategoryCode:n.TaxCategoryCode};n.UndoType()=="WishList"?r+="move-wish-list-item-back-to-bag":n.GiftCardFlag?r="api/GiftCard":r+="add-item";n.GiftCardFlag?(f={GiftCardAmount:n.Price(),GiftCardQuantity:n.Quantity(),GiftCardFrom:n.GiftCardFrom,GiftCardTo:n.GiftCardTo,GiftCardMessage:n.GiftCardMessage},$.ajax({type:"PUT",url:r,data:JSON.stringify(f),contentType:"application/json; charset=utf-8",success:function(){t.undoItem=null;t.SendBagItemChangedNotification();t.TriggerFiringAddItemToBagEventTag(n)}})):$.ajax({type:"POST",url:r,data:JSON.stringify(u),contentType:"application/json; charset=utf-8",success:function(){t.undoItem=null;t.SendBagItemChangedNotification();t.TriggerFiringAddItemToBagEventTag(n)}})};t.UpdateItemQuantity=function(n){var i={Id:n.ShoppingBagItemId,Quantity:n.Quantity()};$.ajax({type:"POST",url:"api/shoppingbag/update-quantity",data:JSON.stringify(i),contentType:"application/json; charset=utf-8",success:function(){t.SendBagItemChangedNotification()}})};t.SendBagItemChangedNotification=function(){t.notify&&t.notify()};t.TriggerFiringRemoveItemEventTag=function(n){var i=t.BuildEventTagItem(n);FireRemoveItemEventTag(i)};t.TriggerFiringMoveItemToWishListEventTag=function(n){var i=t.BuildEventTagItem(n);FireMoveItemToWishListEventTag(i)};t.TriggerFiringAddItemToBagEventTag=function(n){var i=t.BuildEventTagItem(n);FireAddItemToBagEventTag(i)};t.BuildEventTagItem=function(n){return{ProductStyle:n.ProductStyle(),ProductSku:n.ProductSku(),Price:n.Price(),Quantity:n.Quantity(),ProductCategory:n.LowestLevelDepartmentID()}}},ShoppingBagItem=function(n,t){var e="https://photo.venus.com/im/",o=BagTileTemplate,s="content/images/gift_card.png",i=this,r,u,f;for(i.parent=t,i.ShoppingBagItemId=n.Id,i.DisplayId=n.Location.Id,i.ProductOptionId=ko.observable(n.OptionId),i.ProductStyle=ko.observable(n.Style),i.ProductSku=ko.observable(n.InternalSku),i.PlusSizeFlag=ko.observable(n.Sizing.IsPlusSize),i.DepartmentHierarchy=n.Location.Path||"",i.LowestLevelDepartmentID=ko.pureComputed(function(){for(var t=i.DepartmentHierarchy.split("~"),n=t.length-1;n>=0;n--)if(t[n]&&!isNaN(t[n]))return t[n];return 0}),i.Name=n.Name,i.IsLazyLoad=ko.pureComputed(function(){return i.parent.Products().indexOf(i)>=i.parent.skipCount}),i.ForceCapitalize=function(n){return n===null||n===undefined?"":(""+n).toLowerCase().replace(/\b\w/g,function(n){return n.toUpperCase()})},i.DisplayName=ko.pureComputed(function(){return i.PlusSizeFlag()?"Plus Size "+i.ForceCapitalize(i.Name):i.ForceCapitalize(i.Name)}),i.OriginalPrice=ko.observable(n.Pricing.OriginalPrice),i.FormattedOriginalPrice=ko.pureComputed(function(){return"$"+i.OriginalPrice().toFixed(2)}),i.FormattedOriginalPriceScreenReaderAudio=ko.pureComputed(function(){return(i.IsSaleItem()?"Normal Price: ":"Price: ")+i.FormattedOriginalPrice()+"."}),i.Price=ko.observable(n.Pricing.Price),i.FormattedPrice=ko.pureComputed(function(){return"$"+i.Price().toFixed(2)}),i.FormattedPriceScreenReaderAudio=ko.pureComputed(function(){return"Sale Price: "+i.FormattedPrice()+"."}),i.PriceWithPromo=ko.observable(n.Pricing.ListedPrice),i.FormattedPriceWithPromo=ko.pureComputed(function(){return"$"+i.PriceWithPromo().toFixed(2)}),i.SubtotalBeforePromo=ko.observable(n.Pricing.Subtotal),i.FormattedSubtotalBeforePromo=ko.pureComputed(function(){return"$"+i.SubtotalBeforePromo().toFixed(2)}),i.FormattedSubtotalBeforePromoScreenReaderAudio=ko.pureComputed(function(){return"Subtotal: "+i.FormattedSubtotalBeforePromo()+"."}),i.SubtotalAfterPromo=ko.observable(n.Pricing.ListedSubtotal),i.FormattedSubtotalAfterPromo=ko.pureComputed(function(){return"$"+i.SubtotalAfterPromo().toFixed(2)}),i.Quantity=ko.observable(n.Quantity),i.QuantityOptions=[],r=1;r<=(n.Quantity<=10?10:n.Quantity);r++)i.QuantityOptions.push(r);i.AvailabilityStatus=ko.observable(n.AvailabilityStatus);u=Date.parse(n.AvailabilityDate);f=n.AvailabilityDate!=null&&!isNaN(u)?new Date(n.AvailabilityDate).toLocaleDateString("en-US"):"";i.DeliveryDate=ko.observable(f);i.ColorID=ko.observable(n.Color.Id);i.ColorName=ko.observable(n.Color.Name);i.ColorDisplayName=ko.pureComputed(function(){return i.ForceCapitalize(i.ColorName())});i.ProductImageName=ko.observable(n.Location.Image);i.ProductSizeId=ko.observable(n.Sizing.Id);i.DisplaySize=ko.observable(n.Sizing.Name);i.FirstSizeID=ko.observable(n.Sizing.First);i.SecondSizeID=ko.observable(n.Sizing.Second);i.UndoType=ko.observable("None");i.GiftCardFlag=n.IsGiftCard;i.GiftCardFrom=n.GiftCard.From;i.GiftCardTo=n.GiftCard.To;i.GiftCardMessage=n.GiftCard.Message;i.TaxCategoryCode=n.TaxCategoryCode;i.FinalSaleFlag=ko.observable(n.IsOnFinalSale);i.IsOnWishList=ko.observable(n.IsOnWishList&&!t.isLoginNotCompleted);i.IsSaleItem=ko.pureComputed(function(){return i.OriginalPrice()!==i.Price()});i.ImageURL=ko.pureComputed(function(){return i.GiftCardFlag?s:e+i.ProductImageName()+o});i.AvailabilityMessage=ko.computed(function(){switch(i.AvailabilityStatus()){case 1:return"<strong><span class='gtxt'>In Stock<\/span><\/strong>";case 2:return"<font class='rtxt'><Strong>"+i.DeliveryDate()+"<\/strong><\/font>";default:return"<font class='rtxt'><Strong>Out of Stock<\/strong><\/font>"}});i.FinalSaleMessage=ko.computed(function(){if(i.FinalSaleFlag())return"<font class='rtxt'><strong>Final Sale Item<\/strong><br><span style='font-style: italic;'>no exchanges or refunds<\/span><\/font>"});i.FinalSaleMessageScreenReaderAudio=ko.computed(function(){if(i.FinalSaleFlag())return"This is a Final Sale item.  No exchanges or refunds are permitted."});i.ProductURL=ko.pureComputed(function(){return i.GiftCardFlag?"/secure/giftcard_edit.aspx?cartitemid="+i.ShoppingBagItemId:"/viewproduct.aspx?BRANCH="+i.DepartmentHierarchy+"&ProductDisplayID="+i.DisplayId});i.EditProduct=function(n,t){t.preventDefault();showModal(i,$(t.target));i.TriggerFiringEditItemEventTag(i)};i.UpdateProductFromQuickView=function(n){var t={CartItemId:i.ShoppingBagItemId,Quantity:n.Quantity,DisplayId:n.parent.DisplayID(),DisplaySize:n.DisplaySize(),ProductStyle:n.StyleNumber,ProductSizeId:n.SelectedSize()?n.SelectedSize().ID:"",ProductColorId:n.SelectedColor().ID};$.ajax({type:"POST",url:"api/BagItem",data:JSON.stringify(t),contentType:"application/json; charset=utf-8",success:function(){i.parent.SendBagItemChangedNotification()},error:function(n){console.log(n)}})};i.TriggerFiringEditItemEventTag=function(n){var t=i.parent.BuildEventTagItem(n);FireEditItemEventTag(t)}}