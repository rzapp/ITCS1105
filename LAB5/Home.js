/*
LAB5
home.js
Raymond Zapp
15 April 2015
*/
$(document).ready(function ()
{
    var serviceLocation = "/home/GetOrderDetails"
    var chickenOrder = false;
    var carnitasOrder = false;
    var steakOrder = false;
    var barbacoaOrder = false;
    
    $(".chicken").children(".label").html("Chicken");
    $(".carnitas").children(".label").html("Carnitas");
    $(".steak").children(".label").html("Steak");
    $(".barbacoa").children(".label").html("Barbacoa");

    $(".chicken").children("input").click(function ()
        {
            chickenOrder = $(this).is(':checked')
        });
    $(".carnitas").children("input").click(function ()
        {
            carnitasOrder = $(this).is(':checked')
        });
    $(".steak").children("input").click(function ()
        {
            steakOrder = $(this).is(':checked')
        });
    $(".barbacoa").children("input").click(function ()
        {
            barbacoaOrder = $(this).is(':checked')
        });
    
    $(".submit-button").click(function ()
        {
        $.ajax(
            {
                url: serviceLocation,
                data: { "Chicken": chickenOrder, "Carnitas": carnitasOrder, "Steak": steakOrder, "Barbacoa": barbacoaOrder },
                success: function (response)
                {
                    var responseObject = JSON.parse(response);
                    var caloriesTotal = responseObject.TotalCalories;
                    var message = "Enjoy!";
                    $('body').html('<div class = "customer-meal"></div>');
                    var order = $(".customer-meal");
                    for (var i = 0; i < responseObject.OrderDetails.length; ++i)
                    {
                        order.append("The " + (responseObject.OrderDetails[i].Name).toLowerCase() + " has " + responseObject.OrderDetails[i].Calories + " calories.<br />");
                    }
                    order.append("<br />Your order totals up to " + caloriesTotal + " calories. <br /><br /><br />");
                    if (caloriesTotal > 535)
                    {
                        message = "Let's hope you don't want fries with that!";
                    }
                    else if (caloriesTotal == 0)
                    {
                        message = "Next please.";
                    }
                    order.append(message);
                }
            }
         );
        }
    )
});