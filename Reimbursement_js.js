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
        var ownerInfo = formContext.getAttribute("ownerid").getValue();
        //console.log(ownerInfo);
        if(ownerInfo != null){
            formContext.getAttribute("cre2e_applicant_guid").setValue(ownerInfo[0].id);
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
            formContext.getControl("statuscode").setDisabled(true);
            formContext.getControl("ownerid").setDisabled(true);
            formContext.getControl("cre2e_initiated_date").setDisabled(true);
        }
    }

    // function disableFormOnSave(executionContext){
    //     const formContext = executionContext.getFormContext();
    //     let formControls = formContext.ui.controls;
    //     formControls.forEach(element => {
    //         element.setDisabled(true);
    //     });
    // }


    function fetchManager(executionContext){
        const formContext = executionContext.getFormContext();
        let StudentInf = formContext.getAttribute("ownerid").getValue();
        Xrm.WebApi.retrieveRecord("systemuser",StudentInf[0].id,
        "?$select=cre2e_full_name_with_salutation&$expand=parentsystemuserid($select=ownerid,fullname)") /*<---Fetching StudentData*/
        .then(
            function success(result){
                const managerId = `${result.parentsystemuserid.ownerid}`;
                const managerName = `${result.parentsystemuserid.fullname}`;
                const managerLookup =[{
                   "entityType": "systemuser",
                   "id": managerId,
                   "name": managerName
                  }]; //<----creating the manager lookup.
            formContext.getAttribute("cre2e_manager").setValue(managerLookup); /*<---Adding value to manager look field.*/
              //debugger;
                    Xrm.WebApi.retrieveRecord("systemuser",result.parentsystemuserid.ownerid,
                    "?$expand=parentsystemuserid($select=ownerid,fullname)")/*<---Fetching ManagerData*/
                    .then(
                        function success(res){
                                const headManagerLookup =[{
                                    "entityType": "systemuser",
                                    "id": `${res.parentsystemuserid.ownerid}`,
                                    "name": `${res.parentsystemuserid.fullname}`
                                }]; //<----creating the manager lookup.
                                formContext.getAttribute("cre2e_head_manager").setValue(headManagerLookup); /*<---Adding Head manager if owner is not a manager.*/      
                        },
                        function(err){
                            console.log(error);
                        }
                    )
                    if(formContext.getAttribute("cre2e_head_manager").getValue() == null){
                        const headManagerLookup =[{
                                    "entityType": "systemuser",
                                    "id": managerId,
                                    "name": managerName
                                }]; //<----creating the manager lookup.
                        formContext.getAttribute("cre2e_head_manager").setValue(headManagerLookup); /*<---Adding Head manager if owner is a manager where manager of manager is head manager.*/
                    }
            },
            function (error){
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

    function checkAmountExceedingOrNot(executionContext){
        const formContext = executionContext.getFormContext();
        const userRole = getSecurityRole();
        const amount = formContext.getAttribute("cre2e_amount").getValue();
            if(userRole == "salesemploy"){
                if(amount > 50000){
                    alert("Exceeding the amount limit!\nNote:The highest limit of amount for sales employee is 50,000 rupees.");
                    formContext.getAttribute("cre2e_amount").setValue(null);
                }
            }else if(userRole == "managergrsmodified"){
                if(amount > 55000){
                    alert("Exceeding the amount limit!\nNote:The highest limit of amount for manager is 55,000 rupees.");
                    formContext.getAttribute("cre2e_amount").setValue(null);
                }
            }else if(userRole == "headmanagergrsmodified"){
                if(amount > 60000){
                    alert("Exceeding the amount limit!\nNote:The highest limit of amount for head manager is 60,000 rupees.");
                    formContext.getAttribute("cre2e_amount").setValue(null);
                }
            }

        function getSecurityRole(){                                 /*<---Nested/local function1.*/
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