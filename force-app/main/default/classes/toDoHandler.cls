public with sharing class toDoHandler {
    @AuraEnabled
    public static string createTask(string titleApex, date dueDateApex, string descriptionApex){
        system.debug('titleApex '+titleApex);
        system.debug('dueDateApex '+dueDateApex);
        system.debug('descriptionApex '+descriptionApex);
        if(titleApex != null || dueDateApex != null || descriptionApex != null){

        }
            ToDo_List__c rec = new ToDo_List__c();
            rec.Name = titleApex;
            rec.Due_Date__c = dueDateApex;
            rec.Description__c = descriptionApex;
            insert rec;
            system.debug(rec.id);
         return 'Task created';
    }

    @AuraEnabled(cacheable = true)
    public static List<ToDo_List__c> fetchTasks(){
        try {
            List<ToDo_List__c> todoList = [SELECT Id, Name, Due_Date__c, Description__c from ToDo_List__c];
            return todoList;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string deleteTask(string taskId){
        try {
            ToDo_List__c tdcRec = [SELECT Id FROM ToDo_List__c WHERE Id =:taskId];
            delete tdcRec;
            return 'Task Deleted';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static string editTask(string taskId, string title, date dueDate, string description){
        try {
            ToDo_List__c tdcRec = [SELECT Id, Name, Due_Date__c, Description__c FROM ToDo_List__c WHERE Id =:taskId];
            system.debug(title);
            system.debug(dueDate);
            system.debug(description);
            if(title != null){
                tdcRec.Name = title;
            }
            if(dueDate != null){
                tdcRec.Due_Date__c = dueDate;
            }
            if(description != null){
                tdcRec.Description__c = description;
            }
            update tdcRec;
            return 'Edit Successfully';
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}