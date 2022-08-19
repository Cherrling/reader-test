$(document).ready(function() {
    var text

    var path = "1.md"


    function fillin(path) {
        $.ajax({
            type: "get",
            url: path,
            data: "",
            dataType: "",
            async: false,
            success: function(response) {
                console.log(response);
                text = marked(response)
            }
        });
        console.log(text);
        $("#content").html(text);
    }



    // fillin(path)



});