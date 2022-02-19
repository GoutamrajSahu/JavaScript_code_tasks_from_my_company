function makeStatusApproved(executionContext){
    const formContext = executionContext.getFormContext();
    //let Status = formContext.getAttribute("zx_status").getValue();
    //debugger;
    let ApprovalStatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();
    let ApprovalStatusZonalHead = formContext.getAttribute("zx_approvalstatuszonalhead").getValue();
    let ApprovalStatusAccounts = formContext.getAttribute("zx_approvalstatusaccounts").getValue();
    let ApprovalStatusSupplyChain = formContext.getAttribute("zx_approvalstatussupplychain").getValue();
    let ApprovalStatusNationalHead = formContext.getAttribute("zx_approvalstatusnationalhead").getValue();
  
    if(ApprovalStatusStateHead == 425120000 && ApprovalStatusZonalHead == 425120000 && ApprovalStatusAccounts == 425120000 && ApprovalStatusSupplyChain == 425120000 && ApprovalStatusNationalHead == 425120000){
        formContext.getAttribute("zx_status").setValue(425120000); //Make Draft
    }
    else{
        if(ApprovalStatusStateHead == 425120002 && ApprovalStatusZonalHead == 425120002 && ApprovalStatusAccounts == 425120002 && ApprovalStatusSupplyChain == 425120002 && ApprovalStatusNationalHead == 425120002){
            formContext.getAttribute("zx_status").setValue(425120002); //Make Approve
        }else if(ApprovalStatusStateHead == 425120003 || ApprovalStatusZonalHead == 425120003 || ApprovalStatusAccounts == 425120003 || ApprovalStatusSupplyChain == 425120003 || ApprovalStatusNationalHead == 425120003){
            formContext.getAttribute("zx_status").setValue(425120003); //Make Reject
        }else if(ApprovalStatusStateHead == 425120001 || ApprovalStatusZonalHead == 425120001 || ApprovalStatusAccounts == 425120001 || ApprovalStatusSupplyChain == 425120001 || ApprovalStatusNationalHead == 425120001
           || ApprovalStatusStateHead == 425120002 || ApprovalStatusZonalHead == 425120002 || ApprovalStatusAccounts == 425120002 || ApprovalStatusSupplyChain == 425120002 || ApprovalStatusNationalHead == 425120002){
            formContext.getAttribute("zx_status").setValue(425120001); //Make Pending for approval
        } 
    }
}

function fieldFunctionalityForStatus(executionContext){
    const formContext = executionContext.getFormContext();
    let status = formContext.getAttribute("zx_status").getValue();
    //debugger;
    if(status == null){  //<---------------------------------------------------make every approval to draft.
        formContext.getAttribute("zx_approvalstatusstatehead").setValue(null);
        formContext.getAttribute("zx_approvalstatuszonalhead").setValue(null);
        formContext.getAttribute("zx_approvalstatusaccounts").setValue(null);
        formContext.getAttribute("zx_approvalstatussupplychain").setValue(null);
        formContext.getAttribute("zx_approvalstatusnationalhead").setValue(null);
    }else if(status == 425120000){  //<---------------------------------------------------make every approval to draft.
        formContext.getAttribute("zx_approvalstatusstatehead").setValue(425120000);
        formContext.getAttribute("zx_approvalstatuszonalhead").setValue(425120000);
        formContext.getAttribute("zx_approvalstatusaccounts").setValue(425120000);
        formContext.getAttribute("zx_approvalstatussupplychain").setValue(425120000);
        formContext.getAttribute("zx_approvalstatusnationalhead").setValue(425120000);
    }else if(status == 425120001){  //<---------------------------------------------make every approval to pending for approval.
        formContext.getAttribute("zx_approvalstatusstatehead").setValue(425120001);
        formContext.getAttribute("zx_approvalstatuszonalhead").setValue(425120001);
        formContext.getAttribute("zx_approvalstatusaccounts").setValue(425120001);
        formContext.getAttribute("zx_approvalstatussupplychain").setValue(425120001);
        formContext.getAttribute("zx_approvalstatusnationalhead").setValue(425120001);
    }
    console.log(status);
}


