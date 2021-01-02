{

    console.log("I am getting loaded"); 
//function which send the data 
let createPost=function(){
   $('#new-post-form').submit(function(e) { 
       e.preventDefault();
      
       //we will manually submit the form using ajax
       $.ajax({
           type: "post",
           url: "/posts/create",
           //this converts the form data to json
           data: $('#new-post-form').serialize(),
           success: function (data) {
               console.log(data);
               let newPost=newPostDom(data.data.post);
               $(`#posts-list-container>ul`).prepend(newPost);
           },
           error:function(error)
           {
            console.log(error.responseText);
           } 
       });
   });
}


let newPostDom=(post)=>{
    return (`<li  id="post-${post._id}" class ="posts-div">
    <br>
    
    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>  
    ${post.content}
    <br>
        ${post.user.name}
     <br>
     <br>

     <div class="post-comments" >
         <form action="/comments/create" method="POST">
            <input type="text" name="content" placeholder="type here to add comement">
            <input type="hidden" name="post"  value="${post._id}">
            <input type="submit" value="Add comment">
        </form>
     </div> 
     <div class="post-comments-list">
        <ul id="post-comments-${post._id}">


        </ul>
     </div>
     
</li>`);
}


let deletePost=function(deleteLink){
    $(deleteLink).click((e)=>{
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:(data)=>{
                $(`#post-${data.post_id}` ).remove();
                deletePost($(' .delete-post-button',newPost));    
            },
            error:(error)=>{
                console.log(error.responseText);
            }
        });
    });
}

createPost();

}
 
