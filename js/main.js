// zQ61m8lyIbs_0vXutYJrQzeJWejCvd1O4iKGXuk1D2UQiqCldMu_mfK0ifLx2n8hRjElZzVMCD8Egi8cpJFd2M2_FnevXfaiQRXwaPV9psZ_WvdERDQZhCBVC-iSYHYx
//https://www.youtube.com/watch?v=0Sy14hX8T-A
var pizzaObj = [
  {
    yelpid: "JmTt_EYc_Gpt42mojPFSSw",
    name: "brick-and-fire-bistro-eureka-2",
    city: "Eureka, CA",
  },
  {
    yelpid: "mSMZJj2pFvttWLpcDmgrEA",
    name: "tonys-pizza-napoletana-san-francisco",
    city: "San Francisco, CA",
  },
  {
    yelpid: "Gqx2aA1Lta2bYqEUBRdRwg",
    name: "blue-line-pizza-mountain-view",
    city: "Mountain View, CA",
  },
  {
    yelpid: "QNzqZtNb_I1mcHAviE5zeQ",
    name: "bibo's-ny-pizza",
    city: "San Jose, CA"
  },
  {
    yelpid: "6NltjvK48THHxOP78m-pbA",
    name: "giuseppes-express-pismo-beach",
    city: "Pismo Beach, CA"
  },
  {
    yelpid: "r_QP-r1d-0ig2qabzCMMLQ",
    name: "ginos-pizza-san-luis-obispo-2",
    city: "San Luis Obispo, CA"
  },
  {
    yelpid: "PGrbZ2-StT9SuEsqXdNL0w",
    name: "fattes-pizza-of-santa-maria-santa-maria",
    city: "Santa Maria, CA"
  },
  {
    yelpid: "4D7QDfPOsSPfKxBi3gs_qQ",
    name: "olio-pizzeria-santa-barbara-2",
    city: "Santa Barbara, CA"
  },
  {
    yelpid: "fD4ntpbf92ufSHn5tSmSxA",
    name: "desano-pizza-bakery-los-angeles",
    city: "Santa Monica, CA"
  },
  {
    yelpid: "tF6o3Fr-P87vBCvp4bCVdg",
    name: "ambrogio15-san-diego-2",
    city: "San Diego, CA"
  }
]

// yelp does not support CORS so use this:  https://cors-anywhere.herokuapp.com/
 var token = 'Bearer FDwAQ1VbHuCrPxvS1Cox8n44s7cTipJVD1RoljBdx_v3eCzYBqGXoMC9DuwschQhg9hK2yp15xaJFcLUQiz96GOmDIWPDK7v7EsH38y9i9sCz61T4Nwdcqnjw2WUYHYx';
 //var yelp_search_url = "https://api.yelp.com/v3/businesses/search";

 var yelp_search_url_by_id = "https://api.yelp.com/v3/businesses/";
 var cors_url = "https://cors-anywhere.herokuapp.com";
 var l = 1;
 var r = 1;
 $(document).ready(getPizzaPlaces())
 async function getPizzaPlaces(){
  for(let i = 0; i < pizzaObj.length; i++){

    var requestObj = await $.ajax({
      //url: cors_url + '/' + yelp_search_url,
      url: cors_url + '/' + yelp_search_url_by_id + pizzaObj[i].yelpid,
      //data: {term: 'pizza', location: '95501',},
      headers: {'Authorization':token},
      method: 'GET',
      // error: function(jqXHR,textStatus, errorThrown){
      //   console.log('Ajax error, jqXHR = ', jqXHR,',textStatus =',
      //                 textStatus, 'errorThrown = ', errorThrown)
      // }
      success: function(data){
        // console.log(data);
        // let content = "";
        // for(let i = 0; i < pizzaObj.length; i++) {
          let html = `<div class="tool${i+1}">`
          html += `<img src="img/pizzaIcon.png" alt="Pizza">`
          if(((i + 1) % 2) === 0) {
            html+=`<div class="left${l}">`
            l+=1;
          }
          else {
            html+=`<div class="right${r}">`
            r+=1;
          }

          html+=contentMaker(data)
          html+=`</div> </div>`
          $("#toolHandler").append(html)
        // }

          //var dateNum = data.date;

          // // console.log("My new html: \n", html);
          // // $(".tool, .text-content").html(html);
          // $(".tool").html(html);
        }

  }).done()
}

  // $.ajax(requestObj).done(function(data) {
  //    //$(".tool .text-content").html(response.businesses.name);
  //    //$(".tool .text-content").append(data.businesses[0].name);
  //       console.log("typeof response = " + typeof data)
  //       console.log("reponse = ", data)
  //
  // })

  }

function contentMaker(data) {
  let imageUrl = data.image_url;
  // we use .replace(/"/g, '\\"') after the text strings because
  // sometimes there are single and double quotes in the text
  // that confuses the html
  let name = data.name;
   //console.log("orig title:", title);
   name = make_safe(name);
   console.log("safe title:", name);

  let price = data.price;
  //console.log("orig explanation:", explanation);
   price = make_safe(price);
   console.log("safe price:", price);

  let display_phone = data.display_phone;
  //console.log("orig explanation:", explanation);
   display_phone = make_safe(display_phone);
   console.log("safe phone:", display_phone);

  let locationaddress1 = data.location.address1;
  //console.log("orig explanation:", explanation);
   locationaddress1 = make_safe(locationaddress1);
   console.log("safe location:", locationaddress1);

  let locationcity = data.location.city;
  //console.log("orig explanation:", explanation);
   locationcity = make_safe(locationcity);
   console.log("safe location:", locationcity);

  let html = `<div id="imageblock">
  <h2>${name}</h2>
  <img src="${imageUrl}" title="${name}"><br>
  <p2>${price}</p2><br>
  <p3>${display_phone}</p3><br>
  <p3>${locationaddress1}, ${locationcity}</p3>

  </div>`

  return html
}

function make_safe(str) {
  return str.replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}