function ApprovalButton(executionContext){
    //debugger;
    const formContext = executionContext;
    var context = Xrm.Utility.getGlobalContext();
    var LogInUserId = context.userSettings.userId; // Getting Login User ID

    let StateHeadLookupId =  Xrm.Page.getAttribute("zx_statehead").getValue()[0].id;
    let ZonalHeadLookupId =  Xrm.Page.getAttribute("zx_zonalhead").getValue()[0].id;
    let AccountsLookupId =  Xrm.Page.getAttribute("zx_accounts").getValue()[0].id;
    let SupplyChainLookupId =  Xrm.Page.getAttribute("zx_supplychain").getValue()[0].id;
    let NationalHeadLookupId =  Xrm.Page.getAttribute("zx_nationalhead").getValue()[0].id;
    
    if(LogInUserId === StateHeadLookupId){
        let answer = window.confirm("Are you sure to approve?\nWarning: Can't change the Status after it gets approved.");
        if (answer) {
        formContext.getAttribute("zx_approvalstatusstatehead").setValue(425120002);
        checkStatus(formContext);
        Xrm.Page.data.save().then(function() {
            alert("Approved.");
        }, function() { alert("Saving Failed!"); });
        }else{
            //Do Nothing.
        }
        
    }else if(LogInUserId === ZonalHeadLookupId){
        let ApprovalStatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();

        if(ApprovalStatusStateHead != 425120002){
            alert("Pending approval for state head.");
        }else{
            let answer = window.confirm("Are you sure to approve?\nWarning: Can't change the Status after it gets approved.");
            if (answer) {
            formContext.getAttribute("zx_approvalstatuszonalhead").setValue(425120002);
            checkStatus(formContext);
            Xrm.Page.data.save().then(function() {
                alert("Approved.");
            }, function() { alert("Saving Failed!"); });
            }else{
                //Do Nothing.
            }
        }

    }else if(LogInUserId === AccountsLookupId){
        let ApprovalStatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();
        let ApprovalStatusZonalHead = formContext.getAttribute("zx_approvalstatuszonalhead").getValue();
         
        if(ApprovalStatusStateHead != 425120002){
            alert("Pending approval for state head.");
        }else if(ApprovalStatusZonalHead != 425120002){
            alert("Pending approval for zonal head.");
        }else{
            let answer = window.confirm("Are you sure to approve?\nWarning: Can't change the Status after it gets approved.");
            if (answer) {
            formContext.getAttribute("zx_approvalstatusaccounts").setValue(425120002);
            checkStatus(formContext);
            Xrm.Page.data.save().then(function() {
                alert("Approved.");
            }, function() { alert("Saving Failed!"); });
            }else{
                    //Do Nothing.
            }
        }

    }else if(LogInUserId === SupplyChainLookupId){
        let ApprovalStatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();
        let ApprovalStatusZonalHead = formContext.getAttribute("zx_approvalstatuszonalhead").getValue();
        let ApprovalStatusAccounts = formContext.getAttribute("zx_approvalstatusaccounts").getValue();

        if(ApprovalStatusStateHead != 425120002){
            alert("Pending approval for state head.");
        }else if(ApprovalStatusZonalHead != 425120002){
            alert("Pending approval for zonal head.");
        }else if(ApprovalStatusAccounts != 425120002){
            alert("Pending approval for Accounts.");
        }else{
            let answer = window.confirm("Are you sure to approve?\nWarning: Can't change the Status after it gets approved.");
            if (answer) {
            formContext.getAttribute("zx_approvalstatussupplychain").setValue(425120002);
            checkStatus(formContext);
            Xrm.Page.data.save().then(function() {
            alert("Approved.");
            }, function() { alert("Saving Failed!"); });
            }else{
                //Do Nothing.
            }
        }

    }else if(LogInUserId === NationalHeadLookupId){
        let ApprovalStatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();
        let ApprovalStatusZonalHead = formContext.getAttribute("zx_approvalstatuszonalhead").getValue();
        let ApprovalStatusAccounts = formContext.getAttribute("zx_approvalstatusaccounts").getValue();
        let ApprovalStatusSupplyChain = formContext.getAttribute("zx_approvalstatussupplychain").getValue();

        if(ApprovalStatusStateHead != 425120002){
            alert("Pending approval for state head.");
        }else if(ApprovalStatusZonalHead != 425120002){
            alert("Pending approval for zonal head.");
        }else if(ApprovalStatusAccounts != 425120002){
            alert("Pending approval for Accounts.");
        }else if(ApprovalStatusSupplyChain != 425120002){
            alert("Pending approval for Supply Chain.");
        }else{
            let answer = window.confirm("Are you sure to approve?\nWarning: Can't change the Status after it gets approved.");
            if (answer) {
            formContext.getAttribute("zx_approvalstatusnationalhead").setValue(425120002);
            checkStatus(formContext);
            Xrm.Page.data.save().then(function() {
                alert("Approved.");
            }, function() { alert("Saving Failed!"); });
            }else{
                //Do Nothing.
            }
        }
    }

        function checkStatus(formContext){         //<-----------Sub-function of ApprovalButton.
            //debugger;
            let StatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();
            let StatusZonalHead = formContext.getAttribute("zx_approvalstatuszonalhead").getValue();
            let StatusAccounts = formContext.getAttribute("zx_approvalstatusaccounts").getValue();
            let StatusSupplyChain = formContext.getAttribute("zx_approvalstatussupplychain").getValue();
            let StatusNationalHead = formContext.getAttribute("zx_approvalstatusnationalhead").getValue();
            
            if(StatusStateHead == 425120000 && StatusZonalHead == 425120000 && StatusAccounts == 425120000 && StatusSupplyChain == 425120000 && StatusNationalHead == 425120000){
                formContext.getAttribute("zx_status").setValue(425120000); //Make Draft
            }
            else{
                if(StatusStateHead == 425120002 && StatusZonalHead == 425120002 && StatusAccounts == 425120002 && StatusSupplyChain == 425120002 && StatusNationalHead == 425120002){
                    formContext.getAttribute("zx_status").setValue(425120002); //Make Approve
                }else if(StatusStateHead == 425120003 || StatusZonalHead == 425120003 || StatusAccounts == 425120003 || StatusSupplyChain == 425120003 || StatusNationalHead == 425120003){
                    formContext.getAttribute("zx_status").setValue(425120003); //Make Reject
                }else if(StatusStateHead == 425120001 || StatusZonalHead == 425120001 || StatusAccounts == 425120001 || StatusSupplyChain == 425120001 || StatusNationalHead == 425120001
                || StatusStateHead == 425120002 || StatusZonalHead == 425120002 || StatusAccounts == 425120002 || StatusSupplyChain == 425120002 || StatusNationalHead == 425120002){
                    formContext.getAttribute("zx_status").setValue(425120001); //Make Pending for approval
                } 
            }
        }

}



