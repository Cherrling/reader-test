function search(obj, name) {

    for (let i = 0; i < obj.length; i++) {
        const ele = obj[i];
        if (ele.fullname == name) {
            return ele
        }
    }


}
var list

$.ajax({
    type: "GET",
    url: "./data.json",
    data: "",
    dataType: "",
    success: function(response) {
        list = response

    }
});


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


function filllist(children) {
    var html = ''
    var path = ''
    children.forEach(obj => {
        path = obj.filepath
        path = path.replace('docs', '#')
        html += "<div class='menu-each'>" + "<a href=" + path + ">" + obj.name + "</a> " + "</div>"
    });
    $('#content-block').slideUp(300, function() {

        $('#menu').slideUp(200, function() {
            $('#menu').html(html);
            $('#menu').slideDown(200);
        });
    });
}



$(document).ready(function() {
    var text





    window.onhashchange = function() {
        var herf = window.location.href.split('#').slice(-1).toString()
        herfarray = herf.split('/')
        herfarray.splice(0, 1)
        var path
        if (herfarray[0] == "") {
            filllist(list)



        } else {

            var temlist = list
            var t
            herfarray.forEach(obj => {
                obj = decodeURI(obj)
                t = search(temlist, obj)
                if (!t.isFile) {
                    temlist = t.children
                }
            });

            console.log(t);

            if (t.isFile) {
                $("#menu").slideUp(300, function() {

                    fillin(t.filepath)
                    $("#content-block").slideDown();
                });
            } else {
                filllist(t.children)

            }



        }


    }




    filllist(list)


});