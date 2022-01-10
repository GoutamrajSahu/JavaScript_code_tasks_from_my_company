
function setApprovalStatus(executionContext){
    const formContext = executionContext;  /*Here no need of ".getFormContext()"*/
    const reimbursementName = formContext.getAttribute("cre2e_name").getValue();
    const reimbursementType = formContext.getAttribute("cre2e_reimbursement_type").getValue();
    const relatedTo = formContext.getAttribute("cre2e_related_to").getValue();
    const account = formContext.getAttribute("cre2e_account_info").getValue();
    const contact = formContext.getAttribute("cre2e_contact").getValue();
    const amount = formContext.getAttribute("cre2e_amount").getValue();
    const description = formContext.getAttribute("cre2e_description").getValue();
    const statusReason = formContext.getAttribute("statuscode").getValue();
    const userRole = getSecurityRole();
    console.log(userRole);

    if(statusReason == 287370003 || statusReason == 287370004 || statusReason == 287370001 || statusReason == 287370000){
        if(statusReason ==287370003){
            alert("This Reimbursement already send for approval to manager.\nCan't send it again.");
        }else if(statusReason == 287370004){
            alert("This Reimbursement already send for approval to head manager.\nCan't send it again.");
        }else if(statusReason == 287370001){
            alert("This Reimbursement already rejected.\nCan't send it again.");
        }else if(statusReason == 287370000){
            alert("This Reimbursement already approved.\nCan't send it again.");
        }
    }else{
    /*<-------------Locking all fields and giving alert in problems-------------->*/
        if(reimbursementName == null || reimbursementType == null || amount == null){
            alert("Can't send for approval. \nPlease fill all the required fields.");
        }else{
            if(reimbursementType == 287370005){
                if(description == null){
                    alert("Can't send for approval. \nPlease fill the Description field.");
                }else{
                    if(userRole == "salesemploy"){
                        saveAndCheckForApproveForSalesEmp(formContext);
                    }else if(userRole == "managergrsmodified"){
                        saveAndCheckForApproveForManager(formContext);
                    }else if(userRole == "headmanagergrsmodified"){
                        saveAndCheckForApproveForHeadManager(formContext);
                    }
                }
            }else if(reimbursementType == 287370002){
                if(relatedTo == 0){
                    if(account == null){
                        alert("Can't send for approval. \nPlease fill the Account field by choosing an account.");
                    }else{
                        if(userRole == "salesemploy"){
                            saveAndCheckForApproveForSalesEmp(formContext);
                        }else if(userRole == "managergrsmodified"){
                            saveAndCheckForApproveForManager(formContext);
                        }else if(userRole == "headmanagergrsmodified"){
                            saveAndCheckForApproveForHeadManager(formContext);
                        }
                    }
                }else if(relatedTo == 1){
                    if(contact == null){
                        alert("Can't send for approval. \nPlease fill the Contact field by choosing an contact.");
                    }else{
                        if(userRole == "salesemploy"){
                            saveAndCheckForApproveForSalesEmp(formContext);
                        }else if(userRole == "managergrsmodified"){
                            saveAndCheckForApproveForManager(formContext);
                        }else if(userRole == "headmanagergrsmodified"){
                            saveAndCheckForApproveForHeadManager(formContext);
                        }
                    }
                }
            }else{
                if(userRole == "salesemploy"){
                    saveAndCheckForApproveForSalesEmp(formContext);
                }else if(userRole == "managergrsmodified"){
                    saveAndCheckForApproveForManager(formContext);
                }else if(userRole == "headmanagergrsmodified"){
                    saveAndCheckForApproveForHeadManager(formContext);
                }
            }
        }
  }
  
    function saveAndCheckForApproveForSalesEmp(formContext){     /*<---Nested/local function1.*/
        let formControls = formContext.ui.controls;
        if(amount > 4999 && amount < 10000){
            formContext.getAttribute("statuscode").setValue(287370003);
            const date = new Date();
            formContext.getAttribute("cre2e_initiated_date").setValue(date);
            Xrm.Page.data.save().then(function() { 
                alert("Reimbursement Saved! \nand successfully send for approval to manager.");
                formControls.forEach(element => {
                    element.setDisabled(true);
                });
            }, function() { alert("Saving Failed!"); });
        }else if(amount > 9999 && amount <= 50000){
            formContext.getAttribute("statuscode").setValue(287370004);
            const date = new Date();
            formContext.getAttribute("cre2e_initiated_date").setValue(date);
            Xrm.Page.data.save().then(function() { 
                alert("Reimbursement Saved! \nand successfully send for approval to head manager.");
                formControls.forEach(element => {
                    element.setDisabled(true);
                });
            }, function() { alert("Saving Failed!"); });
        }else if(amount > 50000){
            //formContext.getAttribute("statuscode").setValue(287370001);
            alert("Exceeding the amount limit, So can't send for approval.\nNote:The highest limit of amount for sales employee is 50,000 rupees.");
            //const date = new Date();
            //formContext.getAttribute("cre2e_initiated_date").setValue(date);
            // Xrm.Page.data.save().then(function() { 
            //     alert("Reimbursement Rejected.");
            //     formControls.forEach(element => {
            //         element.setDisabled(true);
            //     });
            // }, function() { alert("Saving Failed!"); });
        }else{
            formContext.getAttribute("statuscode").setValue(287370000);
            const date = new Date();
            formContext.getAttribute("cre2e_initiated_date").setValue(date);
            Xrm.Page.data.save().then(function() { 
                alert("Reimbursement Approved !!!");
                formControls.forEach(element => {
                    element.setDisabled(true);
                });
            }, function() { alert("Saving Failed!"); });
        } 
    }

    function saveAndCheckForApproveForManager(formContext){     /*<---Nested/local function2.*/
        let formControls = formContext.ui.controls;
        if(amount > 8000 && amount < 12000){
            formContext.getAttribute("statuscode").setValue(287370003);
            const date = new Date();
            formContext.getAttribute("cre2e_initiated_date").setValue(date);
            Xrm.Page.data.save().then(function() { 
                alert("Reimbursement Saved! \nand successfully send for approval to manager.");
                formControls.forEach(element => {
                    element.setDisabled(true);
                });
            }, function() { alert("Saving Failed!"); });
        }else if(amount > 11999 && amount <= 55000){
            formContext.getAttribute("statuscode").setValue(287370004);
            const date = new Date();
            formContext.getAttribute("cre2e_initiated_date").setValue(date);
            Xrm.Page.data.save().then(function() { 
                alert("Reimbursement Saved! \nand successfully send for approval to head manager.");
                formControls.forEach(element => {
                    element.setDisabled(true);
                });
            }, function() { alert("Saving Failed!"); });
        }else if(amount > 55000){
            alert("Exceeding the amount limit, So can't send for approval.\nNote:The highest limit of amount for manager is 55,000 rupees.");
            // formContext.getAttribute("statuscode").setValue(287370001);
            // const date = new Date();
            // formContext.getAttribute("cre2e_initiated_date").setValue(date);
            // Xrm.Page.data.save().then(function() { 
            //     alert("Reimbursement Rejected.");
            //     formControls.forEach(element => {
            //         element.setDisabled(true);
            //     });
            // }, function() { alert("Saving Failed!"); });
        }else{
            formContext.getAttribute("statuscode").setValue(287370000);
            const date = new Date();
            formContext.getAttribute("cre2e_initiated_date").setValue(date);
            Xrm.Page.data.save().then(function() { 
                alert("Reimbursement Approved !!!");
                formControls.forEach(element => {
                    element.setDisabled(true);
                });
            }, function() { alert("Saving Failed!"); });
        } 
    }

    function saveAndCheckForApproveForHeadManager(formContext){     /*<---Nested/local function3.*/
        let formControls = formContext.ui.controls;
       if(amount > 60000){
        alert("Exceeding the amount limit, So can't send for approval.\nNote:The highest limit of amount for head manager is 60,000 rupees.");
            // formContext.getAttribute("statuscode").setValue(287370001);
            // const date = new Date();
            // formContext.getAttribute("cre2e_initiated_date").setValue(date);
            // Xrm.Page.data.save().then(function() { 
            //     alert("Reimbursement Rejected.");
            //     formControls.forEach(element => {
            //         element.setDisabled(true);
            //     });
            // }, function() { alert("Saving Failed!"); });
        }else{
            formContext.getAttribute("statuscode").setValue(287370000);
            const date = new Date();
            formContext.getAttribute("cre2e_initiated_date").setValue(date);
            Xrm.Page.data.save().then(function() { 
                alert("Reimbursement Approved !!!");
                formControls.forEach(element => {
                    element.setDisabled(true);
                });
            }, function() { alert("Saving Failed!"); });
        } 
    }

    function getSecurityRole(){                                 /*<---Nested/local function4.*/
        var userRole;
        var userRoles=Xrm.Utility.getGlobalContext().userSettings;   /*<--------Fetching User Security roles.*/
        if(Object.keys(userRoles.roles._collection).length>0)
        {
            for ( var rolidcollection in userRoles.roles._collection)
            {
               var currentUserRole= Xrm.Utility.getGlobalContext().userSettings.roles._collection[rolidcollection].name;    
               if(currentUserRole.toLowerCase()=="salesemploy")
               {
                   userRole = currentUserRole.toLowerCase();
                   break;
               }else if(currentUserRole.toLowerCase()=="managergrsmodified"){
                   userRole = currentUserRole.toLowerCase();
                   break;
               }else if(currentUserRole.toLowerCase()=="headmanagergrsmodified"){
                   userRole = currentUserRole.toLowerCase();
                   break;
               }
            }
        }
       return userRole;  
    }

}


