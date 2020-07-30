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
          var name = record.fields["name"];
          var hours = record.fields["hours"];
          var address = record.fields["address"];
          html.push(listView(id, name, hours, address));
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
        var name = record.fields["name"];
        var hours = record.fields["hours"];
        var address = record.fields["address"];
      
        html.push(
          detailView(
            name,
            hours,
            address,
            formattedString
          )
        );
        $(".detail-view").append(html);
      }
    );
  };
  
  var listView = function(id, name, hours, address) {
    return `
    <p>${name}
    `;
  };
  

  var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}