/**
 * 
 * 
 * Client - Nill
 * 
 * 
 *  OTP 7886 - Restrict Item Fulfillment
 * 
 * 
 * ------------------------------------------------------------------------
 * 
 * Author : Jobin And Jismi IT Services
 * 
 * Date Created : 24 - September - 2024
 * 
 * Description : This script is for displaying warning message for item fulfillment if custom checkbox is checked.
 * 
 * 
 * 
 * 
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/ui/message','N/log'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{message} message
 */
    (record, message, log) => {
        
        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        try
        {
        var newRecord = scriptContext.newRecord;
        
        if (newRecord.type === record.Type.ITEM_FULFILLMENT) {
            var salesOrderId = newRecord.getValue({
                fieldId: 'createdfrom'
            });
            
                var salesOrder = record.load({
                    type: record.Type.SALES_ORDER,
                    id: salesOrderId
                });
                var customFieldChecked = salesOrder.getValue('custbody_jj_hold_fulfillment_otp_7886'); 
                log.debug(customFieldChecked);
                
                if (customFieldChecked) {
                    throw new Error('Bulk item fulfillment is restricted.');
                }
            
        }
    }
    catch(error)
        {
            log.error(error);
        }
            
        }
        
       
        return {beforeSubmit}
    });