/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const portletTemplate = ({portlet_id, portlet_name}) => `
                      <div class="portlet" id="${portlet_id}" >

                        <div class="portlet-header"><p class="portletname" id="name" >${portlet_name} </p></div>

                        <div class="portlet-content ">

                            <button onclick="changeSize(this)"  class="btn btn-default" id="size" > Change Size </button> <br/> <br/>
                            
                            <button onclick="addPortlet($(this).parents('.column'))" class="btn btn-default" id="add"> Add Portlet </button> <br/><br/>
                            
                             <button onclick="preview( )" class="btn btn-default" id="preview" >Preview</button> <br/> <br/>
                             
                             <a href="demo/index.html"  target="_blank" class="btn btn-default" role="button" id="configure">Configure</a> <br/> <br/>
                             
                              <button onclick="changeColour(this)" class="btn btn-default" id="colour"  >Change  color</button> <br/> 
                        </div>

                    </div>
`;


     var config = 
  {
     apiKey: "AIzaSyB_seQ621wsyajVf9VLlz5qQmGZSgaW7GA",
    authDomain: "wysiwyg-project.firebaseapp.com",
    databaseURL: "https://wysiwyg-project.firebaseio.com",
    projectId: "wysiwyg-project",
    storageBucket: "wysiwyg-project.appspot.com",
    messagingSenderId: "491613184843"
  };
  
  firebase.initializeApp(config);
  
  
 $(function () 
            
          {

                $(".column").sortable
                
               ({
                    connectWith: ".column",
                    handle: ".portlet-header",
                    cancel: ".portlet-toggle ",
                    placeholder: "portlet-placeholder ui-corner-all"
                });

             

            $(".portlet-header .ui-icon").click(function ( )
            {
                  $(this).toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
                  $(this).parents(".portlet").find(".portlet-content ").toggle();
            });
            
                  $(".column").disableSelection( );
                  
                  $(document).on('click','.close',function( )
             {
                 var result = confirm("Want to delete?");
                if (result)
                {
                   $(this).closest('.portlet ').remove();
                 
                  
              }
                
           });
         
             
            $('.portletname').append().editable();
            
             $.fn.editable.defaults.mode = 'inline';     
    
   
             // $('p').editable( );
             
            });
            
           

            function  changeSize(myCurrentObject )

            {
                
                var question = prompt("Which size do you want?", "");
                
                if(question!=="" || question !== null)
                
                {
                      
                    
                         if( question <0 || question >12)
                       {
                              alert("don have the size");
                             
                       }
                       else
                       {
                             targetedParent =  $(myCurrentObject).parents( ".column");
                    
                             $(targetedParent).removeClass("col-md-1").removeClass("col-md-2").removeClass("col-md-3").removeClass("col-md-4").removeClass("col-md-5").removeClass("col-md-6").removeClass("col-md-7").removeClass("col-md-8").removeClass("col-md-9").removeClass("col-md-10");
                     
                             $(targetedParent).addClass("col-md-" + question);
                       }
                       
                     
                 }
                 
                alert("The size is "+question);
             }
               
    
            function addPortlet (div_name, in_portlet_name )
            {
                
                  // targetedParent = $(myCurrentObject).parents(".portlet");
                  
                 var vportlet_id =  "portlet" +$('.portlet').length;
                 
                 if ( typeof in_portlet_name == "undefined")
                 { 
                    in_portlet_name = "Portlet " + $('.portlet').length;
                    //alert("?");
                 }
                 
                $( div_name).append([
                    {
                        portlet_id: vportlet_id,
                        
                        portlet_name:  in_portlet_name
                        
                    }].map(portletTemplate).join(''));
                
                
                   $("#" + vportlet_id)
                   
                        .addClass(" ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
                
                        .find(".portlet-header ")
                
                        .addClass("ui-widget-header ui-corner-all")
                
                       .prepend("<span class='ui-icon ui-icon-minusthick '></span><span class='close right'>x</span>")
               
                        .end()
                
                       .find(".portlet-content");
              
               //targetedParent.clone().insertAfter(targetedParent).after( "<br/>").attr("id","portlet" +$('.portlet').length);
               
               $('.portletname').append().editable();
             
              

            }
            
            
            //addPortlet($(".column").attr("id"));
          
            
            function preview( )
            {
                
                  $('.portlet').toggleClass('fullscreen');
               
            }
            
             function changeColour(object )
              {
                  
          
             $("#colour ").colorpicker().on('changeColor.colorpicker', function(event)
             {
                      targetedParent =  $(object).parents( ".portlet");
                 
                      $(targetedParent).css("background-color", event.color.toHex()); 
                      
                      
             });
            
              }
            
    
    
      
            function addnewportlet( )
            {
                
                 
                   addPortlet (".holder ", " Portlet " +  $('.portlet').length);
                         
                 // addPortlet($("#"+ myVal.PortletContents[this].Position ), myVal.PortletContents[this].PortletName);
             }
            
   
 
  function save ( )
  {
     
 var arrPortlet = [   ];

             var dbref= firebase.database( ).ref($("#txtFormID").val( ) );
    dbref.set
    ({ 

        FormName: $("#txtFormName").val( ),
     
    });
 
        
        
   var dbref= firebase.database( ).ref($("#txtFormID").val( ) + '/PortletContents' );
 
 
    $(".portlet").each( function( )
    {
        console.log(this);
        
        vPosition = $(this).parent(".column").attr("id");
        
        var x = {
            
            [$(this).attr("id")]:
                    
             {
                          "PortletID": $(this).attr("id"),
                        "PortletName": $(this).find("#name").html( ),
                         "Size": $(this).parents(".column").width( )+"px",
                         "Colour": $(this).css("background-color") ,
                         "Position": vPosition
                }
          
            
        };
        console.log(x);
    
         dbref.update(x);
       // arrPortlet.push(x);
           
       alert ("Saved");
       $(this).remove( );
    });
    //console.log(arrPortlet);

  }
  
  
  function load( )
  {
       var dbref= firebase.database( ).ref($("#txtFormID").val( ) );
         
      dbref.once("value", function(snap) 
      {
            myVal = snap.val( );
            console.log(myVal);
             $("#txtFormName").val(myVal.FormName);
          
           var i = 0;
           
           $(Object.keys(myVal.PortletContents)).each(function ( )
           {
               
               console.log(this);
              
               addPortlet($("#"+ myVal.PortletContents[this].Position ), myVal.PortletContents[this].PortletName,myVal.PortletContents[this].Size , myVal.PortletContents[this].Colour);
              
               
           });
            
      
           }, function (errorObject)
           
           {
               console.log("Failed " + errorObject.code);
           });
           
          
      
  }
 
