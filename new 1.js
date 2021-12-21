function setRequired(executionContext){
    debugger;
   var fromcontext = executionContext.getFormContext();
   var reimbursementType = fromcontext.getAttribute("cre2e_reimbursement_type");
   if(reimbursementType== 287370002){
	 fromcontext.getControl("cre2e_description").setVisible(false);
   }else{
	 fromcontext.getControl("cre2e_description").setVisible(true);
   }
}

/*function setRequired(executionContext){
    debugger;
   var fromcontext = executionContext.getFormContext();
   var reimbursementType = fromcontext.getAttribute("cre2e_reimbursement_type");
   if(reimbursementType== 287370002){
	 fromcontext.getControl("cre2e_description").setVisible(false);
   }else{
	 fromcontext.getControl("cre2e_description").setVisible(true);
   }
}*/