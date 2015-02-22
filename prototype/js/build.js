$(function() {


		/* -----------------------------------------------------------
			Give container som padding to parts appear more centered
        ----------------------------------------------------------- */

		var padLeft = $(window).width() / 2 - 150;
		var padRight = $(window).width() / 8;

		$('#rube-container').css({
			"paddingLeft" : padLeft,
			"paddingRight" : padRight
		});

		/* -----------------------------------------------------------
			Horizontal Scrolling
        ----------------------------------------------------------- */

	   	var wrapper = document.querySelector('#wrapper');
		horwheel(wrapper);


        /* -----------------------------------------------------------
            Enter Message Box
        ----------------------------------------------------------- */

        var nameEntered = false;
        var msgEntered  = false;
        var name = '';
        var message = '';

        function turnOnNextBtn() {
            if (nameEntered == true && msgEntered == true) {
                $('#done-message').addClass('visible');
            } else {
                $('#done-message').removeClass('visible')
            }
        }

        $('#name-textarea').bind('input', function() {
            var nameText = $.trim($(this).val());
            if (nameText.length > 0) {
                nameEntered = true;
            } else {
                nameEntered = false;
            }
            turnOnNextBtn();
        });

        $('#message-textarea').bind('input', function() {
            var msgText = $.trim($(this).val());
            if (msgText.length > 0) {
                msgEntered = true;
            } else {
                msgEntered = false;
            }
            turnOnNextBtn();
        });

        $("#done-message").click(function() {
            name    = $('#name-textarea').val();
            message = $('#message-textarea').val();
            $('#input').removeClass('onscreen');
            $('#wrapper').removeClass('offscreen');
            console.log(name);
            console.log(message);
        });

		/* -----------------------------------------------------------
			Function for appending new elements
        ----------------------------------------------------------- */

		jQuery.fn.appendEach = function( arrayOfWrappers ){
            var rawArray = jQuery.map(				// Map the array of jQuery objects to an array of raw DOM nodes.
                arrayOfWrappers,
                function( value, index ){
                    return( value.get() );			// Return the unwrapped version
                }
            );
            this.append( rawArray );				// Add the raw DOM array to the current collection.
            return( this );            				// Return this reference to maintain method chaining.
        };


        /* -----------------------------------------------------------
			Instantiate the various part choice pickers
        ----------------------------------------------------------- */

		var picker_1 = '<div class="picker"><button class="add" value="1">Add Part #1</button><button class="add" value="2">Add Part #2</button></div>';
		var picker_2 = '<div class="picker"><button class="add" value="3">Add Part #3</button><button class="add" value="4">Add Part #4</button></div>';
		var picker_3 = '<div class="picker"><button class="add" value="5">Add Part #5</button><button class="add" value="6">Add Part #6</button></div>';
		var picker_4 = '<div class="picker"><button class="add" value="7">Add Part #7</button><button class="add" value="8">Add Part #8</button></div>';
		var picker_5 = '<div class="picker"><button class="add" value="9">Add Part #9</button><button class="add" value="10">Add Part #10</button></div>';
		var picker_6 = '<div class="picker"><button class="add" value="11">Add Part #11</button><button class="add" value="12">Add Part #12</button></div>';
		var picker_7 = '<div class="picker"><button class="add" value="13">Add Part #13</button><button class="add" value="14">Add Part #14</button></div>';
		var picker_8 = '<div class="picker"><button class="add" value="15">Add Part #15</button><button class="add" value="16">Add Part #16</button></div>';
		

        /* -----------------------------------------------------------
            Keep track of what part we're adding
        ----------------------------------------------------------- */

        var partCount = 1;
        var parts = [];

		/* -----------------------------------------------------------
			Function for creating choice blocks
        ----------------------------------------------------------- */

		function createBlock( what ){
            partCount++;
            checkAnimate();
			if (what == '1') {
            	return( $( "<div class='block part'>" + picker_1 + "</div>" ) );
            }
            else if (what == '2') {
            	return( $( "<div class='block part'>" + picker_2 + "</div>" ) );
            }
            else if (what == '3') {
            	return( $( "<div class='block part'>" + picker_3 + "</div>" ) );
            }
            else if (what == '4') {
            	return( $( "<div class='block part'>" + picker_4 + "</div>" ) );
            }
            else if (what == '5') {
            	return( $( "<div class='block part'>" + picker_5 + "</div>" ) );
            }
            else if (what == '6') {
            	return( $( "<div class='block part'>"  + picker_6 + "</div>" ) );
            }
            else if (what == '7') {
            	return( $( "<div class='block part'>" + picker_7 + "</div>" ) );
            }
            else if (what == '8') {
            	return( $( "<div class='block part'>" + picker_8 + "</div>" ) );
            }
            else if (what >=9) {
            	return( $( "<div class='block'><div class='message'><h1>" + name + ",</h1><br>" + message + "</div></div>" ) );
            }
        }

        /* -----------------------------------------------------------
			Function for creating parts within blocks
        ----------------------------------------------------------- */

        function createPart( what ){
            // Create the part
            return(
                $( "<div class='goods'>Part Number " + what + "</div>" )
            );
        }

        /* -----------------------------------------------------------
			Function for creating fully built part blocks
        ----------------------------------------------------------- */

        function createBuild(what) {
            partCount++;
            checkAnimate();
        	return(
                $( "<div class='block part'><div class='goods'>" + what + "</div></div>" )
            );
        }

        /* -----------------------------------------------------------
			Check if parts should be animated (based on left distance from window)
        ----------------------------------------------------------- */

        function checkAnimate() {
	        $('.goods').each(function() {				// repeate for each part
	        	var offset = $(this).offset();			//
	        	var xPos = offset.left;					// get distance from left
	        	var threshold = $(window).width() - ($(window).width() / 4);	// get threshold (half window width)
	        	if (xPos < threshold) {	
	        		$(this).addClass("activated");		// add class if passed threshold
	        	}
			});  
	    }

        /* -----------------------------------------------------------
			Start the machine off with a single choice block
        ----------------------------------------------------------- */

        parts.push(createBlock( "1" ) );
        $( "#rube-container" ).appendEach( parts );

        /* -----------------------------------------------------------
			If choice is clicked, add it to the machine
        ----------------------------------------------------------- */

        $("#rube-container").on("click", ".part .add", function(){
	        parts.push( createBlock( partCount) );
	        $( "#rube-container" ).appendEach( parts );
    		var val = $(this).attr("value");
	        var newPart = createPart(val);
	        $(this).closest('.part').append(newPart);
	        $(this).closest('.picker').remove();
	        var n = $('#rube-container').width();
    		$('#wrapper').animate({ scrollLeft: n }, 1000, "easeOutCubic" );
	    });


		/* -----------------------------------------------------------
			WIP!
			Deleting parts from the machine
        ----------------------------------------------------------- */

		$(".part").on("click", ".goods .remove", function () {
	        var parent = $(this).closest(".part");
			$(parent).append(picker);
			$(this).closest(".goods").remove();
			$('#rube-container').prepend(part);
	    });

	    /* -----------------------------------------------------------
			Animate parts on scroll
        ----------------------------------------------------------- */

	    $('#wrapper').scroll(function(){					// trigger when scroll area scrolls
	    	checkAnimate();
	    })

	});