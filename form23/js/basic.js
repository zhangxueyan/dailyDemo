$(function () {
          function getDocument(iframe) { 
            var Doc; 
            try{ 
                Doc = iframe.contentWindow.document;// For IE5.5 and IE6 
            } 
            catch(ex){} 
            if(!Doc) 
            { 
                Doc = iframe.contentDocument;// For NS6 
            } 
            return Doc; 
        }


        var aa = document.getElementById('childIframe').contentWindow;
        


        console.log(aa)


});