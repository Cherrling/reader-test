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
            $('#header').fadeOut(100, function() {
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
    $('#content-block').fadeOut(200, function() {
        $('#header').fadeIn(0, function() {
            $('#menu').fadeOut(200, function() {
                $('#menu').html(html);
                $('#menu').fadeIn(200);
            });
        });
    });
}

function changenav(array) {
    var nav = ''
    var temlist = list
    var t

    if (array[0] != "") {
        array.forEach(obj => {
            obj = decodeURI(obj)
            t = search(temlist, obj)
            path = t.filepath
            path = path.replace('docs', '#')
            console.log(path);
            nav += "<span class='nav'>></span>"
            nav += "<span class='nav'>" + "<a href=" + path + ">" + t.name + "</a> " + "</span>"
            if (!t.isFile) {
                temlist = t.children
            }
        });
    }

    $('#span-block').fadeOut(100, function() {
        $('#span-block').html(nav);
        $('#span-block').fadeIn();
    });


}


function readme(path, callback) {
    var readme
    $.ajax({
        type: "GET",
        url: path,
        timeout: 1000,
        success: function(response) {
            readme = marked(response)
            $('#readme').fadeOut(200, function() {
                $('#readme').html(readme);
                $('#readme').fadeIn();
            });
        }
    });
    callback()
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
            readme('./docs/README.md')
        }
    });


    window.onhashchange = function() {
        var herf = window.location.href.split('#').slice(-1).toString()
        herfarray = herf.split('/')
        herfarray.splice(0, 1)
        changenav(herfarray)
        if (herfarray[0] == "") {
            readme('./docs/README.md')
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
                $('#readme').fadeOut();
                $("#menu").fadeOut(100, function() {
                    fillin(t.filepath)
                });
            } else {
                readme(t.filepath + "/README.md", function() {

                    filllist(t.children)
                })
            }
        }
    }


});