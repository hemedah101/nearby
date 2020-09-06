import { Model, Document, Types } from 'mongoose';
import { InvalidIdException } from '../exceptions';

export class BaseService<T> {
  constructor(protected model: Model<Document>) {}

  public toObjectId(id: string | Types.ObjectId): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new InvalidIdException();
    }

    return typeof id === 'string' ? Types.ObjectId(id) : id;
  }

  public async isExist(filter: any): Promise<boolean> {
    return await this.model.exists(filter);
  }

  /**
   * Shortcut for saving one or more documents to the database.
   * @param model
   */
  async create(model: any): Promise<T> {
    const doc = await this.model.create(model);
    return (doc as unknown) as T;
  }

  /**
   * Finds one document by condition.
   * @param filter
   * @param projection
   */
  async findOne(filter: any, projection = {}): Promise<T> {
    const doc = await this.model.findOne(filter, projection);
    return (doc as unknown) as T;
  }

  /**
   * Finds a single document by its _id field
   * @param id
   * @param projection
   */
  async findById(id: string | Types.ObjectId, projection = {}): Promise<T> {
    const doc = await this.model.findById(this.toObjectId(id), projection);
    return (doc as unknown) as T;
  }

  /**
   * Updates one document by condition.
   * @param filter
   * @param updates
   * @param projection
   */
  async updateOne(filter: any, updates: any, projection = {}): Promise<T> {
    const doc = await this.model.findOneAndUpdate(filter, updates, {
      new: true,
      projection,
    });
    return (doc as unknown) as T;
  }

  /**
   * Updates a single document by its _id field
   * @param id
   * @param updates
   * @param projection
   */
  async updateById(
    id: string | Types.ObjectId,
    updates: any,
    projection = {},
  ): Promise<T> {
    const doc = await this.model.findByIdAndUpdate(
      this.toObjectId(id),
      updates,
      {
        new: true,
        projection,
      },
    );
    return (doc as unknown) as T;
  }

  /**
   * Removes one document by condition.
   * @param filter
   */
  async deleteOne(filter: any): Promise<T> {
    const doc = await this.model.findOneAndRemove(filter);
    return (doc as unknown) as T;
  }

  /**
   * Removes a single document by its _id field
   * @param id
   */
  async deleteById(id: string | Types.ObjectId): Promise<T> {
    const doc = await this.model.findByIdAndDelete(this.toObjectId(id));
    return (doc as unknown) as T;
  }

  /**
   * Performs aggregations on the models collection.
   * @param query
   */
  async aggregate(query: any[]): Promise<{ content: T[]; count: number }> {
    const data = await this.model.aggregate(query);
    return {
      content: data[0]?.content || [],
      count: data[0]?.count || 0,
    };
  }
}
