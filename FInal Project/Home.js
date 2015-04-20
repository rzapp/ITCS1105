// JScript source code

function Create() {
    return {
        url: "/home/CreateAccount",
        success: function (response) { CreateResponse(JSON.parse(response)); },
        data: 
        {
          "Username": $(".new-username-text").val(),
          "Password": $(".new-password-text").val(),
          "EmailAdd": $(".new-email-text").val(),
          "EmailCon": $(".new-email-confirm-text").val()
        }
    }
}

function Login() {
    return {
        url: "/home/Login",
        success: function (response) { LoginResponse(JSON.parse(response)); }, 
        data:
        {
          "Username": $(".username-text").val(),
          "Password": $(".password-text").val() 
        }
    }
}

function Account()
{
    return {
        url: "/home/GetAccountInformation",
        success: function (response) { AccountResponse(JSON.parse(response)); },
        data:
        {
            "Username": $(".username-text").val()
        }
    }
}


function CreateResponse(response) {
    if (response.Message == "Error") {

        if (response.Username == "Invalid") {
            alert("Username must be at least 6 characters");
        }
        else if (response.Username == "Exists") {
            alert("Username is already taken");
        }
        else if (response.Password == "Invalid") {
            alert("Password must be at least 6 characters");
        }
        else if (response.EmailAdd == "Invalid") {
            alert("Email must contain @");
        }
        else if (response.EmailCon == "Invalid") {
            alert("Please enter email address");
        }
        else if (response.EmailCon == "Mismatch") {
            alert("Email address entry does not match");
        }
    }
    else if (response.Message == "Success") {
        alert("Good!");
        $(".account-output").html($(".new-username-text").val());     // just for TESTING
        slide();
    }
}


function LoginResponse(response) 
{
    if (response.Message == "Error") {

        if (response.Username == "Invalid") {
            alert($(".username-text").val() + " is NOT existing user account name");
        }
        else if (response.Password == "Wrong") {
            alert("Password does not match credentials for " + Username);
        }
    }
    else if (response.Message == "Success") {
        alert("Welcome back!");
        GetAccountInfo();
        slide();
    }
}

function AccountResponse(response) {
    var output = response.Payload;
    var newObj = output.account;
    var nextObj = JSON.parse(response.Payload);
    $(".account-output").html(nextObj.account.username);  // ************* HERE
    $(".email-text").val(nextObj.account.password);
}

function GetAccountInfo() {
    var serviceLocation = "/home/GetAccountInformation";
    $.ajax(Account());
}


function slide() {
    //$(".SLIDE").toggle("slide", {direction: "left"}, 2400);  /* in and out*/
    $(".slide1").toggle("slide", { direction: "right" }, 2400); /* wrapper for login session is slide1*/
    $(".slide2").toggle("slide", { direction: "left" }, 2400); /* wrapper for account session is slide2*/
}

$(document).ready(function () {

    $(".create-button").click(function () 
    {
        $.ajax(Create());
    });

    $(".login-button").click(function () 
    {
        $.ajax(Login());
    });

});