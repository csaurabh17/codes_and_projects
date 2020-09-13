<%-- 
    Document   : User_Main
    Created on : 11 May, 2020
    Author     : Saurabh.Choudhary
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>User names</title>

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

        .no-sort::after { display: none!important; }

        .no-sort { pointer-events: none!important; cursor: default!important; }
    </style>
    <body>
        <div class="container">
            <div id="fileViewer">
                <a href="file_viewer.jsp" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">File Viewer</a>
            </div>
            <table id="userTable" class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" class="colNum no-sort" >Select</th>
                        <th scope="col" class="fileNum">File Serial No.</th>
                        <th scope="col" class="fullName">Full Name</th>
                    </tr>
                </thead>

                <tbody id="userTable_tbody">

                </tbody>
            </table>

            <div>
                <button type="button" id="addBtn" onclick="addUser()" class="btn btn-outline-secondary">Add User</button>
                <button type="button"  id="editBtn" onclick="editUser()" class="btn btn-outline-secondary">Edit User</button>
                <button type="button" id="addBtn" onclick="syncUserToDB()" class="btn btn-outline-secondary">Sync User to DB</button>

            </div>
        </div>
    </body>
</html>
