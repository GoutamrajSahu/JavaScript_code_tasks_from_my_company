function InsertStudentGUID(executionContext){
	//debugger;
	const formContext = executionContext.getFormContext();
	var StudentInfo = formContext.getAttribute("grs_student_user_name").getValue();
	if(StudentInfo != null){
		formContext.getAttribute("grs_student_guid").setValue(StudentInfo[0].id);
	}else{
		formContext.getAttribute("grs_student_guid").setValue("");
	}
//	console.log(StudentInfo);
}

function InsertIssueDates(executionContext){
	//debugger;
	const formContext = executionContext.getFormContext();
	var date = new Date();
	/*-----------Logic for Inserting Issue_Start_Date-----------*/
	formContext.getAttribute("grs_issue_start_date").setValue(date);

    /*-----------Logic for Inserting Issue_Start_Date-----------*/
	var weekData = formContext.getAttribute("grs_issued_period").getValue();
	if(weekData == "172280000"){
		date.setDate(date.getDate() + 7);
	}else if(weekData == "172280001"){
		date.setDate(date.getDate() + 14);
	}else if(weekData == "172280002"){
		date.setDate(date.getDate() + 21);
	}else if(weekData == "172280003"){
		date.setDate(date.getDate() + 28);
	}
	formContext.getAttribute("grs_end_of_issue_date").setValue(date);
	// console.log(date);
}

function UpdateLeftDaysInBookIssue(executionContext){
	const formContext = executionContext.getFormContext();
	var issueLastDate = formContext.getAttribute("grs_end_of_issue_date").getValue();
	if(issueLastDate != null){
		var currentDate = new Date();
		var Difference_In_Time = issueLastDate.getTime() - currentDate.getTime();
		var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
		formContext.getAttribute("grs_number_of_days_left").setValue(Difference_In_Days);
		console.log(Difference_In_Days);
	}
}
