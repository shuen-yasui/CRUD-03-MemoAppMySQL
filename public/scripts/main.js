$(document).ready(function(){
  $('.delete-note').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/note/delete/'+id,
      success: function(response){
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    })
  });
});
