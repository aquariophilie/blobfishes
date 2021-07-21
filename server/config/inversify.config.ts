import { Container } from "inversify";

import { TYPES } from "../types";
import { MongoDBClient } from "../loaders/mongo-client";
import { User } from "../interfaces/models/IUser";
import { UserModel } from "../models/user";
import { AuthService } from "../interfaces/services/IAuth";
import { AuthServiceImpl } from "../services/auth";
import { UserService } from "../interfaces/services/IUser";
import { UserServiceImpl } from "../services/user";
import { Book } from "../interfaces/models/IBook";
import { BookModel } from "../models/book";
import { BookService } from "../interfaces/services/IBook";
import { BookServiceImpl } from "../services/book";
import { Author } from "../interfaces/models/IAuthor";
import { AuthorModel } from "../models/author";
import { AuthorService } from "../interfaces/services/IAuthor";
import { AuthorServiceImpl } from "../services/author";

const myContainer = new Container();
myContainer.bind<MongoDBClient>(TYPES.MongoClient).to(MongoDBClient).inSingletonScope();
// Models
myContainer.bind<User>(TYPES.User).to(UserModel);
myContainer.bind<Book>(TYPES.Book).to(BookModel);
myContainer.bind<Author>(TYPES.Author).to(AuthorModel);
// Services
myContainer.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl).inSingletonScope();
myContainer.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
myContainer.bind<BookService>(TYPES.BookService).to(BookServiceImpl);
myContainer.bind<AuthorService>(TYPES.AuthorService).to(AuthorServiceImpl);

export default myContainer;
