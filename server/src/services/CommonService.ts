import {
  PaginateModel,
  PaginateOptions,
  ProjectionType,
  QueryOptions,
  Types,
} from "mongoose";

export type Where<T> = Partial<Record<keyof T, unknown>>;

export class BaseRepository<T> {
  constructor(private model: PaginateModel<T>) {}

  find(where: Where<T>, options?: PaginateOptions) {
    return this.model.paginate(where, options);
  }

  findOne(
    where: Where<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.findOne(where, projection, options);
  }

  create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  update(query: Where<T>, data: Partial<T>, options?: QueryOptions<T> | null) {
    return this.model.findOneAndUpdate(query, data, options);
  }

  delete(query: Where<T>) {
    return this.model.findOneAndUpdate(query, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }

  count(query: Where<T>) {
    return this.model.countDocuments(query);
  }

  findById(
    id: string | Types.ObjectId,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.findById(id, projection, options);
  }

  findByIdAndUpdate(
    id: string | Types.ObjectId,
    data: Partial<T>,
    options?: QueryOptions<T>,
  ) {
    return this.model.findByIdAndUpdate(id, data, options);
  }
}

export default BaseRepository;
