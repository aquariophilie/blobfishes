const TYPES = {
    MongoClient: Symbol.for("MongoClient"),
    // Models
    User: Symbol.for("User"),
    Book: Symbol.for("Book"),
    Author: Symbol.for("Author"),
    // Services
    AuthService: Symbol.for("AuthService"),
    UserService: Symbol.for("UserService"),
    BookService: Symbol.for("BookService"),
    AuthorService: Symbol.for("AuthorService")
};

export { TYPES };
