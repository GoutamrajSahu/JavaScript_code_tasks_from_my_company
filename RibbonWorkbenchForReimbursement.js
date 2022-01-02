function setApprovalStatus(executionContext){
    const formContext = executionContext;  /*Here no need of ".getFormContext()"*/
    const amount = formContext.getAttribute("cre2e_amount").getValue();
    // console.log(amount);
    if(amount > 4999 && amount < 10000){
        formContext.getAttribute("statuscode").setValue(287370003);
    }else if(amount > 9999){
        formContext.getAttribute("statuscode").setValue(287370004);
    }else{
        formContext.getAttribute("statuscode").setValue(287370000);
    }
}

function setApproved(executionContext){
    const formContext = executionContext;
    formContext.getAttribute("statuscode").setValue(287370000);
}

function setReject(executionContext){
    const formContext = executionContext;
    formContext.getAttribute("statuscode").setValue(287370001);
}