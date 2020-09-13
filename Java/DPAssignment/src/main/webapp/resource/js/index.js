/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
//    debugger
//    $("#userTable").DataTable();
    refreshTable();
})


function addUser() {
//    debugger;
    let nameInput = prompt("Please enter full name");
    if (confirm("Do you want to add " + nameInput + "?")) {
        addUserInFile(nameInput);
    }
}

function addUserInFile(input) {
//    debugger;
    let counter = $("#userTable tbody tr").length;
    if($(".dataTables_empty").length > 0){
        counter = 0;
    }
    
    try {
        $.ajax({
            type: "POST",
            data: "input=" + input +
//                    "&param=" + encodeURIComponent(JSON.stringify(param)) +
                    "&counter=" + counter,
            url: "./DPAddUser",
            success: function (data) {
                alert(data);
                location.reload();
            },
            error: function (e) {
                console.log(e)
            }
        });
    } catch (e) {
        console.log("Error :" + e);
    }
}

var rex;
function refreshTable() {
//    debugger;
    $("#userTable_tbody").html("");
    try {
        $.ajax({
            type: "GET",
//            data: "input=" + input +
////                    "&param=" + encodeURIComponent(JSON.stringify(param)) +
//                    "&counter=" + counter,
            url: "./DPGetUsers",
            success: function (data) {
                let receivedData = JSON.parse(data);
                rex = receivedData;
                receivedData.forEach(function (elem, idx) {
                    elem = elem.split(/[\\.]+/i);
                    console.log(elem)
                    $("#userTable_tbody").append("<tr>" +
                            "<td class='c_radio'><input type='radio' name ='radio' class='r_" + elem[0] + "'/></td>" +
                            "<td class='c_fileNum'>" + elem[0] + "</td>" +
                            "<td class='c_fullName'>" + elem[1] + "</td>" +
                            "</tr>");
                });
//                $('#userTable').DataTable().fnClearTable();
//                $('#userTable').DataTable().fnDestroy();
                $('#userTable').DataTable({"iDisplayLength": 5, "bLengthChange": false, "bAutoWidth": false,
                    "columnDefs": [
                        {"orderable": false, "targets": 0}
                    ],
                    "fnInitComplete": function () {
                        $("#userTable").css("width", "100%");
                        $("#userTable").parent().css("overflow", "");
                        $("#userTable").css("padding", "0px");

                    }
                });

            },
            error: function (e) {
                console.log(e)
            }
        });
    } catch (e) {
        console.log("Error :" + e);
    }
}
function syncUserToDB() {
    try {
        $.ajax({
            type: "POST",
//            data: "input=" + input +
////                    "&param=" + encodeURIComponent(JSON.stringify(param)) +
//                    "&counter=" + counter,
            url: "./DPSyncUser",
            success: function (data) {
                alert(data);
                location.reload();
            },
            error: function (e) {
                console.log(e)
            }
        });
    } catch (e) {
        console.log("Error :" + e);
    }
}

function editUser() {
//    debugger
    let elem = $("#userTable tbody input:radio:checked");
    if (elem.length === 0) {
        alert("Please select a user first")
        return;
    }
    let nameInput = prompt("Please enter new name for selected user");
    if (!confirm("Do you want to edit for " + nameInput + "?")) {
        return;
    }


    let idx = elem.closest("tr").find(".c_fileNum").text();

    try {
        $.ajax({
            type: "POST",
            data: "input=" + nameInput +
//                    "&param=" + encodeURIComponent(JSON.stringify(param)) +
                    "&idx=" + idx,
            url: "./DPEditUser",
            success: function (data) {
                alert(data);
                location.reload();
            },
            error: function (e) {
                console.log(e)
            }
        });
    } catch (e) {
        console.log("Error :" + e);
    }
}

