# Book.js
The Book module demonstrates subtype polymorphism in JavaScript. Upon construction, it inherits Product by setting its own value to a new Product. It then further validates the schema with its own Blueprint. By the time a result is returned, the constructor guarantees that the object meets the definition for both a Product and a Book.
