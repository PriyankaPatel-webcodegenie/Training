$(document).ready(function () {

    // console.log(123, window.location + "/");

    // SUBMIT FORM
    $("#userForm").submit(function (event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPost();
    });


    function ajaxPost() {

        // PREPARE FORM DATA
        var formData = {
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            address: $("#address").val(),

             gender: $("#gender").val(),
            interest: $("#interest").val(),
           // photo
           
        }
        console.log("formdata");
        // DO POST
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: window.location,
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (response) {
              //  console.log("user")
                console.log(response)
                /*
                $("#postResultDiv").html("" +
                    "Post Successfully! " +
                    "--> " + user.firstname + " " + user.lastname + " " + user.address + "");
                */
            },
            error: function (e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });

        // Reset FormData after Posting
        resetData();

    }

    function resetData() {
        $("#firstname").val("");
        $("#lastname").val("");
        $('#address').val("");
        $('#gender').val("");
    
    }
})





// $(document).ready(function(){

//     // $("#userForm").submit(function(data){
//     //     console.log(data);
//     // //    event.preventDefault();

//     //     //       
//     //     // var fd = new FormData($('#userForm')[0]);
//     //     // var files = $('#file')[0].files[0];
//     //     // fd.append('file',files);

//     //     // $.ajax({
//     //     //     url: window.location,
//     //     //     type: "POST",
//     //     //     data: fd,
//     //     //     contentType: false,
//     //     //     processData: false,
//     //     //     success: function(response){
//     //     //         if(response != 0){
//     //     //             // $("#photo").attr("src",response); 
//     //     //             // $(".preview img").show(); // Display image element
//     //     //             $('#mydiv').load(location.href.replace('form'))
//     //     //             $('#userForm')[0].reset();
//     //     //         }else{
//     //     //             alert('file not uploaded');
//     //     //         }
//     //     //     },
//     //     // });
//     // });
// });