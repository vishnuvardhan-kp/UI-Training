$(document).ready(function () {

    $.ajax({
        url: "https://www.myjsons.com/v/11025407",
        method: "GET",
        dataType: "json",

        beforeSend: function() {
            console.log("Data Fetching...");
        }
    })
    
    .done(function(data) {

        $(".profile").append(`
            <p> ${data.media.profilename} </p>
            <img src="${data.media.profilelogo}" alt = 'Profile' class="profile-logo"/>
        `)
            
        $(".video-container").append(`
            <video controls autoplay muted loop aria-label = 'Sun setting under the sea' >
                <source src="${data.media.video}" type="video/mp4">
                </video>
                <section class="video-description">
                <p class="title"> ${data.bookInfo.title} </p>
                <p> ${data.bookInfo.description} </p> 
            </section>
        `)


        $.each(data.comments, function(index, value) {
            $(".comment-container").append(`
                <section class="comments">
                    <img src="${value.profileImage}" alt="${value.username} profile" class="profile-logo"/>
                    <section class="comment">
                        <p class="title username"> ${value.username} </p>
                        <p> ${value.comment} </p>
                    </section>
                </section>
            `)
        })

        $.each(data.sidebarImages, function(index, value) {
            $(".image-section").append(`
                <img src="${value}" alt="Book cover ${index+1}"/>
            `)
        })

    })
    
    .fail(function(xhr, status, error) {
        console.log("Request failed");
        console.log("Status: ",status);
        console.log("Error: ",error);
    })

    .always(function() {
        $(".spinner-overlay").hide();
    })
});