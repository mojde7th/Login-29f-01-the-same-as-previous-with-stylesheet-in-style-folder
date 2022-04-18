
var cftp_timerId = null;

var before = new Date();
var timerInterval = 60000 * 10;

// Notifier Class
function Notifier() {

	// Determine the correct object to use
	this.notification = window.Notification || window.mozNotification || window.webkitNotification;
	this.notifyEnabled = false;
	
	this.RequestPermission = function() {
		
		var supported = ('undefined' !== typeof this.notification);
		
		// The user needs to allow this
		if (supported) {
			this.notification.requestPermission( function(permission){
				if (permission === 'denied') {  
				}
			});
		}
		else {
			notifyEnabled = false;
		}
		
		return supported;
	}
	
	this.Enable = function(val) {
		
		notifyEnabled = val;
	}
		
	// The Notify function
	this.Notify = function(titleText, bodyText) {
		
		if (!notifyEnabled || 'undefined' === typeof this.notification) {
			return false;       // Not enabled or not supported....
		}
		var noty = new this.notification(
			titleText, {
				body: bodyText,
				dir: 'auto', // or ltr, rtl
				lang: 'EN', //lang used within the notification.
				tag: 'notificationPopup', //An element ID to get/set the content
				icon: '/images/login-icon.png' //The URL of an image to be used as an icon
			}
		);
		noty.onclick = function () {
			console.log('notification.Click');
		};
		noty.onerror = function () {
			console.log('notification.Error');
		};
		noty.onshow = function () {
			console.log('notification.Show');
		};
		noty.onclose = function () {
			console.log('notification.Close');
		};
		
		setTimeout(noty.close.bind(noty), 8000);
		
		return true;
	}
};

function passwordFormGroupCtrl(passCtrls, showHideBtn, hideLabel, showLabel) {

    if (hideLabel === undefined) {
        hideLabel = "Hide password";
    }
    if (showLabel === undefined) {
        showLabel = "Show password";
    }

    showHideBtn.click(function () {

        if ($(this).children("span").is(".glyphicon-eye-close")) {

            passCtrls.attr('type', 'text');
            $(this).children("span").removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open");
            $(this).attr('title', hideLabel);
        }
        else {

            passCtrls.attr('type', 'password');
            $(this).children("span").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close");
            $(this).attr('title', showLabel);
        }
    });
}

function resetStatus() {
	
	$('#status-container').empty().html('<div id="status" class="alert alert-dismissable alert-success"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>');
}

function clearStatus() {
	$('#status-container').empty();
}

function addWarningMsg(msg) {

	var statusItem = $("<div><span class='glyphicon glyphicon-warning-sign'></span>&nbsp;" + msg+ "</div>").hide();
	$("#status").removeClass("alert-danger alert-success").addClass("alert-warning").append(statusItem);
	statusItem.fadeIn(500);
}

function addStatusMsg(success, msg) {

	if ($('#status').length == 0){
		resetStatus();
    }
	
    if (success ) {
	
		var statusItem = $("<div><span class='glyphicon glyphicon-ok-circle'></span>&nbsp;" + msg+ "</div>").hide();
		$("#status").removeClass("alert-danger alert-warning").addClass("alert-success").append(statusItem);
		statusItem.fadeIn(500);
	}
	else {
		var statusItem = $("<div><span class='glyphicon glyphicon-exclamation-sign'></span>&nbsp;" + msg+ "</div>").hide();
		$("#status").removeClass("alert-success alert-warning").addClass("alert-danger").append(statusItem);
		statusItem.fadeIn(500);
	}
}


function clearText(field) {

    if (field.defaultValue == field.value)
        field.value = "";
    else if (field.value == "")
        field.value = field.defaultValue;
}

		
function updateTips(tip, tipContainer) {

	tipContainer.text( tip ).addClass( "alert-warning" );
	setTimeout(function() {
		tipContainer.removeClass( "alert-warning", 1500 ).addClass( "alert-info" );
	}, 1000 );
}
		
