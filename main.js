const name_to_airport = {};
name_to_airport["Dallas"] = "DFW"
name_to_airport["Los Angeles"] = "LAX"
name_to_airport["Miami"] = "MIA"
name_to_airport["Philadelphia"] = "PHL"
name_to_airport["Orlando"] = "ORD"
name_to_airport["New York City"] = "JFK"
name_to_airport["London"] = "LHR"
name_to_airport["Hong Kong"] = "HKG"

const airport_to_name = {};
airport_to_name["DFW"] = "Dallas"
airport_to_name["LAX"] = "Los Angeles"
airport_to_name["MIA"] = "Miami"
airport_to_name["PHL"] = "Philadelphia"
airport_to_name["ORD"] = "Orlando"
airport_to_name["JFK"] = "New York City"
airport_to_name["LHR"] = "London"
airport_to_name["HKG"] = "Hong Kong"

const airports = ["DFW", "LAX", "MIA", "PHL", "ORD", "JFK", "LHR", "HKG"];

var origin = document.getElementById("origin_input").value;

function getFlight(event) {
    if (event.keyCode != 13) {
        return;
    }
    //debugger;
    var origin = document.getElementById("origin_input").value;
    var origin_airport = name_to_airport[origin];
    var best_dest;
    var best_price = 10000000;
    airports.forEach(function (element) {
        const url = `https://weekendtrip-withaa.herokuapp.com/flights?origin=${origin_airport}&destination=${element}&date=2018-03-06`
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function (response) {
                //debugger;
                // sort search results
                var cheap_flight = response.sort(function(a, b){ 
                    return a.cost-b.cost;
                })
                //console.log(cheap_flight[0]['cost']);
                if (cheap_flight[0]['cost'] < best_price){
                    best_price = cheap_flight[0]['cost'];
                    best_dest = airport_to_name[cheap_flight[0]['destinationCode']];
                    console.log(best_dest);
                }
                document.getElementById("city").innerHTML = best_dest;
                document.getElementById("price").innerHTML = "$" + best_price;
            }).catch(function(error){
                //console.log("no flights found");
            })
    })

}
