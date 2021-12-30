function setRequired(executionContext){
    var formcontext = executionContext.getFormContext();
    var reimbursementType = formcontext.getAttribute("cre2e_reimbursement_type").getValue();
      if(reimbursementType == 287370005){
       formcontext.getAttribute("cre2e_description").setRequiredLevel("required");
      }else{
       formcontext.getAttribute("cre2e_description").setRequiredLevel("none");   
      }
    }
    
    function InsertOwnerGUID(executionContext){
        //debugger;
        const formContext = executionContext.getFormContext();
        var StudentInfo = formContext.getAttribute("ownerid").getValue();
        if(StudentInfo != null){
            formContext.getAttribute("cre2e_applicant_guid").setValue(StudentInfo[0].id);
        }else{
            formContext.getAttribute("cre2e_applicant_guid").setValue("");
        }
    //	console.log(StudentInfo);
    }

    function disableForm(executionContext){
        const formContext = executionContext.getFormContext();
        let statusReason = formContext.getAttribute("statuscode").getValue();
        let formControls = formContext.ui.controls;
        if(statusReason == 287370000 || statusReason == 287370003 || statusReason == 287370004){
            formControls.forEach(element => {
                element.setDisabled(true);
            });
        }else{
            formControls.forEach(element => {
                element.setDisabled(false);
            });
        }
    }