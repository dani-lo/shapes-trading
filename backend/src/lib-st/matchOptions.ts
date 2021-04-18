import { getDB } from "@util/mongoSetup"
import { 
  Db, 
  MongoCallback, 
  InsertOneWriteOpResult, 
  DeleteWriteOpResultObject, 
  ObjectId, 
  UpdateWriteOpResult
} from "mongodb"

export class MatchOptions {
  matchSettings ?: any
  db : Db  
  _id ?: string | null


  constructor (matchSettings  = null, _id = null) {
    this.matchSettings = matchSettings
    this._id = _id

    this.db  = getDB()
  }

  static async fetchAll () {
    const db  = getDB()

    const docs = await db.collection('matchOptions').find({}).toArray()

    return docs
  }

  save (done : MongoCallback<InsertOneWriteOpResult<any>>) {

    if (!this.matchSettings) {
      throw('Can not save match, no match data')
    }
    
    this.db.collection('matchOptions').insertOne({
      'matchSettings': this.matchSettings,
      visible: true,
      deleted: false
    }, done)
  }

  remove (done : MongoCallback<DeleteWriteOpResultObject>) {

    if (!this._id) {
      throw('Can not delete match, no _id provided')
    }

    const deletFilter = ({_id: new ObjectId(this._id)})

    this.db.collection('matchOptions').deleteOne(deletFilter, done)
  }
  
  delete (done : MongoCallback<UpdateWriteOpResult>) {

    if (!this._id) {
      throw('Can not delete match, no _id provided')
    }

    this.db.collection('matchOptions').updateOne({_id: new ObjectId(this._id)}, {$set: {deleted: true}}, done)
  }

  hide (done : MongoCallback<UpdateWriteOpResult>) {

    if (!this._id) {
      throw('Can not delete match, no _id provided')
    }

    this.db.collection('matchOptions').updateOne({_id: new ObjectId(this._id)}, {$set: {visible: false}}, done)
  }


  show (done : MongoCallback<UpdateWriteOpResult>) {

    if (!this._id) {
      throw('Can not delete match, no _id provided')
    }

    this.db.collection('matchOptions').updateOne({_id: new ObjectId(this._id)}, {$set: {visible: true}}, done)
  }
}