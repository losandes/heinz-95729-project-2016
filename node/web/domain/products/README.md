# Product.js
The Product module is a base/generic object to represent products. It has a metadata property that can be used for, among other things, properties that are unique to a given type of product. See the Book module for a subtype polymorphism example.

# productsRepo.js
The productRepo is a service module that can be used to query the database. It is set up to query a single collection: products.

* How might we adapt this module to allow it to support querying other collections?
* Notice that `module.exports.blueprint = ['repoBlueprint'];` is commented out. That's because it breaks the Liskov Substitution Principle. Do you know why?
