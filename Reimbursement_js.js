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
        console.log(StudentInfo);
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
        if(statusReason == 287370000 || statusReason == 287370003 || statusReason == 287370004 || statusReason == 287370001){
            formControls.forEach(element => {
                element.setDisabled(true);
            });
        }else{
            formControls.forEach(element => {
                element.setDisabled(false);
            });
        }
    }


    function fetchManager(executionContext){
        const formContext = executionContext.getFormContext();
        let StudentInf = formContext.getAttribute("ownerid").getValue();
        Xrm.WebApi.retrieveRecord("systemuser",StudentInf[0].id,
        "?$select=cre2e_full_name_with_salutation&$expand=parentsystemuserid($select=ownerid,fullname)") /*<---Fetching StudentData*/
        .then(
            function success(result){
                const managerLookup =[{
                   "entityType": "systemuser",
                   "id": `${result.parentsystemuserid.ownerid}`,
                   "name": `${result.parentsystemuserid.fullname}`
                  }]; //<----creating the manager lookup.
            formContext.getAttribute("cre2e_manager").setValue(managerLookup); /*<---Adding value to manager look field.*/

                    Xrm.WebApi.retrieveRecord("systemuser",result.parentsystemuserid.ownerid,
                    "?$expand=parentsystemuserid($select=ownerid,fullname)")/*<---Fetching ManagerData*/
                    .then(
                        function success(result){
                                const managerLookup =[{
                                    "entityType": "systemuser",
                                    "id": `${result.parentsystemuserid.ownerid}`,
                                    "name": `${result.parentsystemuserid.fullname}`
                                }]; //<----creating the manager lookup.
                                formContext.getAttribute("cre2e_head_manager").setValue(managerLookup); 
                        },
                        function(err){
                            console.log("Head Manager not found.");
                            console.log(error);
                        }
                    )
            },
            function (error){
                console.log("Manager not found.");
                console.log(error);
            }
        );
    }

    function insertIntegerAmount(executionContext){
        const formContext = executionContext.getFormContext();
        let Amount = formContext.getAttribute("cre2e_amount").getValue();
        formContext.getAttribute("cre2e_amount_in_decimal").setValue(Amount);
        //console.log(Amount);
    }