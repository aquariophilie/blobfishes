import { injectable } from 'inversify';
import Ajv, { Schema } from "ajv"
import addFormats from "ajv-formats"

import { IAuthor, Author } from '../interfaces/models/IAuthor';
import { Model } from './model';

export const AuthorSchema: Schema = {
    type: "object",
    properties: {
        _id: { type: "string" },
        name: { type: "string", minLength: 3, example: "Douglas Adams" },
        bio: { type: "string", minLength: 5, example: "Douglas Noel Adams (11 March 1952 – 11 May 2001) was an English author, screenwriter, essayist, humorist, satirist and dramatist. Adams was author of The Hitchhiker's Guide to the Galaxy, which originated in 1978 as a BBC radio comedy, before developing into a \"trilogy\" of five books that sold more than 15 million copies in his lifetime and generated a television series, several stage plays, comics, a video game, and in 2005 a feature film. Adams's contribution to UK radio is commemorated in The Radio Academy's Hall of Fame.[2]\n\nAdams also wrote Dirk Gently's Holistic Detective Agency (1987) and The Long Dark Tea-Time of the Soul (1988), and co-wrote The Meaning of Liff (1983), The Deeper Meaning of Liff (1990), and Last Chance to See (1990). He wrote two stories for the television series Doctor Who, co-wrote City of Death, and served as script editor for its seventeenth season in 1979. He co-wrote the Monty Python sketch \"Patient Abuse\" which appeared in the final episode of Monty Python's Flying Circus. A posthumous collection of his selected works, including the first publication of his final (unfinished) novel, was published as The Salmon of Doubt in 2002.\n\nAdams was an advocate for environmentalism and conservation, a lover of fast cars,[3] technological innovation and the Apple Macintosh, and a self-proclaimed \"radical atheist\"." },
        birthday: { type: "string", format: 'date-time', example: '1952-03-11T13:04:47.545Z' }
    },
    required: ["name"],
    additionalProperties: false,
}
const validatorSchema = addFormats(new Ajv().addKeyword('example')).compile(AuthorSchema);

@injectable()
export class AuthorModel extends Model<IAuthor> implements Author {

    protected validator = validatorSchema;
    protected collectionName = 'authors';

}
