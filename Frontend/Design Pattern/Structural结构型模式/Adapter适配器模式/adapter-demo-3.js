/**
 * 特殊例子：旧接口兼容新接口 
 */

// old interface
// Target
class Shipping {
    request(zipStart, zipEnd, weight) {
        // ...
        return "$49.75";
    }
}

// new interface
// Adaptee
class AdvancedShipping {
    login(credentials) { /* ... */ };
    setStart(start) { /* ... */ };
    setDestination(destination) { /* ... */ };
    calculate(weight) { return "$39.50"; };
}

// adapter interface
// Adapter
const ShippingAdapter = ((credentials) => {
    const shipping = new AdvancedShipping();
    shipping.login(credentials);

    return class ShippingAdapter {
        request (zipStart, zipEnd, weight) {
            shipping.setStart(zipStart);
            shipping.setDestination(zipEnd);
            return shipping.calculate(weight);
        }
    }
})();

// log helper
var log = (function () {
    var log = "";
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; }
    }
})();

function run() {

    const shipping = new Shipping();

    const credentials = { token: "30a8-6ee1" };
    const adapter = new ShippingAdapter(credentials);

    // original shipping object and interface
    let cost = shipping.request("78701", "10010", "2 lbs");
    log.add("Old cost: " + cost);

    // new shipping object with adapted interface
    cost = adapter.request("78701", "10010", "2 lbs");
    log.add("New cost: " + cost);

    log.show();
}

run();