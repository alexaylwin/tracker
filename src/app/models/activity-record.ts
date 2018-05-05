export class ActivityRecord {
	startTime: Date;
	endTime: Date;
	duration: number;
	activityId: number;

	/**
	 * Deserialize a JSON object into an AcivityRecord
	 * @param obj the JSON object to deseralize
	 */
	public static deserialize(obj:any): ActivityRecord {
		let activityRecord:ActivityRecord;
		//We won't allow partial deserialization, we must have all fields

		if(obj.activityId === undefined || !obj.activityId
			|| obj.endTime === undefined || !obj.endTime
			|| obj.startTime === undefined || !obj.startTime
			|| obj.duration === undefined || !obj.duration 
			) {
			throw new TypeError("Missing field when trying to deserialize ActivityRecord: " + JSON.stringify(obj));
		}	
		
		activityRecord.endTime = obj.endTime;
		activityRecord.duration = obj.duration;
		activityRecord.startTime = obj.startTime;

		return activityRecord;
	}
}