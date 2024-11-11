function Car(make, model, year, type, isAvailable = true) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.type = type;
    this.isAvailable = isAvailable;
}
function Customer(name) {
    this.name = name;
    this.rentedCars = [];
}
Customer.prototype.rentCar = function(car) {
    if(car.isAvailable) {
        car.isAvailable = false;
        this.rentedCars.push(car);
        console.log(`The car ${car.make} ${car.model} is already rented.`);
    }
};
Customer.prototype.returnCar = function(car) {
    const carIndex = this.rentedCars.indexOf(car);
    if(carIndex !== -1) {
        setTimeout(() => {
            car.isAvailable = true;
            this.rentedCars.splice(carIndex, 1);
            console.log(`${this.name} returned the car: ${car.make} ${car.model}`);
        }, 2000);
    } else {
        console.log(`${this.name} does not have this car rented.`);
    }
};
function PremiumCustomer(name, discountRate) {
    Customer.call(this, name);
    this.discountRate = discountRate;
}
PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

function calculateRentalPrice(car, days, customer) {
    let basePrice = 50;
    let typeMultiplier = car.type === "SUV" ? 1.5 : 1;
    let totalPrice = basePrice * typeMultiplier * days;
    if(customer instanceof PremiumCustomer) {
        totalPrice *= (1 - customer.discountRate);
    }
    console.log(`Rental price for ${customer.name} (${car.make} ${car.model} for ${days} days); $${totalPrice.toFixed(2)}`);
    return totalPrice;
}
function Maintenance(car, delay) {
    setTimeout(() => {
        car.isAvailable = true;
        console.log(`Maintenance completed for ${car.make} ${car.model}`);
    }, delay);
}
const car1 = new Car("Toyota", "Corolla", 2020, "Sedan");
const car2 = new Car("Ford", "Explorer", 2018, "SUV");
const car3 = new Car("Honda", "Civic", 2019, "Sedan");

const regularCustomer = new Customer("Alice");
const premiumCustomer = new PremiumCustomer("Bob", 0.1);

regularCustomer.rentCar(car1);
premiumCustomer.rentCar(car2);

calculateRentalPrice(car1, 3, regularCustomer);
calculateRentalPrice(car2, 3, premiumCustomer);

regularCustomer.returnCar(car1);
premiumCustomer.returnCar(car2);

Maintenance(car3, 3000);

const rentCarWithBind = regularCustomer.rentCar.bind(premiumCustomer, car3);
rentCarWithBind();