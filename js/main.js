
//https://www.youtube.com/watch?v=0Sy14hX8T-A

// yelp does not support CORS so use this:  https://cors-anywhere.herokuapp.com/
 var token = 'Bearer FDwAQ1VbHuCrPxvS1Cox8n44s7cTipJVD1RoljBdx_v3eCzYBqGXoMC9DuwschQhg9hK2yp15xaJFcLUQiz96GOmDIWPDK7v7EsH38y9i9sCz61T4Nwdcqnjw2WUYHYx';
 //var yelp_search_url = "https://api.yelp.com/v3/businesses/search";

 var yelp_search_url_by_id = "https://api.yelp.com/v3/businesses/JmTt_EYc_Gpt42mojPFSSw";
 var cors_url = "https://cors-anywhere.herokuapp.com";

var requestObj = {
  //url: cors_url + '/' + yelp_search_url,
  url: cors_url + '/' + yelp_search_url_by_id,
  //data: {term: 'pizza', location: '95501',},
  headers: {'Authorization':token},
  method: 'GET',
  // error: function(jqXHR,textStatus, errorThrown){
  //   console.log('Ajax error, jqXHR = ', jqXHR,',textStatus =',
  //                 textStatus, 'errorThrown = ', errorThrown)
  // }
  success: function(data){
    //console.log(data);

       var imageUrl = data.image_url;
       // we use .replace(/"/g, '\\"') after the text strings because
       // sometimes there are single and double quotes in the text
       // that confuses the html
       var name = data.name;
        //console.log("orig title:", title);
       name = make_safe(name);
        console.log("safe title:", name);

       var url = data.url;
        //console.log("orig explanation:", explanation);
       url = make_safe(url);
        console.log("safe url:", url);

      //var dateNum = data.date;

      var html = `<div id="imageblock">
      <h2>${name}</h2>
        <img src="${imageUrl}" title="${name}"><br>
        <p> ${url}</p>

      </div>`
      // console.log("My new html: \n", html);
      $(".tool, .text-content").html(html);
    }

}

function make_safe(str) {
  return str.replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}

//typeof is a JavaScript keyword that will return the type of a variable when you
//call it. You can use this to validate function parameters or check if variables
//are defined

$.ajax(requestObj).done(function(data) {
   //$(".tool .text-content").html(response.businesses.name);
   //$(".tool .text-content").append(data.businesses[0].name);
      console.log("typeof response = " + typeof data)
      console.log("reponse = ", data)

})

//List from Wes
// pizzaList = [
//   "engfer-pizza-works-santa-cruz",
//   "woodstocks-pizza-slo-san-luis-obispo-6",
// ]
//
// pizzaObj = [
//   {
//     yelpid: "engfer-pizza-works-santa-cruz",
//     name: "Engfer Pizza Works",
//     city: "Santa Cruz, CA"
//   },
//   {
//     yelpid: "woodstocks-pizza-slo-san-luis-obispo-6",
//     name: "Woodstocks Pizza",
//     city: "San Luis Obispo, CA"
//   }
// ]
