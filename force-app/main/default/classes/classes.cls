public  class classes {

    @AuraEnabled(cacheable=true)
    public static List<evolution__Class__c> getclasses() {
        List<evolution__Class__c> clslist = [Select Name from evolution__Class__c];
        return clslist;
    }

    @AuraEnabled(cacheable=true)
    public static List<evolution__Studentdetail__c> getstudents(String clsid) {
        List<evolution__Studentdetail__c> stdlist = [Select Name, evolution__Roll__c, evolution__Marks__c from evolution__Studentdetail__c where evolution__Class__c = :clsid];
        return stdlist;
    }   
}
