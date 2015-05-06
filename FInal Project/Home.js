/*
ITCS1105
Final Project
home.js
Raymond Zapp
LID 00146825
6 May 2015
*/
function buttonReady()
{
    $(".login-button, .create-button, .email-input-button, .element-input-button, .element-add-button, .element-update-button").hover(function () {
        $(this).css("background-color", "#CAFFFF");
        $(this).css("color", "#6699FF");
        $(this).css("cursor", "pointer");
    }, function () {
        $(this).css("background-color", "rgba(102,153,255,0.75)");
        $(this).css("color", "#CAFFFF");
    });
}
function buttonBind()
{
    $(".create-button").click(function () {
        $.ajax(Create());
    });
    $(".login-button").click(function () {
        $.ajax(Login());
    });
    $(".element-input-button").click(function () {
        $.ajax(Element($(".account-output").html(), $(".element-name-text").val(), $(".element-value-text").val()));
    });
    $(".element-update-button").click(function () {
        $.ajax(Element($(".account-output").html(), $(".element-name").html(), $(".element-update-text").val()));
    });
    $(".email-input-button").click(function () {
        $.ajax(Element($(".account-output").html(), "emailadd", $(".email-text").val()));
    });
}
function Create() {
    return {
        url: "/home/CreateAccount",
        data: 
        {
          "Username": $(".new-username-text").val(),
          "Password": $(".new-password-text").val(),
          "EmailAdd": $(".new-email-text").val(),
          "EmailCon": $(".new-email-confirm-text").val()
        },
        success: function (response) { CreateResponse(JSON.parse(response)); }
    }
}
function Login() {
    return {
        url: "/home/Login",
        data:
        {
          "Username": $(".username-text").val(),
          "Password": $(".password-text").val() 
        },
        success: function (response) { LoginResponse(JSON.parse(response)); }
    }
}
function Account()
{
    return {
        url: "/home/GetAccountInformation",
        data:
        {
            "Username": $(".username-text").val() 
        },
        success: function (response) { AccountResponse(JSON.parse(response)); }
    }
}
function Element(user, name, value)
{
    if (name == "" || value == "")
    {
        $(".error-message-element").html("Please complete above entry.").css("color", "red");
        return;
    }
    return {
        url: "/home/AddOrUpdateElement",
        data:
        {
            "Username": user,
            "ElementName": name,
            "ElementValue": value
        },
        success: function (response) {
            if (((JSON.parse(response)).Message) == !"Success")  
            {
                alert("error");   // needs error routine
            }
            var payloadObject = JSON.parse(JSON.parse(response).Payload);
            var accountValues = Object.keys(payloadObject.account);
            $(".element-name-text").val("");
            $(".element-value-text").val("");
            $(".error-message-element").html("Thank you.").css("color", "green");
      }
    }
}
function CreateResponse(response) 
{
    if (response.Message == "Error") 
    {
        if (response.Username == "Invalid") 
        {
            $(".error-message-create").html("Your username must contain at least six characters").css("color", "red");
            $(".new-username-text").focus();
        }
        else if (response.Username == "Exists") 
        {
            $(".error-message-create").html("Your username is already in use.").css("color", "red");
            $(".new-username-text").focus();
        }
        else if (response.Password == "Invalid") 
        {
            $(".error-message-create").html("The password must contain at least six characters").css("color", "red");
            $(".new-password-text").focus();
        }
        else if (response.EmailAdd == "Invalid") 
        {
            $(".error-message-create").html("A valid email address is required").css("color", "red");
            $(".new-email-text").focus()
        }
        else if (response.EmailCon == "Invalid") 
        {
            $(".error-message-create").html("A matching email address is required").css("color", "red");
            $(".new-email-confirm-text").focus()
        }
        else if (response.EmailCon == "Mismatch") 
        {
            $(".error-message-create").html("The address does not match. Please re-enter email").css("color", "red");
            $(".new-email-confirm-text").focus();
        }
    }
    else if (response.Message == "Success") 
    {
        alert(response.Message);
        $(".username-text").val($(".new-username-text").val());
        GetAccountInfo();
        slide();
    }
}
function LoginResponse(response) 
{
    if (response.Message == "Error") 
    {
        if (response.Username == "Invalid") 
        {
            $(".error-message-login").html($(".username-text").val() + " NOT existing user account name").css("color", "red");
        }
        else if (response.Password == "Wrong") 
        {
            $(".error-message-login").html($(".password-text").val() + " does not match credentials for " + $(".username-text").val()).css("color", "red");
        }
    }
    else if (response.Message == "Success") 
    {
        alert("Welcome back!");
        GetAccountInfo();
        slide();
    }
}
function AccountResponse(response) 
{
    var payload = JSON.parse(response.Payload);
    $(".account-output").html(payload.account.username);  
    $(".email-text").val(payload.account.emailadd);  
    var accountValues = Object.keys(payload.account);        
    //alert("Element Names: " + accountValues);                // available display of all user Element names
    $(".first").find(".element-name").html(accountValues[2]);
    $(".first").find(".element-update-text").val(payload.account[accountValues[2]]);
    if (accountValues.length > 3)
    {
        for (element = 3; element < accountValues.length; element++)
        {
            var lastElement = $(".account-display").find("div.row").last();
            var nextElement = lastElement.clone();
            nextElement.find(".element-name").html(accountValues[element]);
            nextElement.find(".element-update-text").val(payload.account[accountValues[element]]);
            lastElement.after(nextElement);
        }
    }
    buttonReady();
    buttonBind();
}
function GetAccountInfo() 
{
    var serviceLocation = "/home/GetAccountInformation";
    $.ajax(Account());
}
function slide() 
{
    $(".slide1").toggle("slide", { direction: "right" }, 2400); /* wrapper for login session is slide1*/
    $(".slide2").toggle("slide", { direction: "left" }, 2400);  /* wrapper for login session is slide2*/    
}
$(document).ready(function () {
    buttonReady();
    buttonBind();
});