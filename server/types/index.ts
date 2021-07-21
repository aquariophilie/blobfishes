const TYPES = {
    MongoClient: Symbol.for("MongoClient"),
    // Models
    User: Symbol.for("User"),
    Book: Symbol.for("Book"),
    Author: Symbol.for("Author"),
    Reader: Symbol.for("Reader"),
    // Services
    AuthService: Symbol.for("AuthService"),
    UserService: Symbol.for("UserService"),
    BookService: Symbol.for("BookService"),
    AuthorService: Symbol.for("AuthorService"),
    ReaderService: Symbol.for("ReaderService")
};

export { TYPES };
