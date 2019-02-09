function updateTotalSupply(){
	$.ajax({
        type: 'POST',
        contentType: "application/json",
        dataType:'json',
        url: '/totalsupply',                      
        success: function(data) {
            console.log('success');
            $('#supply_total').text(data['totalSupply']); 
            $('#account_balance').text("   ");  
            $('dropdown').html($(this).text() + '<span class="caret">Select Account</span>'); 
            document.getElementById("loader").style.display = "none";		
            document.getElementById("overlay").style.display = "none";				
        },
        error: function(error) {
            console.log("error");
            document.getElementById("loader").style.display = "none";		
            document.getElementById("overlay").style.display = "none";	
         }

    });
}

$(function(){
 $('#mint').on('click', function(e){

$('#mintModal').modal('show');

 $('#mint_continue').off('click').on('click', function(e){
data = {"sum":$('#mint_quantity').val()}
document.getElementById("loader").style.display = "block";
document.getElementById("overlay").style.display = "block";			
$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: '/mint',                      
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data)); 
            $('#successModal').modal('show');		
			$('#mint_quantity').val("");			
            updateTotalSupply();			
        },
        error: function(error) {
            console.log("some error in fetching the notifications");
            $('#failModal').modal('show');			
			$('#mint_quantity').val("");
			document.getElementById("loader").style.display = "none";
            document.getElementById("overlay").style.display = "none";					
         }
    });
    });
 });
});

$(function(){
 $('#burn').on('click', function(e){
data = {"sum":$('#burn_quantity').val()}
console.log(data);
$('#burnModal').modal('show');

 $('#burn_continue').off('click').on('click', function(e){
	 
document.getElementById("loader").style.display = "block";
document.getElementById("overlay").style.display = "block";	

$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: '/burn',                      
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data)); 
            $('#successModal').modal('show');				
			$('#burn_quantity').val("");
			updateTotalSupply();					
        },
        error: function(error) {
            console.log("some error in fetching the notifications");
			$('#failModal').modal('show');		
			$('#burn_quantity').val("");
			document.getElementById("loader").style.display = "none";
            document.getElementById("overlay").style.display = "none";					
         }

    });
 });
 });
});

$(function(){
    $('#transfer').on('click', function(e){
	$("#transfer_message").text("Transfer"+" "+$('#transfer_quantity').val()+" "+"coins from central bank to "+$("#current_account").val());	
    $('#transferModal').modal('show');

    $('#transfer_continue').off('click').on('click', function(e){
		
        if ($("dropdown option:selected").text() != "Select Account"){
            data = {"sum":$('#transfer_quantity').val(),"address":$("#current_account").val()};
            document.getElementById("loader").style.display = "block";
            document.getElementById("overlay").style.display = "block";			
			console.log(data);

		    $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType:'json',
                url: '/transfer',                      
                success: function(data) {
                    console.log('success');
                    console.log(JSON.stringify(data)); 
                    $('#successModal').modal('show');	
                    $('#account_balance').text(parseInt($('#account_balance').text())+parseInt($('#transfer_quantity').val()));  							
			        $('#transfer_quantity').val("");	
		     	    document.getElementById("loader").style.display = "none";
                    document.getElementById("overlay").style.display = "none";				
                },
                error: function(error) {
                    console.log("some error in fetching the notifications");
                    $('#failModal').modal('show');			
			        $('#transfer_quantity').val("");
			        document.getElementById("loader").style.display = "none";
                    document.getElementById("overlay").style.display = "none";					
                }
            });
        }
    });
 
 });
});

$( document ).ready(function() {

$.ajax({
        type: 'POST',
        contentType: "application/json",
        dataType:'json',
        url: '/loadAccounts',                      
        success: function(data) {
            console.log('success');

     for( i in data )
        {	
          if (i == 0){
              $('.dropdown-menu').append('<li style="background:#000;" class="option"><a style="color:#fff;" href="#">'+data[i]+'</a></li>');	
		  }
		  else{		  
              $('.dropdown-menu').append('<li class="option"><a style="color:#000;" href="#">'+data[i]+'</a></li>');
		  }
        }  
		
$(function(){
	
$('#account .option').on('click', function(e){
$("#current_account").val($(this).text());
document.getElementById("loader").style.display = "block";
document.getElementById("overlay").style.display = "block";	
$('dropdown').html($(this).text() + '<span class="caret"></span>'); 
data = {'address':$(this).text()};
$.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType:'json',
        url: '/getbalance',                      
        success: function(data) {
            console.log('success');   
            $('#account_balance').text("   "+data['balanceOf']);  
            document.getElementById("loader").style.display = "none";
            document.getElementById("overlay").style.display = "none";				
        },
        error: function(error) {
			$('#failModal').modal('show');	
            console.log("some error in fetching the notifications");
            updateTotalSupply();			
         }

    });
 });
});		
        },
        error: function(error) {
			$('#failModal').modal('show');	
            console.log("error");
            document.getElementById("loader").style.display = "none";
            document.getElementById("overlay").style.display = "none";	
         }

    });  

updateTotalSupply();

	
});




