var list
var text
window.location.href = '#/'

function search(obj, name) {

    for (let i = 0; i < obj.length; i++) {
        const ele = obj[i];
        if (ele.fullname == name) {
            return ele
        }
    }


}





function fillin(path) {
    $.ajax({
        type: "get",
        url: path,
        data: "",
        dataType: "",
        async: false,
        success: function(response) {
            text = marked(response)
            $("#content").html(text);
            $('#header').slideUp(100, function() {
                $("#content-block").slideDown();
            });
        }
    });

}


function filllist(children) {
    var html = ''
    var path = ''
    children.forEach(obj => {
        path = obj.filepath
        path = path.replace('docs', '#')
        html += "<div class='menu-each'>" + "<a href=" + path + ">" + obj.name + "</a> " + "</div>"
    });
    $('#content-block').slideUp(200, function() {
        $('#header').slideDown(200, function() {
            $('#menu').slideUp(200, function() {
                $('#menu').html(html);
                $('#menu').slideDown(200);
            });
        });
    });
}

$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "./data.json",
        data: "",
        dataType: "",
        success: function(response) {
            list = response
            filllist(list)
        }
    });


    window.onhashchange = function() {
        var herf = window.location.href.split('#').slice(-1).toString()
        herfarray = herf.split('/')
        herfarray.splice(0, 1)
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
            if (t.isFile) {
                $("#menu").slideUp(200, function() {
                    fillin(t.filepath)
                });
            } else {
                filllist(t.children)
            }
        }
    }


});