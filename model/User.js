const BaseModel = require("../utils/baseModel");

class User extends BaseModel {
  constructor() {
    super("users");
    this._id = "";
    this.username = "";
    this.password = null;
  }
  getDataRaw() {
    let rawData = {};
    rawData._id = this._id;
    rawData.username = this.username;
    rawData.password = this.password;
    return rawData;
  }
  setDataRaw(dataInput) {
    this._id = dataInput._id;
    this.username = dataInput.username;
    this.password = dataInput.password;
  }
}
module.exports = User;