function number_format( number, decimals, dec_point, thousands_sep ) {
 
    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point == undefined ? "," : dec_point;
    var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
 
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function size_format(filesize) {

    if (filesize >= 1073741824) {

	     filesize = number_format(filesize / 1073741824, 2, '.', '') + ' GB';
    }
    else if (filesize >= 1048576) {

     	filesize = number_format(filesize / 1048576, 2, '.', '') + ' MB';
    }
    else if (filesize >= 1024) {

    	filesize = number_format(filesize / 1024, 0) + ' KB';
    }
    else {

    	filesize = number_format(filesize, 0) + ' B';
	}

    return filesize;
}

function clipboardShowTooltip(elem, msg) {

    elem.setAttribute('title', msg);
    $(elem).tooltip('show');
}

function clipboardFallbackMessage(action) {

    var actionMsg = ''; var actionKey = (action === 'cut' ? 'X' : 'C');
    if (/iPhone|iPad/i.test(navigator.userAgent)) { actionMsg = 'No support :('; }
    else if (/Mac/i.test(navigator.userAgent)) { actionMsg = 'Press ⌘-' + actionKey + ' to ' + action; }
    else { actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action; }
    return actionMsg;
}


function getWaitMessage2(msg) {

	var waitMsg = "<div class='alert alert-info center-block'>" + 
    "<div class='pull-left'><img class='img-rounded' src='/images/loader.gif' /></div>" +
    "<div class='pull-left' style='padding: 5px 10px'>" + msg + "</div><div class='clearfix'></div>" +
	"</div>";

	return waitMsg;
}
	
function getWaitMessage(msg) {
	var waitMsg = '<div style="padding: 15px">' +
					'	<div class="alert alert-info center-block">' +
					'		<h5>' + msg + '</h5>' +
					'	</div>' +
					'	<div class="progress progress-striped active">' +
					'		<div class="progress-bar progress-bar-success"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
					'			<span class="sr-only">Processing...</span>' +
					'		</div>' +
					'	</div>' +
					'</div>';	

	return waitMsg;
}
	
		
function performIdleCheck() { 

	var now = new Date();
	var elapsedTime = (now.getTime() - before.getTime());

    if(elapsedTime > timerInterval) {
		
		$.ajax({
			url: '/login/idle_check',
			dataType: 'json', 
			type: 'POST'
		})
		.done(function( data ) {
		
			// Update the last execute date
			before = new Date();
			if( !data.success ) {
		
				// Cancel the timer
				window.clearInterval(cftp_timerId);	
				cftp_timerId = null;
				
				resetStatus();
                addStatusMsg(false, cftp_msg["L_MSG_TIMEOUT"]);
				
				setTimeout(function (){
				
					// Wait a few seconds and then navigate to timeout
                    window.location.replace("/timeout");
				 }, 5000);			
			}
		})
        .fail(function (jqXHR, textStatus, error ) {
		
 			// Cancel the timer
			window.clearInterval(cftp_timerId);	
            cftp_timerId = null;

            if (jqXHR.status === 401) {

                location.replace("/login?m=Please+login+again&s=1");
            }
            else {
                resetStatus();
                addStatusMsg(false, cftp_msg["L_MSG_COMM_FAILURE"]);
            }
		});
	}
}	
 
function toggleTimer() { 

	var isPaused = true;
	
	if( cftp_timerId ) {
					          
		window.clearInterval(cftp_timerId);	
		cftp_timerId = null;
	}
	else {
		// Check every 5 seconds
		cftp_timerId = window.setInterval(performIdleCheck, 5000);
		isPaused = false;
	}	
	
	return isPaused;							
}


$(document).ready(function () {

    // Best-for-now Legacy Browser Frame Breaking Script
    if (self === top) {

        $("#antiClickjack").remove();

    } else {
        top.location = self.location;
    }


    $("#status-container").on("click", "#status-close-link", function () {

        $('#status').fadeOut(100, function () {
            $('#status-container').empty();
        });

    });


    $("#_context_help_").click(function (e) {

        // main overlay container
        $('<div id="__msg_overlay">').css({
            "width": "100%"
            , "height": "100%"
            , "background": "#000"
            , "position": "fixed"
            , "top": "0"
            , "left": "0"
            , "zIndex": "50"
            , "MsFilter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)"
            , "filter": "alpha(opacity=20)"
            , "MozOpacity": 0.2
            , "KhtmlOpacity": 0.2
            , "opacity": 0.2

        }).appendTo(document.body).one("click", function () {

            $(this).remove();
            $("button, .tip").popover('hide');
        });

        $("button, .tip").popover({
            container: 'body',
            trigger: 'manual'
        }).popover('show');

        e.preventDefault();
    });
});
