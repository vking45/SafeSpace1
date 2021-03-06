from django.db import models
from PIL import Image
from django.contrib.auth import get_user_model
User = get_user_model()


class ChatBox(models.Model):
    user_1 = models.ForeignKey(
        User, related_name='user_1', on_delete=models.CASCADE)
    user_2 = models.ForeignKey(
        User, related_name='user_2', on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user_1} and {self.user_2}'


class Message(models.Model):
    chat_box = models.ForeignKey(
        ChatBox, related_name='chat_box', null=True, on_delete=models.CASCADE)
    message_sender = models.ForeignKey(
        User, related_name='message_sender', null=True, on_delete=models.CASCADE)
    sent_date = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
    is_important = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.message_sender} to ({self.chat_box}) ⚠️{self.is_important}⚠️'


class ChatGroup(models.Model):
    title = models.CharField(max_length=25)
    description = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='group_images',
                              default='profile_images/DefaultUserImage.jpg')
    is_public = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    # USERS
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    group_admins = models.ManyToManyField(
        User, related_name='gropu_admins', blank=True)
    members = models.ManyToManyField(
        User, related_name='group_memebers', blank=True)

    def __str__(self):
        return f'[AUTHOR] {self.author} [TITLE] {self.title} [MEMBERS] {self.members.count()} '

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            img = Image.open(self.image.path)
            if img.width > 140 or img.height > 140:
                output_size = (140, 140)
                img.thumbnail(output_size)
                img.save(self.image.path, 'WebP')


class GroupRequest(models.Model):
    request_sender = models.ForeignKey(
        User, related_name='request_sender', on_delete=models.CASCADE)
    reciever = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    sent_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'[GROUP] {self.group.title} | {self.request_sender} To {self.reciever}'


class GroupMessage(models.Model):
    group = models.ForeignKey(
        ChatGroup, related_name='chat_group', null=True, on_delete=models.CASCADE)
    message_sender = models.ForeignKey(
        User, related_name='group_message_sender', null=True, on_delete=models.CASCADE)
    sent_date = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
    is_important = models.BooleanField(default=False)

    def __str__(self):
        return f'message_sender: {self.message_sender}, chat_box: {self.group}'


class Notification(models.Model):
    receiver = models.ManyToManyField(
        User, related_name="notification_receiver", default=None)
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='notification_sender')
    content = models.CharField(max_length=100, null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
