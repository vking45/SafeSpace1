# Generated by Django 3.1 on 2020-09-09 12:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0004_auto_20200825_0123'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserInfo',
        ),
    ]