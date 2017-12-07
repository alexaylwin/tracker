export class Activity {
	name: string;
	id: number;

	/**
	 * Deserialize an Activity object from a JSON object
	 * @param obj - the JSON to deserialize
	 * @returns an Activity object
	 */
	public static deserialize(obj:any):Activity {
		
		if(obj.name === undefined || !obj.name
			|| obj.id === undefined || !obj.name ) {
			
			throw new TypeError("Unable to deserialize Activity from JSON response: " + JSON.stringify(obj));
		}
		
		let activity:Activity;
		activity.id = obj.id;
		activity.name = obj.name;

		return activity;

	}
}