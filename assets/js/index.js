$("#add_user").submit(function (event) {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Data Inserted Successfully!",
  });
});

$("#update_user").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Data Updated Successfully!",
    });
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function (response) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Data Deleted Successfully!",
        }).then(() => {
          location.reload();
        });
      });
    }
  });
}
