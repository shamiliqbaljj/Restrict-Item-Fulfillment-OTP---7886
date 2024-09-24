/**
 * 
 * 
 * OTP 7886 - Restrict Item Fulfillment
 * 
 * 
 * ------------------------------------------------------------------------
 * 
 * Author : Jobin And Jismi IT Services
 * 
 * Date Created : 24 - September - 2024
 * 
 * Description : This script is for restricting item fulfillment if custom checkbox is checked.
 * 
 * REVISION HISTORY : 1.0
 * 
 * 
 * 
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/ui/message','N/log'],

function(message, log) {
    
    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {

        try
        {
        let currentRecord = scriptContext.currentRecord;
        let holdFulfillment = currentRecord.getValue('custbody_jj_hold_fulfillment_otp_7886');// Fetch value of custom checkbox
        if (holdFulfillment)
        {
           warningMessage();
        }
        return true;
    }
    catch(error)
    {
        log.error(error);
    }
    }

    // Function To Display Warning Message

    function warningMessage()
    {
        try{
        let myMsg3 = message.create({
            title: 'Fulfillment Not Allowed',
            message: 'Fulfilmment is restricted for this Sales Order',
            type: message.Type.WARNING,
            duration: 100000
        });
        myMsg3.show();
    }
    catch(error)
    {
        log.error(error);
    }
    }

    return {
        saveRecord: saveRecord
    };
    
});
