$(document).ready(function(){$.ajax({method:"GET",url:"/CookieConsent/ConfirmOrDisplayCookieConsent",contentType:"application/html; charset=utf-8",dataType:"html",success:function(n){$("body").append(n)}})});var internalConsent=function(){var n=this;return n.cookieName="ConsentToCookies",n.daysUntilExpiration=3650,n.consentContainerId="cc-banner",n.init=function(t){t&&(t.cookieName&&(n.cookieName=t.cookieName),t.daysUntilExpiration&&(n.daysUntilExpiration=t.daysUntilExpiration),t.consentContainerId&&(n.consentContainerId=t.consentContainerId));$("#cc-banner").fadeIn("slow");$("#cc-agreement").click(function(){Cookies.set(n.cookieName,!0,{expires:n.daysUntilExpiration});$("#"+n.consentContainerId).fadeOut("fast")})},n},CookieConsent=new internalConsent