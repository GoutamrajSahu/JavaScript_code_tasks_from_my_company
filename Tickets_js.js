function setApproved(executionContext){
    const formContext = executionContext;
    var answer = window.confirm("Are you sure to approve?\nWarning: Can't change the Status_Reason after it gets approved.");
        if (answer) {
            formContext.getAttribute("zx_approvalstatus").setValue(425120001);
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
            formContext.getAttribute("zx_approvalstatus").setValue(425120002);
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
    const statusReason = formContext.getAttribute("zx_approvalstatus").getValue();
    if(statusReason == 425120001 || statusReason == 425120002){
     value = false;
    }else{
     value = true;
    }
    return value;
}

function disableForm(executionContext){
    const formContext = executionContext.getFormContext();
    let statusReason = formContext.getAttribute("zx_approvalstatus").getValue();
    let formControls = formContext.ui.controls;

        formControls.forEach(element => {
            element.setDisabled(true);
        });
        formContext.getControl("zx_name").setDisabled(false);
}