function rejectBtn(executionContext){
    const formContext = executionContext;
    var context = Xrm.Utility.getGlobalContext();
    var LogInUserId = context.userSettings.userId; // Getting Login User ID

    let StateHeadLookupId =  Xrm.Page.getAttribute("zx_statehead").getValue()[0].id;
    let ZonalHeadLookupId =  Xrm.Page.getAttribute("zx_zonalhead").getValue()[0].id;
    let AccountsLookupId =  Xrm.Page.getAttribute("zx_accounts").getValue()[0].id;
    let SupplyChainLookupId =  Xrm.Page.getAttribute("zx_supplychain").getValue()[0].id;
    let NationalHeadLookupId =  Xrm.Page.getAttribute("zx_nationalhead").getValue()[0].id;
    
    if(LogInUserId === StateHeadLookupId){
            //alert("gettingStateHead");
            let answer = window.confirm("Are you sure to reject?\nWarning: Can't change the Status after it gets rejected.");
            if (answer) {
                formContext.getAttribute("zx_approvalstatusstatehead").setValue(425120003);
                checkStatus(formContext);
                
                //<----------------------(Reject all below State head)-----------(Start)-------------->//
                formContext.getAttribute("zx_approvalstatuszonalhead").setValue(425120003);
                formContext.getAttribute("zx_approvalstatusaccounts").setValue(425120003);
                formContext.getAttribute("zx_approvalstatussupplychain").setValue(425120003);
                formContext.getAttribute("zx_approvalstatusnationalhead").setValue(425120003);
                //<----------------------(Reject all below State head)-----------(End)---------------->//

                Xrm.Page.data.save().then(function() {
                    alert("Rejected.");
                }, function() { alert("Saving Failed!"); });
            }else{
                //Do Nothing.
            }
    }else if(LogInUserId === ZonalHeadLookupId){
            //alert("gettingZonalHead");
        let ApprovalStatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();

        if(ApprovalStatusStateHead != 425120002){
            alert("Pending approval for state head.");
        }else{
            let answer = window.confirm("Are you sure to reject?\nWarning: Can't change the Status after it gets rejected.");
            if (answer) {
                formContext.getAttribute("zx_approvalstatuszonalhead").setValue(425120003);
                checkStatus(formContext);

                //<----------------------(Reject all below Zonal head)-----------(Start)-------------->//
                formContext.getAttribute("zx_approvalstatusaccounts").setValue(425120003);
                formContext.getAttribute("zx_approvalstatussupplychain").setValue(425120003);
                formContext.getAttribute("zx_approvalstatusnationalhead").setValue(425120003);
                //<----------------------(Reject all below Zonal head)-----------(End)---------------->//

                Xrm.Page.data.save().then(function() {
                    alert("Rejected.");
                }, function() { alert("Saving Failed!"); });
            }else{
                //Do Nothing.
            }
        }
    }else if(LogInUserId === AccountsLookupId){
            //alert("gettingAccount");
        let ApprovalStatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();
        let ApprovalStatusZonalHead = formContext.getAttribute("zx_approvalstatuszonalhead").getValue();
         
        if(ApprovalStatusStateHead != 425120002){
            alert("Pending approval for state head.");
        }else if(ApprovalStatusZonalHead != 425120002){
            alert("Pending approval for zonal head.");
        }else{
            let answer = window.confirm("Are you sure to reject?\nWarning: Can't change the Status after it gets rejected.");
            if (answer) {
                formContext.getAttribute("zx_approvalstatusaccounts").setValue(425120003);
                checkStatus(formContext);

                //<----------------------(Reject all below Accounts)-----------(Start)-------------->//
                formContext.getAttribute("zx_approvalstatussupplychain").setValue(425120003);
                formContext.getAttribute("zx_approvalstatusnationalhead").setValue(425120003);
                //<----------------------(Reject all below Accounts)-----------(End)---------------->//

                Xrm.Page.data.save().then(function() {
                    alert("Rejected.");
                }, function() { alert("Saving Failed!"); });
            }else{
                //Do Nothing.
            }
        }
    }else if(LogInUserId === SupplyChainLookupId){
            //alert("gettingSupplyChain");
        let ApprovalStatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();
        let ApprovalStatusZonalHead = formContext.getAttribute("zx_approvalstatuszonalhead").getValue();
        let ApprovalStatusAccounts = formContext.getAttribute("zx_approvalstatusaccounts").getValue();

        if(ApprovalStatusStateHead != 425120002){
            alert("Pending approval for state head.");
        }else if(ApprovalStatusZonalHead != 425120002){
            alert("Pending approval for zonal head.");
        }else if(ApprovalStatusAccounts != 425120002){
            alert("Pending approval for Accounts.");
        }else{
            let answer = window.confirm("Are you sure to reject?\nWarning: Can't change the Status after it gets rejected.");
            if (answer) {
                formContext.getAttribute("zx_approvalstatussupplychain").setValue(425120003);
                checkStatus(formContext);

                //<----------------------(Reject all below Supply Chain)-----------(Start)-------------->//
                formContext.getAttribute("zx_approvalstatusnationalhead").setValue(425120003);
                //<----------------------(Reject all below Supply Chain)-----------(End)---------------->//
                
                Xrm.Page.data.save().then(function() {
                    alert("Rejected.");
                }, function() { alert("Saving Failed!"); });
            }else{
                //Do Nothing.
            }
        }
    }else if(LogInUserId === NationalHeadLookupId){
            //alert("gettingNationalHead");
        let ApprovalStatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();
        let ApprovalStatusZonalHead = formContext.getAttribute("zx_approvalstatuszonalhead").getValue();
        let ApprovalStatusAccounts = formContext.getAttribute("zx_approvalstatusaccounts").getValue();
        let ApprovalStatusSupplyChain = formContext.getAttribute("zx_approvalstatussupplychain").getValue();

        if(ApprovalStatusStateHead != 425120002){
            alert("Pending approval for state head.");
        }else if(ApprovalStatusZonalHead != 425120002){
            alert("Pending approval for zonal head.");
        }else if(ApprovalStatusAccounts != 425120002){
            alert("Pending approval for Accounts.");
        }else if(ApprovalStatusSupplyChain != 425120002){
            alert("Pending approval for Supply Chain.");
        }else{
            let answer = window.confirm("Are you sure to reject?\nWarning: Can't change the Status after it gets rejected.");
            if (answer) {
                formContext.getAttribute("zx_approvalstatusnationalhead").setValue(425120003);
                checkStatus(formContext);

                //<----------------------(Reject all below National Head)-----------(Start)-------------->//
                //No field available
                //<----------------------(Reject all below National Head)-----------(End)---------------->//

                Xrm.Page.data.save().then(function() {
                    alert("Rejected.");
                }, function() { alert("Saving Failed!"); });
            }else{
                //Do Nothing.
            }
        }
    }

        function checkStatus(formContext){         //<-----------Sub-function of RejectBtn.
            //debugger;
            let StatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();
            let StatusZonalHead = formContext.getAttribute("zx_approvalstatuszonalhead").getValue();
            let StatusAccounts = formContext.getAttribute("zx_approvalstatusaccounts").getValue();
            let StatusSupplyChain = formContext.getAttribute("zx_approvalstatussupplychain").getValue();
            let StatusNationalHead = formContext.getAttribute("zx_approvalstatusnationalhead").getValue();
            
            if(StatusStateHead == 425120000 && StatusZonalHead == 425120000 && StatusAccounts == 425120000 && StatusSupplyChain == 425120000 && StatusNationalHead == 425120000){
                formContext.getAttribute("zx_status").setValue(425120000); //Make Draft
            }
            else{
                if(StatusStateHead == 425120002 && StatusZonalHead == 425120002 && StatusAccounts == 425120002 && StatusSupplyChain == 425120002 && StatusNationalHead == 425120002){
                    formContext.getAttribute("zx_status").setValue(425120002); //Make Approve
                }else if(StatusStateHead == 425120003 || StatusZonalHead == 425120003 || StatusAccounts == 425120003 || StatusSupplyChain == 425120003 || StatusNationalHead == 425120003){
                    formContext.getAttribute("zx_status").setValue(425120003); //Make Reject
                }else if(StatusStateHead == 425120001 || StatusZonalHead == 425120001 || StatusAccounts == 425120001 || StatusSupplyChain == 425120001 || StatusNationalHead == 425120001
                || StatusStateHead == 425120002 || StatusZonalHead == 425120002 || StatusAccounts == 425120002 || StatusSupplyChain == 425120002 || StatusNationalHead == 425120002){
                    formContext.getAttribute("zx_status").setValue(425120001); //Make Pending for approval
                } 
            }
        }

}

