$(document).ready(function() {
    var text

    var list

    $.ajax({
        type: "GET",
        url: "./data.json",
        data: "",
        dataType: "",
        success: function(response) {
            list = response
            console.log(list);
            console.log(search(list, 'test'));
        }
    });


    function search(obj, name) {
        obj.forEach(ele => {
            if (ele.name == name) {
                console.log(ele);
                return ele
            }
        });
    }



    window.onhashchange = function() {
        var herf = window.location.href.split('#').slice(-1).toString()
        herfarray = herf.split('/')
        herfarray.splice(0, 1)
        console.log(herfarray);
        if (herfarray[0] == "") {

            var html = ''
            list.forEach(obj => {
                html += "<div class='menu-each'>" + obj.name + "</div>"
            });


        } else {

            // var temlist = list

            // herfarray.forEach(obj => {
            //     var t = search(temlist, obj)
            //     if (t.isFile) {


            //         return
            //     } else {
            //         temlist = t
            //     }
            // });

            // console.log(t);




        }


        $('#menu').slideUp(200);
        $('#menu').html(html);
        $('#menu').slideDown(200);









    }



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