document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {
        // * Load notifications
        setInterval(() => {
            let currNotificationsCount
            if ($('#currNotificationsCount').html()) {
                currNotificationsCount = $('#currNotificationsCount').html()
            } else {
                currNotificationsCount = 0
            }
            let wantedType = 'all'
            $.ajax({
                url: $('#notificationsList').attr('data-url'),
                data: {
                    'notification_type': wantedType,
                },
                dataType: 'json',
                method: 'get',
                success: function (response) {
                    let notifications = JSON.parse(response.notifications)
                    if (notifications.length > currNotificationsCount) {
                        $('#notificationsContainer').html('')
                        $('#currNotificationsCount').html(notifications.length)
                        for (let i = 0; notifications.length > i; i++) {
                            $.ajax({
                                url: $('#notificationsList').attr('data-getUserUrl'),
                                data: {
                                    'pk': notifications[i].fields.sender,
                                },
                                dataType: 'json',
                                async: false,
                                success: function (response) {
                                    output = ''
                                    let sender = response.user
                                    sender_friends = JSON.parse(sender.friends)
                                    let currUser = $('#notificationsList').attr('data-currUser')
                                    let senderAvatar
                                    if (sender.who_see_avatar == 'everyone') {
                                        senderAvatar = sender.avatar
                                        // } else if (sender.who_see_avatar == 'friends' && currUser in sender_friends) {
                                    } else {
                                        senderAvatar = '/media/profile_images/DefaultUserImage.jpg'
                                    }
                                    output = `
                                <a href="${notifications[i].fields.url}" style="text-decoration: none; color: black">
                                    <div class="media" style="background: #F7F7F7;">
                                        <img src="${sender.avatar}" alt="User Image" width="50"
                                            height="50">
                                        <div class="media-body">
                                            <h5 class="mt-0">${ sender.username }</h5>
                                            <p>${ notifications[i].fields.content }</p>
                                        </div>
                                    </div>
                                </a>
                                <hr>
                                `
                                    $('#notificationsContainer').append(output)
                                }
                            })
                        }
                        document.getElementById('notificationSound').play()
                    }
                }
            })
        }, 6000);
        $('#notificationDropMenu').click(function (event) {
            event.stopPropagation();
        });
        $('.notificationType').click(function (e) {
            e.preventDefault();
            if (!$(this).hasClass('active')) {
                $('#notificationsContainer').html('')
                $('.notificationType').removeClass('active');
                $(this).addClass('active')
                let wantedType = $(this).attr('date-wantedType')
                $.ajax({
                    url: $('#notificationsList').attr('data-url'),
                    data: {
                        'notification_type': wantedType,
                    },
                    dataType: 'json',
                    method: 'get',
                    success: function (response) {
                        let notifications = JSON.parse(response.notifications)
                        for (let i = 0; notifications.length > i; i++) {
                            $.ajax({
                                url: $('#notificationsList').attr('data-getUserUrl'),
                                data: {
                                    'pk': notifications[i].fields.sender,
                                },
                                dataType: 'json',
                                async: false,
                                success: function (response) {
                                    output = ''
                                    let sender = response.user
                                    sender_friends = JSON.parse(sender.friends)
                                    let currUser = $('#notificationsList').attr('data-currUser')
                                    let senderAvatar
                                    if (sender.who_see_avatar == 'everyone') {
                                        senderAvatar = sender.avatar
                                        // } else if (sender.who_see_avatar == 'friends' && currUser in sender_friends) {
                                    } else {
                                        senderAvatar = '/media/profile_images/DefaultUserImage.jpg'
                                    }
                                    output = `
                                <a href="${notifications[i].fields.url}" style="text-decoration: none; color: black">
                                    <div class="media" style="background: #F7F7F7;">
                                        <img src="${sender.avatar}" alt="User Image" width="50"
                                            height="50">
                                        <div class="media-body">
                                            <h5 class="mt-0">${ sender.username }</h5>
                                            <p>${ notifications[i].fields.content }</p>
                                        </div>
                                    </div>
                                </a>
                                <hr>
                                `
                                    $('#notificationsContainer').append(output)
                                }
                            })
                        }
                    }
                })
            }
        });
        setInterval(() => {
            if ($('#message_area').html()) {
                setTimeout(() => {
                    $('#message_area').html('')
                }, 4000);
            }
        }, 4000);
        $('textarea,input[type=text]').emojioneArea()
    });
});