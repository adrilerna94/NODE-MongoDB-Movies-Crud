// A generic repository class providing common database operations.
// Can be extended by specific repositories like user.repository.ts.

import { Model, ProjectionFields } from 'mongoose';
import { IMovie } from '../interfaces/movie.interface';
import { IUser } from '../interfaces/user.interface';

export class BaseRepository<Document> {
  private readonly model: Model<Document>;
  private readonly defaultProjection: ProjectionFields<Document>;
  private readonly registerProjection: ProjectionFields<Document>;

  constructor(model: Model<Document>) {
    this.model = model;
    this.defaultProjection = { __v: 0 };
    this.registerProjection = { name: 1, password: 1, email: 1, _id: 1, birthday: 1, __v: 0, createdAt: 0 , updatedAt: 0 };
  }

  register = async (registerUser: IUser) => {
    const newUser = new this.model(registerUser);
    const savedUser = await newUser.save();
    return this.model.findById(savedUser._id, this.registerProjection);
  }

  findByEmail = async (email: string) => {
    const user = await this.model.findOne({ email }, this.registerProjection).lean();
    if (!user || !user._id) {
        throw new Error("User ID is missing from database query.");
    }
    return { ...user, id: user._id.toString() }; // 🔹 Convertimos `_id` en `id` para usarlo en el token
  };

  getById(id: string, projection?: ProjectionFields<Document>) {
    const projectionFields = { ...projection, ...this.defaultProjection };
    return this.model.findById(id, projectionFields);
  }

  find<Doctype>(
    filters: Record<string, unknown>,
    projection?: ProjectionFields<Doctype>,
    options?: Record<string, unknown>,
  ) {
    const projectionFields = { ...projection, ...this.defaultProjection };
    return this.model.find(filters, projectionFields, options || {});
  }
  create = async (movieData: Partial<IMovie>) => {
    const newMovie = new this.model(movieData);
    return await newMovie.save();
  }

  update = async (id: string, newMovie: Partial<IMovie>) => {
    const filter = {_id: id}; // filtramos por el ID
    /*
      📌 function findOneAndUpdate(filter, update, options) {} 📌
        ➡️findOneAndUpdate(filter, updateData, {new:true})
        ⚡{new:true} ➡️ especificamos que retorne el documento después update sea aplicado.
        ❗default new:false ➡️ return before update applied.
    */
    return this.model.findOneAndUpdate(filter, newMovie , {new:true});
  }
  delete = async (id: string) => {
    const filter = {_id: id};
    return this.model.findOneAndDelete(filter);
  }

}
