var current_year=-1;
function render_publication(publication) {
    var MY_NAME = "Po-Nien Kung";
    console.log(current_year)
    console.log(publication)
    // Check Year difference
    if (current_year != publication.year) {
        year_item=$( ".example-publication-year" ).clone();
        year_item.removeClass("example-publication-year");
        year_item.children("h1").children("small").text(publication.year);
        year_item.show();
        $("#publication-list").append(year_item);
        current_year = publication.year;
    }
    // paper element
    var paper_item=$( ".example-publication-item" ).clone().removeClass("example-publication-item");;
    // paper title, author, conference
    paper_item.children(".paper_title").text(publication.paper_title);
    paper_item.children(".author_list").html(publication.author_list.replace(MY_NAME, "<b style=\"color:#52ab98\">"+ MY_NAME+ "</b>"));
    paper_item.children(".conference").children(".paper-conference").text(publication.conference);
    console.log(publication.accept_rate);
    console.log(publication.accept_rate!="");
    if (publication.accept_rate!=""){
        paper_item.children(".conference").children(".paper-accept-rate").text("("+publication.accept_rate+")");
        console.log("Show");
        paper_item.children(".conference").children(".paper-accept-rate").show();
    }
    // all links
    $.each(publication.links,function(index,value){ 
        if (value!="") { // not empty
            var link_item = paper_item.children(".conference").children("."+index+"-link");
            link_item.children("a").attr("href", value);
            link_item.show();
        }
    });
    paper_item.show();
    $("#publication-list").append(paper_item);
}
$(document).ready(function(){
    $.getJSON("content/publication.json", function(data){
        for (let index = 1; index < data.length; index++) {
            render_publication(data[index])
        }
        // console.log(data[0]); // Prints: 14
    }).fail(function(){
        console.log("An error has occurred.");
    });
});