function setApproved(executionContext){
    const formContext = executionContext;
    var answer = window.confirm("Are you sure to approve?\nWarning: Can't change the Status_Reason after it gets approved.");
        if (answer) {
            formContext.getAttribute("statuscode").setValue(287370000);
            Xrm.Page.data.save().then(function() { 
                alert("Approved.");
            }, function() { alert("Saving Failed!"); });
        }
        else {
            //Do Nothing.
        }   
    //console.log(Xrm.Page.context.getUserId()); /*<----Getting current login user id.*/
}


function setReject(executionContext){
    const formContext = executionContext;
    var answer = window.confirm("Are you sure to reject?\nWarning: Can't change the Status_Reason after it gets rejected.");
        if (answer) {
            formContext.getAttribute("statuscode").setValue(287370001);
            Xrm.Page.data.save().then(function() { 
                alert("Rejected.");
            }, function() { alert("Saving Failed!"); });
        }
        else {
            //Do Nothing.
        } 
}


function setVisibilityOfApprovalAndRejectButton(executionContext){  /*<-------Visibility for approved and reject button.*/
    //debugger;
    const formContext = executionContext;
    var value=false;
    const statusReason = formContext.getAttribute("statuscode").getValue();
    if(statusReason == 287370000 || statusReason == 287370001){
     value = false;
    }else{
        var userRoles=Xrm.Utility.getGlobalContext().userSettings;   /*<--------Fetching User Security roles.*/
        if(Object.keys(userRoles.roles._collection).length>0)
        {
            for ( var rolidcollection in userRoles.roles._collection)
            {
               var currentUserRoles= Xrm.Utility.getGlobalContext().userSettings.roles._collection[rolidcollection].name;    
               if(currentUserRoles.toLowerCase()=="salesemploy")
               {
                   value=false;
                   break;
               }else if(currentUserRoles.toLowerCase()=="managergrsmodified"){
                   const formOwnerGUID = formContext.getAttribute("cre2e_applicant_guid").getValue();
                   const currentUserGUID = Xrm.Page.context.getUserId();
                   if(formOwnerGUID == currentUserGUID){
                    value=false;
                    break;
                   }else if(formContext.getAttribute("cre2e_amount").getValue() >= 10000 && formContext.getAttribute("cre2e_amount").getValue() <= 50000){
                    value=false;
                    break;
                   }else{
                    value=true;
                    break;
                   }
               }else if(currentUserRoles.toLowerCase()=="headmanagergrsmodified"){
                   const formOwnerGUID = formContext.getAttribute("cre2e_applicant_guid").getValue();
                   const currentUserGUID = Xrm.Page.context.getUserId();
                   if(formOwnerGUID == currentUserGUID){
                    value=false;
                    break;
                   }else{
                    value=true;
                    break;
                   }
               }else if(currentUserRoles.toLowerCase()=="system administrator"){
                value = false;
                break;
               }
            }
        }
    }
    return value;
}