//<---------------------------------------------------(Visibility Rules Section.)----------------------------------------------------------->//

function setVisibilityOfApprovalAndRejectButton(executionContext){  /*<-------Visibility for approved and reject button.*/
    //debugger;
    const formContext = executionContext;
    var value=false;

    var context = Xrm.Utility.getGlobalContext();
    var LogInUserId = context.userSettings.userId; // Getting Login User ID

    let ApprovalStatusStateHead = formContext.getAttribute("zx_approvalstatusstatehead").getValue();
    let ApprovalStatusZonalHead = formContext.getAttribute("zx_approvalstatuszonalhead").getValue();
    let ApprovalStatusAccounts = formContext.getAttribute("zx_approvalstatusaccounts").getValue();
    let ApprovalStatusSupplyChain = formContext.getAttribute("zx_approvalstatussupplychain").getValue();
    let ApprovalStatusNationalHead = formContext.getAttribute("zx_approvalstatusnationalhead").getValue();

    let StateHeadLookupId =  Xrm.Page.getAttribute("zx_statehead").getValue()[0].id;
    let ZonalHeadLookupId =  Xrm.Page.getAttribute("zx_zonalhead").getValue()[0].id;
    let AccountsLookupId =  Xrm.Page.getAttribute("zx_accounts").getValue()[0].id;
    let SupplyChainLookupId =  Xrm.Page.getAttribute("zx_supplychain").getValue()[0].id;
    let NationalHeadLookupId =  Xrm.Page.getAttribute("zx_nationalhead").getValue()[0].id;
    const statusReason = formContext.getAttribute("zx_status").getValue();

    if(LogInUserId === StateHeadLookupId){
        if(ApprovalStatusStateHead == 425120002 || ApprovalStatusStateHead == 425120003){
            value = false;
        }else{
            if(statusReason != 425120001){
                value = false;
            }else{
                value = true;
            }
        }
    }else if(LogInUserId === ZonalHeadLookupId){
        if(ApprovalStatusZonalHead == 425120002 || ApprovalStatusZonalHead == 425120003){
            value = false;
        }else{
            if(statusReason != 425120001){
                value = false;
            }else{
                value = true;
            }
        }
    }else if(LogInUserId === AccountsLookupId){
        if(ApprovalStatusAccounts == 425120002 || ApprovalStatusAccounts == 425120003){
            value = false;
        }else{
            if(statusReason != 425120001){
                value = false;
            }else{
                value = true;
            }
        }
    }else if(LogInUserId === SupplyChainLookupId){
        if(ApprovalStatusSupplyChain == 425120002 || ApprovalStatusSupplyChain == 425120003){
            value = false;
        }else{
            if(statusReason != 425120001){
                value = false;
            }else{
                value = true;
            }
        }
    }else if(LogInUserId === NationalHeadLookupId){
        if(ApprovalStatusNationalHead == 425120002 || ApprovalStatusNationalHead == 425120003){
            value = false;
        }else{
            if(statusReason != 425120001){
                value = false;
            }else{
                value = true;
            }
        }
    }else{
            value = false;
    }

    return value;
}