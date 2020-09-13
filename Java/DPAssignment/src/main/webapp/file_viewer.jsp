<%-- 
    Document   : file_viewer.jsp
    Author     : Saurabh.Choudhary
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Files</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.20/r-2.2.3/sc-2.0.1/sl-1.3.1/datatables.min.css"/>

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
        <script
            src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossorigin="anonymous"></script>
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.20/r-2.2.3/sc-2.0.1/sl-1.3.1/datatables.min.js"></script>
        <script src="./resource/js/index.js"></script>

    </head>

    <style>
        .container{
            position: absolute;
            top: 30%;
            left: 10%;
        }
    </style>  
    <body>

        <div class="container">
            <div class="row">
                <div class="col-sm-3 entry">
                    <img src="" id="pan" onclick="display($(this), 'downloadPAN', './resource/img/sample_PAN.jpg')" alt="Sample PAN (Click to View)"/>
                    <div><a href="./resource/img/sample_PAN.jpg"  id="downloadPAN" hidden style="display:none;" download>Download PAN</a></div>
                    <!--<button type="button" id="removePANaccess" onclick="removeAccess('pan')" class="btn btn-info">Remove Access</button>-->
                    <div class="checkbox">
                        <label><input type="checkbox" class="pan" identifier="dp" value=""/>Hide</label>
                    </div>
                </div>

                <div class="col-sm-3 entry">

                    <img src="" id="aadhar" onclick="display($(this), 'downloadAadhar', './resource/img/sample_aadhar.jpg')" alt="Sample Aadhar (Click to View)"/>
                    <div><a href="./resource/img/sample_aadhar.jpg" id="downloadAadhar" hidden style="display:none;" download>Download Aadhar</a></div>
                    <!--<button type="button" onclick="removeAccess('aadhar')" class="btn btn-info">Remove Access</button>-->
                    <div class="checkbox">
                        <label><input type="checkbox" class="aadhar" identifier="dp" value=""/>Hide</label>
                    </div>
                </div>
                <div class="col-sm-3 entry">

                    <img src="" id="pic" onclick="display($(this), 'downloadPIC', './resource/img/sample_PIC.jpg')" alt="Sample PIC (Click to View)"/>
                    <div><a href="./resource/img/sample_PIC.jpg" id="downloadPIC" hidden style="display:none;" download>Download PIC</a></div>
                    <!--<button type="button"  onclick="removeAccess('pic')" class="btn btn-info">Remove Access</button>-->
                    <div class="checkbox">
                        <label><input type="checkbox" class="pic" identifier="dp" value=""/>Hide</label>
                    </div>
                </div>

                <div class="col-sm-3 entry">

                    <div><a href="./resource/img/sample_XLS.xls" id="downloadXLS"  download>Download xls</a></div>
                    <!--<button type="button" onclick="removeAccess('downloadXLS')" class="btn btn-info">Remove Access</button>-->
                    <div class="checkbox">
                        <label><input type="checkbox" class="downloadXLS" identifier="dp" value=""/>Hide</label>
                    </div>
                </div>
            </div>

            <div class="row">
                <button type="button" onclick="hideItems();" class="btn btn-info">Remove Access</button>
            </div>

        </div>

        <script>

            function display(elem, anchor, src) {
                $(elem).attr("src", src);

                $("#" + anchor).show();
            }

            function hideItems() {
                let role = '${role}';
                let arr = [];
                if (role === "admin") {
                    var param = {
                        hiddenID: []
                    };
                    $("input[identifier='dp']:checkbox:checked").each(function () {
                        arr.push(this.className)

                    });
                    param.hiddenID = arr;
                    localStorage.setItem("restrict", JSON.stringify(param));
                }
            }


            


            function restrictAcess(role) {
                debugger;
                var restricted = localStorage.getItem("restrict");
                if (role === "default") {
                    console.log("restricting before for : " + restricted);
                    let x = JSON.parse(restricted);
                    console.log("restricting for : ");
                    console.log(x);
                    x.hiddenID.forEach(function (e) {
                        debugger;
                        $("." + e).closest(".entry").hide();
                    })
                }
            }
            function setUserRole(user, role) {
                console.log(user);
                console.log(role);
                console.log("restriceee: " + localStorage.getItem("restrict"));
                localStorage.setItem("user", user);
                localStorage.setItem("role", role);
            }


            $(document).ready(function () {
                setUserRole('${user}', '${role}')
                restrictAcess('${role}')
            });

        </script>
    </body>
</html>
