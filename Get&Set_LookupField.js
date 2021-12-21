/*-------------Function for getting Student course field Lookup value in Student entity------------*/
function getLookUpValue(executionContext){
//debugger;
const formContext = executionContext.getFormContext();
var alertCourseDetailsStatus = formContext.getAttribute("grs_alert_course_details").getValue();
	if(alertCourseDetailsStatus == 1){
		var lookUpValue = formContext.getAttribute("grs_studentcourse").getValue();	
		if(lookUpValue != null){
			alert("Name of the course: "+lookUpValue[0].name+"\nID of the course: "+lookUpValue[0].id+"\nEntity Type: "+ lookUpValue[0].entityType); // Alert details of current course.
		    console.log(lookUpValue); // Only visible in console.
		}else{
			alert("No Course Available currently in Student Course field.");
		}
	}
}
/*-------------Setting the Alert_course_details back to "No".------------*/
function setAlertCourseDetailsToNo(executionContext){
	const formContext = executionContext.getFormContext();
    formContext.getAttribute("grs_alert_course_details").setValue(false);
}

/*-------------Function for updating Student course field Lookup value in Student entity------------*/
function updateLookUpValue(executionContext){
//debugger;
const formContext = executionContext.getFormContext();
var jobHolderStatus = formContext.getAttribute("grs_are_you_a_job_holder").getValue();
	if(jobHolderStatus == 1){
		const NA =[{
				 "entityType": "grs_course",
				 "id": "{187FB110-6762-EC11-8F8F-000D3A3E60DC}",
				 "name": "Not Applicable/Other"
				}]; // Manually creating the exixting entity for lookup.
	  formContext.getAttribute("grs_studentcourse").setValue(NA);//Changing lookup value. 
	}else{
	  formContext.getAttribute("grs_studentcourse").setValue([]);//Changing lookup value back to empty.
	}
}