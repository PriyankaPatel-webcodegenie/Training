
    $(document).ready(function () {
        alert('Page load');
        $('#userForm').validate({

            rules: {
                firstname: {
                    required: true,
                    minlength: 2
                },
                lastname: {
                    required: true,
                    minlength: 2,
                },
                address: {
                    required: true,
                    minlength: 5,
                }


            },
            messages: {

                firstname: {
                    required: "Please enter a first name",
                    minlength: "Your username must consist of at least 2 characters"
                },
                lastname: {
                    required: "Please enter a last name",
                    minlength: "Your username must consist of at least 2 characters"
                },
                address: {
                    required: "Please enter a email address",

                }

            },
            submitHandler: function () {
                alert("yes..")
                console.log("location" + location.href)
                console.log("location" + window.location)
                let data = new FormData($("#userForm")[0]);
                console.log("Submit handler")
                console.log(data)

                $.ajax({
                    url: '/',
                    enctype: "multipart/form-data",
                    contentType: false,
                    processData: false,
                    cache: false,
                    async: false,
                    type: 'POST',
                    data: data,

                    success: function (data) {
                        if(data.type == 'success'){
                            $('#mydiv').load(location.href + 'users')
                            $('#userForm')[0].reset();
                        } else {
                            alert(data.message)
                        }

                    },
                    error: function (err, exception, message){
                        console.log('exception')
                        console.log(exception)
                        console.log('message')
                        console.log(message)
                        console.log(err)
                        console.log(err.responseText)
                    }
                })
            },


        });

//Delete delete method
        $(document).on('click', '#delete', function () {
            //   $('#delete').click(function () {
            console.log("deleted")
            let id = $(this).data('id');
            console.log("id: ");
            console.log(id);
            $.ajax({
                type: 'delete',
                url: '/' + id,
                data: { id: id },
                success: function (data) {
                    alert("deleted")
                    $('#' + id).remove();
                    $('#mydiv').load(location.href + 'users')
                }
            })
        });
    });

//Edit get method
    $(document).on('click', '#edit', function () {
        console.log("edit.")
        $('#submit').hide();
        $('#update').show();
        $('#clear').show();
        $('#back').show();

        let id = $(this).data('id')
        console.log("id is")
        console.log(id)
        $.ajax({
            type: 'get',
            url: '/edit/' + id + '',

            success: function (data) {
                console.log("data is...")
                console.log(data);
                $("#update").attr('data-id', id);
                $("#firstname").val(data.firstname)
                console.log("firstname data is")

                console.log(data.firstname)
                $("#lastname").val(data.lastname)
                //     $("#interest").val(data.interest)
                /*   $('#' + data.gender).prop('checked', 'checked');*/
                for (let i = 0; i < data.hobby.length; i++) {
                    $('#' + data.hobby[i]).prop('checked', 'checked');
                }
                $("#address").val(data.address)
                $("gender").val(data.gender)
                //   $('.photo').append('<img src=/upload/' + data.photo + ' height=50>');
            },
            error: function (err) {
                console.log(err);
            }
        })


    })

    //Update PUT method
    $(document).on('click', '#update', function () {
        console.log("update.")

        let id = $(this).data('id')
        console.log("id is")
        console.log(id)
        let data = new FormData($("#userForm")[0]);
        $.ajax({
            type: 'put',
            url: '/edit/' + id + '',
            
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            dataType: 'json',
            data: data,
            success: function (data) {
                alert("update success")
                console.log("data is...")
                console.log(data);

                console.log("firstname data is")
                console.log(data.firstname)
                console.log("updated successfully")

                $('#mydiv').load(location.href + 'users')
            },
            error: function (err) {
                console.log(err);
            }
        })

    });

    //search 
    $(document).on('click', '#searchsubmit', function () {
        console.log("serach.")

        //let data = new FormData($("#searchform")[0]);
        console.log("form data is")


        const href = window.location.href + 'users?' + $("#searchform").serialize();
        console.log("href is")
        console.log(href);
        $('#mydiv').load(href)



    });

    //Reset Button
    $(document).on('click', '#searchreset', function () {
        console.log("reset click.")

        //let data = new FormData($("#searchform")[0]);
        console.log("form data is")
        $('#mydiv').load(location.href + 'users')
        console.log("serach url is url")

    });


    //Sorting 
    $(document).on('click', '.classHeader', function () {
        let url = $(this).attr('data-url');
        console.log("hi search sort url is ")
        console.log(url)
        // var newurl = (window.location.href + 'users?' + $("#searchform").serialize() + url);
        // console.log(newurl)
        $('#mydiv').load(window.location.href + url + '&' + $("#searchform").serialize());
        if (url.indexOf('asc') > 0) {
            url = url.replace('asc', 'desc');
        } else if (url.indexOf('desc') > 0) {
            url = url.replace('desc', 'asc');
        }
        $(this).attr('data-url', url);
    })

    //Pagination
    $(document).on('click', '.page-item', function () {


        let pageurl = $(this).attr('data-pageurl');
        console.log(pageurl);
        console.log("hi search sort url is ")
        console.log(window.location.href + 'users' + '?' + $("#searchform").serialize() + pageurl);
        // console.log(window.location.href + 'users' + pageurl)
        // var newurl = (window.location.href + 'users?' + $("#searchform").serialize() + url);
        // console.log(newurl)
        $('#mydiv').load(window.location.href + 'users' + '?' + $("#searchform").serialize() + pageurl);

    })

    //Back button
    $(document).on('click', '#back', function () {
        console.log("back.")

        //let data = new FormData($("#searchform")[0]);
        console.log("form data is")

        $('#submit').show();
        $('#update').hide();
        $('#clear').hide();
        $('#back').hide();
        $('#userForm')[0].reset();
        const href = window.location.href + 'users?' + $("#searchform").serialize();
        console.log("href is")
        console.log(href);
        $('#mydiv').load(href)



    });

    $("#export").click(function(e) {
        console.log('export to velocity hit');
        $.ajax({
            url: window.location+$("#searchform").serialize(),
            type: 'GET',
            success: function(response) {
        },
            error: function(a, b, c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
    });
    $('#toemail').click(function(){
        emaildata= $("#emailform").serialize()
        console.log("hey email is "+emaildata)
        console.log("to email")
       
      
        console.log(window.location.href + 'users?' + $("#emailform").serialize())
            $.ajax({
            url: window.location.href + 'users?' + $("#emailform").serialize(),

            type: 'GET',
            success: function(response) {
                          

        },
            error: function(a, b, c) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        });
        
     
    })

// //     const blob = new Blob([csvResponse], {type: 'application/csv'}); 
// const csv = URL.createObjectURL(blob);
// const a = document.createElement("a");
// a.href = csv;
// a.download = "file.csv";
// document.body.appendChild(a);
// a.click();
// return exportTable = false; 