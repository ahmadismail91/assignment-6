 function MenuChoice()
 {
    if (document.getElementById("menu").value == "Add Customer")
    {
     document.getElementById("section1").style.display = "block";
     document.getElementById("section1").style.visibility = "visible";
     document.getElementById("section2").style.visibility = "hidden";
     document.getElementById("section2").style.display = "none";  // i put display/none property so that when hiding the content of the area, the content of the other area is displayed on the same place (as i understood from the homework)
     document.getElementById("section3").style.visibility = "hidden";
     document.getElementById("section3").style.display = "none"; 
    }
    
    else if (document.getElementById("menu").value == "Change Shipping Address")
    {
     document.getElementById("section2").style.display = "block";
     document.getElementById("section1").style.visibility = "hidden";
     document.getElementById("section2").style.visibility = "visible";
     document.getElementById("section1").style.display = "none";
     document.getElementById("section3").style.visibility = "hidden";
     document.getElementById("section3").style.display = "none"; // i put display/none property so that when hiding the content of the area, the content of the other area is displayed on the same place (as i understood from the homework)
    }
     else if (document.getElementById("menu").value == "Delete Customer")
    {
     document.getElementById("section3").style.display = "block";
     document.getElementById("section1").style.visibility = "hidden";
     document.getElementById("section3").style.visibility = "visible";
     document.getElementById("section1").style.display = "none";
     document.getElementById("section2").style.visibility = "hidden";
     document.getElementById("section2").style.display = "none"; // i put display/none property so that when hiding the content of the area, the content of the other area is displayed on the same place (as i understood from the homework)
    }
    else
    {
     document.getElementById("section1").style.visibility = "hidden";
     document.getElementById("section2").style.visibility = "hidden";
     document.getElementById("section3").style.visibility = "hidden";
    
    }
 }
 
 function CreateCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = " https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    //Collect Customer data from web page
    var customerid = document.getElementById("custid1").value;
    var customername = document.getElementById("custname1").value;
    var customercity = document.getElementById("custcity1").value;
    //Create the parameterstring
    var newcustomer = '{"CustomerID":"'+customerid+'","CompanyName":"'+customername+'","City":"'+customername+'"}';
    //Checking for AJAx operationreturn
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

 function OperationResult(output)
    {
        if (output.WasSuccessful)
        {
           document.getElementById("result").innerHTML = "The operation was successful!";   
           
        }
        else
        {
         document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
    }
 
 function UpdateOrder()
 
 {
   var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    //Collect shipping data from web page
    var orderId = document.getElementById("ordertid").value;
    var shipName = document.getElementById("shipname").value;
    var shipAddress = document.getElementById("shipaddress").value;
    var shipCity = document.getElementById("shipcity").value;
    var shipCode = document.getElementById("shipcode").value;
    //Create the parameterstring
    var neworder = '{"OrderID":"'+orderId+'","ShipName":"'+shipName+'","ShipAddress":"'+ shipAddress +'","ShipCity":"' + shipCity +'","ShipPostcode":"' + shipCode +'"}';
    //Checking for AJAx operationreturn
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult2(result);
        }
    }
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(neworder);
 
 }
function OperationResult2(output)
    {
        if (output ==1)
        {
           document.getElementById("result2").innerHTML = "The operation was successful!";   
           
        }
        else if(output ==0)
        {
         document.getElementById("result2").innerHTML = "The operation was not successful! Operation failed with an unspecified error" + "<br>" + output.Exception;
        }
        else if(output ==-2)
        {
         document.getElementById("result2").innerHTML = "The operation was not successful! Operation failed because the data string supplied could not be deserialized into the service object" + "<br>" + output.Exception;
        }
         else if(output ==-3)
        {
         document.getElementById("result2").innerHTML = "The operation was not successful! Operation failed because a record with the supplied Order ID could not be found" + "<br>" + output.Exception;
        }
        else
        {
         document.getElementById("result2").innerHTML = "The operation was not successful! " + "<br>" + output.Exception;
        }
    }
function Confirm(){};
function Deletecustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    url += document.getElementById("custid3").value;
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            OperationResult3(output);
        }
    }
 
    //Initiate the server requestobjRequest
  objRequest.open("GET", url, true);
  objRequest.send();
  
}

Confirm()


function OperationResult3(output)
    {
        if (output.DeleteCustomerResult.WasSuccessful==1)
        {
            document.getElementById("result3").innerHTML = "The operation was successful!";              
        }
        else
        {
         document.getElementById("result3").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        }
    }