(function( $ ) {
$(document).ready(function(){

	_ = window.jsi18n_bika;
	PMF = window.jsi18n_plone;

	// Worksheets need to check these before enabling Add button
    $("#AttachFile,#Service,#Analysis").change(function(event){
        attachfile = $("#AttachFile").val();
        if(attachfile == undefined){attachfile = '';}
        service = $("#Service").val();
        if(service == undefined){service = '';}
        analysis = $("#Analysis").val();
        if(analysis == undefined){analysis= '';}

        if (this.id == 'Service') {
            $("#Analysis").val('');
        }
        if (this.id == 'Analysis') {
            $("#Service").val('');
        }

        if (attachfile != '' && ((service != '') || (analysis != ''))) {
            $("#addButton").removeAttr("disabled");
        } else {
            $("#addButton").attr("disabled", true);
        }
    });

	// This is the button next to analysis attachments in ARs and Worksheets
	$('.deleteAttachmentButton').live("click", function(){
		attachment_uid = $(this).attr("attachment_uid");
		options = {
			url: 'delete_analysis_attachment',
			type: 'POST',
			success: function(responseText, statusText, xhr, $form) {
				if(responseText == "success"){
					$("span[attachment_uid="+attachment_uid+"]").remove();
				}
			},
			data: {
				'attachment_uid': attachment_uid,
				'_authenticator': $('input[name="_authenticator"]').val()
			},
		}
		$.ajax(options);
	});

	// Dropdown grid of Analyses in attachment forms
	$( "#Analysis" ).combogrid({
		colModel: [{'columnName':'analysis_uid','hidden':true},
		           {'columnName':'slot','width':'10','label':window.jsi18n_bika('Slot')},
		           {'columnName':'service','width':'35','label':window.jsi18n_bika('Service')},
		           {'columnName':'parent','width':'35','label':window.jsi18n_bika('Parent')},
		           {'columnName':'type','width':'20','label':window.jsi18n_bika('Type')}],
		url: window.location.href.replace("/manage_results","") + "/attachAnalyses?_authenticator=" + $('input[name="_authenticator"]').val(),
		select: function( event, ui ) {
			$( "#Analysis" ).val(ui.item.service + " (slot "+ui.item.slot+")");
			$( "#analysis_uid" ).val(ui.item.analysis_uid);
			$(this).change();
			return false;
		}
	});

});
}(jQuery));
