# Generated by Django 3.1 on 2020-09-10 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Practices', '0006_auto_20200910_1504'),
    ]

    operations = [
        migrations.AddField(
            model_name='practices',
            name='u_rl',
            field=models.URLField(blank=True),
        ),
    ]