function setVisibilityOfSendForApprovalButton(executionContext){
    const formContext = executionContext;
    var value = false;
    var userRoles=Xrm.Utility.getGlobalContext().userSettings;
    if(Object.keys(userRoles.roles._collection).length>0)
        {
            for ( var rolidcollection in userRoles.roles._collection)
            {
               var currentUserRoles= Xrm.Utility.getGlobalContext().userSettings.roles._collection[rolidcollection].name;    
               if(currentUserRoles.toLowerCase()=="salesemploy")
               {
                    value = true;
                    break;
               }else if(currentUserRoles.toLowerCase()=="managergrsmodified"){
                    const formOwnerGUID = formContext.getAttribute("cre2e_applicant_guid").getValue();
                    const currentUserGUID = Xrm.Page.context.getUserId();
                    if(formOwnerGUID == currentUserGUID){
                        value = true;
                        break;
                    }else{
                        value = false;
                        break;
                    }
               }else if(currentUserRoles.toLowerCase()=="headmanagergrsmodified"){
                    const formOwnerGUID = formContext.getAttribute("cre2e_applicant_guid").getValue();
                    const currentUserGUID = Xrm.Page.context.getUserId();
                    if(formOwnerGUID == currentUserGUID){
                        value = true;
                        break;
                    }else{
                        value = false;
                        break;
                    }
               }else if(currentUserRoles.toLowerCase()=="system administrator"){
                    value = false;
                    break;
               }
            }
        }
     return value;   
}