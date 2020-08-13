function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
  var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/app4QLOjpz9aHEhkl/Food%20Banks?api_key=keyzwuEdoa6bHhQSL",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var name = record.fields["Name"];
          var hours = record.fields["Hours"];
          var address = record.fields["Address"];
          var website = record.fields["Website"];
          var donations = record.fields["Donations"];
          html.push(listView(id, name, hours, address, website, donations));
        });
        $(".list-view").append(html);
      }
    );
  };

  var getOneRecord = function(id) {
    $.getJSON(
      `https://api.airtable.com/v0/app4QLOjpz9aHEhkl/Food%20Banks/${id}?api_key=keyzwuEdoa6bHhQSL`,
      function(record) {
        var html = [];
        var name = record.fields["Name"];
        var hours = record.fields["Hours"];
        var address = record.fields["Address"];
        var website = record.fields["Website"];
        var donations = record.fields["Donations"];
      
        html.push(
          detailView(
            name,
            hours,
            address,
            website,
            donations,
            formattedString
          )
        );
        $(".detail-view").append(html);
      }
    );
  };
  
  var listView = function(id, name, hours, address, website, donations) {
    return `
    <div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${hours}</p>
      <p class="card-text">${address}</p>
      <p class="card-text">${website}</p>
      <p class="card-text">${donations}</p>
      <a href="#" class="btn btn-primary">Learn More</a>
    </div>
  </div>

    `;
  };

  
 
var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}