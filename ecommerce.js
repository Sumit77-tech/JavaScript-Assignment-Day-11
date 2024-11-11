function Product(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
}
Product.prototype.getInfo = function() {
    return `${this.name} - Price: $${this.price}, Quantity: ${this.quantity}`;
};
function Electronics(name, price, quantity, brand, model) {
    Product.call(this, name, price, quantity);
    this.brand = brand;
    this.model = model;
};
Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;

Electronics.prototype.powerOn = function() {
    return `${this.name} is now powered on.`;
};

Electronics.prototype.powerOff = function() {
    return `${this.name} is now powered off.`;
};
function Clothing(name, price, quantity, size, material) {
    Product.call(this, name, price, quantity);
    this.size = size;
    this.material = material;
}
Clothing.prototype.getDetails = function() {
    return `${this.name} - Size: ${this.size}, Material: ${this.material}`;
};
function Book(name, price, quantity, author, genre) {
    Product.call(this, name, price, quantity);
    this.author = author;
    this.genre = genre;
}
Book.prototype = Object.create(Product.prototype);
Book.prototype.constructor = Book;

Book.prototype.getSummary = function() {
    return `${this.name} by ${this.author} - Genre: ${this.genre}`;
};
const laptop = new Electronics("Laptop", 999, 5, "Dell", "Inspiron 15");
console.log(laptop.getInfo());
console.log(laptop.powerOn());

const shirt = new Clothing("T-Shirt", 19.99, 50, "M", "Cotton");
console.log(shirt.getInfo());
console.log(shirt.getDetails());

const book = new Book("The Great Gatsby", 10.99, 30, "F. Scott Fitzgerald", "Novel");
console.log(book.getInfo());
console.log(book.getSummary());