import { getDB } from "@util/mongoSetup"
import { 
  Db, 
  MongoCallback, 
  InsertOneWriteOpResult, 
  DeleteWriteOpResultObject, 
  ObjectId, 
  UpdateWriteOpResult
} from "mongodb"

export class Match {
  matchData ?: any
  db : Db  
  _id ?: string | null


  constructor (matchData  = null, _id = null) {
    this.matchData = matchData
    this._id = _id

    this.db  = getDB()
  }

  static async fetchAll () {
    const db  = getDB()

    const docs = await db.collection('matches').find({}).toArray()

    return docs
  }

  save (done : MongoCallback<InsertOneWriteOpResult<any>>) {

    if (!this.matchData) {
      throw('Can not save match, no match data')
    }
    
    this.db.collection('matches').insertOne({
      'matchData': this.matchData,
      visible: true
    }, done)
  }

  remove (done : MongoCallback<DeleteWriteOpResultObject>) {

    if (!this._id) {
      throw('Can not delete match, no _id provided')
    }

    const deletFilter = ({_id: new ObjectId(this._id)})

    this.db.collection('matches').deleteOne(deletFilter, done)
  }

  hide (done : MongoCallback<UpdateWriteOpResult>) {

    if (!this._id) {
      throw('Can not delete match, no _id provided')
    }

    this.db.collection('matches').updateOne({_id: new ObjectId(this._id)}, {$set: {visible: false}})
  }


  show (done : MongoCallback<UpdateWriteOpResult>) {

    if (!this._id) {
      throw('Can not delete match, no _id provided')
    }

    this.db.collection('matches').updateOne({_id: new ObjectId(this._id)}, {$set: {visible: true}})
  }
}