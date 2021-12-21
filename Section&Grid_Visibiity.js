function libraryStudentSectionVisibility(executionContext){
debugger;
const formContext = executionContext.getFormContext();
var visibilityStatus = formContext.getAttribute("cre2e_library_students_section_visibility").getValue();
    console.log(formContext.ui.tabs.get("tab_6"));
	if(visibilityStatus == 1){
          formContext.ui.tabs.get("tab_6").sections.get("tab_6_section_1").setVisible(true);
	   }else{
	     formContext.ui.tabs.get("tab_6").sections.get("tab_6_section_1").setVisible(false);
	}
}

/*function libraryStudentSectionVisibility(executionContext){
debugger;
const formContext = executionContext.getFormContext();
var visibilityStatus = formContext.getAttribute("cre2e_library_students_section_visibility").getValue();
	if(visibilityStatus == 1){
       fromContext.page.ui.tabs.get("tab_6").sections.get("tab_6_section_1").setVisible(false);
	}else{
	  fromContext.page.ui.tabs.get("tab_6").sections.get("tab_6_section_1").setVisible(false);
	}
}*/