function togglePasswordStateEnum(){passwordState=passwordState===PASSWORDSTATES.HIDDEN?PASSWORDSTATES.SHOWN:PASSWORDSTATES.HIDDEN}function toggleShowPasswordImageSource(n){passwordState===PASSWORDSTATES.HIDDEN?n.attr("src","/assets/icons/show.svg"):n.attr("src","/assets/icons/hide.svg")}function toggleShowPasswordLabelText(n){passwordState===PASSWORDSTATES.HIDDEN?n.text("SHOW"):n.text("HIDE")}function toggleAnchorTagAriaExpanded(n){passwordState===PASSWORDSTATES.HIDDEN?n.attr("aria-pressed","false"):n.attr("aria-pressed","true")}function togglePasswordTextboxState(n){passwordState===PASSWORDSTATES.HIDDEN?n.attr("type","password"):n.attr("type","text")}function togglePasswordStatus(n){passwordState===PASSWORDSTATES.HIDDEN?n.text("Password hidden."):n.text("Password shown.")}function showHidePassword(n,t,i,r,u){togglePasswordStateEnum();toggleShowPasswordImageSource(n);toggleShowPasswordLabelText(t);togglePasswordTextboxState(r);toggleAnchorTagAriaExpanded(i);togglePasswordStatus(u)}var PASSWORDSTATES={HIDDEN:{value:0,name:"Hidden"},SHOWN:{value:1,name:"Shown"}},passwordState;$(document).ready(function(){passwordState=PASSWORDSTATES.HIDDEN})