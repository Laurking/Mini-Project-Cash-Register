$(function(){

	var background=['red','blue','green','yellow','orange'];

	var index=0;

	$('#main .main_function h3').hide();

	$('#header .menu_page section').each(function(){
		if (index<=background.length-1) {
			index=+1;
		}
		else{
			index=0;
		}
		$(this).css('background-color',background[index]);
	});
	

	$('form').submit(function(event){
		event.preventDefault();
	});
	var getContainerWidth=$('#container').width();
	$('.menu_page, .setting_page').css('width',getContainerWidth);

	$(window).resize(function(){
		var getContainerWidth=$('#container').width();
		$('.menuAndSetting').css('width',getContainerWidth);
		$('.menu_page, .setting_page').css('width',getContainerWidth);
	});
	$(window).scroll(function (event) {
		var getContainerWidth=$('#container').width();
    	var scroll = $(window).scrollTop();
    	if (scroll>=190) {
    		$('.menuAndSetting').css('position','fixed');
    		$('.menuAndSetting').css('margin-top','-15%');
    		$('.menuAndSetting').css('width',getContainerWidth);
    		$('#header .menuAndSetting .companyName h3').show();
    	}
    	else{
    		$('.menuAndSetting').css('position','static');
    		$('.menuAndSetting').css('margin-top','0%');
    		$('#header .menuAndSetting .companyName h3').hide()
    		$('.menuAndSetting').css('width',getContainerWidth);
    	}
	});

	$('#menu').click(function(){
		$('.menu_page').slideToggle();
		$('.setting_page').hide();
	});

	$('#setting').click(function(){

		$('.setting_page').slideToggle();
		$('.menu_page').hide();
		$('#create, #view, #edit').hide();
	});
	$('#header .company, #header .address, #main, #footer').click(function(){
		$('.menu_page').hide();
		$('.setting_page').hide();
	});

	$('#header .setting_page #create form button').click(function(){
		var menu=$('#header .setting_page #create form input[name=menu]').val();
		var price=$('#header .setting_page #create form input[name=price]').val();
		if (valueChecker(menu)==true && valueChecker(price)==true) {
			$('#header .menu_page').append('<section><h2>'+menu+'</h2><h3>$ '+price+'</h3></section>');
			$('#header .menu_page section').addClass('newMenu');
			$('#header .setting_page #create form input[name=menu]').val('');
			$('#header .setting_page #create form input[name=price]').val('');
			$('#header .setting_page #create h2').hide();
		}
		else{
			$('#header .setting_page #create h2').remove();
			$('#header .setting_page #create form').before('<h2></h2>');
			$('#header .setting_page #create h2').html('Enter the name and price of the menu');
		}
	});

	$('#header .menu_page').on('click','.newMenu',function(){
		$('#main .main_function h3').slideDown();
		var menu=$(this).children('h2').html();
		var price=$(this).children('h3').html();
		var total=$('#main #value h3').html();
		var convertedTotal=parseFloat(total.substring(1,total.length));
		var convertedPrice=parseFloat(price.substring(1,price.length));
		var newTotal=(convertedPrice+convertedTotal).toFixed(2);
		$('#main #getEntries').append('<section><h2>'+menu+'</h2><h3>'+price+'</h3></section>');
		$('#main #getEntries section').addClass('newSection');
		$('#main #getEntries section h2').addClass('newItem');
		$('#main #getEntries section h3').addClass('newPrice');
		$('#main #value h3').html('$ '+newTotal);

	});

	$('#main #getEntries').on('click','.newSection',function(){
		$(this).toggleClass('selected');
	});

	$('#main .main_function #delete').click(function(){
		$('#main #getEntries section').each(function(){
			if ($(this).hasClass('selected')) {
				var price=$(this).children('h3').html();
				var newPrice=parseFloat(price.substring(1,price.length));
				var total=$('#main #value h3').html();
				var newTotal=parseFloat(total.substring(1,total.length))-newPrice;
				$('#main #value h3').html('$ '+newTotal.toFixed(2));
				$(this).remove();
			}
		});
	});

	// $('#main .main_function .form form input').keypress(function(){
	// 	console.log($(this).val());
	// });

	$('#main .main_function #clearAll').click(function(){
		$('#main #value h3').html('$ 00.00');
		$('#main #getEntries section').remove();
		 $('#main .main_function h3').slideUp();
	});


	$('#header .setting_page nav ul li').click(function(){
		var link=$(this).attr('class');
		$(this).css('border-bottom','none');
		$(this).siblings().css("border-bottom","1px solid black");
		$('#header .setting_page #'+link).show();
		$('#header .setting_page #'+link).siblings('section').hide();
	});

	$('table .submit button').click(function(){
		var companyName=$('table form .companyName').val();
		var streetName=$('table form .streetName').val();
		var city=$('table form .city').val();
		var state=$('table form .state').val();
		var zip_code=$('table form .zip').val();
		var phone=$('table form .phone').val();
		if (valueChecker(companyName)==true && valueChecker(streetName)==true && valueChecker(city)==true && valueChecker(state)==true && valueChecker(zip_code)==true && valueChecker(phone)==true) {
			$('#header .company h1').html(companyName);
			$('#header .menuAndSetting .companyName h3').html(companyName);
			$('#header .address address .street1').html(streetName);
			$('#header .address address .street2 .city').html(city+", ");
			$('#header .address address .street2 .state').html(state);
			$('#header .address address .street2 .zip').html(zip_code);
			$('#header .address address .phone').html(formatPhoneNumber(phone));
			$('table form .companyName').val('');
			$('table form .streetName').val('');
			$('table form .city').val('');
			$('table form .state').val('');
			$('table form .zip').val('');
			$('table form .phone').val('');
		}
	});

	function formatPhoneNumber(number){
		if (number.length==10) {
			var formated="***("+number.substring(0,3)+")"+number.substring(3,6)+"-"+number.substring(6,number.length)+"***";
			return formated;

		}
		else{
			$('table form .phone').val('');
		}
	}



	function valueChecker(value){
		if (value=="" || value==NaN || value.length==0) {
			return false;
		}
		else{
			return true;
		}
	}

});