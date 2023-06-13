const ObjectID = require("mongodb");
const objectID = ObjectID.ObjectId;

class BaseModel {
  constructor(name) {
    this.collection = process.app.db.collection(name);
  }

  async new(dataInput) {
    this.setDataRaw(dataInput);
    const result = await this.collection.insertOne(this.getDataRaw());
    return result;
  }

  async edit(_id, dataInput) {
    this.setDataRaw(dataInput);
    const { _id: unusedId, ...updateData } = this.getDataRaw();
    const result = await this.collection.updateOne(
      { _id: new objectID(_id._id)  },
      { $set: updateData }
    );
    return result;
  }

  async delete(_id) {
    const objectId = new objectID(_id._id);
    const result = await this.collection.deleteOne({ _id: objectId });
    return result;
  }

  //   async getList() {
  //     const result = await this.collection.find({}).toArray();
  //     return result;
  //   }
  async getList(keySearch, page , limit) {
    const query = keySearch ? {$or: [
            { username: { $regex: keySearch, $options: 'i' } }, 
        ] } : {};
    const totalCount = await this.collection.countDocuments(query);
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let cursor = this.collection.find(query);
    cursor = cursor.skip(skip).limit(parseInt(limit));
    const result = await cursor.toArray();

    return {
      data: result,
      page,
      totalPages,
      totalCount,
    };
  }
  async getById(_id) {
    const result = await this.collection.findOne({ _id: new ObjectID(_id._id) });
    return result;
  }
}

module.exports = BaseModel;
